/*
 * 
 * UI5Strap
 *
 * Button Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.ButtonRenderer");

	de_pksoftware.ui5strap.controls.ButtonRenderer = {};

	de_pksoftware.ui5strap.controls.ButtonRenderer.render = function(rm, oControl) {
			var content = oControl.getContent(),
				size = oControl.getSize();

			rm.write("<button");
		    rm.writeControlData(oControl);
		    rm.addClass("btn");
		    
		    var buttonType = oControl.getType();

		    rm.addClass("btn-" + buttonType);
		    

		    var buttonClass = oControl.getCssClass();

		    if("" !== buttonClass){
		    	rm.addClass(buttonClass);
		    }

		    if("" !== size){
		    	rm.addClass('btn-' + size);
		    }

		    if(oControl.getActive()){
				rm.addClass("active");
			}
		
			if(oControl.getDisabled()){
				rm.addClass("disabled");
			}

		    rm.writeClasses();
		    rm.write(">");

		    var buttonText = oControl.getText();

		    if("" !== buttonText){
		    	rm.writeEscaped(buttonText);
		    }

		    var buttonHtml = oControl.getHtml();

		    if("" !== buttonHtml){
		    	rm.write(buttonHtml);
		    }

		    for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			}

		    rm.write("</button>");
	};

}());
