/*
 * 
 * a__.ActionContext
 *
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/a__
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */
 
(function a__ActionContext(){

	var jQuerySap = jQuery.sap;

	jQuerySap.declare('a__.ActionContext');
	jQuerySap.require('a__.ActionModule');

	var ActionModule = a__.ActionModule;

	/*
	* Constructor for an action context
	* @Constructor
	*/ 
	var ActionContext = function(action){
		_init(this, action);
	},
	ActionContextProto = ActionContext.prototype;

	a__.ActionContext = ActionContext;

	/*
	* Init context log
	* @Private
	*/
	var _initLog = function(_this){
		var context = _this;
		_this._log = {
			debug : function (message) {
				context.app.log.debug(context + ' ' + message);
			},

			warning : function (message) {
				context.app.log.warning(context + ' ' + message);
			},

			error : function (message) {
				context.app.log.error(context + ' ' + message);
			},

			info : function (message) {
				context.app.log.info(context + ' ' + message);
			},

			fatal : function (message) {
				context.app.log.fatal(context + ' ' + message);
			}
		};
	};

	/*
	* @Private
	*/
	var _init = function(_this, action){
		if(!("app" in action)){
			throw new Error('App reference required!')
		}

		_this.app = action.app;
		
		if("parameters" in action){

			if(typeof action.parameters !== 'object'){
					throw new Error('Parameters must be an object');
			}

			_this.DEFAULT = jQuery.extend(true, {}, action.parameters);
		}
		
		if("oEvent" in action){
			_this.oEvent = action.oEvent;
		}

		if("uEvent" in action){
			_this.uEvent = action.uEvent;
		}

		if("controller" in action){
			_this.controller = action.controller;
		}

		_this.localStorage = localStorage ? localStorage : {};
		_this.sessionStorage = sessionStorage ? sessionStorage : {};
		
		//_this.window = window;
		//_this.document = document;
		
		ActionContext.ACTION_NO ++;

		_this._actionNo = ActionContext.ACTION_NO;

		_this._setId('ANONYMOUS');

		_this._callStack = [];

		_initLog(_this);
	
	};

	ActionContext.ACTION_NO = 0;

	/*
	* Creates an action parameter based on the prefix for actions
	* @Static
	*/
	ActionContext.createActionParam = function (parameterKey){
		return ActionModule.ACTION_PREFIX + parameterKey;
	};

	

	/*
	* Set context id
	* @Protected
	*/
	ActionContextProto._setId = function(actionGroupId){
		this[ActionModule.ACTION_PREFIX + 'id'] = actionGroupId;
	};	

	/*
	* Get context id
	* @Protected
	*/
	ActionContextProto._getId = function(actionGroupId){
		return this[ActionModule.ACTION_PREFIX + 'id'];
	};	

	/*
	* Gets a context parameter by key
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
	* Fetch additional data from a dom node and from the oEvent context
	* @Protected
	*/
	ActionContextProto._fetch = function(parameterKey){
			jQuery.sap.log.debug("F ActionContext::_fetch ('" + parameterKey + "')");

			var selector = this._getParameter(parameterKey + '.' + ActionModule.ACTION_PREFIX + 'selector');
			//read action parameters from dom node
			if(null !== selector){
				var selectors = ui5strap.Utils.parseIContent(selector);
				if(typeof selectors === 'string'){
					selectors = [selectors];
				}
				var selectorsLength = selectors.length;
				
				if(!("DOM" in this)){
					this.DOM = {};
				}
				

				for ( var i = 0; i < selectorsLength; i++ ){
					var selector = selectors[i];
					this.DOM[selector] = jQuery(selector).attr();
				}
			}

			var actionContext = this._getParameter(parameterKey + '.' + ActionModule.ACTION_PREFIX + 'context');
			if(null !== actionContext){
				if("OEVENT" in this){
					var eventParameters = this.OEVENT,
						eventParametersKeys = Object.keys(eventParameters),
						eventParametersKeysLength = eventParametersKeys.length;
					

					for( var i = 0; i < eventParametersKeysLength; i++ ){
						var paramKey = eventParametersKeys[i],
							eventParameterValue = eventParameters [paramKey];
							
							if(eventParameterValue instanceof sap.ui.core.Control){
								var context = eventParameterValue.getBindingContext(actionContext);
								if( typeof context !== 'undefined' ){
									var model = context.getModel();
									if(null !== model){
										var path = context.getPath(); 
										//console.log('P', path);

										if(!("CONTEXT" in this)){
											this.CONTEXT = {};
										}

										this.CONTEXT[actionContext] = {
												"model" : model,
												"path" : path,
												"data" : model.getProperty(path)
										};

									}
								}
								else{
									this._log.error('Invalid context: ' + actionContext);
								}
							}
					}
					
				}
			}
	};	

	/*
	* 
	* Executes an a__.Action instance within this context.
	* @Protected
	*/
	ActionContextProto._run = function(instanceDef){
		instanceDef.index = this._callStack.length;
		this._callStack.push(instanceDef);

		var instanceDefSrc = instanceDef["src"],
			oActionModule = ui5strap.Utils.getObject(instanceDefSrc),
			oAction = new oActionModule();
					
		if(!(oAction instanceof ActionModule)){
			throw new Error("Error in action '" + this + "':  '" + instanceDefSrc +  "' must be an instance of a__.Action!");
		}

		oAction.init(this, instanceDef).execute();
	};


	/*
	* Run parameter functions
	* (usually taken from parameter a__functions)
	* @Protected
	*/
	ActionContextProto._functions = function(parameterKey){
		jQuery.sap.log.debug("F ActionContext::_functions ('" + parameterKey + "')");
		var paramFunctions = this._getParameter(parameterKey),
			availableFunctions = a__.ActionFunctions;

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
		return '[' + this._getId() + '#' + this._actionNo + ']';
	};

}());