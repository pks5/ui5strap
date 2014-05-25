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

	jQuery.sap.declare("ui5strap.ProgressBarRenderer");

	ui5strap.ProgressBarRenderer = {
	};

	ui5strap.ProgressBarRenderer.render = function(rm, oControl) {
		var type = oControl.getSeverity(),
			labelFormat = oControl.getLabelFormat(),
			value = oControl.getValue(),
			maxValue = oControl.getMaxValue(),
			minValue = oControl.getMinValue(),
			percentage = oControl.getProgress();
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('progress-bar')
		
		if(ui5strap.Severity.None !== type){
			rm.addClass('progress-bar-' + ui5strap.BSSeverity[type]);
		}

		rm.writeAttribute('style', 'width:' + percentage + '%');

		rm.writeClasses();
		rm.write(">");
		
			if('' !== labelFormat){
				rm.write(
					labelFormat
					.replace('[val]', value)
					.replace('[min]', minValue)
					.replace('[max]', maxValue)
					.replace('[left]', maxValue - value)
					.replace('[progress]', percentage));
			}

		rm.write("</div>");
	};

}());