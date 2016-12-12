/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.Action
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

sap.ui.define(["./library", "sap/ui/base/Object", "./ActionContext", "./Task", "../core/Utils"], function(ui5strapViewerLib, ObjectBase, ActionContext, Task, Utils){
	
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
	 * @alias pks.ui5strap.viewer.Action
	 * 
	 */
	var Action = ObjectBase.extend("pks.ui5strap.viewer.Action"),
		ActionProto = Action.prototype,
		_actionsCache = {};
	
	/**
	* Load an action from a json file
	* @Private
	* @Static
	*/
	Action.loadFromFile = function(sActionName, callback, preload){
		if(_actionsCache[sActionName]){
			callback && callback(_actionsCache[sActionName].actionParameters);
			
			return;
		}
		
		var actionUrl = jQuery.sap.getResourceName(sActionName, '.action.json');
		
		jQuery.sap.log.debug("[ACTION] Loading '" + sActionName + "' from '" + actionUrl + "'" );
		
		jQuery.sap.loadResource(actionUrl, {async : true}).then(function(actionParameters) {
			_actionsCache[sActionName] = {
					actionParameters : actionParameters,
					preload : preload
			};
			
			if(preload){
				jQuery.sap.declare(sActionName);
				
				var ActionInstance = function(oEvent){
					//No callback needed
					this.getApp().runAction({
						"eventSource" : oEvent.getSource(),
						"eventParameters" : oEvent.getParameters(),
						"controller" : this,
						"parameters" : sActionName
					});
				};
				
				//TODO Optimize performance
				var pack = Utils.getObject(sActionName, 1),
					parts = sActionName.split(/\./);
				
				pack[parts[parts.length - 1]] = ActionInstance;
			}
			
			callback && callback(actionParameters);
		});
	};

	/**
	* Executes the BEGIN task.
	* @Private
	* @Static
	*/
	Action.begin = function(mAction){
		var oContext = new ActionContext(mAction),
			sTaskBegin = oContext.parameters[ActionContext.PARAM_BEGIN];
		
		if(sTaskBegin){
			Task.runTask(oContext, sTaskBegin);
		}
		else{
			throw new Error("Missing BEGIN task in action '" + oContext + "'.");
		}
	};

	/**
	* Runs an action
	* @Static
	* @Public
	*/
	Action.run = function(action){
		jQuery.sap.log.debug("[ACTION] Action.run");

		var sActionName = action.parameters;
		if(!sActionName){
			jQuery.sap.log.warning("Cannot execute action: no parameters given.");
		}
		else if(typeof sActionName === 'string'){
			Action.loadFromFile(sActionName, function loadFromFileSuccess(actionJSON){
				action.parameters = actionJSON;
				action.name = sActionName;
				
				Action.begin(action);
			});
		}
		else{
			Action.begin(action);
		}
	};
	
	//Return Module Constructor
	return Action;
});