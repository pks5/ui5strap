/*
 * 
 * a__
 *
 * ActionModule to call a method of a control
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/a__
 *
 * ALL RIGHTS RESERVED
 * 
 */

(function(){

	jQuery.sap.declare("a__.CallControlMethodAction");

	a__.ActionModule.extend("a__.CallControlMethodAction");

	var CallControlMethodActionProto = a__.CallControlMethodAction;

	/*
	* @Override
	*/
	CallControlMethodActionProto.namespace = 'callControlMethod';

	/*
	* @Override
	*/
	CallControlMethodActionProto.parameters = {
		"controlId" : {
			"required" : true, 
			"type" : "string"
		},
		"funcName" : {
			"required" : true, 
			"type" : "string"
		},
		"funcArgs" : {
			"required" : true, 
			"type" : "object"
		}
	};

	/*
	* @Override
	*/
	CallControlMethodActionProto.run = function(){
			var controlId = this.getParameter("controlId"),
				control = this.context.app.getControl(controlId),
				funcName = this.getParameter("funcName"),
				funcArgs = this.getParameter("funcArgs");
			
			if(typeof control === 'undefined'){
				throw new Error('Invalid control: ' + controlId);
			}

			control[funcName].apply(control, funcArgs);

			this.context._log.debug("Calling control method '" + funcName + "' of control '" + control.getId() + "'");
	};

}());