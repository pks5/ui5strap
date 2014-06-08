/*
 * 
 * a__
 *
 * AlertAction
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/a__
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("a__.AlertAction");

	a__.ActionModule.extend("a__.AlertAction");

	var AlertActionProto = a__.AlertAction.prototype;

	/*
	* @Override
	*/
	AlertActionProto.namespace = 'alert';

	/*
	* @Override
	*/
	AlertActionProto.parameters = {
		"message" : {
			"required" : true,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AlertActionProto.run = function(){
		alert(this.getParameter('message'));
	};

}());