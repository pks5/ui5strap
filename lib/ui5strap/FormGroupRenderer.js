/*
 * 
 * UI5Strap
 *
 * ui5strap.FormGroupRenderer
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

	jQuery.sap.declare("ui5strap.FormGroupRenderer");

	ui5strap.FormGroupRenderer = {

		severityToClass : {
			Success : "success",
			Warning : "warning",
			Error : "error"
		}
	};

	ui5strap.FormGroupRenderer.render = function(rm, oControl) {
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
