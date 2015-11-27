/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionContext
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	var jQuerySap = jQuery.sap;

	jQuerySap.declare('ui5strap.ActionContext');
	
	jQuerySap.require("ui5strap.library");
	jQuerySap.require("ui5strap.ActionFunctions");

	/*
	* @constructor
	*/ 
	ui5strap.Object.extend('ui5strap.ActionContext', {
		"constructor" : function(action){
			_init(this, action);
		}
	});

	var ActionContext = ui5strap.ActionContext,
		ActionContextProto = ActionContext.prototype;

	ActionContext.NUMBER = 0;

	var _paramNames = {
		"AJ1.0" : {
			"PREFIX" : "a_",
			"PARAM_ACTION" : "id",
			"PARAM_MODULES" : "modules",
			"PARAM_EVENTS" : "events",
			"PARAM_FUNCTIONS" : "functions"
		},
		"AJ2.0" : {
			"PREFIX" : "__",
			"PARAM_ACTION" : "action",
			"PARAM_MODULES" : "modules",
			"PARAM_EVENTS" : "events",
			"PARAM_FUNCTIONS" : "functions"
		}
	};

	//Default Format
	ActionContext.DEFAULT_FORMAT = "AJ1.0";

	//Action Name
	ActionContext.PARAM_ACTION = 'PARAM_ACTION';
	
	//AM Modules
	ActionContext.PARAM_MODULES = 'PARAM_MODULES';
	
	//Action Events
	ActionContext.PARAM_EVENTS = 'PARAM_EVENTS';
	
	//Action Functions
	ActionContext.PARAM_FUNCTIONS = 'PARAM_FUNCTIONS';
	
	ActionContext.WORKPOOL = "parameters";
	
	var _tools = {
		not : function(value){
			return !value;
		}	
	};
	
	/*
	* Init log
	* @private
	*/
	var _initLog = function(_this){
		_this._log = {
			debug : function (message) {
				_this.app.log.debug(_this + ' ' + message);
			},

			warning : function (message) {
				_this.app.log.warning(_this + ' ' + message);
			},

			error : function (message) {
				_this.app.log.error(_this + ' ' + message);
			},

			info : function (message) {
				_this.app.log.info(_this + ' ' + message);
			},

			fatal : function (message) {
				_this.app.log.fatal(_this + ' ' + message);
			}
		};
	};

	/*
	* @private
	*/
	var _init = function(_this, action){
		
		//App Reference
		if(!action.app){
			throw new Error('App reference required!')
		}
		_this.app = action.app;
		
		_this.tools = _tools;
		
		//Files
		_this.FILES = [];

		//Default parameters
		if(action.parameters){
			var actionParametersType = typeof action.parameters;
			if(actionParametersType === 'object'){
				_this.defaultParameters = jQuery.extend({}, action.parameters);

				//Set parameters to default format
				if(!_this.defaultParameters.__format){
					_this.defaultParameters.__format = ActionContext.DEFAULT_FORMAT;
				}
			}
			else{
				//parameters is a string
				throw new Error('Context Parameters must be an object!');
			}
		}
		
		//Event
		if(action.event){ //Expected sap.ui.base.Event instance 
			var oEvent = action.event;

			//Add sap.ui.base.Event object to context
			//_this.event = oEvent;

			//Event Source
			var eventSource = oEvent.getSource();
			if(eventSource instanceof sap.ui.base.EventProvider){ //Expected sap.ui.base.EventProvider
				_this.eventSource = eventSource;

				var customData = eventSource.data();
				if(customData && Object.keys(customData).length){ //Expected object
					//Format check
					//TODO: Make this better
					if((!_this.defaultParameters || !_this.defaultParameters.__format) && !customData.__format){
						customData.__format = ActionContext.DEFAULT_FORMAT;
					}
					_this.customData = customData;
				}
			}

			//Event parameters (e.g. from a list selection)
			var eventParameters = oEvent.getParameters();
			if(eventParameters){
				_this.eventParameters = eventParameters;
				//console.log(eventSource, eventParameters);
			}
		
		}

		//OpenUI5 Standard Controller
		if(action.controller){
			//Add Controller reference to context
			_this.controller = action.controller;

			//View
			_this.view = action.controller.getView();

			//Make viewData available
			_this.viewData = _this.view.getViewData();
		}

		//Custom data
		if(action.data){
			//Add custom Data to context
			_this.data = action.data;
		}

		//Local Storage && Session Storage
		_this.localStorage = localStorage ? localStorage : {};
		_this.sessionStorage = sessionStorage ? sessionStorage : {};
		
		_this.window = window;
		_this.document = document;
		
		//Number
		ActionContext.NUMBER ++;
		_this._actionNumber = ActionContext.NUMBER;

		//Call stack
		_this._callStack = [];
		
		_this._loopDir = {};

		//Init Log
		_initLog(_this);
		
		//Merge the context
		_this._buildPool();
	};

	/*
	* Parse data and merge it into the context
	* @private
	*/
	var _parseAndMerge = function(_this, customData){
		var customDataKeys = Object.keys(customData),
			customDataKeysLength = customDataKeys.length;
		
		for ( var i = 0; i < customDataKeysLength; i++ ){
			var customDataKey = customDataKeys[i],
				iContent = ui5strap.Utils.parseIContent(customData[customDataKey]),
				iContentType = typeof iContent;
			if(iContentType === 'string'){
				//iContent is a string, just set or replace the value in the parameter pool
				_this.parameters[customDataKey] = iContent;
			}
			else if(iContentType === 'object'){ 
				//iContent is an object, if parameter already exists in pool, deep copy, otherwise just set
				if(_this.parameters[customDataKey]){
					jQuery.extend(true, _this.parameters[customDataKey], iContent);
				}
				else{
					_this.parameters[customDataKey] = iContent;
				}

			} 
		}
	};

	/*
	* Apply functions
	* @private
	*/
	var _applyFunctions = function(_this, parameterKey){
		var paramFunctions = _this._getParameter(parameterKey);

		if(paramFunctions){ //Expected array
			var paramFunctionsLength = paramFunctions.length,
				availableFunctions = ui5strap.ActionFunctions;
			_this._log.debug("CALLING " + paramFunctionsLength + " FUNCTIONS OF " + parameterKey);
				
			for( var i = 0; i < paramFunctionsLength; i++ ){
				var functionDef = paramFunctions[i],
					functionName = functionDef['function'];

				if(availableFunctions[functionName]){
					_this._log.debug("Calling parameter function '" + functionName + "'");
					var funcResult = availableFunctions[functionName].call(_this, functionDef.args);
					if(false === funcResult){
						throw new Error("Parameter function '" + functionName + "' failed.");
					}
				}
				else{
					throw new Error('Invalid function: ' + functionName);
				}
			}
		}	

	};

	/*
	* Creates an action parameter based on the prefix for actions
	* @Static
	*/
	ActionContextProto.parameterKey = function (parameterKey, prefix){
		if(!prefix){
			throw new Error("please provide a prefix for '" + parameterKey + "'");
		}

		var paramData = _paramNames[this.parameters.__format],
			actionParam = paramData.PREFIX + paramData[parameterKey];
		
		
		return prefix + "." + this.addFormatPrefix(parameterKey);
	};
	
	/*
	* Creates an action parameter based on the prefix for actions
	* @Static
	*/
	ActionContextProto.addFormatPrefix = function (parameterKey){
		if(!this.parameters.__format || !_paramNames[this.parameters.__format]){
			throw new Error('Cannot read parameter "' + parameterKey + '": Invalid action format: ' + this.parameters.__format);
		}

		var paramData = _paramNames[this.parameters.__format],
			actionParam = paramData.PREFIX + paramData[parameterKey];
		
		return actionParam;
	};

	var _callParamFunction = function(_this, scope, func, paramString, parameterScope){
		var args = null;
		if('' !== paramString){
			args = paramString.split(/,/);
		}
		else{
			args = [];
		}
		if(null === args){
			throw new Error("Cannot execute function: no parameters provided!");
		}
		
		for(var i = 0; i < args.length; i++){
			args[i] = _this._getParameter(args[i].trim(), parameterScope);
		}
		
		return func.apply(scope, args);
	};
	
	/*
	* Gets a parameter by key
	* @Protected
	*/
	ActionContextProto._getParameter = function(parameterKey, parameterScope){
		var fPart = null;
		var kPart = parameterKey;
		var c1Pos = parameterKey.indexOf('(');
		if(-1 !== c1Pos){
			var c2Pos = parameterKey.length - 1;
			if(parameterKey.charAt(c2Pos) !== ')'){
				throw new Error("Invalid function part in " + parameterKey);
			}
			
			kPart = parameterKey.substring(0, c1Pos);
			
			if(c1Pos === c2Pos - 1){
				fPart = "";
			}
			fPart = parameterKey.substring(c1Pos + 1, c2Pos);
		}
		
		if(kPart.charAt(0) === "."){
			if(!parameterScope){
				throw new Error("Cannot resolve relative paramter without scope!");
			}
			kPart = parameterScope + kPart;
		}
		
		if(!kPart.match(/([a-zA-Z0-9_]+\.)*[a-zA-Z0-9_]+/)){
			throw new Error("Invalid key part in " + parameterKey);
		}
		
		
		//console.log(kPart, fPart);
			
		var keyParts = kPart.split('.'),
				pointer = this,
				i=0;
			
			while(i < keyParts.length){
				var keyPart = keyParts[i];
				if("object" !== typeof pointer){
					throw new Error("Cannot access '" + keyPart + "' in " + parameterKey + ": not an object.");
				}
				
				if(keyPart in pointer){
					var prevPointer = pointer;
					pointer = pointer[keyPart];
					if("function" === typeof pointer){
						if(i === keyParts.length - 1){
							jQuery.sap.log.info("Executing " + kPart + " with arguments " + fPart);
							pointer = _callParamFunction(this, prevPointer, pointer, fPart, parameterScope);
							break;
						}
						else{
							throw new Error("Cannot access '" + keyPart + "' in " + parameterKey + ": is a function.");
						}
					}
					i++;
				}
				else{
					pointer = null;
					break;
				}
			}
			
			if(("string" === typeof pointer) && pointer.charAt(0) === "="){
				pointer = this._getParameter(pointer.substring(1).trim(), parameterScope);
			}
			
			return pointer;
		
	/*
		}	
		console.log(parameterKey);
		//Without a dot in the key, use "parameters"
		return parameterKey in this.parameters 
			? this.parameters[parameterKey]
			: null;
			*/
	};

	/*
	* @Protected
	*/
	ActionContextProto._setParameter = function(parameterKey, parameterValue){
		if(-1 === parameterKey.indexOf('.')){
			throw new Error("Cannot get parameter: no root node provided.");
		}
				var keyParts = parameterKey.split('.'),
					pointer = this,
					i=0;
				
				while(i < keyParts.length){
					var keyPart = keyParts[i];
					
					if(i === keyParts.length - 1){
						if(pointer[keyPart] && ("function" === typeof pointer[keyPart])){
							//Value already exists, but its a function
							throw new Error("Cannot override parameter: '" + parameterKey + "' is a function.");
						}
						//Set (or override) value
						pointer[keyPart] = parameterValue;
					}
					else if(!(keyPart in pointer)){
						//Create new empty object
						//TODO if pointer[keypart] is a string we will land here too and override it!
						pointer[keyPart] = {};
					}
					
					pointer = pointer[keyPart];
					i++;
					
				}
				
				return this;
			
			/*
			}	
			
			//Without a dot in the key, use "parameters"
			this.parameters[parameterKey] = parameterValue;

			return this;
			*/
	};

	/*
	* @Protected
	*/
	ActionContextProto._deleteParameter = function(parameterKey){
			delete this.parameters[parameterKey];

			return this;
	};

	/*
	* @Protected
	*/
	ActionContextProto._copyParameter = function(parameterKeySrc, parameterKeyTgt){
		var paramSrcValue = this._getParameter(parameterKeySrc);
		if(null !== paramSrcValue){
			this._setParameter(parameterKeyTgt, paramSrcValue);
		}

		return this;
	};

	/*
	* @Protected
	*/
	ActionContextProto._moveParameter = function(parameterKeySrc, parameterKeyTgt){
		this._copyParameter(parameterKeySrc, parameterKeyTgt);
		this._deleteParameter(parameterKeySrc);

		return this;
	};

	/*
	* Merge the parameters from custom data into the existing computed parameters
	* @protected
	*/
	ActionContextProto._buildPool = function(){
			this._log.debug("Building Pool...");
			
			//Reinitialize parameters with default values
			this.parameters = {};
			
			//Add JSON Files in opposite order
			for (var i = this.FILES.length-1; i >= 0; i--){
				jQuery.extend(true, this.parameters, this.FILES[i]);
			}

			if(this.defaultParameters){
				//Add Default Values
				jQuery.extend(true, this.parameters, this.defaultParameters);
			}

			//Parse and add Custom Data 
			if(this.customData){
				_parseAndMerge(this, this.customData);
			}
			
			this.pool = this.parameters;
			
			//If a format is present, we can process the parameters
			if(this.parameters.__format){
				this._process(ActionContext.WORKPOOL);
			}
	};

	/*
	* @protected
	*/
	ActionContextProto._process = function(parameterKey){
		_applyFunctions(this, this.parameterKey(ActionContext.PARAM_FUNCTIONS, parameterKey));
	};

	

	/*
	* 
	* Executes an AM Module (ui5strap.ActionModule)
	* @protected
	*/
	ActionContextProto._run = function(instanceDef){
		//Set index
		instanceDef.index = this._callStack.length;
		
		//Push to callstack
		this._callStack.push(instanceDef);

		var actionModuleName = instanceDef.module,
			ActionModuleConstructor = ui5strap.Utils.getObject(actionModuleName),
			oActionModule = new ActionModuleConstructor();
					
		if(!(oActionModule instanceof ui5strap.ActionModule)){
			throw new Error("Error in action '" + this + "':  '" + actionModuleName +  "' must be an instance of ui5strap.ActionModule!");
		}

		oActionModule.init(this, instanceDef).execute();
	};

	/*
	* String representation of the context
	* @public
	*/
	ActionContextProto.toString = function(){
		return '[ACTION#' + this._actionNumber + ']';
	};

}());