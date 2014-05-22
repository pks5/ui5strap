/*
 * 
 * UI5Strap
 *
 * Modal
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.ModalRenderer");

	ui5strap.ModalRenderer = {};

	ui5strap.ModalRenderer.render = function(rm, oControl) {
		var header = oControl.getHeader(),
			body = oControl.getBody(),
			footer = oControl.getFooter();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('modal' + (oControl.getAnimate() ? ' fade' : ''));
		rm.writeClasses();
		rm.write(">");
		
			rm.write('<div class="modal-dialog">');
			rm.write('<div class="modal-content">');

			if(header.length > 0){
				rm.write('<div class="modal-header">');
				for(var i = 0; i < header.length; i++){ 
					rm.renderControl(header[i]);
				}
				rm.write("</div>");
			}

			if(body.length > 0){
				rm.write('<div class="modal-body">');
				for(var i = 0; i < body.length; i++){ 
					rm.renderControl(body[i]);
				}
				rm.write("</div>");
			}

			if(footer.length > 0){
				rm.write('<div class="modal-footer">');
				for(var i = 0; i < footer.length; i++){ 
					rm.renderControl(footer[i]);
				}
				rm.write("</div>");
			}
			
			rm.write("</div>");
			rm.write("</div>");
		rm.write("</div>");
	};

}());
