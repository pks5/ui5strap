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

(function(){

	var jQuerySap = jQuery.sap;

	jQuery.sap.declare("ui5strap.ActionModule");

	jQuerySap.require("ui5strap.library");
	jQuerySap.require("ui5strap.ActionContext");

	ui5strap.Object.extend("ui5strap.ActionModule");

	var ActionModule = ui5strap.ActionModule,
		ActionModuleProto = ActionModule.prototype,
		ActionContext = ui5strap.ActionContext;

	/*
	* Name of the event that is triggered when the event is completed
	*/
	ActionModule.EVENT_COMPLETED = "completed";

	/*
	* Namespace of the action module instance
	*/
	ActionModuleProto.namespace = 'action';

	/*
	* Defined parameters for this action module
	*/
	ActionModuleProto.parameters = {};

	/**
	* Initializes the action module
	*/
	ActionModuleProto.init = function(context, instanceDef){
		this.context = context;
		this._instanceDef = instanceDef;
		
		context._log.debug("INIT " + this);
		
		if(instanceDef.namespace){
			this.namespace = instanceDef.namespace;
		}
		
		//Test if Namespace is valid
		var paramPrefix = context.parameterKey("");
		if(jQuery.sap.startsWith(this.namespace, paramPrefix)){
			throw new Error("Action namespace must not start with '" + paramPrefix + "'!");
		}

		return this;
	};

	/**
	 * String representation of the Module
	 */
	ActionModuleProto.toString = function(){
		return this._instanceDef.module + ' ' + this.context;
	};

	/**
	* Returns the Definition for a Parameter
	* @public
	* @return The Definition or null
	*/
	ActionModuleProto.getParameterDefinition = function(parameterKey){
		return this.parameters[parameterKey] || null;
	};	

	/**
	* Returns a Field (type, defaultValue, etc) of a Parameter Definition
	* @public
	* @return The Field intormation or null
	*/
	ActionModuleProto.getParameterDefinitionField = function(parameterKey, fieldKey){
		var paramDef = this.getParameterDefinition(parameterKey);

		if(!paramDef){
			//Parameter is not defined in module
			return null;
		}

		return paramDef[fieldKey] || null;
	};	

	/*
	* Creates a action module specific parameter key
	* @protected
	*/
	ActionModuleProto._createParameterKey = function(parameterKey){
		if(-1 !== parameterKey.indexOf('.')){
			return parameterKey;
		}
		
		//By default, use the Module's Namespace
		return 'parameters.' + this.namespace + '.' + parameterKey;
	};	

	/*
	* Gets the value of an action module specific parameter
	* @public
	*/
	ActionModuleProto.getParameter = function(parameterKey){
		return this.context._getParameter(this._createParameterKey(parameterKey));
	};

	/**
	* Returns the type of an Parameter
	* @public
	*/
	ActionModuleProto.getParameterType = function(parameterKey){
		var paramValue = this.getParameter(parameterKey);
		if(null === paramValue){
			//Parameter does not exist
			return false;
		}
		
		//Return the Type
		return typeof paramValue;
	};	

	/*
	* Sets an action module specific parameter to the action context
	* @public
	*/
	ActionModuleProto.setParameter = function(parameterKey, parameterValue){
		return this.context._setParameter(this._createParameterKey(parameterKey), parameterValue);
	};

	/*
	* Deletes an action module specific parameter from the action context
	* @public
	*/
	ActionModuleProto.deleteParameter = function(parameterKey){
		return this.context._deleteParameter(this._createParameterKey(parameterKey));
	};


	//--------------------------

	/*
	* Execute the action module
	* @public
	*/
	ActionModuleProto.execute = function(){
		this.context._log.debug("EXECUTE " + this);

		//Apply local parameter functions
		this.context._process("parameters." + this.namespace);

		//Prepare parameters
		this.prepareParameters();

		//test if parameters match conditions
		if(!this.testConditions()){
			this.context._log.debug("CONDITIONS DONT MATCH " + this);
		}
		else{
			this.validateParameters();

			this.run();
		}

		//Exceution complete
		this.completed();

		this.context._log.debug("EXECUTION COMPLETE " + this);
	};

	/*
	* Prepare the action module and parameters
	* @protected
	*/
	ActionModuleProto.prepareParameters = function(){
		//throw new Error('Please override the prepareParameters method in action module ' + this);
	};

	/*
	* Check if the conditions for this action module are met
	* @protected
	*/
	ActionModuleProto.testConditions = function(){
		this.context._log.debug("TEST CONDITIONS " + this.context.action_conditions);
		
		//TODO Implement Action Conditions
		
		return true;
	};	

	/*
	* Validate the parameters of this action module
	* @protected
	*/
	ActionModuleProto.validateParameters = function(){
		this.context._log.debug("VALIDATE PARAMETERS " + this);

		for(paramKey in this.parameters){
			var paramDef = this.getParameterDefinition(paramKey);
			var publicParamKey = this._createParameterKey(paramKey);
			if(null === paramDef){
				throw new Error("missing definition for parameter '" + paramKey + "'.");
			}

			var typeDef = this.getParameterDefinitionField(paramKey, "type"); 
			if( null === typeDef ){
				throw new Error("missing type definition for parameter '" + paramKey + "'.");
			}

			if(typeof paramDef.type === 'string'){
				paramDef.type = [paramDef.type];
			}

			
			var parameterValue = this.getParameter(paramKey);
			
			//Test if required param exists
			if( paramDef.required ){
				if(null === parameterValue){
					throw new Error("missing required action parameter: " + publicParamKey);
				}
			}

			//Set default value
			var defaultValueDef = this.getParameterDefinitionField(paramKey, "defaultValue");
			if( null !== defaultValueDef && null === parameterValue){
				this.setParameter(paramKey, defaultValueDef);
			}

			//Check if the parameter type is correct
			var parameterType = this.getParameterType(paramKey);
			if( ( null !== parameterValue ) && ( -1 === jQuery.inArray(parameterType, paramDef.type) ) )
			{
				throw new Error(this + ": wrong type '" + parameterType + "' (expected: " + JSON.stringify(paramDef.type) + ") for parameter '" + publicParamKey + "'.");
			}

		}

		return true;
	};

	ActionModuleProto.findControl = function(){
		var theControl = null,
			controlId = this.getParameter("controlId"),
			scope = this.getParameter("scope");

		if("APP" === scope){
			theControl = this.context.app.getRootControl();
			
			if(null !== controlId){
				theControl = this.context.app.getControl(controlId, this.getParameter("viewId"));
			}
		}
		else if("VIEW" === scope){ 
			if(!this.context.controller){
				throw new Error("Cannot use scope 'VIEW': no 'controller' in context!");
			}

			//By default, use current view as control
			theControl = this.context.controller.getView();
			
			if(controlId){ //Expected string
				theControl = this.context.app.getControl(controlId, theControl.getId());
			}
		}
		else if("SOURCE" === scope){
			if(!this.context.eventSource){
				throw new Error("Cannot use scope 'SOURCE': no 'eventSource' in context!");
			}
			
			theControl = this.context.eventSource;
		}
		else if("SELECTION" === scope){
			if(!this.context.eventSource || !this.context.eventSource.getSelectedControl){
				throw new Error("Cannot use scope 'SELECTION': no 'eventSource' in context or no selection support!");
			}

			theControl = this.context.eventSource.getSelectedControl();
		}
		
		if(!theControl){
			//Either scope or controlId is invalid
			throw new Error('Could not find Control (SCOPE: ' + scope + ', ID: ' + controlId + ')');
		}

		return theControl;
	};

	/*
	* Run the action module
	* @protected
	*/
	ActionModuleProto.run = function(){
		throw new Error('Please override the run method in action module ' + this);
	};

	ActionModuleProto.fireEvents = function(eventName){
		ui5strap.Action.executeEventModules(
			this.context,
			"parameters" 
				+ "." 
				+ this.namespace,
			eventName
		);
	};

	/*
	* Called when the action module has been completed
	* @protected
	*/
	ActionModuleProto.completed = function(){
		this.fireEvents(ActionModule.EVENT_COMPLETED);
	};

}());