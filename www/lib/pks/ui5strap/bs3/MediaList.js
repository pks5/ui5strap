/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.MediaList
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

sap.ui.define(['./library', '../core/ListBase'], function(ui5strapBs3Lib, ListBase){
	
	"use strict";
	
	/**
	 * Constructor for a new MediaList instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap media lists.
	 * @extends pks.ui5strap.core.ListBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.MediaList
	 * 
	 */
	var MediaList = ListBase.extend("pks.ui5strap.bs3.MediaList", /** @lends pks.ui5strap.bs3.MediaList.prototype */ {
		metadata : {

			library : "pks.ui5strap.bs3",
			
			defaultAggregation : "items",
			
			properties : { 
				container : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				items : {
					type : "pks.ui5strap.bs3.MediaListItem",
					singularName: "item"
				} 
			}

		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.MediaList.prototype
	 */
	MediaListProto = MediaList.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	MediaListProto._getStyleClassPrefix = function(){
		return "ui5strapMediaList";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	MediaListProto._getStyleClassDesign = function(){
		return " media-list";
	};
	
	return MediaList;
});