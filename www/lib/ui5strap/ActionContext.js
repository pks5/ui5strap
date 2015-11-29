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

	ActionContext.PREFIX = "__";
	ActionContext.RESOLVE = "=->";
	ActionContext.RESOLVE_LENGTH = ActionContext.RESOLVE.length;
	
	//Action Name
	ActionContext.PARAM_ACTION = 'action';
	
	//AM Modules
	ActionContext.PARAM_MODULES = 'modules';
	ActionContext.PARAM_TASKS = 'TASKS';
	ActionContext.PARAM_MODULE = 'TYPE';
	
	//Action Events
	ActionContext.PARAM_EVENTS = 'events';
	
	//Action Functions
	ActionContext.PARAM_FUNCTIONS = 'functions';
	
	ActionContext.WORKPOOL = "action";
	
	/*
	 * Tools functions
	 * CLEANUP
	 */
	var _tools = {
		"bool" : {
	 		"not" : function(value){
				return !value;
			}
		},
		"lang" : {
			"do" : function(){
				return arguments;
			},
			"eq" : function(){
				if(arguments.length === 0){
					return true;
				}
				var cmp = arguments[0];
				for(var i = 1; i < arguments.length; i++){
					if(arguments[i] != cmp){
						return false;
					}
				}
				return true;
			}
		}
	};
	
	/**
	* Init log
	* @Private
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

	/**
	 * @PostConstruct
	* @Private
	*/
	var _init = function(_this, action){
		
		//Validate
		if(!action.app || !action.parameters || ('object' !== typeof action.parameters)){
			throw new Error("Constructor argument must contain 'app' reference and 'parameters' object.");
		}
		
		//App Reference
		_this.app = action.app;
		
		//Tools Reference
		_this.tools = _tools;
		
		//Default parameters
		_this.defaultParameters = action.parameters;
			
		//Pool
		_this.action = jQuery.extend(true, {}, _this.defaultParameters);
		
		//Old Pool
		//@deprecated
		_this.parameters = _this.action;
		
		console.log(action);
		
		//Event Source
		if(action.eventSource){
			_this.eventSource = action.eventSource;
		}
		
		//Event Parameters
		if(action.eventParameters){
			_this.eventParameters = action.eventParameters;
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
		_this.global = window;
		
		//Number
		ActionContext.NUMBER ++;
		_this._actionNumber = ActionContext.NUMBER;

		//Call stack
		_this._callStack = [];
		
		_this._loopDir = {};

		//Init Log
		_initLog(_this);
	};

	/**
	* Returns String representation of this context.
	* 
	* @Public
	*/
	ActionContextProto.toString = function(){
		return '[ACTION#' + this._actionNumber + ']';
	};
	
	ActionContextProto._isExpression = function(pointer){
		return ("string" === typeof pointer) && pointer.substr(0, ActionContext.RESOLVE_LENGTH) === ActionContext.RESOLVE;
	};
	
	ActionContextProto._evalExpression = function(task, pointer){
		return this.get(task, pointer.substring(ActionContext.RESOLVE_LENGTH).trim());
	};
	
	/**
	 * @Public
	 * FIXME
	 */
	ActionContextProto.resolve = function(task, pointer, onlyString){
		if(this._isExpression(pointer)){
			pointer = this._evalExpression(task, pointer);
		}
		else if(!onlyString && ("object" === typeof pointer)){
			var objectKeys = Object.keys(pointer),
				objectKeysLength = objectKeys.length;
		
			for(var i=0; i < objectKeysLength; i++){
				pointer[objectKeys[i]] = this.resolve(task, pointer[objectKeys[i]], true);
			}
		}
		return pointer;
	};
	
	/**
	 * @Private
	 */
	var _callParamFunction = function(_this, scope, func, paramString, task, isRoot){
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
			args[i] = _this.get(task, args[i].trim());
		}
		
		if(isRoot){
			args.unshift(task);
		}
		
		return func.apply(scope, args);
	};
	
	
	/**
	* Gets and evaluates a context parameter.
	* 
	* @Protected
	*/
	ActionContextProto.get = function(task, parameterKey, defaultValue){
		var fPart = null;
		var kPart = parameterKey;
		var c1Pos = parameterKey.indexOf('(');
		if(-1 !== c1Pos){
			var c2Pos = parameterKey.length - 1;
			if(parameterKey.charAt(c2Pos) !== ')'){
				throw new Error("Invalid function part in " + parameterKey);
			}
			
			kPart = parameterKey.substring(0, c1Pos);
			
			if(c1Pos >= c2Pos - 1){
				fPart = "";
			}
			fPart = parameterKey.substring(c1Pos + 1, c2Pos).trim();
		}
		
		if(kPart.charAt(0) === "."){
			if(!task){
				throw new Error("Cannot resolve relative paramter without task reference!");
			}
			kPart = task.getScope() + kPart;
		}
		
		if(!kPart.match(/([a-zA-Z0-9_]+\.)*[a-zA-Z0-9_]+/)){
			throw new Error("Invalid key part in " + kPart);
		}
		
		if(this._loopDir["t_" + kPart]){
			throw new Error("Cannot access " + kPart + ": is locked by another process.");
		}
		this._loopDir["t_" + kPart] = true;
		//console.log(kPart, fPart);
			
		var keyParts = kPart.split('.'),
				pointer = this,
				i=0;
			
		while(i < keyParts.length){
			var keyPart = keyParts[i];
			if("object" !== typeof pointer){
				console.log(pointer);
				throw new Error("Cannot access '" + keyPart + "' in " + parameterKey + ": not an object.");
			}
			var prevPointer = pointer;
			pointer = pointer[keyPart];
			if(pointer){
				var functionApplied = false;
				if("function" === typeof pointer){
					if(i === keyParts.length - 1){
						if(keyPart.charAt(0) === '_'){
							throw new Error("Cannot execute protected function '" + keyPart + "'.");
						}
						jQuery.sap.log.info("Executing function '" + kPart + "' with arguments (" + fPart + ")");
						pointer = _callParamFunction(
								this, 
								prevPointer, 
								pointer, 
								fPart, 
								task, 
								keyParts.length === 1
						);
						functionApplied = true;
					}
					else{
						throw new Error("Cannot access '" + keyPart + "' in " + parameterKey + ": is a function.");
					}
				}
				
				if(this._isExpression(pointer)){
					if(functionApplied){
						throw new Error("Function '" + kPart + "' must not return string value starting with " + ActionContext.RESOLVE);
					}
					prevPointer[keyPart] = this._evalExpression(task, pointer);
				    pointer = prevPointer[keyPart];
				}
				i++;
			}
			else{
				break;
			}
		}
		
		//Set value to default if null or undefined
		if(("undefined" === typeof pointer) && ("undefined" !== typeof defaultValue)){
			pointer = defaultValue;
			if(this._isExpression(pointer)){
				pointer = this._evalExpression(task, pointer);
			}
		}
		
		this._loopDir["t_" + kPart] = false;
		
		return pointer;
	};
	
	/**
	 * Sets a value.
	* @Protected
	*/
	ActionContextProto.set = function(task, parameterKey, parameterValue){
		if(!parameterKey || -1 === parameterKey.indexOf('.')){
			throw new Error("Cannot get parameter: no root node provided.");
		}
		if(parameterKey.charAt(0) === "."){
			if(!task){
				throw new Error("Cannot resolve relative paramter without task reference!");
			}
			parameterKey = task.getScope() + parameterKey;
		}
		
		var keyParts = parameterKey.split('.'),
			pointer = this,
			i=0;
		
		while(i < keyParts.length){
			var keyPart = keyParts[i];
			
			if(i === keyParts.length - 1){
				if(pointer[keyPart] && ("function" === typeof pointer[keyPart])){
					//Value already exists, but its a function
					throw new Error("Cannot override parameter: '" + keyPart + "' is a function.");
				}
				//Set (or override) value
				pointer[keyPart] = parameterValue;
				
				return true;
			}
			else if(!(keyPart in pointer)){
				//Create new empty object
				//TODO if pointer[keypart] is a string we will land here too and override it!
				pointer[keyPart] = {};
			}
			
			var prevPointer = pointer;
			pointer = pointer[keyPart];
			
			if(null === pointer){
				throw new Error("Cannot write parameter: '" + keyPart + "' is null.");
			}
			else if(this._isExpression(pointer)){
				prevPointer[keyPart] = this._evalExpression(task, pointer);
				pointer = prevPointer[keyPart];
			}
			
			if("object" !== typeof pointer){
				throw new Error("Cannot write parameter: '" + keyPart + "' is not an object.");
			}
			
			i++;
			
		}
		
		return false;
	};
	
	ActionContextProto["do"] = function(){
		
	};
	
	/*
	 * 
	 * ------------------------------------------------
	 * ------------------------------------------------
	 * 
	 */
	
	/**
	* Apply functions
	* @deprecated
	* @private
	*/
	var _applyFunctions = function(_this, parameterKey){
		var paramFunctions = _this._getParameter(parameterKey);

		if(paramFunctions){ //Expected array
			jQuery.sap.log.warning("Usage of context functions is deprecated and will be dropped.");
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
	
	/**
	* @Protected
	* @deprecated
	*/
	ActionContextProto._process = function(taskScope){
		_applyFunctions(this, taskScope + "." + ActionContext.PREFIX + ActionContext.PARAM_FUNCTIONS);
	};
	
	/**
	 * @deprecated
	 */
	ActionContextProto._getParameter = function(parameterKey, task, defaultValue){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._getParameter is deprecated. Use .get instead.");
		
		return this.get(task, parameterKey, defaultValue);
	}
	
	/**
	 * @deprecated
	 */
	ActionContextProto._setParameter = function(parameterKey, parameterValue, task){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._setParameter is deprecated. Use .set instead.");
		this.set(task, parameterKey, parameterValue);
	};
	
	/**
	* @Protected
	* FIXME
	* @deprecated
	*/
	ActionContextProto._deleteParameter = function(parameterKey){
			jQuery.sap.log.warning("ui5strap.ActionContext.prototype._deleteParameter is deprecated and will be dropped.");
			delete this.parameters[parameterKey];

			return this;
	};

	/**
	* @Protected
	* @deprecated
	*/
	ActionContextProto._copyParameter = function(parameterKeySrc, parameterKeyTgt){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._copyParameter is deprecated and will be dropped.");
		var paramSrcValue = this._getParameter(parameterKeySrc);
		if(null !== paramSrcValue){
			this._setParameter(parameterKeyTgt, paramSrcValue);
		}

		return this;
	};

	/**
	* @Protected
	* @deprecated
	* FIXME
	*/
	ActionContextProto._moveParameter = function(parameterKeySrc, parameterKeyTgt){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._moveParameter is deprecated and will be dropped.");
		this._copyParameter(parameterKeySrc, parameterKeyTgt);
		this._deleteParameter(parameterKeySrc);

		return this;
	};

}());