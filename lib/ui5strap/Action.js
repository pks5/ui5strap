/*
 * 
 * ui5strap.Action
 *
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function ui5strapAction(){
	
	var jQuerySap = jQuery.sap;

	jQuerySap.declare('ui5strap.Action');

	jQuerySap.require("ui5strap.ActionContext");
	
	jQuerySap.require('ui5strap.ActionModule');

	sap.ui.base.Object.extend("ui5strap.Action");

	var Action = ui5strap.Action,
		ActionModule = ui5strap.ActionModule;

	Action.cache = {};

	/*
	* @Private
	* @Static
	*/
	var _getActionInstanceDef = function (actionSrcDef){
		var instanceDef = {};

		if(typeof actionSrcDef === 'string'){
			//Action module src def is a string, this means the namespace is taken from the action module constructor
			instanceDef.src = actionSrcDef;
		}	
		else if(typeof actionSrcDef === 'object'){
			//Action module src def is an object, it can contain a custom namespace 
			instanceDef = actionSrcDef;
		}
		else{
			//Action module src def is invalid
			throw new Error('Invalid action src: ' + actionSrcDef);
		}

		return instanceDef;
	};

	/*
	* Merge the parameters from custom data into the existing computed parameters
	* @Private
	*/
	var _mergeParameters = function(context){
			context._log.debug("Merging action parameters ...");
			context.parameters = jQuery.extend(true, {}, context.DEFAULT);

			//Custom Data
			if('CUSTOM_DATA' in context){
					var customData = context.CUSTOM_DATA;
					var customDataKeys = Object.keys(customData);
					var customDataKeysLength = customDataKeys.length;
					
					for ( var i = 0; i < customDataKeysLength; i++ ){
							var customDataKey = customDataKeys[i];
							var iContent = ui5strap.Utils.parseIContent(customData[customDataKey]);
							if(typeof iContent === 'string'){
								//iContent is a string, just set or replace the value in the parameter pool
								context.parameters[customDataKey] = iContent;
							}
							else{ 
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
			context._functions( 
				"parameters" 
				+ "." 
				+ ActionModule.ACTION_PREFIX 
				+ "functions"
			);
				
	};

	/*
	* Fetch parameters from uEvent and oEvent
	* @Private
	*/
	var _populateFromEvents = function(context){
			context._log.debug("Fetching action parameters ...");
			
			//Update view events (e.g. after a navigation)
			if("uEvent" in context){
				context.UEVENT = context.uEvent.parameters;
			}
			//Standard SAPUI5 Event
			else if("oEvent" in context){ 
				//Get custom data
				var oEventSource = context.oEvent.getSource();
				if(null !== oEventSource){
					var customData = oEventSource.data();
					if(null !== customData){
						context.CUSTOM_DATA = customData;
					}

					context.OEVENT_SOURCE = oEventSource;
				}

				//Event parameters (e.g. from a list selection)
				var eventParameters = context.oEvent.getParameters();
				if(null !== eventParameters){
					context.OEVENT = eventParameters;
				}
			}

			_mergeParameters(context);
	};

	/*
	* Load an action group from a json file
	* @Private
	*/
	var _populateFromFile = function(context, actionGroupSrc, callback){
		context._log.debug("Populating from file '" + actionGroupSrc + "'...");
					
		var actionGroups = Action.cache,
			actionGroupIdParamKey = ActionModule.ACTION_PREFIX + ActionModule.PARAM_ACTION_GROUP_ID;
		

		if(actionGroupSrc in actionGroups){
			var action = actionGroups[actionGroupSrc];

			context.DEFAULT = action;
			_mergeParameters(context);

			callback(action);
			
			return;
		}

		jQuery.ajax({
			"dataType": "json",
			"url": jQuery.sap.getModulePath(actionGroupSrc) + '.action.json',
			"success": function(data){
				if(actionGroupIdParamKey in data){
					throw new Error('Action group must not contain a "' + actionGroupIdParamKey + '" attribute!');
				}
				
				context._log.debug("Loaded Action Group '" + actionGroupSrc + "' from '" + context.url + "'" );

				actionGroups[actionGroupSrc] = data;
				
				context.DEFAULT = data;
				_mergeParameters(context);

				callback(data);
			},
			"error" : function(data){
				throw new Error('Invalid action group: "' + actionGroupSrc + '"');
			}
		});
	};

	/*
	* Executes a list of action modules
	* @Private
	*/
	var _executeModules = function(context, actionSources){
		if(typeof actionSources === 'string'){
			actionSources = [actionSources];
		}

		var jsModules = [],
			instanceDefs = [],
			actionSourcesLength = actionSources.length;
				
		for ( var i = 0; i < actionSourcesLength; i++ ) { 
			var actionInstanceDef = _getActionInstanceDef(actionSources[i]);
			instanceDefs.push(actionInstanceDef);
			jsModules.push(actionInstanceDef.src);
		}

		
		ui5strap.require(jsModules, function anon_loadActionModulesComplete(){
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
		var actionSrcParamKey = ActionModule.ACTION_PREFIX + ActionModule.PARAM_ACTION_CLASS;
		var actionSrc = context._getParameter(actionSrcParamKey);
		if(null !== actionSrc){
			context._deleteParameter(actionSrcParamKey);
			var actionSources = ui5strap.Utils.parseIContent(actionSrc);
				
			context._log.debug("START ACTION '" + context + "' ...");

			_executeModules(context, actionSources);
		}
		else{
				throw new Error("Invalid action '" + context + "': '" + actionSrcParamKey + "' attribute is missing!");
		}
	};

	/*
	* Run events
	* @Protected
	*
	*/
	Action.fireEvents = function(context, parameterKey, eventName){
		var paramEvents = context._getParameter(
			parameterKey
			+ "." 
			+ ActionModule.ACTION_PREFIX 
			+ ActionModule.PARAM_ACTION_EVENTS
		);

		if(null !== paramEvents){
			if(eventName in paramEvents){
				context._log.debug("Triggering event actions '" + eventName + "'...");

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
	* An action is an object of the following format:
	*
	* {
	*    "app" : liberty.App
	*    "controller" :
	*    "parameters" : {
	*		   	PREFIX + "id" : string,
	*			PREFIX + "modules" : string,
	*			PREFIX + "functions" : [],
	*			PREFIX + "context" : string,
	*			PREFIX + "selector" : string,
	*			PREFIX + "events" : {}
	*    }	
	* }
	*
	* @Static
	*/
	Action.run = function(action){
		jQuerySap.log.debug("F Action::run");
		var actionGroupIdParamKey = ActionModule.ACTION_PREFIX + ActionModule.PARAM_ACTION_GROUP_ID;

		if("parameters" in action 
			&& typeof action.parameters === 'string'){
			var actionGroupId = action.parameters;

			action.parameters = {};

			action.parameters[actionGroupIdParamKey] = actionGroupId;
			
			Action.run(action);
			
			return false;
		}

		var context = new ui5strap.ActionContext(action);

		_populateFromEvents(context);

		var actionId = context._getParameter(actionGroupIdParamKey);
		if(null !== actionId){ 
			context._log.debug("Found action group alias id '" + actionId + "'.");
			
			context._deleteParameter(actionGroupIdParamKey);
			context._setId(actionId);
			
			var actionIds = ui5strap.Utils.parseIContent(actionId),
				actionGroupId = null,
				actionIdsType = typeof actionIds; 
			
			if(actionIdsType === 'string'){
				actionGroupId = actionIds;
			}
			else if(actionIdsType === 'object'){
				//If you have more than one event type in the control, you have to map the actionGroupIds
				if(!(action.oEvent.sId in actionIds)){
					throw new Error("Error in action '" + actionId + "': No '" + actionGroupIdParamKey + "' defined for event '" + action.oEvent.sId + "'!");
				}
				actionGroupId = actionIds[action.oEvent.sId];
				
			}
			else{
				throw new Error("Error in action '" + actionId + "': Invalid '" + actionGroupIdParamKey + "' value!");
			}

			_populateFromFile(context, actionGroupId, function anon_loadActionGroupComplete(actionGroupDef){
				_execute(context);
			});
			
		}
		else{ 
			_execute(context);
		}
	};

	/*
	* @Static
	*/
	Action.blessController = function(controllerImpl){

		var eventHandler = ActionModule.ACTION_PREFIX + ActionModule.ACTION_EVENT_NAME;
		
		controllerImpl[eventHandler] = function(oEvent){
			var viewData = this.getView().getViewData();

			if(viewData && 'app' in viewData){
				Action.run({
					"oEvent" : oEvent, 
					"controller" : this,
					"app" : viewData.app
				});
			}
			else{
				throw new Error('Cannot run action: no app reference present in view data!');
			}
		};

		var actionEventsParam = ui5strap.ActionContext.createActionParam(ActionModule.PARAM_ACTION_EVENTS),
			oldOnInit = 'onInit' in controllerImpl ? controllerImpl.onInit : null;

		controllerImpl.onInit = function(oEvent){ 
			var controller = this,
				_this = this,
				view = this.getView(),
				viewId = view.getId(),
				viewData = view.getViewData();

			var viewCustomData = {};

			viewCustomData[actionEventsParam] = {
				"controller" : {
						"init" : [],
						"updateView" : []
				}
			};
			
			var viewControllerEvents = viewCustomData[actionEventsParam].controller;

			view.sappData = viewCustomData;
			

			if(viewData && "app" in viewData){
				var appConfigData = viewData.app.config.data,
					appEvents = appConfigData[actionEventsParam];

				//Global controller events from config	
				if(appEvents && "controller" in appEvents){
					var controllerEvents = appEvents.controller
					
					//Controller init events
					if("init" in controllerEvents){
						var initEvents = controllerEvents.init,
							initEventsLength = initEvents.length;

						for(var i = 0; i < initEventsLength; i++){
							viewControllerEvents.init.push(initEvents[i]);
						}
					}
				
					//Controller updateView events
					if("updateView" in controllerEvents){
						var updateEvents = controllerEvents.updateView,
							updateEventsLength = updateEvents.length;

						for(var i = 0; i < updateEventsLength; i++){
							viewControllerEvents.updateView.push(updateEvents[i]);
						}
						
					}

				}

				//TODO - this should always work - but because of the bug it doesnt :(
				if("options" in viewData){
					
					//View specific controller events from config
					//Global controller events from config	
					
					//TODO: Bug view.getViewName() returns an empty string. Why?
					var viewName = viewData.options.viewName;
					//console.log('VN', viewName, '?', view.getViewName());
					if( 
						( "views" in appConfigData ) && 
						( viewName in appConfigData.views) && 
						( actionEventsParam in appConfigData.views[viewName] ) && 
						( "controller" in appConfigData.views[viewName][actionEventsParam] ) ){
						
						var controllerEvents = appConfigData.views[viewName][actionEventsParam].controller;

						if("init" in controllerEvents){
							var initEvents = controllerEvents.init,
								initEventsLength = initEvents.length;

							for(var i = 0; i < initEventsLength; i++){
								viewControllerEvents.init.push(initEvents[i]);
							} 
						}
					

						if("updateView" in controllerEvents){
							var updateEvents = controllerEvents.updateView;
								updateEventsLength = updateEvents.length;

							for(var i = 0; i < updateEventsLength; i++){
								viewControllerEvents.updateView.push(updateEvents[i]);
							}
						}
					
					}

				}

				//Look for view Events in first Control after view/page control
				//This is a workaround because there is no way to add custom data to a view from within the template
				//TODO find out if there is a better way to add view specific custom data to the view template
				var viewContent = this.getView().getContent();
				if(viewContent.length > 0){
					var viewEvents = viewContent[0].data(actionEventsParam);
					
					if(typeof(viewEvents) !== 'undefined' && null !== viewEvents){
						viewEvents = ui5strap.Utils.parseIContent(viewEvents);
						if(typeof viewEvents === 'object'){
						
							if('init' in viewEvents){
								viewControllerEvents.init.push(viewEvents.init);
							}

							if('updateView' in viewEvents){
								viewControllerEvents.updateView.push(viewEvents.updateView);
							}
						
						}
					}
				}
				 
				
			}	

			//Finally, run all the init actions
			var initEvents = viewControllerEvents.init,
				initEventsLength = initEvents.length;

			for(var i = 0; i < initEventsLength; i++){
				var actionGroupId = initEvents[i];
				viewData.app.log.debug("Executing action '" + actionGroupId + "' (view: '" + viewId + "', event: 'onInit') ...");
					Action.run({
						"parameters" : actionGroupId, 
						"oEvent" : oEvent,
						"controller" : controller,
						"app" : viewData.app  
					});
			} 

			//Call old onInit function
			if(null !== oldOnInit){
				oldOnInit.call(this, oEvent);
			}
		};

		var oldOnUpdateView = 'onUpdateView' in controllerImpl ? controllerImpl.onUpdateView : null;

		/*
		* @param uEvent The update event fired by SappFrame. PLEASE NOTE: uEvent is NOT a standard SAPUI5 event!
		*/
		controllerImpl.onUpdateView = function(uEvent){ 
			var controller = this,
				_this = this,
				view = this.getView(),
				viewId = view.getId(),
				viewData = view.getViewData();

			//Create a model out of the uEvent parameters
			if(true === uEvent.createParamModel){
				var oModel = new sap.ui.model.json.JSONModel(uEvent.parameters);
				view.setModel(oModel, 'UEVENT_PARAMETERS');
			}

			//Finally, run all the updateView events
			var viewCustomData = view.sappData;

			var updateEvents = viewCustomData[actionEventsParam].controller.updateView,
				updateEventsLength = updateEvents.length;

			for(var i = 0; i < updateEventsLength; i++){
			 	var actionGroupId = updateEvents[i];
				viewData.app.log.debug("Executing action '" + actionGroupId + "' (view: '" + viewId + "', event: 'onUpdateView') ...");
				ui5strap.Action.run({
					"parameters" : actionGroupId, 
					"uEvent" : uEvent,
					"controller" : controller,
					"app" : viewData.app  
				});
			}
			
			//Call the old onUpdateView function
			if(null !== oldOnUpdateView){
				oldOnUpdateView.call(this, uEvent);
			}
		};
		
	};

}());