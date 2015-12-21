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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var CarouselRenderer = {};

	CarouselRenderer.render = function(rm, oControl) {
		var speed = oControl.getSpeed(),
			items = oControl.getItems(),
			itemsLength = items.length,
			carouselId = oControl.getId(),
			currentIndex = oControl.getIndex();
		 	
	 	rm.write("<div");
	    rm.writeControlData(oControl);
	    rm.addClass(oControl._cssClasses());
	    rm.writeClasses();
	    rm.write(">");

	    	rm.write("<div id='" + oControl.getId() + "--carousel-inner'");
		    rm.addClass("carousel-inner");
		    rm.writeClasses();
		    rm.write(">");

			    rm.write("<div id='" + oControl.getId() + "--carousel-lane'");
			    rm.addClass("carousel-lane");
			    rm.writeAttribute('style', 'width:' + (itemsLength * 100) + '%; left: ' + (-currentIndex * 100)+ '%; -webkit-transition: left ' + speed + 's; -moz-transition: left ' + speed + 's; -o-transition: left ' + speed + 's; transition: left ' + speed + 's;');
			    rm.writeClasses();
			    rm.write(">");

			    var itemWidth = 100 / itemsLength;
			    for(var i = 0; i < itemsLength; i++){
			    		rm.write("<div id='" + oControl.getId() + "--carousel-item-" + i + "'");
					    rm.addClass("carousel-item");
					    
					    if(i === currentIndex){
							rm.addClass("active");
						}
						rm.addClass("carousel-pos-" + (i - currentIndex));
						rm.writeAttribute('style', 'left:' + (i * itemWidth) + '%; width: ' + itemWidth + '%');
						rm.writeClasses();
					    rm.write(">");
					    rm.renderControl(items[i]);
					    
					    rm.write("</div>");
			    }
			    
				rm.write("</div>");

			rm.write("</div>"); //End carousel-inner
		    
		    if(oControl.getInnerOverflow() === ui5strap.Visibility.Covered){
			    rm.write("<div id='" + oControl.getId() + "--carousel-cover-prev'");
			    rm.addClass("carousel-cover carousel-cover-prev");
			    rm.writeClasses();
			    rm.write(">");
			    rm.write("</div>");

			    rm.write("<div id='" + oControl.getId() + "--carousel-cover-next'");
			    rm.addClass("carousel-cover carousel-cover-next");
			    rm.writeClasses();
			    rm.write(">");
			    rm.write("</div>");
			}

			if(oControl.getControls()){ 
		    	    rm.write("<a");
				    rm.addClass("left carousel-control carousel-control-prev");
				    rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-left carousel-control-prev"></span>');
				    rm.write("</a>");
			}

			if("" !== oControl.getLabel()){ 
			    rm.write("<div id='" + oControl.getId() + "--carousel-label'");
			    rm.addClass("carousel-label");
			    rm.writeClasses();
			    rm.write(">");
			    rm.write("</div>");
			}

			if(oControl.getControls()){
				    rm.write("<a");
				    rm.addClass("right carousel-control carousel-control-next");
				    rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-right carousel-control-next"></span>');
				    rm.write("</a>");
			}
				
			if(oControl.getPagination()){ 
				    rm.write("<ol id='" + oControl.getId() + "--carousel-indicators'");
				    rm.addClass("carousel-indicators");
				    rm.writeClasses();
				    rm.write(">");
				    for(var i = 0; i < itemsLength; i++){
			    		rm.write("<li id='" + oControl.getId() + "--carousel-indicator-" + i + "'");
			    		rm.addClass("carousel-indicator");
			    		if(i === currentIndex){
					    	rm.addClass("active");
						}
						rm.writeAttribute('data-slide-to', i);
						rm.writeClasses();
					    rm.write(">");
						rm.write("</li>");
					}
				    rm.write("</ol>");
			}

		var content = oControl.getContent(),
			contentLength = content.length;
		for(var i = 0; i < contentLength; i++){
			rm.renderControl(content[i]);
		}
		rm.write("</div>");
	};
	
	return CarouselRenderer;

}, true);
