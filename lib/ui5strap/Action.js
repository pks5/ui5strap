/*
 * 
 * UI5Strap
 *
 * ui5strap.Action
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

	jQuerySap.declare('ui5strap.Action');

	jQuerySap.require("ui5strap.library");
	jQuerySap.require("ui5strap.ActionContext");
	jQuerySap.require('ui5strap.ActionModule');

	ui5strap.Object.extend("ui5strap.Action");

	var Action = ui5strap.Action,
		ActionContext = ui5strap.ActionContext,
		ActionModule = ui5strap.ActionModule;

	Action.cache = {};

	/*
	* @Private
	* @Static
	*/
	var _getActionInstanceDef = function (actionModuleName){
		var instanceDef = {};

		if(typeof actionModuleName === 'string'){
			//If string, the namespace is taken from the protoype
			instanceDef.module = actionModuleName;
		}	
		else if(typeof actionModuleName === 'object'){
			//Action Module def is an object, it can contain a custom namespace 
			instanceDef = actionModuleName;
		}
		else{
			//Action Module def is invalid
			throw new Error('Invalid action module: ' + actionModuleName);
		}

		return instanceDef;
	};

	/*
	* Merge the parameters from custom data into the existing computed parameters
	* @Private
	*/
	var _mergeParameters = function(context){
			context._log.debug("Merging action parameters ...");
			
			context.parameters = {};

			for (var i = context.FILES.length-1; i >= 0 ; i--){
				jQuery.extend(true, context.parameters, context.FILES[i]);
			}

			context.parameters = jQuery.extend(context.parameters, context.DEFAULT);
			
			//Custom Data
			if('CUSTOM_DATA' in context){
					var customData = context.CUSTOM_DATA;
					var customDataKeys = Object.keys(customData);
					var customDataKeysLength = customDataKeys.length;
					
					for ( var i = 0; i < customDataKeysLength; i++ ){
							var customDataKey = customDataKeys[i],
								iContent = ui5strap.Utils.parseIContent(customData[customDataKey]),
								iContentType = typeof iContent;
							if(iContentType === 'string'){
								//iContent is a string, just set or replace the value in the parameter pool
								context.parameters[customDataKey] = iContent;
							}
							else if(iContentType === 'object'){ 
								//iContent is an object, if parameter already exists in pool, deep copy, otherwise just set
								if(customDataKey in context.parameters){
									jQuery.extend(true, context.parameters[customDataKey], iContent);
								}
								else{
									context.parameters[customDataKey] = iContent;
								}

							} 
					}
				

			}

			//Load additional data from DOM nodes and Control Context
			context._fetch("parameters");

			//Apply global parameter functions
			context._functions(context.parameterKey(ActionContext.PARAM_FUNCTIONS, "parameters"));
	};

	/*
	* Fetch parameters from oEvent
	* @Private
	*/
	var _populateFromEvents = function(context){
		context._log.debug("Fetching action parameters ...");
		
		//Standard SAPUI5 Event
		if("oEvent" in context){ 

			//Control that triggered the oEvent
			var oEventSource = context.oEvent.getSource();
			if(oEventSource){ //Expected ui5strap.Control
				var customData = oEventSource.data();
				if(customData){ //Expected object
					context.CUSTOM_DATA = customData;
				}

				//Source control
				//@deprecated
				context.OEVENT_SOURCE = oEventSource;

				context.oEventSource = oEventSource;
			}

			//Event parameters (e.g. from a list selection)
			var eventParameters = context.oEvent.getParameters();
			if(null !== eventParameters){
				//Event Parameters
				//@deprecated
				context.OEVENT = eventParameters;
			}
		}

		_mergeParameters(context);
	};

	/*
	* Load an action from a json file
	* @Private
	*/
	var _loadActionFromFile = function(context, actionName, callback){
		context._log.debug("Populating from file '" + actionName + "'...");
					
		var actionCache = Action.cache;
		if(actionName in actionCache){
			callback && callback(actionCache[actionName]);
			
			return;
		}

		jQuery.ajax({
			"dataType": "json",
			"url": jQuery.sap.getModulePath(actionName) + '.action.json',
			"success": function(data){
				context._log.debug("Loaded Action Group '" + actionName + "' from '" + context.url + "'" );

				actionCache[actionName] = data;
				
				callback && callback(data);
			},
			"error" : function(data){
				throw new Error('Invalid action group: "' + actionName + '"');
			}
		});
	};

	/*
	* Executes a list of AM Modules
	* @Private
	*/
	var _executeModules = function(context, actionModulesList){
		if(typeof actionModulesList === 'string'){
			actionModulesList = [actionModulesList];
		}

		var jsModules = [],
			instanceDefs = [],
			actionModulesListLength = actionModulesList.length;
				
		for ( var i = 0; i < actionModulesListLength; i++ ) { 
			var actionInstanceDef = _getActionInstanceDef(actionModulesList[i]);
			instanceDefs.push(actionInstanceDef);
			jsModules.push(actionInstanceDef.module);
		}

		//Load Action Modules
		ui5strap.require(jsModules, function require_complete(){
			
			var instanceDefsLength = instanceDefs.length;
			for ( var i = 0; i < instanceDefsLength; i++ ) { 
				var instanceDef = instanceDefs[i];
				context._run(instanceDef);
			}
		
		});
	};

	/*
	* Executes the action modules that are defined in the class parameter of the current context
	* @Private
	*/
	var _execute = function(context){
		var actionModuleNameParameter = context.parameterKey(ActionContext.PARAM_MODULES);
		var actionModuleName = context._getParameter(actionModuleNameParameter);
		if(actionModuleName){ //Expected string
			context._deleteParameter(actionModuleNameParameter);
			
			context._log.debug("START ACTION '" + context + "' ...");

			_executeModules(context, ui5strap.Utils.parseIContent(actionModuleName));
		}
		else{   //console.log(context);
				throw new Error("Invalid action '" + context + "': '" + actionModuleNameParameter + "' attribute is missing!");
		}
	};

	var _loadActionFileStack = function(context, actionName, callback){
		if(actionName){ //Expected string or object
			var actionNamesList = ui5strap.Utils.parseIContent(actionName); 
			if(typeof actionNamesList === 'object'){

				//If you have more than one event type in the control, you have to map the actionNames
				if(!(action.oEvent.sId in actionNamesList)){
					throw new Error("No '" + actionNameParameter + "' defined for event '" + action.oEvent.sId + "'!");
				}
				actionName = actionNamesList[action.oEvent.sId];
				
			}
			
			context._log.debug("Loading action from '" + actionName + "'...");
			
			_loadActionFromFile(context, actionName, function _loadActionFromFile_complete(actionJSON){

				//Version check
				actionJSON.__version = actionJSON.__version || "1.0";
				if(context.parameters && context.parameters.__version && context.parameters.__version !== actionJSON.__version){
					throw new Error('Cannot load action "' + actionName + '": Bad version: ' + actionJSON.__version + " (expected: " + context.parameters.__version + ")");
				}
				//Add to context
				context.FILES.push(actionJSON);

				_loadActionFileStack(context, actionJSON[context.parameterKey(ActionContext.PARAM_ACTION)], callback);
			});
			
		}
		else{
			_mergeParameters(context);

			callback && callback();
		}
	};

	/*
	* Run events
	* @public
	*
	*/
	Action.fireEvents = function(context, parameterKey, eventName){
		var paramEvents = context._getParameter(context.parameterKey(ActionContext.PARAM_EVENTS, parameterKey));

		if(null !== paramEvents){
			if(eventName in paramEvents){
				context._log.debug("Triggering event actions '" + eventName + "'...");

				//Execute one or multiple AM modules that are defined in the event
				_executeModules(context, paramEvents[eventName]);
			}
			else{
				//jQuery.sap.log.debug("Could not trigger event: '" + eventName + "'...");
			}
		}	
	};

	/*
	* Runs an action
	* 
	* @Static
	*/
	Action.run = function(action){
		jQuerySap.log.debug("F Action::run");

		var actionName = null;
		if(action.parameters && typeof action.parameters === 'string'){
			actionName = action.parameters;
			delete action.parameters;
		}

		var context = new ActionContext(action);

		if(!actionName){
			_populateFromEvents(context);
			
			var	actionNameParameter = context.parameterKey(ActionContext.PARAM_ACTION);
			actionName = context._getParameter(actionNameParameter);
		}

		_loadActionFileStack(context, actionName, function _loadActionFileStack_complete(){
			_execute(context);
		});
	};

	var _createActionEventHandler = function(controllerImpl, eventName){
		var eventFunctionName = 'on' + jQuery.sap.charToUpperCase(eventName, 0);
		var oldOnPageShow = eventFunctionName in controllerImpl ? controllerImpl[eventFunctionName] : null;

		controllerImpl[eventFunctionName] = function(customEventData){ 
			var _this = this,
				view = this.getView(),
				app = this.getApp();
				
			if(app){
				var updateEvents = app.config.getEvents('controller', eventName, view.getViewName()),
					updateEventsLength = updateEvents.length,
					viewId = view.getId();

				for(var i = 0; i < updateEventsLength; i++){
				 	var actionName = updateEvents[i];
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: '" + eventName + "') ...");
					ui5strap.Action.run({
						"parameters" : actionName, 
						"controller" : _this,
						"app" : app,
						"data" : customEventData
					});
				}
			}
			
			if(null !== oldOnPageShow){
				oldOnPageShow.call(this, customEventData);
			}
		};
	};

	/*
	* @Static
	*/
	Action.blessController = function(controllerImpl){

		//Add getApp method if not already exists
		if(!controllerImpl.getApp){
	          controllerImpl.getApp = function(){
	              var viewData = this.getView().getViewData();
	            
	              if(!viewData || !viewData.__ui5strap || !viewData.__ui5strap.app){
	                throw new Error('Cannot determine app: no reference in viewData!');
	              }
	              
	              return viewData.__ui5strap.app;
	          }
      	}

        //Old action event handler
        //@deprecated
		var eventHandler = "a_run";
		
		controllerImpl[eventHandler] = function(oEvent){
			var app = this.getView().getApp();

			if(app){
				Action.run({
					"oEvent" : oEvent, 
					"controller" : this,
					"app" : app,
					"parameters" : {
						"__version" : "1.0"
					}
				});
			}
			else{
				throw new Error('Cannot run action: no app reference present in view data!');
			}
		};

		//New action event handler
		var eventHandlerNew = "__execute";
		
		controllerImpl[eventHandlerNew] = function(oEvent){
			var app = this.getApp();

			if(app){
				Action.run({
					"oEvent" : oEvent, 
					"controller" : this,
					"app" : app,
					"parameters" : {
						"__version" : "2.0"
					}
				});
			}
			else{
				throw new Error('Cannot run action: no app reference present in view data!');
			}
		};

		var oldOnInit = controllerImpl.onInit;

		controllerImpl.onInit = function(oEvent){ 
			var _this = this,
				view = this.getView(),
				app = this.getApp();

			if(app){
				//TODO find out if view.sViewName is reliable
				var initEvents = app.config.getEvents('controller', 'init', view.sViewName),
					initEventsLength = initEvents.length,
					viewId = view.getId();

				for(var i = 0; i < initEventsLength; i++){
					var actionName = initEvents[i];
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: 'onInit') ...");
					Action.run({
						"parameters" : actionName, 
						"oEvent" : oEvent,
						"controller" : _this,
						"app" : app  
					});
				} 
			}

			//Call old onInit function
			if(oldOnInit){
				oldOnInit.call(this, oEvent);
			}
		};

		//Update
		_createActionEventHandler(controllerImpl, 'update');

		//PageHide
		_createActionEventHandler(controllerImpl, 'pageHide');
		
		//PageHidden
		_createActionEventHandler(controllerImpl, 'pageHidden');
		
		//PageShow
		_createActionEventHandler(controllerImpl, 'pageShow');
		
		//PageShown
		_createActionEventHandler(controllerImpl, 'pageShown');
		
	};

}());