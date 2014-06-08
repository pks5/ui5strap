/*
 * 
 * a__
 *
 * NavigationAction
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

	jQuery.sap.declare("a__.NavigationAction");

	a__.ActionModule.extend("a__.NavigationAction");

	var NavigationActionProto = a__.NavigationAction.prototype;

	/*
	* @Override
	*/
	NavigationActionProto.namespace = "navigation";

	/*
	* @Override
	*/
	NavigationActionProto.parameters = {
		"viewId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewType" : {
			"required" : false, 
			"defaultValue" : "HTML", 
			"type" : "string"
		},
		"viewSrc" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : true, 
			"type" : "string"
		},
		"frame" : {
			"required" : false, 
			"defaultValue" : "SAPPLICATION", 
			"type" : "string"
		},
		"viewParam" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		}
	};

	/*
	* @Override
	*/
	NavigationActionProto.run = function(){
			var viewId = this.getParameter("viewId");
				viewType = this.getParameter("viewType");
				viewSrc = this.getParameter("viewSrc");
				navigationTarget = this.getParameter("target");
				navigationParameters = this.getParameter("viewParam");
				frame = this.getParameter("frame");

			this.context._log.debug("Navigating to view '" + viewId + "' on target '" + navigationTarget + "' ...");
			
			var view = {
				id : viewId,
				viewName : viewSrc,
				type : viewType,
				frame : frame,
				target : navigationTarget,
				parameters : navigationParameters,
				writeHistory: true
			};

			this.context.app.navigate(view);
	}

}());