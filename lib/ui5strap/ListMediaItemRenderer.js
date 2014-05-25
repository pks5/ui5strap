/*
 * 
 * UI5Strap
 *
 * ListMediaItem Renderer
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

	jQuery.sap.declare("ui5strap.ListMediaItemRenderer");

	ui5strap.ListMediaItemRenderer = {
	};

	ui5strap.ListMediaItemRenderer.render = function(rm, oControl) {
		var parent = oControl.getParent(),
			media = oControl.getMedia(),
			heading = oControl.getHeading(),
			tag = !(parent instanceof ui5strap.ListMedia) || parent.getContainer() ? 'div' : 'li';

		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('media');
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		rm.writeClasses();
		rm.write(">");

		if(null !== media){
			media.addStyleClass('pull-left');
			rm.renderControl(media);
		}

		rm.write('<div class="media-body">');

		if('' !== heading){
			rm.write('<h4 class="media-heading">');
			rm.writeEscaped(heading);
			rm.write('</h4>');
		}
		
		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		rm.write('</div>');
		    
		rm.write("</"+ tag + ">");
	};

}());
