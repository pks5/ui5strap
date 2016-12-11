/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Page
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
	 * Constructor for a new Page instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating pages with header and footer.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Page
	 * 
	 */
	var Page = ControlBase.extend("pks.ui5strap.bs3.Page", {
		metadata : {

			// ---- object ----
			defaultAggregation : "body",
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			properties : { 
				
			},
			aggregations : { 
				head : {
					multiple : false
				},
				body : {
					singularName: "body"
				},
				footer : {
					multiple : false
				}
			}

		}
	}),
	PageProto = Page.prototype;

	/**
	 * @Protected
	 * @Override
	 */
	PageProto._getStyleClassRoot = function(){
		var styleClass = "";
		if(this.getHead()){
			styleClass += " ui5strapPage-flag-WithHead";
		}
		if(this.getFooter()){
			styleClass += " ui5strapPage-flag-WithFooter";
		}
		return styleClass;
	};
	
	return Page;
});