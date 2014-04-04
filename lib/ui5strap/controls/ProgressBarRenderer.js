/*
 * 
 * UI5Strap
 *
 * Progress bar Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.ProgressBarRenderer");

	de_pksoftware.ui5strap.controls.ProgressBarRenderer = {
	};

	de_pksoftware.ui5strap.controls.ProgressBarRenderer.render = function(rm, oControl) {
		var type = oControl.getType(),
			labelFormat = oControl.getLabelFormat(),
			value = oControl.getValue(),
			maxValue = oControl.getMaxValue(),
			minValue = oControl.getMinValue();
		var percentage = value / (maxValue - minValue) * 100;

		percentage = Math.round(percentage * 100) / 100;

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('progress-bar')
		
		if('default' !== type){
			rm.addClass('progress-bar-' + type);
		}

		rm.writeAttribute('style', 'width:' + percentage + '%');

		rm.writeClasses();
		rm.write(">");
		
			if('' !== labelFormat){
				rm.write(labelFormat.replace('[val]', value).replace('[min]', minValue).replace('[max]', maxValue).replace('[per]', percentage));
			}

		rm.write("</div>");
	};

}());