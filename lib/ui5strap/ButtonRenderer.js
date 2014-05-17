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

	jQuery.sap.declare("ui5strap.ButtonRenderer");

	ui5strap.ButtonRenderer = {};

	ui5strap.ButtonRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl, {});

	    this.renderContent(rm, oControl);

	    this.endRender(rm, oControl);

	    if(oControl.getTrailingSpace()){
	    	rm.write(' ');
	    }
	};

	ui5strap.ButtonRenderer.renderContent = function(rm, oControl) {
		var content = oControl.getContent(),
			buttonText = oControl.getText(),
			buttonHtml = oControl.getHtml();

		if("" !== buttonText){
	    	rm.writeEscaped(buttonText);
	    }

	    if("" !== buttonHtml){
	    	rm.write(buttonHtml);
	    }

	    for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
	};

	ui5strap.ButtonRenderer.startRender = function(rm, oControl, options) {
		var size = oControl.getSize(),
			navbarAlign = oControl.getNavbarAlign();

		rm.write("<button");
	    

	    if(options.toggleDropdown){
	    	rm.writeAttribute('id', oControl.getId() + '---button');
	    	rm.writeAttribute("data-toggle", "dropdown");
	    	rm.addClass("dropdown-toggle");
	    }
	    else{
	    	rm.writeControlData(oControl);
	    }

	    rm.addClass("btn");
	    
	    var buttonType = oControl.getSeverity();

	    rm.addClass("btn-" + ui5strap.BSSeverity[buttonType]);
	    

	    if(ui5strap.Size.Default !== size){
	    	rm.addClass('btn-' + ui5strap.BSSize[size]);
	    }

	    if(oControl.getSelected()){
			rm.addClass("active");
		}
	
		if(!oControl.getEnabled()){
			rm.addClass("disabled");
		}

		if(oControl.getBlock()){
			rm.addClass("btn-block");
		}

		if(ui5strap.NavBarAlignment.None !== navbarAlign){
			rm.addClass('navbar-btn');
			if(ui5strap.NavBarAlignment.Default !== navbarAlign){
				rm.addClass(ui5strap.BSNavBarAlignment[navbarAlign]);
			}
		}

	    rm.writeClasses();
	    rm.write(">");
	};

	ui5strap.ButtonRenderer.endRender = function(rm, oControl){
		rm.write("</button>");
	};

}());
