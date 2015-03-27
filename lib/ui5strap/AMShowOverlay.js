/*
 * 
 * Ui5OS
 *
 * AMShowOverlay
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/ui5os
 *
 * ALL RIGHTS RESERVED
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.AMShowOverlay");

	ui5strap.ActionModule.extend("ui5strap.AMShowOverlay");

	var AMShowOverlayProto = ui5strap.AMShowOverlay.prototype;

	/*
	* @Override
	*/
	AMShowOverlayProto.namespace = 'showOverlay';

	/*
	* @Override
	*/
	AMShowOverlayProto.parameters = {
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
		"viewName" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : true, 
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
	AMShowOverlayProto.run = function(){

		var _this = this,
			viewId = this.getParameter("viewId"),
			viewType = this.getParameter("viewType"),
			viewName = this.getParameter("viewName"),
			target = this.getParameter("target"),
			parameters = this.getParameter("parameters"),
			app = this.context.app;

		var viewOptions = {
			"appId" : app.getId(),
			"id" : viewId,
			"type" : viewType,
			"viewName" : viewName,
			"target" : target,
			"parameters" : parameters
		};

		if(!(app instanceof ui5strap.AppSystem)){
			throw new Error('Only system apps can run ui5strap.AMShowOverlay');
		}

		app.getViewer().showOverlay(viewOptions, function AMShowOverlayRunComplete(){
			_this.fireEvents(ui5strap.ActionModule.EVENT_COMPLETED);
		});
	};

	/*
	* @Override
	*/
	AMShowOverlayProto.completed = function(){

	};

}());