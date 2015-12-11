/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionModule
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

sap.ui.define(['./library', './ActionContext'], function(library, ActionContext){

	var ActionModule = ui5strap.Object.extend("ui5strap.ActionModule"),
		ActionModuleProto = ActionModule.prototype;

	/*
	* Name of the event that is triggered when the event is completed
	*/
	ActionModule.EVENT_COMPLETED = "completed";
	
	ActionModule.cacheable = true;
	
	/*
	* Namespace of the action module instance
	*/
	ActionModuleProto.namespace = 'task';

	/*
	* Defined parameters for this action module
	*/
	ActionModuleProto.parameters = {};

	/**
	* Initializes the action module
	* @PostConstruct
	*/
	ActionModuleProto.init = function(context, instanceDef){
		this.context = context;
		this._instanceDef = instanceDef;
		
		context._log.debug("INIT " + this);
		
		if(instanceDef.namespace){
			this.namespace = instanceDef.namespace;
		}
		else{
			//this.namespace = ActionModuleProto.namespace;
		}
		
		//Test if Namespace is valid
		if(jQuery.sap.startsWith(this.namespace, ActionContext.PREFIX)){
			throw new Error("Action namespace must not start with '" + ActionContext.PREFIX + "'!");
		}
		
		if(!context.action[this.namespace]){
			context.action[this.namespace] = {};
		}

		return this;
	};

	/**
	 * String representation of the Module
	 * @Public
	 */
	ActionModuleProto.toString = function(){
		return this._instanceDef.module + ' ' + this.context;
	};

	/**
	 * @Public
	 */
	ActionModuleProto.getScope = function(){
		return ActionContext.WORKPOOL + "." + this.namespace;
	};

	/**
	* Does same as ActionContext.prototype.get - plus type validation.
	* @Public
	*/
	ActionModuleProto.getParameter = function(paramKey, resolveAll){
		var paramDef = this.parameters[paramKey];
		
		if(!paramDef){
			throw new Error("Invalid definition for parameter '" + paramKey + "'.");
		}

		var paramDefType = paramDef.type,
			value = this.context.action[this.namespace][paramKey];
		
		if(value){
			value = this.context.resolve(this, value, !resolveAll);
		}
		
		if(('undefined' === typeof value) && ('undefined' !== typeof paramDef.defaultValue)){
			value = paramDef.defaultValue;
		}
		
		this.context.action[this.namespace][paramKey] = value;
		
		if(value && paramDefType){
			var parameterType = typeof value,
				defIsString = typeof paramDefType === 'string';
			
			if( (defIsString && parameterType !== paramDefType) || 
				(!defIsString && -1 === jQuery.inArray(parameterType, paramDefType) )
			){
				throw new Error(this + ": wrong type '" + parameterType + "' (expected: " + JSON.stringify(paramDefType) + ") for parameter '" + paramKey + "'.");
			}
		}
		
		return value;
	};
	
	/**
	 * Faster variant of ActionContext.prototype.get - only for task root paramaters!
	 * @Private
	 */
	var _expression = function(_this, parameterKey, defaultValue){
		var param = _this.context.action[_this.namespace][parameterKey];
		if(param){
			param = _this.context.resolve(_this, param, true);
		}
		
		if(('undefined' === typeof param) && ('undefined' !== typeof defaultValue)){
			param = defaultValue;
		}
		
		return param;
	};
	
	/**
	* Sets an action module specific parameter to the action context
	* @Public
	*/
	ActionModuleProto.setParameter = function(parameterKey, parameterValue){
		return this.context.set(this, "." + parameterKey, parameterValue);
	};

	/**
	* Execute the action module
	* @Public
	*/
	ActionModuleProto.execute = function(){
		this.context._log.debug("Executing Task " + this);
		
		//Apply local parameter functions
		//@deprecated
		this.context._process(this.getScope());

		//Prepare parameters
		this.prepareParameters();

		//test if parameters match conditions
		if(!_expression(this, "IF", true)){
			this.context._log.debug("Conditions did not match. Now running else tasks..." + this);
			
			this["else"]();
		}
		else{
			try{
				this.run();
				
				this.then();
			}
			catch(err){
				var errorTask = _expression(this, "ERROR");
				if(errorTask){
					ui5strap.Action.runTasks(this.context, errorTask);
				}
				else{
					throw err;
				}
			}
		}

		this.context._log.debug("Task execution completed " + this);
	};
	
	/**
	* Run the action module. Inheritants should override this method.
	* @Protected
	*/
	ActionModuleProto.run = function(){
		_expression(this, "DO");
	};
	
	ActionModuleProto.then = function(){
		ui5strap.Action.runTasks(this.context, _expression(this, "THEN"));
		
		//Exceution complete
		//@deprecated
		this.completed();
	};
	
	ActionModuleProto["else"] = function(){
		ui5strap.Action.runTasks(this.context, _expression(this, "ELSE"));
	};
	
	/*
	 * 
	 * ------------------------------------------------
	 * ------------------------------------------------
	 * 
	 */
	
	/**
	* Deletes an action module specific parameter from the action context
	* @Public
	* @deprecated
	*/
	ActionModuleProto.deleteParameter = function(parameterKey){
		return this.context._deleteParameter(this._createParameterKey(parameterKey));
	};


	
	/**
	* Creates a action module specific parameter key
	* @Protected
	* @deprecated
	*/
	ActionModuleProto._createParameterKey = function(parameterKey){
		return  this.getScope() + '.' + parameterKey;
	};	
	
	
	/**
	* Prepare the action module and parameters
	* @Protected
	* @deprecated
	*/
	ActionModuleProto.prepareParameters = function(){
		//throw new Error('Please override the prepareParameters method in action module ' + this);
	};

	/**
	 * Tries to find a control by a given scope and additional paramters
	 * @deprecated
	 */
	ActionModuleProto.findControl = function(){
		var theControl = null,
			scope = this.getParameter("scope");

		if("APP" === scope){
			var controlId = this.getParameter("controlId");
			if(controlId){
				//If controlId specified, get the control from the optional view or globally
				theControl = this.context.app.getControl(controlId, this.getParameter("viewId"));
			}
			else{
				//By default, use the root control of the app as target control in APP scope
				theControl = this.context.app.getRootControl();
			}
		}
		else if("VIEW" === scope){ 
			if(!this.context.controller){
				throw new Error("Cannot use scope 'VIEW': no 'controller' in context!");
			}
			
			var controlId = this.getParameter("controlId"),
				currentView = this.context.controller.getView();
			
			if(controlId){
				//Find control on the current view by id
				theControl = this.context.app.getControl(controlId, currentView.getId());
			}
			else{
				//Otherwise use the root control of the view as target control in VIEW scope
				theControl = currentView.getContent()[0];
				console.log(theControl);
			}
		}
		else if("SOURCE" === scope){
			//We try to find the control from a event source
			if(!this.context.eventSource){
				throw new Error("Cannot use scope 'SOURCE': no 'eventSource' in context!");
			}
			
			theControl = this.context.eventSource;
		}
		else if("SELECTION" === scope){
			//We try to find the control from a list selection
			if(!this.context.eventSource || !this.context.eventSource.getSelectedControl){
				throw new Error("Cannot use scope 'SELECTION': no 'eventSource' in context or no selection support!");
			}

			theControl = this.context.eventSource.getSelectedControl();
		}
		else if("PARAMETER" === scope){
			var parameterKey = this.getParameter("parameterKey");
			
			//We try to find the control from a event parameter
			if(!this.context.eventParameters || !this.context.eventParameters[parameterKey]){
				throw new Error("Cannot use scope 'PARAMETER': no 'eventParameters' in context or parameter not present!");
			}
			
			theControl = this.context.eventParameters[parameterKey];
		}
		else if("CONTEXT" === scope){
			var parameterKey = this.getParameter("parameterKey"),
				theControl = this.context.get(this, parameterKey);
		}
		
		if(!theControl){
			//Either scope or controlId is invalid
			throw new Error('Could not find Control (SCOPE: ' + scope + ', PARAMETERS: ' + JSON.stringify(this.context.parameters) + ')');
		}

		return theControl;
	};
	
	/**
	 * @deprecated
	 */
	ActionModuleProto.fireEvents = function(eventName){
		ui5strap.Action.executeEventModules(this.context, this.getScope(), eventName);
	};

	/**
	* Called when the action module has been completed
	* @deprecated
	* @Protected
	*/
	ActionModuleProto.completed = function(){
		this.fireEvents(ActionModule.EVENT_COMPLETED);
	};

	//Return Module Constructor
	return ActionModule;
});