/*
 * 
 * UI5Strap
 *
 * ui5strap.Pager
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	/**
	 * Constructor for a new Pager instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap pagers.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.0
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Pager
	 * 
	 */
	var Pager = ControlBase.extend("ui5strap.Pager", {
		metadata : {

			// ---- control specific ----
			library : "ui5strap",
			
			properties : {
				aligned : {
					type : "boolean",
					defaultValue : false
				},
				disabledPrevious : {
					type : "boolean",
					defaultValue : false
				},
				disabledNext : {
					type : "boolean",
					defaultValue : false
				}
			},
			aggregations : { 
				previous : {
					type : "ui5strap.Link",
					multiple:false
				}, 
				next : {
					type : "ui5strap.Link",
					multiple:false
				}
				
			}

		},
		
		renderer : function(rm, oControl) {
			var previous = oControl.getPrevious(),
				next = oControl.getNext(),
				spread = oControl.getAligned();

			rm.write('<ul');
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
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

		}
	}), PagerProto = Pager.prototype;
	
	/**
	 * @Protected
	 * @Override
	 */
	PagerProto._getStyleClassDesign = function(){
		var styleClass = " pager";
		return styleClass;
	};
	
	return Pager;
});