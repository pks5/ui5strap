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

	//---

	ActionContext.PREFIX = 'a_';
	
	/*
	* Reserved action attributes
	* @static
	*/
	//AM Modules
	ActionContext.PARAM_MODULE = 'modules';
	
	//Binding Context
	ActionContext.PARAM_BINDING_CONTEXT = 'context';
	
	//DOM Selector
	//@deprecated
	ActionContext.PARAM_DOM_SELECTOR = 'selector';
	
	//Action Events
	ActionContext.PARAM_ACTION_EVENTS = 'events';
	
	//Action Functions
	ActionContext.PARAM_FUNCTIONS = 'functions';

	//---

	

	/*
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

	/*
	* @Private
	*/
	var _init = function(_this, action){
		
		//App Reference
		if(!action.app){
			throw new Error('App reference required!')
		}
		_this.app = action.app;
		
		//Default Parameters
		if(action.parameters){

			if(typeof action.parameters !== 'object'){
					throw new Error('Parameters must be an object');
			}

			_this.DEFAULT = jQuery.extend(true, {}, action.parameters);
		}
		
		//OpenUI5 Standard Event Object (e.g. ontap)
		if(action.oEvent){
			_this.oEvent = action.oEvent;
		}

		//OpenUI5 Standard Controller
		if(action.controller){
			//Store reference of controller
			_this.controller = action.controller;

			//Make viewData available
			_this.viewData = action.controller.getView().getViewData();
		}

		//Custom Data of any kind
		if(action.data){
			_this.data = action.data;
		}

		//Event object from custom events (e.g. onMessage)
		if(action.orgEvent){
			_this.orgEvent = action.orgEvent;
		}

		//Local Storage && Session Storage
		_this.localStorage = localStorage ? localStorage : {};
		_this.sessionStorage = sessionStorage ? sessionStorage : {};
		
		//_this.window = window;
		//_this.document = document;
		
		//NO
		ActionContext.NUMBER ++;
		_this._actionNo = ActionContext.NUMBER;

		_this._actionName = 'ANONYMOUS';

		_this._callStack = [];

		_initLog(_this);
	
	};

	/*
	* Creates an action parameter based on the prefix for actions
	* @Static
	*/
	ActionContext.parameterKey = function (parameterKey, prefix){
		var actionParam = ActionContext.PREFIX + parameterKey;
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
				var keyParts = parameterKey.split('.');
				var pointer = this;
				var i=0;
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
				var keyParts = parameterKey.split('.');
				var pointer = this;
				var i=0;
				while(i < keyParts.length){
					if(!(keyParts[i] in pointer) && (i < keyParts.length - 1)){
						pointer[keyParts[i]] = {};
					}	

					if(i === keyParts.length - 1){
						 pointer[keyParts[i]] = parameterValue;
					}
					
					pointer = pointer[keyParts[i]];
						i++;
					
				}
				return this;
			}	

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
	* Fetch additional data from a dom node and from the oEvent binding context
	* @Protected
	*/
	ActionContextProto._fetch = function(parameterKey){
			jQuery.sap.log.debug("F ActionContext::_fetch ('" + parameterKey + "')");

			//DOM Selector
			//@deprecated
			var domsel = this._getParameter(ActionContext.parameterKey(ActionContext.PARAM_DOM_SELECTOR, parameterKey));
			//read action parameters from dom node
			if(null !== domsel){
				
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
			var bindingContextPath = this._getParameter(ActionContext.parameterKey(ActionContext.PARAM_BINDING_CONTEXT, parameterKey));
			if(bindingContextPath){ //string expected
				if("OEVENT" in this){
					var eventParameters = this.OEVENT,
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
			}
	};	

	/*
	* 
	* Executes an AM Module (ui5strap.ActionModule)
	* @Protected
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
			throw new Error("Error in action '" + this + "':  '" + actionModuleName +  "' must be an instance of ui5strap.Action!");
		}

		oActionModule.init(this, instanceDef).execute();
	};


	/*
	* Run parameter functions
	* @protected
	*/
	ActionContextProto._functions = function(parameterKey){
		jQuery.sap.log.debug("F ActionContext::_functions ('" + parameterKey + "')");
		var paramFunctions = this._getParameter(parameterKey),
			availableFunctions = ui5strap.ActionFunctions;

		if(null !== paramFunctions){
			var paramFunctionsLength = paramFunctions.length;
			jQuery.sap.log.debug("Found " + paramFunctionsLength + " parameter functions.");
				
			for( var i = 0; i < paramFunctionsLength; i++ ){
				var functionDef = paramFunctions[i],
					functionName = functionDef['function'];

				if(functionName in availableFunctions){
					this._log.debug("Calling parameter function '" + functionName + "'");
					var funcResult = availableFunctions[functionName].call(this, functionDef.args);
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
	* @Public
	*/
	ActionContextProto.toString = function(){
		return '[' + this._actionName + '#' + this._actionNo + ']';
	};

}());