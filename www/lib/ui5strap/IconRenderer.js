/*
 * 
 * UI5Strap
 *
 * ui5strap.IconRenderer
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

	jQuery.sap.declare("ui5strap.IconRenderer");

	ui5strap.IconRenderer = {

		sizeToClass : {
		    Large : "lg",
		    X2 : "2x",
		    X3 : "3x",
		    X4 : "4x",
		    X5 : "5x"
		  },

		 transformToClass : {
		    Rotate90 : "rotate-90",
		    Rotate180 : "rotate-180",
		    Rotate270 : "rotate-270",
		    FlipHorizontal : "flip-horizontal",
		    FlipVertical : "flip-vertical"
		  }
	};

	ui5strap.IconRenderer.render = function(rm, oControl) {
		var iconGroup = oControl.getIconSet(),
			size = oControl.getSize(),
			transform = oControl.getTransform(),
			severity = oControl.getSeverity(),
			prefix = iconGroup+'-',
			modPrefix = 'fa-';


		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-icon " + iconGroup);
		rm.addClass(prefix+oControl.getIcon());

		if(size !== ui5strap.IconSize.Default){
			rm.addClass(modPrefix+this.sizeToClass[size]);
		}

		if(transform !== ui5strap.IconTransform.Default){
			rm.addClass(modPrefix+this.transformToClass[transform]);
		}

		ui5strap.RenderUtils.alignment(rm, oControl);

		if(oControl.getFixedWidth()){
			rm.addClass(modPrefix+'fw')
		}

		if(oControl.getSpin()){
			rm.addClass(modPrefix+'spin')
		}

		if(oControl.getInverse()){
			rm.addClass(modPrefix+'inverse')
		}

		if(oControl.getBorder()){
			rm.addClass(modPrefix+'border')
		}

		if(ui5strap.IconType.FormFeedback === oControl.getType()){
			rm.addClass('form-control-feedback');
		}

		if(ui5strap.Severity.None !== severity){
			rm.addClass("text-" + ui5strap.BSSeverity[severity]);
		}
		rm.writeClasses();
		rm.write(">");
		rm.write("</span>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());