/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.action.Action
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

sap.ui.define(['./library', './ActionContext', "../core/Utils", "sap/ui/base/Object"], function(ui5strapActionLib, ActionContext, Utils, ObjectBase){
	
	"use strict";
	
	/**
	 * Constructor for a new Action instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Class for interpreting ui5strap actions.
	 * @extends sap.ui.base.Object
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Action
	 * 
	 */
	var Action = ObjectBase.extend("pks.ui5strap.action.Action"),
		ActionProto = Action.prototype,
		_actionsCache = {},
		_modulesCache = {};
	
	/**
	* @Private
	* @Static
	* @deprecated
	*/
	var _getActionInstanceDef = function (context, actionModuleName){
		var instanceDef = {};

		if(typeof actionModuleName === 'string'){
			//If string, the namespace is taken from the protoype
			if(-1 === actionModuleName.indexOf(".")){
				var taskDefinition = context.action[actionModuleName];
				if(!taskDefinition){
					throw new Error("No task definition for task '" + actionModuleName + "'");
				}
				if(!taskDefinition[ActionContext.PARAM_MODULE]){
					taskDefinition[ActionContext.PARAM_MODULE] = "pks.ui5strap.action.Task";
				}
				instanceDef = {
					namespace : actionModuleName,
					module : taskDefinition[ActionContext.PARAM_MODULE]
				};
			}
			else{
				instanceDef = { 
						module : actionModuleName
				};
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
	* Execute task in context.
	* This method is used to execute tasks as a list synchroneously.
	* Will be dropped.
	* @deprecated
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
		
		var oTask = _modulesCache[actionModuleName];
		
		if(!oTask){
			var TaskConstructor = Utils.getObject(actionModuleName);
			
				oTask = new TaskConstructor();
						
			if(!(oTask instanceof pks.ui5strap.action.Task)){
				throw new Error("Error in action '" + context + "':  '" + actionModuleName +  "' must be an instance of pks.ui5strap.action.Task!");
			}
			
			if(!TaskConstructor.cacheable){
				//_modulesCache[actionModuleName] = oTask;
			}
		}

		oTask.init(context, instanceDef).execute();
	};

	

	/**
	* Executes the action modules that are defined in the class parameter of the current context
	* @Private
	* @Static
	* FIXME
	*/
	var _execute = function(context){
		var actionModuleNameParameter = ActionContext.PREFIX + ActionContext.PARAM_MODULES,
			actionModuleName = context.parameters[actionModuleNameParameter];
		
		if(actionModuleName){ 
			//Expected string
			delete context.parameters[actionModuleNameParameter];
			//Old format
			Action.runTasks(context, actionModuleName);
			
			//TEMP
			context.callback && context.callback();
		}
		else{  
			//New format
			actionModuleName = context.parameters[ActionContext.PARAM_TASKS];
		
			if(actionModuleName){ //Expected string
				Action.runTasks(context, actionModuleName);
				
				//TEMP
				context.callback && context.callback();
			}
			else{  
				actionModuleName = context.parameters[ActionContext.PARAM_BEGIN];
				if(actionModuleName){
					Action.runTask(context, actionModuleName);
				}
				else{
					throw new Error("Invalid action '" + context + "': '" + ActionContext.PARAM_TASKS + "' attribute is missing!");
				}
			}
			//New format end
		}
	};

	/**
	* Load an action from a json file
	* @Private
	* @Static
	*/
	Action.loadFromFile = function(actionName, callback, preload){
		if(_actionsCache[actionName]){
			callback && callback(_actionsCache[actionName].actionParameters);
			
			return;
		}
		
		var actionUrl = jQuery.sap.getResourceName(actionName, '.action.json');
		
		jQuery.sap.log.debug("[ACTION] Loading '" + actionName + "' from '" + actionUrl + "'" );
		
		jQuery.sap.loadResource(actionUrl, {async : true}).then(function(actionParameters) {
			_actionsCache[actionName] = {
					actionParameters : actionParameters,
					preload : preload
			};
			
			if(preload){
				jQuery.sap.declare(actionName);
				
				var ActionInstance = function(oEvent){
					//No callback needed
					this.getApp().runAction({
						"eventSource" : oEvent.getSource(),
						"eventParameters" : oEvent.getParameters(),
						"controller" : this,
						"parameters" : actionName
					});
				};
				
				//TODO Optimize performance
				var pack = Utils.getObject(actionName, 1),
					parts = actionName.split(/\./);
				
				pack[parts[parts.length - 1]] = ActionInstance;
			}
			
			callback && callback(actionParameters);
		});
	};

	/**
	* Executes a list of AM Modules
	* Will be dropped.
	* @deprecated
	* @Public
	* @Static
	*/
	Action.runTasks = function(context, actionModulesList){
		if(!actionModulesList){
			//jQuery.sap.log.debug("[ACTION] Tried to run empty task list.");
			return;
		}
		
		if(typeof actionModulesList === 'string'){
			actionModulesList = [actionModulesList];
		}

		var instanceDefs = [],
			actionModulesListLength = actionModulesList.length;
				
		for ( var i = 0; i < actionModulesListLength; i++ ) { 
			var actionInstanceDef = _getActionInstanceDef(context, actionModulesList[i]);
			
			instanceDefs.push(actionInstanceDef);
			
			//TODO Async!
			jQuery.sap.require(actionInstanceDef.module);
		}

		var instanceDefsLength = instanceDefs.length;
		for ( var i = 0; i < instanceDefsLength; i++ ) { 
			_runTaskInContext(context, instanceDefs[i]);
		}
	};
	
	/**
	 * Runs a single task within the context.
	 */
	Action.runTask = function(context, taskId){
		if(!taskId){
			return false;
		}
		
		var instanceDef = _getActionInstanceDef(context, taskId);
		sap.ui.require([context.app.config.resolvePackage(instanceDef.module).replace(/\./g, "/")], function(TaskConstructor){
			//Push to callstack
			context._callStack.push(instanceDef);

			var actionModuleName = instanceDef.module;
			
			if(!actionModuleName){
				throw new Error("No task module specified!");
			}
			
			var oTask = _modulesCache[actionModuleName];
			
			if(!oTask){
				oTask = new TaskConstructor();
							
				if(!(oTask instanceof pks.ui5strap.action.Task)){
					throw new Error("Error in action '" + context + "':  '" + actionModuleName +  "' must be an instance of pks.ui5strap.action.Task!");
				}
			}

			oTask.init(context, instanceDef).execute();
		});
		
		return true;
	};

	/**
	* Runs an action
	* @Static
	* @Public
	*/
	Action.run = function(action){
		jQuery.sap.log.debug("[ACTION] Action.run");

		var actionName = action.parameters;
		if(!actionName){
			jQuery.sap.log.warning("Cannot execute action: no parameters given.");
		}
		else if(typeof actionName === 'string'){
			Action.loadFromFile(actionName, function loadFromFileSuccess(actionJSON){
				action.parameters = actionJSON;
				action.name = actionName;
				var context = new ActionContext(action);
				_execute(context);
			});
		}
		else{
			var context = new ActionContext(action);
			_execute(context);
		}
	};
	
	//Return Module Constructor
	return Action;
});