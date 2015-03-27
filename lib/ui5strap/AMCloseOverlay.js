/*
 * 
 * Liberty Framework
 *
 * CloseOverlayAction
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/coolui5
 *
 * ALL RIGHTS RESERVED
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.AMCloseOverlay");

	ui5strap.ActionModule.extend("ui5strap.AMCloseOverlay");

	var AMCloseOverlayProto = ui5strap.AMCloseOverlay.prototype;

	/*
	* @Override
	*/
	AMCloseOverlayProto.namespace = 'closeOverlay';

	/*
	* @Override
	*/
	AMCloseOverlayProto.parameters = {
		
	};

	/*
	* @Override
	*/
	AMCloseOverlayProto.run = function(){
		if(!(this.context.app instanceof ui5strap.AppSystem)){
			throw new Error('Only system apps can run ui5strap.AMCloseOverlay');
		}

		var _this = this;
		this.context.app.getViewer().hideOverlay(function CloseOverlayActionComplete(){
			_this.fireEvents(ui5strap.ActionModule.EVENT_COMPLETED);
		});
	};

	/*
	* @Override
	*/
	AMCloseOverlayProto.completed = function(){

	};

}());