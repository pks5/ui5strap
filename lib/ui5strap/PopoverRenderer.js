/**
 * 
 * Bootstrap paragraph renderer
 * 
 * Author: Philipp Knöller <info@http://pksoftware.de>
 * 
 * Copyright (c) 2013 PKSoftware.de
 * 
 * http://pksoftware.de
 * 
 */

jQuery.sap.declare("de.pksoftware.bootstrapui5.controls.PopoverRenderer");

de.pksoftware.bootstrapui5.controls.PopoverRenderer = {
};

de.pksoftware.bootstrapui5.controls.PopoverRenderer.render = function(rm, oControl) {
	var content = oControl.getContent(),
		contentLength = content.length,
		title = oControl.getTitle();

	rm.write("<div");
	rm.writeControlData(oControl);
	rm.addClass("popover-trigger");
	rm.writeClasses();
	rm.write(">");

	rm.write("<div");
	    
	rm.addClass("popover-trigger-label");
	rm.writeClasses();
	rm.write(">");
	rm.write(oControl.getText());
	rm.write("</div>");

	if(title.length > 0){
		rm.write("<div");
		   
		rm.addClass("popover-title");
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(title[0]);

		rm.write("</div>");
	}

	rm.write("<div");
	  
	rm.addClass("popover-content");
	rm.writeClasses();
	rm.write(">");

	for(var i = 0; i < contentLength; i++){
		rm.renderControl(content[i]);
	}
	
	rm.write("</div>");

	rm.write("</div>");
	    
};
