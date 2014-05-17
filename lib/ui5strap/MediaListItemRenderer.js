/*
 * 
 * UI5Strap
 *
 * MediaListItem Renderer
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

	jQuery.sap.declare("ui5strap.MediaListItemRenderer");

	ui5strap.MediaListItemRenderer = {
	};

	ui5strap.MediaListItemRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			parent = oControl.getParent(),
			media = oControl.getMedia(),
			heading = oControl.getHeading(),
			tag = !(parent instanceof ui5strap.MediaList) || parent.getUseContainer() ? 'div' : 'li';

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

		rm.write('<p>');
		rm.writeEscaped(oControl.getText());
		rm.write('</p>');

		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		rm.write('</div>');
		    
		rm.write("</"+ tag + ">");
	};

}());
