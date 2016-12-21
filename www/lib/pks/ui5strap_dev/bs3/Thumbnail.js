/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Thumbnail
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
	 * Constructor for a new Thumbnail instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap thumbnails.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.1-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Thumbnail
	 * 
	 */
	var Thumbnail = ControlBase.extend("pks.ui5strap.bs3.Thumbnail", /** @lends pks.ui5strap.bs3.Thumbnail.prototype */ {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			properties : { 
				
			},
			aggregations : { 
				image : {
					type : "pks.ui5strap.bs3.Image",
					multiple : false
				},
				content : {
					singularName: "content"
				}
			}

		},
		renderer : function(rm, oControl) {
			var content = oControl.getContent(),
				image = oControl.getImage();
	
	
	
			rm.write("<div");
			
			rm.writeControlData(oControl);
			rm.addClass('thumbnail');
			
			rm.writeClasses();
			rm.write(">");
			
			if(null !== image){
				rm.renderControl(image);
			}
			
			rm.write('<div class="caption">');
			
			for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			}
			
			rm.write("</div></div>");
		}
	});
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	Thumbnail.prototype._getStyleClassPrefix = function(){
		return "ui5strapThumbnail";
	};
	
	return Thumbnail;
});