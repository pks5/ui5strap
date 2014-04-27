/*
 * 
 * UI5Strap
 *
 * form.FormGroupRenderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.FormGroupRenderer");

	de_pksoftware.ui5strap.form.FormGroupRenderer = {

		severityToClass : {
			Success : "success",
			Warning : "warning",
			Error : "error"
		}
	};

	de_pksoftware.ui5strap.form.FormGroupRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			hasFeedback = oControl.getFeedback(),
			label = oControl.getLabel(),
			formControls = oControl.getControls();

			if(formControls.length === 0){
				throw new Error('You need to define at least one formControl.');
			}

		rm.write("<div");
		
		rm.writeControlData(oControl);

		rm.addClass('form-group');
		
		if(ui5strap.FormSeverity.None !== severity){
			rm.addClass('has-' + this.severityToClass[severity]);
		}
		
		if(hasFeedback){
			rm.addClass('has-feedback');
		}

		rm.writeClasses();
		rm.write(">");
		
		if('' !== label){
			rm.write("<label");
			rm.addClass("control-label");
			rm.writeAttribute('for', formControls[0].getId());

			var columsMedium = oControl.getLabelMedium(),
					columsLarge = oControl.getLabelLarge(),
					columsSmall = oControl.getLabelSmall(),
					columsExtraSmall = oControl.getLabelExtraSmall();

				if(0 !== columsMedium){
					rm.addClass("col-md-" + columsMedium);
				}
				if(0 !== columsLarge){
					rm.addClass("col-lg-" + columsLarge);
				}
				if(0 !== columsSmall){
					rm.addClass("col-sm-" + columsSmall);
				}
				if(0 !== columsExtraSmall){
					rm.addClass("col-xs-" + columsExtraSmall);
				}
			

			rm.writeClasses();
			rm.write(">");
			rm.writeEscaped(label);
			rm.write("</label>");
		}

		for(var i = 0; i < formControls.length; i++){ 
			var formControl = formControls[i];
			rm.renderControl(formControl);
		}
		
		
		rm.write("</div> ");
	};

}());
