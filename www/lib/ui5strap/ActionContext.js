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
	
	//Action Name
	ActionContext.PARAM_ACTION = 'action';
	
	//AM Modules
	ActionContext.PARAM_MODULES = 'modules';
	ActionContext.PARAM_TASKS = 'TASKS';
	ActionContext.PARAM_MODULE = 'MODULE';
	
	//Action Events
	ActionContext.PARAM_EVENTS = 'events';
	
	//Action Functions
	ActionContext.PARAM_FUNCTIONS = 'functions';
	
	ActionContext.WORKPOOL = "parameters";
	
	var _tools = {
		"bool" : {
	 		"not" : function(value){
				return !value;
			}
		},
		"lang" : {
			"do" : function(){
				return;
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
		_this.parameters = jQuery.extend(true, {}, _this.defaultParameters);
			
		//Pool Alias
		_this.action = _this.parameters;
		
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
	
	/**
	* @Protected
	*/
	ActionContextProto._process = function(taskScope){
		_applyFunctions(this, taskScope + "." + ActionContext.PREFIX + ActionContext.PARAM_FUNCTIONS);
	};

	/**
	 * @Private
	 */
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
	
	/**
	* Gets and evaluates a context parameter.
	* 
	* @Protected
	*/
	ActionContextProto._getParameter = function(parameterKey, parameterScope, defaultValue){
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
		
		if(this._loopDir[kPart]){
			throw new Error("Cannot access " + kPart + ": is locked by another process.");
		}
		this._loopDir[kPart] = true;
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
				var pointerType = typeof pointer;
				if("function" === pointerType){
					if(i === keyParts.length - 1){
						jQuery.sap.log.info("Executing " + kPart + " with arguments " + fPart);
						pointer = _callParamFunction(this, prevPointer, pointer, fPart, parameterScope);
						break;
					}
					else{
						throw new Error("Cannot access '" + keyPart + "' in " + parameterKey + ": is a function.");
					}
				}
				else if(("string" === pointerType) && pointer.substr(0, 3) === "&=>"){
					prevPointer[keyPart] = this._getParameter(pointer.substring(3).trim(), parameterScope);
				    pointer = prevPointer[keyPart];
				}
				i++;
			}
			else{
				break;
			}
		}
		
		if(!pointer && defaultValue){
			pointer = defaultValue;
			if(("string" === typeof pointer) && pointer.substr(0, 3) === "&=>"){
				pointer = this._getParameter(pointer.substring(3).trim(), parameterScope);
			}
		}
		
		this._loopDir[kPart] = false;
		
		return pointer;
	};

	/**
	* @Protected
	*/
	ActionContextProto._setParameter = function(parameterKey, parameterValue, parameterScope){
		if(-1 === parameterKey.indexOf('.')){
			throw new Error("Cannot get parameter: no root node provided.");
		}
		if(parameterKey.charAt(0) === "."){
			if(!parameterScope){
				throw new Error("Cannot resolve relative paramter without scope!");
			}
			parameterKey = parameterScope + parameterKey;
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
	};

	/**
	* @Protected
	* FIXME
	*/
	ActionContextProto._deleteParameter = function(parameterKey){
			delete this.parameters[parameterKey];

			return this;
	};

	/**
	* @Protected
	*/
	ActionContextProto._copyParameter = function(parameterKeySrc, parameterKeyTgt){
		var paramSrcValue = this._getParameter(parameterKeySrc);
		if(null !== paramSrcValue){
			this._setParameter(parameterKeyTgt, paramSrcValue);
		}

		return this;
	};

	/**
	* @Protected
	* FIXME
	*/
	ActionContextProto._moveParameter = function(parameterKeySrc, parameterKeyTgt){
		this._copyParameter(parameterKeySrc, parameterKeyTgt);
		this._deleteParameter(parameterKeySrc);

		return this;
	};

	/**
	* Returns String representation of this context.
	* 
	* @Public
	*/
	ActionContextProto.toString = function(){
		return '[ACTION#' + this._actionNumber + ']';
	};

}());