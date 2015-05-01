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
				context._run(instanceDefs[i]);
			}
		
		});
	};

	/*
	* Executes the action modules that are defined in the class parameter of the current context
	* @private
	* @static
	*/
	var _execute = function(context){
		var actionModuleNameParameter = context.parameterKey(ActionContext.PARAM_MODULES),
			actionModuleName = context._getParameter(actionModuleNameParameter);
		
		if(actionModuleName){ //Expected string
			context._deleteParameter(actionModuleNameParameter);
			_executeModules(context, ui5strap.Utils.parseIContent(actionModuleName));
		}
		else{   
			throw new Error("Invalid action '" + context + "': '" + actionModuleNameParameter + "' attribute is missing!");
		}
	};

	/*
	* @private
	* @static
	*/
	var _extendContextFromFileOrMerge = function(context, actionName, callback){
		if(actionName){ //Expected string or object
			var actionNamesList = ui5strap.Utils.parseIContent(actionName); 
			if(typeof actionNamesList === 'object'){
				var eventId = context.event.getId();
				//Different actions for each event
				if(!eventId || !actionNamesList[eventId]){
					throw new Error('Cannot execute action: no action for eventId ' + eventId);
				}
				actionName = actionNamesList[eventId];
			}
			
			Action.loadFromFile(actionName, function _loadActionFromFile_complete(actionJSON){

				//Action JSON files cannot be loaded if they differ in format
				//TODO: Make this better
				actionJSON.__format = actionJSON.__format || ActionContext.DEFAULT_FORMAT;
				if(context.parameters.__format && context.parameters.__format !== actionJSON.__format){
					throw new Error('Cannot load action "' + actionName + '": Bad format: ' + actionJSON.__format + " (expected: " + context.parameters.__format + ")");
				}
				else{
					//If no format string prensent in context, set it to the format of the JSON
					context.parameters.__format = actionJSON.__format;
				}

				//Add to context
				context.FILES.push(actionJSON);

				//Recursive call
				_extendContextFromFileOrMerge(context, actionJSON[context.parameterKey(ActionContext.PARAM_ACTION)], callback);

			});
			
		}
		else{
			context._merge();

			callback && callback();
		}
	};
	
	/*
	* Load an action from a json file
	* @private
	* @static
	*/
	Action.loadFromFile = function(actionName, callback){
		var actionCache = Action.cache;
		if(actionCache[actionName]){
			callback && callback(actionCache[actionName]);
			
			return;
		}
		
		var actionUrl = jQuerySap.getModulePath(actionName) + '.action.json';
		jQuerySap.log.debug("[ACTION] Loading '" + actionName + "' from '" + actionUrl + "'" );
		
		ui5strap.readTextFile(
				actionUrl, 
				'json', 
				function(data){
					actionCache[actionName] = data;
				
					callback && callback(data);
				},
				function(data){
					throw new Error('Invalid Action: "' + actionUrl + '"');
				}
		);
	};

	/*
	* Run events
	* @public
	* @static
	*/
	Action.executeEventModules = function(context, parameterKey, eventName){
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
		jQuerySap.log.debug("[ACTION] RUN");

		var actionName = null;
		if(action.parameters && typeof action.parameters === 'string'){
			actionName = action.parameters;
			delete action.parameters;
		}

		var context = new ActionContext(action);

		if(null === actionName){
			actionName = context._getParameter(context.parameterKey(ActionContext.PARAM_ACTION));
		}

		_extendContextFromFileOrMerge(context, actionName, function _extendContextFromFileOrMerge_complete(){
			_execute(context);
		});
	};

}());