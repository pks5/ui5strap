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

sap.ui.define(['./library', './ActionFunctions'], function(library, ActionFunctions){

	/*
	* @constructor
	*/ 
	var ActionContext = ui5strap.Object.extend('ui5strap.ActionContext', {
		"constructor" : function(action){
			_init(this, action);
		}
	}),
	ActionContextProto = ActionContext.prototype;

	ActionContext.NUMBER = 0;

	ActionContext.PREFIX = "__";
	ActionContext.RESOLVE = "=";
	
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
		
		//Default parameters
		_this.defaultParameters = action.parameters;
			
		//Pool
		_this.action = _buildPool(_this.defaultParameters, [], _this);
		
		//Old Pool
		//@deprecated
		_this.parameters = _this.action;
		
		_this.event = {};
		
		//Event Source
		if(action.eventSource){
			//@deprecated
			_this.eventSource = action.eventSource;
			
			_this.event.source = action.eventSource;
		}
		
		//Event Parameters
		if(action.eventParameters){
			//@deprecated
			_this.eventParameters = action.eventParameters;
		
			_this.event.parameters = action.eventParameters;
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
		_this.core = sap.ui.getCore();
		_this.jQuery = jQuery;
		_this.jQuerySap = jQuery.sap;
		
		//Number
		ActionContext.NUMBER ++;
		_this._name = "[" + (action.name || "ACTION#" + ActionContext.NUMBER) + "]";

		//Call stack
		_this._callStack = [];
		
		_this._loopDir = {};

		//Init Log
		_initLog(_this);
		
		if(_this.action.DEBUG && console){
			console.log(_this._name, _this);
		}
	};
	
	/**
	* Returns String representation of this context.
	* 
	* @Public
	*/
	ActionContextProto.toString = function(){
		return this._name;
	};
	
	/*
	 * START build pool
	 */
	
	/**
	 * @Constructor
	 * @Private
	 */
	var _ActionExpression = function(expression){
		this._expression = expression;
		
		this.evaluate = function(context, task){
			return context.get(task, this._expression);
		};
	};
	
	/**
	 * @Constructor
	 * @Private
	 */
	var _ActionExpressionResolveObject = function(parent, key, pointer, path){
		this._parentPointer = parent;
		this._viewName = key;
		
		var newObject = new _ActionParameterObject,
			keys = Object.keys(pointer),
			keysLength = keys.length;
		for(var i = 0; i < keysLength; i++){
			var newPath = path.slice(0);
			newPath.push(keys[i]);
		
			newObject[keys[i]] = _buildPool(pointer[keys[i]], newPath, pointer);
		}
		
		this._controlDef = newObject;
	};
	
	_ActionExpressionResolveObject.prototype = new _ActionExpression();
	
	_ActionExpressionResolveObject.prototype.evaluate = function(context, task){
		return context.resolve(task, this._controlDef);
	};
	
	
	/**
	 * @Constructor
	 * @Private
	 */
	var _ActionExpressionFindControl = function(parent, key, pointer, path){
		this._parentPointer = parent;
		this._controlName = key;
		
		var newObject = new _ActionParameterObject,
			keys = Object.keys(pointer),
			keysLength = keys.length;
		for(var i = 0; i < keysLength; i++){
			var newPath = path.slice(0);
			newPath.push(keys[i]);
		
			newObject[keys[i]] = _buildPool(pointer[keys[i]], newPath, pointer);
		}
		
		this._controlDef = newObject;
	};
	
	_ActionExpressionFindControl.prototype = new _ActionExpression();
	
	/**
	 * @Public
	 */
	_ActionExpressionFindControl.prototype.evaluate = function(context, task){
		var controlOrDef = this._controlDef;
		if(typeof controlOrDef === "object"){
			if(!(controlOrDef instanceof ui5strap.Control)){
				var mode = context.resolve(task, controlOrDef.SOURCE, true),
					moduleName = context.resolve(task, controlOrDef.TYPE, true);
				
				if(!mode || !moduleName){
					throw new Error("Please provide both 'mode' and 'type' for Control '" + this._controlName + "'");
				}
				
				jQuery.sap.require(moduleName);
				var Constructor = jQuery.sap.getObject(moduleName);
				
				if(!Constructor){
					throw new Error("'" + moduleName + "' is not a valid Control!");
				}
				
				if("New" === mode){
					var moduleSettings = context.resolve(task, controlOrDef.SETTINGS);
					controlOrDef = new Constructor(moduleSettings);
				}
				else if("Event" === mode){
					var parameter = context.resolve(task, controlOrDef.parameter);
					if(parameter){
						controlOrDef = context.eventParameters[parameter];
					}
					else{
						controlOrDef = context.eventSource;
					}
				}
				else if("Root" === mode){
					controlOrDef = context.app.getRootControl();
				}
				else if("View" === mode){
					var controlId = context.resolve(task, controlOrDef.CONTROL_ID, true),
						viewId = context.resolve(task, controlOrDef.VIEW_ID);
					
					if(controlId){
						if(!viewId){
							if(context.view){
								viewId = context.view.getId();
							}
							else{
								throw new Error("Please provide a viewId to select Control '" + this._controlName + "'!");
							}
						}
						controlOrDef = context.app.getControl(controlId, viewId);
					}
					else{
						if(context.view){
							controlOrDef = context.view;
						}
						else{
							throw new Error("Please provide a controlId to select Control '" + this._controlName + "'!");
						}
					}
				}
				else{
					throw new Error("Please provide a mode for Control '" + this._controlName + "'!" );
					
				}
				
				if(!controlOrDef){
					throw new Error("Cannot find control '" + this._controlName + "'!");
				}
				else if(!(controlOrDef instanceof Constructor)){
					throw new Error("Control '" + this._controlName + "' must be an instance of '" + moduleName + "', '" + controlOrDef + "' given!" );
				}
				
				return controlOrDef;
			}
		}
		else{
			throw new Error("CONTROLS must contain control instances only.");
		}
	};
	
	var _ActionParameterObject = function(){
		
	};
	
	/**
	 * @Static
	 * @Private
	 */
	var _buildPool = function(pointer, path, parent){
		var pointerType = typeof pointer;
		
		if(pointerType === "string"){
			var firstChar = pointer.charAt(0);
			if(firstChar === ActionContext.RESOLVE){
				return new _ActionExpression(pointer.substring(1).trim());
			}
			else if(firstChar === "\\" && pointer.charAt(1) === ActionContext.RESOLVE){
				return pointer.substring(1);
			}
			else{
				return pointer;
			}
		}
		else if(pointerType === "function"){
			throw new Error("Action parameters must not contain functions!");
		}
		else if(pointerType === "object"){
			var isArray = jQuery.isArray(pointer);
			
			if(isArray){
				//Array
				var newArray = [],
					arrayLength = pointer.length;
				for(var i = 0; i < arrayLength; i++){
					var newPath = path.slice(0);
					newPath.push(i);
					newArray[i] = _buildPool(pointer[i], newPath, pointer);
				}
				newArray._isActionArray = true;
				return newArray;
			}
			else{
				if(path.length === 3){
					var rootKey = path[1];
					if(rootKey === "CONTROLS"){
						return new _ActionExpressionFindControl(parent, path[2], pointer, path);
					}
					else if(rootKey === "VIEWS"){
						return new _ActionExpressionResolveObject(parent, path[2], pointer, path);
					}
				}
				
				//Object
				var newObject = new _ActionParameterObject(),
					keys = Object.keys(pointer),
					keysLength = keys.length;
				for(var i = 0; i < keysLength; i++){
					var newPath = path.slice(0);
					newPath.push(keys[i]);
					
					newObject[keys[i]] = _buildPool(pointer[keys[i]], newPath, pointer);
				}
				
				return newObject;
			}
		}
		else{
			return pointer;
		}
	};
	
	/*
	 * END build pool
	 */
	
	/**
	 * @Public
	 * FIXME
	 */
	ActionContextProto.resolve = function(task, pointer, onlyString){
		if(pointer instanceof _ActionExpression){
			return pointer.evaluate(this, task);
		}
		else if(!onlyString && ("object" === typeof pointer)){
			if(pointer._isActionArray){
				for(var i = 0; i < pointer.length; i++){
					pointer[i] = this.resolve(task, pointer[i], true);
				}
			}
			else if(pointer instanceof _ActionParameterObject){
				var objectKeys = Object.keys(pointer),
					objectKeysLength = objectKeys.length;
			
				for(var i=0; i < objectKeysLength; i++){
					//Store back the value in the context
					pointer[objectKeys[i]] = this.resolve(task, pointer[objectKeys[i]], true);
				}
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
	ActionContextProto.get = function(task, parameterKey){
		if(!parameterKey){
			throw new Error("Parameter key is required for get!");
		}
		
		//Check for conditional statement
		var qPos = parameterKey.indexOf('?');
		if(-1 !== qPos){
			var dPos = parameterKey.indexOf(':');
			if(-1 === dPos){
				throw new Error("Invalid expression: " + parameterKey);
			}
			var p1 = parameterKey.substring(0, qPos).trim(),
				p2 = parameterKey.substring(qPos + 1, dPos).trim(),
				p3 = parameterKey.substring(dPos + 1).trim();
			
			return this.get(task, p1) ? this.get(task, p2) : this.get(task, p3);
		}
		
		//Extract function parameters if any.
		var fPart = null,
			kPart = parameterKey,
			c1Pos = parameterKey.indexOf('(');
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
			
			if(kPart === ''){
				//Just brackets, no funtion
				var args = fPart.split(/,/);
				for(var i = 0; i < args.length; i++){
					this.get(task, args[i].trim());
				}
				
				return;
			}
		}
		
		//Check for relative path
		if(kPart.charAt(0) === "."){
			if(!task){
				throw new Error("Cannot resolve relative paramter without task reference!");
			}
			kPart = task.getScope() + kPart;
		}
		
		if(!kPart.match(/([a-zA-Z0-9_]+\.)*[a-zA-Z0-9_]+/)){
			throw new Error("Invalid parameter key for get: " + kPart);
		}
		
		if(this._loopDir["t_" + kPart]){
			throw new Error("Cannot access " + kPart + ": is locked by another process.");
		}
		this._loopDir["t_" + kPart] = true;
		
			
		var keyParts = kPart.split('.'),
				pointer = this,
				i=0;
			
		while(i < keyParts.length){
			var keyPart = keyParts[i];
			
			if(keyPart.charAt(0) === '_'){
				//throw new Error("Cannot access protected property '" + keyPart + "'.");
			}
			
			var prevPointer = pointer;
			pointer = pointer[keyPart];
			if(pointer){
				var functionApplied = false,
					pointerType = typeof pointer;
				
				if(i === keyParts.length - 1){
					//Last path part
					
					if(null !== fPart){
						if("function" === pointerType){
							jQuery.sap.log.debug("Executing function '" + kPart + "' with arguments (" + fPart + ")");
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
							throw new Error("Cannot execute function '" + kPart + "': not a function!");
						}
					}
					
				}
				else{
					if("number" === pointerType || "boolean" === pointerType){
						//We cannot continue searching
						pointer = undefined;
						
						break;
					}
				}
				
				//Check if value contains expression
				if(pointer instanceof _ActionExpression){
					if(functionApplied){
						throw new Error("Function '" + kPart + "' must not return Action Expression!");
					}
					//Store back the value in the context
					prevPointer[keyPart] = pointer.evaluate(this, task);
				    
					pointer = prevPointer[keyPart];
				}
				
				i++;
			}
			else{
				if(i < keyParts.length - 1){
					throw new Error("'" + keyPart + "' is not defined in '" + kPart + "'");
				}
				else if(null !== fPart){
					throw new Error("Cannot execute function '" + keyPart + "': not a function!");
				}
				break;
			}
		}
		
		//console.log(kPart, fPart, pointer);
		this._loopDir["t_" + kPart] = false;
		
		return pointer;
	};
	
	/**
	 * Sets a value.
	* @Protected
	*/
	ActionContextProto.set = function(task, parameterKey, parameterValue){
		if(!parameterKey 
				|| -1 === parameterKey.indexOf('.') 
				|| -1 !== parameterKey.indexOf('(')){
			throw new Error("Invalid parameter key for set: " + parameterKey);
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
			else if(pointer instanceof _ActionExpression){
				//Store back the value in the context
				prevPointer[keyPart] = pointer.evaluate(this, task);
				
				pointer = prevPointer[keyPart];
			}
			
			if("object" !== typeof pointer){
				throw new Error("Cannot write parameter: '" + keyPart + "' is not an object.");
			}
			
			i++;
			
		}
		
		return false;
	};
	
	ActionContextProto["doaaa"] = function(task){
		
	};
	
	ActionContextProto.lang = {
			// !
			"not" : function(value){
					return !value;
			},
			
			// !!
			"notnot" : function(value){
				return !!value;
			},
			
			// ==
			"equal" : function(){
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
			},
			
			// !=
			"notEqual" : function(){
				if(arguments.length === 0){
					return false;
				}
				var cmp = arguments[0];
				for(var i = 1; i < arguments.length; i++){
					if(arguments[i] != cmp){
						return true;
					}
				}
				return false;
			},
			
			// ===
			"same" : function(){
				if(arguments.length === 0){
					return true;
				}
				var cmp = arguments[0];
				for(var i = 1; i < arguments.length; i++){
					if(arguments[i] !== cmp){
						return false;
					}
				}
				return true;
			},
			
			// !==
			"notSame" : function(){
				if(arguments.length === 0){
					return false;
				}
				var cmp = arguments[0];
				for(var i = 1; i < arguments.length; i++){
					if(arguments[i] !== cmp){
						return true;
					}
				}
				return false;
			},
			
			// >
			"greaterThan" : function(v1, v2){
				return v1 > v2;
			},
			
			// <
			"lessThan" : function(v1, v2){
				return v1 < v2;
			},
			
			// >=
			"greaterEqualThan" : function(v1, v2){
				return v1 >= v2;
			},
			
			// <=
			"lessEqualThan" : function(v1, v2){
				return v1 <= v2;
			},
			
			// &&
			"and" : function(){
				var cmp = true;
				for(var i = 1; i < arguments.length; i++){
					cmp = cmp && arguments[i];
					if(!cmp){
						break;
					}
				}
				return cmp;
			},
			
			// ||
			"or" : function(){
				var cmp = false;
				for(var i = 1; i < arguments.length; i++){
					cmp = cmp || arguments[i];
					if(cmp){
						break;
					}
				}
				return cmp;
			}
			
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
		var paramFunctions = _this.get(null, parameterKey);

		if(paramFunctions){ //Expected array
			jQuery.sap.log.warning("Usage of context functions is deprecated and will be dropped.");
			var paramFunctionsLength = paramFunctions.length,
				availableFunctions = ActionFunctions;
			jQuery.sap.log.debug("CALLING " + paramFunctionsLength + " FUNCTIONS OF " + parameterKey);
				
			for( var i = 0; i < paramFunctionsLength; i++ ){
				var functionDef = paramFunctions[i],
					functionName = functionDef['function'];

				if(availableFunctions[functionName]){
					jQuery.sap.log.debug("Calling parameter function '" + functionName + "'");
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
	ActionContextProto._process = function(parameterScope){
		_applyFunctions(this, parameterScope + "." + ActionContext.PREFIX + ActionContext.PARAM_FUNCTIONS);
	};
	
	/**
	 * @deprecated
	 */
	ActionContextProto._getParameter = function(parameterKey, task){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._getParameter is deprecated. Use .get instead.");
		
		return this.get(task, parameterKey);
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
		var paramSrcValue = this.get(null, parameterKeySrc);
		if(null !== paramSrcValue){
			this.set(null, parameterKeyTgt, paramSrcValue);
		}

		return this;
	};

	/**
	* @Protected
	* @deprecated
	*/
	ActionContextProto._moveParameter = function(parameterKeySrc, parameterKeyTgt){
		jQuery.sap.log.warning("ui5strap.ActionContext.prototype._moveParameter is deprecated and will be dropped.");
		this._copyParameter(parameterKeySrc, parameterKeyTgt);
		this._deleteParameter(parameterKeySrc);

		return this;
	};

	//Return Module Constructor
	return ActionContext;
});