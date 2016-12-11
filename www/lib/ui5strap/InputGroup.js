/*
 * 
 * UI5Strap
 *
 * ui5strap.InputGroup
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

sap.ui.define(['./library', "pks/ui5strap/core/ControlBase"], function(ui5strapBs3Lib, ControlBase){
	
	"use strict";
	
	/**
	 * Constructor for a new InputGroup instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap input groups.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.InputGroup
	 * 
	 */
	var InputGroup = ControlBase.extend("ui5strap.InputGroup", {
		metadata : {
			interfaces : ["pks.ui5strap.bs3.IInputGroup"],
			
			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			properties : { 
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				}
			},
			aggregations : { 
				content : {
					
				} 
			}

		},
		
		renderer : function(rm, oControl) {
			var content = oControl.getContent(),
				size = oControl.getSize();
			
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('input-group');

			if(ui5strap.Size.Default !== size){
				rm.addClass('input-group-' + ui5strapBs3Lib.BSSize[size]);
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
					addonClass = null,
					itemMeta = item.getMetadata();
				
				if(itemMeta.isInstanceOf("pks.ui5strap.bs3.IInputGroupControl")){
					//Do nothing
				}
				else if(validAddonPosition){
					if(itemMeta.isInstanceOf("pks.ui5strap.bs3.IInputGroupButton")){
						addonClass = 'input-group-btn';
					}
					else if(itemMeta.isInstanceOf("pks.ui5strap.bs3.IInputGroupAddon")){
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
		}
	});
	
	return InputGroup;
});