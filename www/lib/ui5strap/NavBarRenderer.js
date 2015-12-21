/*
 * 
 * UI5Strap
 *
 * ui5strap.NavBarRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var NavBarRenderer = {

		positionToClass : {
			FixedTop : "navbar-fixed-top",
			FixedBottom : "navbar-fixed-bottom",
			StaticTop : "navbar-static-top"
		},

		typeToClass : {
			Default : "navbar-default"
		}

	};

	NavBarRenderer.render = function(rm, oControl) {
		var brand = oControl.getBrand(),
			contentLeft = oControl.getContentLeft(),
			content = oControl.getContent(),
			contentRight = oControl.getContentRight(),
			position = oControl.getPosition(),
			type = oControl.getType(),
			collapse = oControl.getCollapse();

		var collapseId = oControl.getCollapseId();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("navbar");
		
		if(ui5strap.NavBarType.None !== type){
			rm.addClass(this.typeToClass[type]);
		}

		if(oControl.getInverse()){
			rm.addClass('navbar-inverse');
		}

		if(ui5strap.NavBarPosition.Default !== position){
			rm.addClass(this.positionToClass[position]);
		}

		if(contentLeft.length > 0){
			
		}

		if(contentRight.length > 0){
			
		}

		rm.writeClasses();
		rm.write(">");
		
		//Container
		rm.write("<div");
		rm.addClass(oControl.getFluid() ? "container-fluid" : "container");
		rm.writeClasses();
		rm.write(">");


		if(contentLeft.length > 0){
			rm.write("<div");
			rm.addClass('navbar-content-left');
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentLeft.length; i++){ 
		    	rm.renderControl(contentLeft[i]);
		    }
		    rm.write("</div>");
		}

		if(contentRight.length > 0){
			rm.write("<div");
			rm.addClass('navbar-content-right');
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentRight.length; i++){ 
		    	rm.renderControl(contentRight[i]);
		    };
		    rm.write("</div>");
		}

		if(null !== brand){

			rm.write("<div");
			rm.addClass("navbar-header");
			rm.writeClasses();
			rm.write(">");

			
			brand.addStyleClass('navbar-brand')
			rm.renderControl(brand);
			

			rm.write("</div>");

		}


		if(content.length > 0){
			rm.write("<div");
			rm.addClass("navbar-content");
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < content.length; i++){ 
		    	rm.renderControl(content[i]);
		    };
		    rm.write("</div>");
		}



		if(collapse.length > 0){
			//Collapse
			rm.write("<div id='" + collapseId + "'");
			rm.addClass("collapse navbar-collapse");
			rm.writeClasses();
			rm.write(">");

		    for(var i = 0; i < collapse.length; i++){ 
		    	rm.renderControl(collapse[i]);
		    };
		
			//End collapse
			rm.write("</div>");
		}

		

		//End container
		rm.write("</div>");

		//End control
		rm.write("</div>");
	};
	
	return NavBarRenderer;

}, true);
