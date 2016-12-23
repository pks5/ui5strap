/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Modal
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

sap.ui.define(['./library', './StaticOverlay'], function(ui5strapBs3Lib, StaticOverlay){
	
	"use strict";
	
	/**
	 * Constructor for a new Modal instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap modals.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Modal
	 * 
	 */
	var Modal = StaticOverlay.extend("pks.ui5strap.bs3.Modal", /** @lends pks.ui5strap.bs3.Modal.prototype */ {
		metadata : {
			
			library : "pks.ui5strap.bs3",
			
			properties : { 
				
	        },
	        
			aggregations : { 
				header : {
					singularName: "header"
				},
				footer : {
					singularName: "footer"
				}
			},
			
			defaultAggregation : "content",
			
		    events : {
		        shown : {},
		        hidden : {}
		    }

		}
	}), 
	/**
	 * @alias pks.ui5strap.bs3.Modal.prototype
	 */
	ModalProto = Modal.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ModalProto._getStyleClassPrefix = function(){
		return "ui5strapModal";
	};
	
	/**
	 * TODO
	 */
	ModalProto._getStyleClassRoot = function(){
		return StaticOverlay.prototype._getStyleClassRoot.call(this) + " ui5strapStaticOverlay";
	};

  //Return Constructor
  return Modal;
});