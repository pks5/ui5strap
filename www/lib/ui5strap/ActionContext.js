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
			"PARAM_BINDING_CONTEXT" : "context",
			"PARAM_DOM_SELECTOR" : "selector",
			"PARAM_EVENTS" : "events",
			"PARAM_FUNCTIONS" : "functions"
		},
		"AJ2.0" : {
			"PREFIX" : "__",
			"PARAM_ACTION" : "action",
			"PARAM_MODULES" : "modules",
			"PARAM_BINDING_CONTEXT" : "context",
			"PARAM_DOM_SELECTOR" : "selector",
			"PARAM_EVENTS" : "events",
			"PARAM_FUNCTIONS" : "functions"
		}
	};

	//Default Format
	ActionContext.DEFAULT_FORMAT = "AJ1.0";

	//Prefix
	ActionContext.PREFIX = 'PREFIX';

	//Action Name
	ActionContext.PARAM_ACTION = 'PARAM_ACTION';
	
	//AM Modules
	ActionContext.PARAM_MODULES = 'PARAM_MODULES';
	
	//Binding Context
	ActionContext.PARAM_BINDING_CONTEXT = 'PARAM_BINDING_CONTEXT';
	
	//DOM Selector
	//@deprecated
	ActionContext.PARAM_DOM_SELECTOR = 'PARAM_DOM_SELECTOR';
	
	//Action Events
	ActionContext.PARAM_EVENTS = 'PARAM_EVENTS';
	
	//Action Functions
	ActionContext.PARAM_FUNCTIONS = 'PARAM_FUNCTIONS';

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

		//Files
		_this.FILES = [];

		//Data to parse
		_this.PARSE = [];

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
			_this.event = oEvent;

			//Event Source
			var eventSource = oEvent.getSource();
			if(eventSource instanceof sap.ui.base.EventProvider){ //Expected sap.ui.base.EventProvider
				_this.eventSource = eventSource;

				var customData = eventSource.data();
				if(customData && Object.keys(customData).length){ //Expected object
					_this.PARSE.push(customData);
					
					//Format check
					//TODO: Make this better
					if((!_this.defaultParameters || !_this.defaultParameters.__format) && !customData.__format){
						customData.__format = ActionContext.DEFAULT_FORMAT;
					}
				}
			}

			//Event parameters (e.g. from a list selection)
			var eventParameters = oEvent.getParameters();
			if(eventParameters){
				_this.eventParameters = eventParameters;
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
		
		//_this.window = window;
		//_this.document = document;
		
		//Number
		ActionContext.NUMBER ++;
		_this._actionNumber = ActionContext.NUMBER;

		//Call stack
		_this._callStack = [];

		//Init Log
		_initLog(_this);
		
		//Merge the context
		_this._merge();
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
		if(!this.parameters.__format || !_paramNames[this.parameters.__format]){
			throw new Error('Cannot read parameter "' + parameterKey + '": Invalid action format: ' + this.parameters.__format);
		}

		var paramData = _paramNames[this.parameters.__format],
			actionParam = paramData[ActionContext.PREFIX] + paramData[parameterKey];
		
		if(prefix){
			actionParam = prefix + '.' + actionParam;
		}
		
		return actionParam;
	};

	/*
	* Gets a parameter by key
	* @Protected
	*/
	ActionContextProto._getParameter = function(parameterKey){
		if(-1 !== parameterKey.indexOf('.')){
			var keyParts = parameterKey.split('.'),
				pointer = this,
				i=0;
			
			while(i < keyParts.length){
				if(keyParts[i] in pointer){ // && null !== pointer[keyParts[i]]
					pointer = pointer[keyParts[i]];
					i++;
				}
				else{
					return null;
				}
			}
			
			return pointer;
		}	
		
		//Without a dot in the key, use "parameters"
		//TODO Is this ever happen somewhere?
		if(!(parameterKey in this.parameters)){
			return null;
		}

		return this.parameters[parameterKey];
	};

	/*
	* @Protected
	*/
	ActionContextProto._setParameter = function(parameterKey, parameterValue){
			if(-1 !== parameterKey.indexOf('.')){
				var keyParts = parameterKey.split('.'),
					pointer = this,
					i=0;
				while(i < keyParts.length){
					var keyPart = keyParts[i];
					
					if(i === keyParts.length - 1){
						 pointer[keyPart] = parameterValue;
					}
					else if(!(keyPart in pointer)){
						pointer[keyPart] = {};
					}
					
					pointer = pointer[keyPart];
					i++;
					
				}
				return this;
			}	
			
			//Without a dot in the key, use "parameters"
			//TODO Is this ever happen somewhere?
			this.parameters[parameterKey] = parameterValue;

			return this;
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
	ActionContextProto._merge = function(){
			this._log.debug("MERGING PARAMETERS");
			
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
			for (var i = 0; i < this.PARSE.length; i++){
				_parseAndMerge(this, this.PARSE[i]);
			}

			//Load additional data from DOM nodes and Control Context
			//@deprecated
			//this._fetch("parameters");

			//If a format is present, we can process the parameters
			if(this.parameters.__format){
				this._process("parameters");
			}
			
	};

	/*
	* @protected
	*/
	ActionContextProto._process = function(parameterKey){
		_applyFunctions(this, this.parameterKey(ActionContext.PARAM_FUNCTIONS, parameterKey));
	};

	/*
	* Fetch additional data from a dom node and from a binding context inside the event
	* @deprecated
	* @Protected
	*
	ActionContextProto._fetch = function(parameterKey){
		jQuery.sap.log.debug("F ActionContext::_fetch ('" + parameterKey + "')");

		//DOM Selector
		//@deprecated
		var domsel = this._getParameter(this.parameterKey(ActionContext.PARAM_DOM_SELECTOR, parameterKey));
		if(domsel){ //Expected string
			
			var domsels = ui5strap.Utils.parseIContent(domsel);
			if(typeof domsels === 'string'){
				domsels = [domsels];
			}
			var domselsLength = domsels.length;
			
			if(!("DOM" in this)){
				this.DOM = {};
			}
			
			//Copy all attributes of the nodes covered by domselKey
			for ( var i = 0; i < domselsLength; i++ ){

				var domselKey = domsels[i];
				this.DOM[domselKey] = jQuery(domselKey).attr();
			
			}
		
		}

		//Binding Context
		var bindingContextPath = this._getParameter(this.parameterKey(ActionContext.PARAM_BINDING_CONTEXT, parameterKey));
		if(this.eventParameters && bindingContextPath){ //string expected
			var eventParameters = this.eventParameters,
				eventParametersKeys = Object.keys(eventParameters),
				eventParametersKeysLength = eventParametersKeys.length;
			
			for( var i = 0; i < eventParametersKeysLength; i++ ){
				
				var eventParameterValue = eventParameters[ eventParametersKeys[i] ];
				if(eventParameterValue instanceof sap.ui.core.Control){
					var oBindingContext = eventParameterValue.getBindingContext(bindingContextPath);
					if(oBindingContext){ //object expected
						var bModel = oBindingContext.getModel();
						if(bModel){ //sap.ui.core.model.Model expected
							var bPath = oBindingContext.getPath(); 
							
							if(!("CONTEXT" in this)){
								this.CONTEXT = {};
							}

							this.CONTEXT[bindingContextPath] = {
									"model" : bModel,
									"path" : bPath,
									"data" : bModel.getProperty(bPath)
							};

						}
						else{
							this._log.error('Invalid model in binding context: ' + bindingContextPath);
						}
					}
					else{
						this._log.error('Invalid binding context: ' + bindingContextPath);
					}
				}

			}
		}
	};
	*/

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