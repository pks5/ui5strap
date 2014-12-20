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
		ActionProto = Action.prototype,
		ActionContext = ui5strap.ActionContext,
		ActionModule = ui5strap.ActionModule;

	Action.cache = {};

	/*
	* @private
	* @static
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
	* @private
	* @static
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
	* @private
	* @static
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
	* @private
	* @static
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
	* @private
	* @static
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
	* @private
	* @static
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

	/*
	* @private
	* @static
	*/
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
				actionJSON.__format = actionJSON.__format || ActionContext.DEFAULT_FORMAT;
				if(context.parameters.__format && context.parameters.__format !== actionJSON.__format){
					throw new Error('Cannot load action "' + actionName + '": Bad format: ' + actionJSON.__format + " (expected: " + context.parameters.__format + ")");
				}
				else{
					context.parameters.__format = actionJSON.__format;
				}

				//Add to context
				context.FILES.push(actionJSON);

				//Recursive call
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
	* @static
	*/
	Action.fireEvents = function(context, parameterKey, eventName){
		var paramEvents = context._getParameter(context.parameterKey(ActionContext.PARAM_EVENTS, parameterKey));

		if(paramEvents && paramEvents[eventName]){
			context._log.debug("Triggering event actions '" + eventName + "'...");

			//Execute one or multiple AM modules that are defined in the event
			_executeModules(context, paramEvents[eventName]);
		}
	};

	/*
	* Runs an action
	* @static
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
			
			actionName = context._getParameter(context.parameterKey(ActionContext.PARAM_ACTION));
		}

		_loadActionFileStack(context, actionName, function _loadActionFileStack_complete(){
			_execute(context);
		});
	};

}());