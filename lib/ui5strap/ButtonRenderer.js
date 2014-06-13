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

	    ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	ui5strap.ButtonRenderer.renderContent = function(rm, oControl) {
		ui5strap.RenderUtils.renderContent(rm, oControl);
	};

	ui5strap.ButtonRenderer.startRender = function(rm, oControl, options) {
		var size = oControl.getSize(),
			action = oControl.getBsAction(),
			type = oControl.getType(),
			severity = oControl.getSeverity(),
			title = oControl.getTitle();

		rm.write("<button");
	    
	    //Modal close button
		if(action === ui5strap.BsAction.DismissModal){
			rm.writeAttribute('data-dismiss', 'modal');	
		}
		
		//Navbar toggle
		else if(action === ui5strap.BsAction.ToggleNavbar){
			rm.addClass("btn-toggle-navbar");
		}
		//Sidenav toggle
		else if(action === ui5strap.BsAction.ToggleSidenav){
			rm.addClass("btn-toggle-sidenav");
		}

		//Button is used as dropdown toggle within a ButtonDropdown
	    if('toggleDropdown' in options){
	    	rm.writeAttribute('id', oControl.getId() + '---' + ( options.toggleDropdown ? 'toggle' : 'button') );

	    	if(true === options.toggleDropdown){
		    	if(action !== ui5strap.BsAction.ToggleDropdown){ 
		    		//rm.writeAttribute("data-toggle", "dropdown");
		    		rm.addClass("dropdown-toggle");
		    	}
		    }
	    }
	    else{
	    	
	    	rm.writeControlData(oControl);
	    
	    }

	    if('' !== title){
	    	rm.writeAttribute('title', title);
	    }

	    if(type === ui5strap.ButtonType.Button || ui5strap.ButtonType.Block === type){
		    rm.addClass("btn");
		    rm.addClass("btn-" + ui5strap.BSSeverity[severity]);
		    
			if(ui5strap.Size.Default !== size){
		    	rm.addClass('btn-' + ui5strap.BSSize[size]);
		    }

		    if(ui5strap.ButtonType.Block === type){
				rm.addClass("btn-block");
			}
		}
		else if(type === ui5strap.ButtonType.Link){
			rm.addClass("btn btn-link");
		}
		else if(type === ui5strap.ButtonType.Close || type === ui5strap.ButtonType.Icon){
			rm.addClass("close");
		}

	    if(oControl.getSelected()){
			rm.addClass("active");
		}
	
		if(!oControl.getEnabled()){
			rm.writeAttribute("disabled", "disabled");
		}

		ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-btn');

	    rm.writeClasses();
	    rm.write(">");
	};

	ui5strap.ButtonRenderer.endRender = function(rm, oControl){
		rm.write("</button>");
	};

}());
