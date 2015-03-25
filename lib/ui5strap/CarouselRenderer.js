/*
 * 
 * UI5Strap
 *
 * ui5strap.CarouselRenderer
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

	jQuery.sap.declare("ui5strap.CarouselRenderer");

	ui5strap.CarouselRenderer = {
	};

	ui5strap.CarouselRenderer.render = function(rm, oControl) {
		var columsMedium = oControl.getColumnsMedium(),
			columsLarge = oControl.getColumnsLarge(),
			columsSmall = oControl.getColumnsSmall(),
			columsExtraSmall = oControl.getColumnsExtraSmall(),
			speed = oControl.getSpeed(),
			items = oControl.getItems(),
			itemsLength = items.length,
			carouselId = oControl.getId();
		 	
		 	rm.write("<div");
		    rm.writeControlData(oControl);
		    rm.addClass("carousel carousel-advanced");
		    if(oControl.getCentered()){
		    	rm.addClass("carousel-centered");
		    }
			if(0 < columsMedium){
				rm.addClass("carousel-md-" + columsMedium);
			}
			if(0 < columsLarge){
				rm.addClass("carousel-lg-" + columsLarge);
			}
			if(0 < columsSmall){
				rm.addClass("carousel-sm-" + columsSmall);
			}
			if(0 < columsExtraSmall){
				rm.addClass("carousel-xs-" + columsExtraSmall);
			}
		    rm.writeClasses();
		    rm.write(">");

			    rm.write("<div");
			    rm.addClass("carousel-viewport");
			    rm.writeClasses();
			    rm.write(">");

				    rm.write("<div id='" + oControl.getId() + "--carousel-lane'");
				    rm.addClass("carousel-lane");
				    rm.writeAttribute('style', 'width:' + (itemsLength * 100) + '%; left: ' + (-oControl.getIndex() * 100)+ '%; -webkit-transition: left ' + speed + 's; -moz-transition: left ' + speed + 's; -o-transition: left ' + speed + 's; transition: left ' + speed + 's;');
				    rm.writeClasses();
				    rm.write(">");

				    var itemWidth = 100 / itemsLength;
				    for(var i = 0; i < itemsLength; i++){
				    		rm.write("<div id='" + oControl.getId() + "--carousel-item-" + i + "'");
						    rm.addClass("carousel-item");
						    
						    if(i === oControl.getIndex()){
								rm.addClass("active");
							}
							rm.addClass("carousel-pos-" + (i - oControl.getIndex()));
							rm.writeAttribute('style', 'left:' + (i * itemWidth) + '%; width: ' + itemWidth + '%');
							rm.writeClasses();
						    rm.write(">");
						    rm.renderControl(items[i]);
						    
						    rm.write("</div>");
				    }
				    
					rm.write("</div>");

				rm.write("</div>");
			    
				if(oControl.getControls()){ 
			    	    rm.write("<a");
					    rm.addClass("left carousel-control");
					    rm.writeAttribute('data-slide', 'prev');
					   	rm.writeClasses();
					    rm.write(">");
					    rm.write('<span class="glyphicon glyphicon-chevron-left"></span>');
					    rm.write("</a>");
				}

				if(oControl.getShowIndex()){ 
				    rm.write("<div id='" + oControl.getId() + "--carousel-index'");
				    rm.addClass("carousel-index");
				    rm.writeClasses();
				    rm.write(">");
				    rm.write("</div>");
				}

				if(oControl.getControls()){
					    rm.write("<a");
					    rm.addClass("right carousel-control");
					    rm.writeAttribute('data-slide', 'next');
					    rm.writeClasses();
					    rm.write(">");
					    rm.write('<span class="glyphicon glyphicon-chevron-right"></span>');
					    rm.write("</a>");
				}
					
				if(oControl.getPagination()){ 
					    rm.write("<ol id='" + oControl.getId() + "--carousel-indicators'");
					    rm.addClass("carousel-indicators");
					    rm.writeClasses();
					    rm.write(">");
					    for(var i = 0; i < itemsLength; i++){
				    		rm.write("<li");
				    		rm.addClass("carousel-indicator");
				    		if(i === oControl.getIndex()){
						    	rm.addClass("active");
							}
							rm.writeAttribute('data-slide-to', i);
							rm.writeClasses();
						    rm.write(">");
							rm.write("</li>");
						}
					    rm.write("</ol>");
				}

		    rm.write("</div>");
	};

}());
