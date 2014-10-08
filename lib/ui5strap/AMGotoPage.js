/*
 * 
 * ui5strap
 *
 * AMGotoPage
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

(function(){

	jQuery.sap.declare("ui5strap.AMGotoPage");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMGotoPage");

	var AMGotoPageProto = ui5strap.AMGotoPage.prototype;

	/*
	* @Override
	*/
	AMGotoPageProto.namespace = "gotoPage";

	/*
	* @Override
	*/
	AMGotoPageProto.parameters = {
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
			"defaultValue" : null,
			"type" : "string"
		},
		"writeHistory" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		},
		"bookmarkable" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : true
		},
		"virtual" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
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
	AMGotoPageProto.run = function(){
			var viewId = this.getParameter("id"),
				viewType = this.getParameter("type"),
				viewName = this.getParameter("viewName"),
				target = this.getParameter("target"),
				writeHistory = this.getParameter("writeHistory"),
				bookmarkable = this.getParameter("bookmarkable"),
				virtual = this.getParameter("virtual"),
				parameters = this.getParameter("parameters");

			this.context._log.debug("Goto page '" + viewId + "' on target '" + target + "' ...");
			
			var view = {
				id : viewId,
				viewName : viewName,
				type : viewType,
				target : target,
				writeHistory : writeHistory,
				bookmarkable : bookmarkable,
				virtual : virtual,
				parameters : parameters
			};

			this.context.app.getFrame().gotoPage(this.context.parameters.gotoPage);
	}

}());