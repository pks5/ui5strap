/*
 * 
 * UI5Strap
 *
 * ui5strap.InputGroupRenderer
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

	jQuery.sap.declare("ui5strap.InputGroupRenderer");

	ui5strap.InputGroupRenderer = {
	};

	ui5strap.InputGroupRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			size = oControl.getSize();
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('input-group');

		if(ui5strap.Size.Default !== size){
			rm.addClass('input-group-' + ui5strap.BSSize[size]);
		}
		rm.writeClasses();
		rm.write(">");

		var contentLength = content.length; 

		if(contentLength > 3){
			throw new Error('Not more than 3 controls allowed within an imput group!');
		}
		    
		for(var i = 0; i < contentLength; i++){ 
			var item = content[i],
				validAddonPosition = i === 0 || i === content.length - 1,
				addonClass = null;
			
			if(item instanceof ui5strap.TextInput || item instanceof ui5strap.SelectBox){

			}
			else if(validAddonPosition){
				if(item instanceof ui5strap.Button){
					addonClass = 'input-group-btn';
				}
				else if(item instanceof ui5strap.Text ||
						item instanceof ui5strap.Icon ||
						item instanceof ui5strap.Checkbox || 
						item instanceof ui5strap.RadioButton){
					addonClass = 'input-group-addon';
				}
				else{
					throw new Error('Control is not a valid input group addon!');
				}
			}
			else{
				throw new Error('Control is not allowed witin InputGroup!');
			}

			if(null !== addonClass){
				rm.write('<span class="' + addonClass + '">');
				rm.renderControl(item);
				rm.write("</span>");
			}
			else{
				rm.renderControl(item);
			}
		}
		    
		rm.write("</div>");
	};

}());
