/*
 * 
 * a__
 *
 * GotoPageAction
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

	jQuery.sap.declare("a__.GotoPageAction");

	a__.ActionModule.extend("a__.GotoPageAction");

	var GotoPageActionProto = a__.GotoPageAction.prototype;

	/*
	* @Override
	*/
	GotoPageActionProto.namespace = "gotoPage";

	/*
	* @Override
	*/
	GotoPageActionProto.parameters = {
		"id" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"type" : {
			"required" : false, 
			"defaultValue" : "HTML", 
			"type" : "string"
		},
		"viewName" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : false, 
			"type" : "string"
		},
		"parameters" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		}
	};

	/*
	* @Override
	*/
	GotoPageActionProto.run = function(){
			var viewId = this.getParameter("id");
				viewType = this.getParameter("type");
				viewName = this.getParameter("viewName");
				target = this.getParameter("target");
				parameters = this.getParameter("parameters");

			this.context._log.debug("Goto page '" + viewId + "' on target '" + target + "' ...");
			
			var view = {
				id : viewId,
				viewName : viewName,
				type : viewType,
				target : target,
				parameters : parameters
			};

			this.context.app.getFrame().gotoPage(this.context.parameters.gotoPage);
	}

}());