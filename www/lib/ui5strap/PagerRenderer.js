/*
 * 
 * UI5Strap
 *
 * ui5strap.PagerRenderer
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

	jQuery.sap.declare("ui5strap.PagerRenderer");

	ui5strap.PagerRenderer = {};

	ui5strap.PagerRenderer.render = function(rm, oControl) {
		var previous = oControl.getPrevious(),
			next = oControl.getNext(),
			spread = oControl.getAligned();

		rm.write('<ul class="pager"');
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(">");
		
		rm.write('<li');
		if(spread){
			rm.addClass('previous');
		}
		if(oControl.getDisabledPrevious()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(previous);
		rm.write('</li>');
		
		rm.write('<li');
		if(spread){
			rm.addClass('next');
		}
		if(oControl.getDisabledNext()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(next);
		rm.write('</li>');
		

		rm.write("</ul>");

	};

}());