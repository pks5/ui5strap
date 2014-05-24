/*
 * 
 * UI5Strap
 *
 * Link Renderer
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

	jQuery.sap.declare("ui5strap.LinkRenderer");

	ui5strap.LinkRenderer = {

		typeToClass : {
			Thumbnail : "thumbnail"
		}
	};

	ui5strap.LinkRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl, { standalone : true });
		
		this.renderContent(rm, oControl);
		
		this.endRender(rm, oControl);

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	ui5strap.LinkRenderer.renderContent = function(rm, oControl){
		ui5strap.RenderUtils.renderContent(rm, oControl);
	};

	ui5strap.LinkRenderer.startRender = function(rm, oControl, options) {
		var href = oControl.getHref(),
			title = oControl.getTitle(),
			action = oControl.getBsAction(),
			target = oControl.getTarget();

		rm.write("<a");

		if(action === ui5strap.BsAction.DismissModal){
			rm.writeAttribute('data-dismiss', 'modal');	
		}
		else if(action === ui5strap.BsAction.DismissAlert){
			rm.writeAttribute('data-dismiss', 'alert');	
		}
		else if(action === ui5strap.BsAction.ToggleDropdown){
			rm.writeAttribute('data-toggle', 'dropdown');
			rm.addClass("dropdown-toggle");
		}

		if(options.toggleDropdown){
			rm.writeAttribute('id', oControl.getId() + '---link');
			if(action !== ui5strap.BsAction.ToggleDropdown){
	    		//rm.writeAttribute("data-toggle", "dropdown");
	    		rm.addClass("dropdown-toggle");
	    	}
		}
		else{
			rm.writeControlData(oControl);
			
			if(options.standalone){
				var type = oControl.getType();
				if(ui5strap.LinkType.Default !== type){
					rm.addClass(this.typeToClass[type]);
				}
			}
		}

		rm.writeClasses();
		    
		if('' !== href){
			rm.writeAttribute('href', href);
		}

		if('' !== target){
			rm.writeAttribute('target', target);
		}

		if('' !== title){
	    	rm.writeAttribute('title', title);
	    }

		rm.write(">");
	};

	ui5strap.LinkRenderer.endRender = function(rm, oControl){
		rm.write("</a>");
	};

}());