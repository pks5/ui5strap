/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Pager
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

sap.ui.define(['./library', "../core/ControlBase"], function(ui5strapBs3Lib, ControlBase){
	
	"use strict";
	
	/**
	 * Constructor for a new Pager instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap pagers.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Pager
	 * 
	 */
	var Pager = ControlBase.extend("pks.ui5strap.bs3.Pager", /** @lends pks.ui5strap.bs3.Pager.prototype */ {
		metadata : {

			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			
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
					type : "pks.ui5strap.bs3.Link",
					multiple:false
				}, 
				next : {
					type : "pks.ui5strap.bs3.Link",
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
	}), 
	/**
	 * @alias pks.ui5strap.bs3.Pager.prototype
	 */
	PagerProto = Pager.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	PagerProto._getStyleClassPrefix = function(){
		return "ui5strapPager";
	};
	
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