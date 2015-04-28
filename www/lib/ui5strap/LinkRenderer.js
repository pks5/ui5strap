/*
 * 
 * UI5Strap
 *
 * ui5strap.LinkRenderer
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
		var text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
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

		if(options.toggleDropdown){
			rm.writeAttribute('id', oControl.getId() + '---link');
			rm.addClass("dropdown-toggle");
	    }
	    else if(options.listLink){
			rm.writeAttribute('id', oControl.getId() + '---link');
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