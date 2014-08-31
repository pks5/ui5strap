/*
 * 
 * ui5strap.ActionModule
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

(function ui5strapActionModule(){
//<-----

	var jQuerySap = jQuery.sap;

	jQuery.sap.declare("ui5strap.ActionModule");

	jQuerySap.require("ui5strap.ActionContext");

	sap.ui.base.Object.extend("ui5strap.ActionModule");

	var ActionModule = ui5strap.ActionModule,
		ActionModuleProto = ActionModule.prototype,
		ActionContext = ui5strap.ActionContext;

	ActionModule.ACTION_EVENT_NAME = 'run';

	/*
	* Reserved action attributes
	* @static
	*/
	ActionModule.PARAM_ACTION_CLASS = 'modules';
	ActionModule.PARAM_ACTION_GROUP_ID = 'id';
	ActionModule.PARAM_ACTION_CONTROLLER = 'controller';
	ActionModule.PARAM_ACTION_CONTEXT = 'context';
	ActionModule.PARAM_ACTION_SELECTOR = 'selector';
	ActionModule.PARAM_ACTION_EVENTS = 'events';
	ActionModule.PARAM_ACTION_FUNCTIONS = 'functions';

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

	/*
	* Initializes the action module
	*/
	ActionModuleProto.init = function(context, instanceDef){
		jQuery.sap.log.debug("F ActionModuleProto::init");

		this.context = context;
		this._instanceDef = instanceDef;

		if(instanceDef.namespace){
			this.namespace = instanceDef.namespace;
		}

		if(jQuery.sap.startsWith(this.namespace, ActionContext.ACTION_PREFIX)){
			throw new Error("Action namespace must not start with '" + ActionContext.ACTION_PREFIX + "'!");
		}

		var aId = (this._instanceDef.index + 1);
		this._actionName = "(" + this._instanceDef.module + "#" + aId + ")";
		this._actionNameShort = "";//"(" + aId + ")";

		return this;
	};

	ActionModuleProto.toString = function(){
		return this._instanceDef.module + ' (' + this.context + ')';
	};

	/*
	* Gets an action module specific parameter key definition
	* @public
	*/
	ActionModuleProto.getParameterDefinition = function(parameterKey){
		if(!(parameterKey in this.parameters)){
			return null;
		}

		return this.parameters[parameterKey];
	};	

	/*
	* Gets a property of an action module specific parameter key definition
	* @public
	*/
	ActionModuleProto.getParameterDefinitionField = function(parameterKey, fieldKey){
		var paramDef = this.getParameterDefinition(parameterKey);

		if(null === paramDef){
			return null;
		}

		if(!(fieldKey in paramDef)){
			return null;
		}

		return paramDef[fieldKey];
	};	

	/*
	* Creates a action module specific parameter key
	* @protected
	*/
	ActionModuleProto._createParameterKey = function(parameterKey){
		if(-1 !== parameterKey.indexOf('.')){
			return parameterKey;
		}
		return 'parameters.' + this.namespace + '.' + parameterKey;
	};	

	/*
	* Gets the value of an action module specific parameter
	* @public
	*/
	ActionModuleProto.getParameter = function(parameterKey){
		return this.context._getParameter(this._createParameterKey(parameterKey));
	};

	/*
	* Gets the parameter type of an action module specific parameter
	* @public
	*/
	ActionModuleProto.getParameterType = function(parameterKey){
		var paramValue = this.getParameter(parameterKey);
		if(null === paramValue){
			return false;
		}
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
		jQuery.sap.log.debug("F ActionModuleProto::execute");

		this.context._log.debug("START " + this._actionName);

		//Fetch additional local data
		this.context._fetch( 
			"parameters." 
			+ this.namespace
		);

		//Apply local parameter functions
		this.context._functions( 
			"parameters" 
			+ "." 
			+ this.namespace 
			+ "." 
			+ ActionContext.createActionParam(ActionModule.PARAM_ACTION_FUNCTIONS)
		);

		//Prepare parameters
		this.prepareParameters();

		//test if parameters match conditions
		if(!this.testConditions()){
				this.context._log.debug("Action '" + this._actionName + "' has not been executed cause conditions have not been met.");
		}
		else{
			this.validateParameters();

			this.run();
		}

		this.completed();

		this.context._log.debug("END " + this._actionName);
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
		this.context._log.debug("Testing conditions: '" + this.context.action_conditions + "'");
		return true;
	};	

	/*
	* Validate the parameters of this action module
	* @protected
	*/
	ActionModuleProto.validateParameters = function(){
		jQuery.sap.log.debug("F ActionModuleProto::validateParameters");

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

			var parameterType = this.getParameterType(paramKey);
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
			if( ( null !== parameterValue ) && ( -1 === jQuery.inArray(parameterType, paramDef.type) ) )
			{
				throw new Error(this._actionName + ": wrong type '" + parameterType + "' (expected: " + JSON.stringify(paramDef.type) + ") for parameter '" + publicParamKey + "'.");
			}

		}

		return true;
	};

	ActionModuleProto.findControl = function(useCore){
		var theControl = null,
			controlId = this.getParameter("controlId"),
			scope = this.getParameter("scope");

		if("GLOBAL" === scope){
			if(useCore){
				theControl = sap.ui.getCore();
			}
			if(null !== controlId){
				theControl = this.context.app.getControl(controlId, this.getParameter("viewId"));
			}
		}
		else if("VIEW" === scope){ 
			theControl = this.context.controller.getView();

			if(null !== controlId){
				theControl = this.context.app.getControl(controlId, theControl.getId());
			}
		}
		else if("SOURCE" === scope){
			if(!this.context.oEvent){
				throw new Error("Cannot use scope SOURCE: no oEvent");
			}

			theControl = this.context.OEVENT_SOURCE;
		}
		else if("SELECTION" === scope){
			if(!this.context.oEvent){
				throw new Error("Cannot use scope SELECTION: no oEvent");
			}

			theControl = this.context.OEVENT_SOURCE.getSelectedControl();
		}
		
		if(!theControl){
			throw new Error('Invalid control: ' + controlId);
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
		ui5strap.Action.fireEvents(
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