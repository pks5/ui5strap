/*
 * 
 * UI5Strap
 *
 * Image Renderer
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

	jQuery.sap.declare("ui5strap.ImageRenderer");

	ui5strap.ImageRenderer = {
		shapeToClass : {
			Rounded : 'img-rounded',
			Circle : 'img-circle',
			Thumbnail : 'img-thumbnail'
		}
	};

	ui5strap.ImageRenderer.render = function(rm, oControl) {
		var dataSrc = oControl.getDataSrc(),
			src = oControl.getSrc(),
			width = oControl.getWidth(),
			height = oControl.getHeight(),
			shape = oControl.getShape(),
			title = oControl.getTitle();

		rm.write("<img");
		rm.writeControlData(oControl);
		if(oControl.getResponsive()){
			rm.addClass('img-responsive');
		}
		if(shape in this.shapeToClass){
			rm.addClass(this.shapeToClass[shape]);
		}
		rm.writeClasses();
		
		if('' !== dataSrc){
			rm.writeAttribute('data-src', dataSrc);
		}
		if('' !== src){
			rm.writeAttribute('src', src);
		}
		if('' !== title){
			rm.writeAttribute('title', title);
		}
		if(-1 !== width){
			rm.writeAttribute('width', width);
		}
		if(-1 !== height){
			rm.writeAttribute('height', height);
		}
		rm.writeAttribute('alt', oControl.getAlt());
		
		rm.write("/>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());
