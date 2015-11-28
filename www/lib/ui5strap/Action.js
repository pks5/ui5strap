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

	/**
	* @Private
	* @Static
	* @deprecated
	*/
	var _getActionInstanceDef = function (actionModuleName){
		var instanceDef = {};

		if(typeof actionModuleName === 'string'){
			//If string, the namespace is taken from the protoype
			var parts = actionModuleName.split(/#/);
			if(parts.length > 1){
				instanceDef.module = parts[0].trim();
				instanceDef.namespace = parts[1];
			}
			else{
				instanceDef.module = actionModuleName;
			}
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
	
	/**
	* 
	* Executes an AM Module (ui5strap.ActionModule)
	* @Static
	* @Private
	*/
	var _runTaskInContext = function(context, instanceDef){
		//Set index
		instanceDef.index = context._callStack.length;
		
		//Push to callstack
		context._callStack.push(instanceDef);

		var actionModuleName = instanceDef.module;
		
		if(!instanceDef.module){
			throw new Error("No task module specified!");
		}
			
		var ActionModuleConstructor = ui5strap.Utils.getObject(actionModuleName),
			oActionModule = new ActionModuleConstructor();
					
		if(!(oActionModule instanceof ui5strap.ActionModule)){
			throw new Error("Error in action '" + context + "':  '" + actionModuleName +  "' must be an instance of ui5strap.ActionModule!");
		}

		oActionModule.init(context, instanceDef).execute();
	};

	

	/**
	* Executes the action modules that are defined in the class parameter of the current context
	* @Private
	* @Static
	* FIXME
	*/
	var _execute = function(context){
		context._process(ActionContext.WORKPOOL);
		
		var actionModuleNameParameter = ActionContext.PREFIX + ActionContext.PARAM_MODULES,
			actionModuleName = context.parameters[actionModuleNameParameter];
		
		if(actionModuleName){ 
			//Expected string
			delete context.parameters[actionModuleNameParameter];
			//Old format
			Action.runTasks(context, actionModuleName, false);
		}
		else{  
			//New format
			actionModuleName = context.parameters[ActionContext.PARAM_TASKS];
		
			if(actionModuleName){ //Expected string
				delete context.parameters[ActionContext.PARAM_TASKS];
				//New Format
				Action.runTasks(context, actionModuleName, true);
			}
			else{  
				throw new Error("Invalid action '" + context + "': '" + ActionContext.PARAM_TASKS + "' attribute is missing!");
			}
			//New format end
		}
	};

	/**
	* Load an action from a json file
	* @Private
	* @Static
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

	/**
	* Run events
	* @Public
	* @Static
	* @deprecated
	*/
	Action.executeEventModules = function(context, parameterKey, eventName){
		var paramEvents = context._getParameter(
				parameterKey
				+ "." 
				+ ActionContext.PREFIX 
				+ ActionContext.PARAM_EVENTS
		);

		if(paramEvents && paramEvents[eventName]){
			context._log.debug("Triggering event actions '" + eventName + "'...");

			//Execute one or multiple AM modules that are defined in the event
			Action.runTasks(context, paramEvents[eventName]);
		}
	};
	
	/**
	* Executes a list of AM Modules
	* @Public
	* @Static
	*/
	Action.runTasks = function(context, actionModulesList, newFormat){
		if(!actionModulesList){
			jQuery.sap.log.warning("Cannot run Tasks: empty list.");
			return;
		}
		
		if(typeof actionModulesList === 'string'){
			actionModulesList = [actionModulesList];
		}

		var instanceDefs = [],
			actionModulesListLength = actionModulesList.length;
				
		for ( var i = 0; i < actionModulesListLength; i++ ) { 
			var actionInstanceDef = null;
			if(newFormat){
				var taskDefinition = context.action[actionModulesList[i]];
				if(!taskDefinition){
					throw new Error("No task definition for task '" + actionModulesList[i] + "'");
				}
				
				actionInstanceDef = {
					namespace : actionModulesList[i],
					module : taskDefinition[ActionContext.PARAM_MODULE]
				};
			}	
			else{
				actionInstanceDef = _getActionInstanceDef(actionModulesList[i]);
			}
			instanceDefs.push(actionInstanceDef);
			jQuery.sap.require(actionInstanceDef.module);
		}

		var instanceDefsLength = instanceDefs.length;
		for ( var i = 0; i < instanceDefsLength; i++ ) { 
			_runTaskInContext(context, instanceDefs[i]);
		}
	};

	/**
	* Runs an action
	* @Static
	* @Public
	*/
	Action.run = function(action){
		jQuerySap.log.debug("[ACTION] Action.run");

		var actionName = action.parameters;
		if(typeof actionName === 'string'){
			Action.loadFromFile(actionName, function loadFromFileSuccess(actionJSON){
				action.parameters = actionJSON;
				var context = new ActionContext(action);
				_execute(context);
			});
		}
		else{
			var context = new ActionContext(action);
			_execute(context);
		}
	};

}());