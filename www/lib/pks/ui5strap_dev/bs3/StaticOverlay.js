/*
 * 
 * UI5Strap
 *
 * ui5strap.Overlay
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

sap.ui.define(['./library', "../core/ControlBase", "../core/Layer"], function(ui5strapBs3Lib, ControlBase, Layer){
	
	"use strict";
	
	/**
	 * Constructor for a new StaticOverlay instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating static overlays.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.StaticOverlay
	 * 
	 */
	var StaticOverlay = ControlBase.extend("pks.ui5strap.bs3.StaticOverlay", /** @lends pks.ui5strap.bs3.StaticOverlay.prototype */ {
		metadata : {

			library : "pks.ui5strap.bs3",
			defaultAggregation : "content",
			
			properties : { 
				backdrop : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : {
				content : {
					multiple : true
				}
			},
			
			events : {
				close : {
					
				}
			}
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.StaticOverlay.prototype
	 */
	StaticOverlayProto = StaticOverlay.prototype;
	
	StaticOverlayProto.exit = function(){
		if(this.getBackdrop()){
			this._$backdrop && this._$backdrop.off('click');
			delete(this._$backdrop);
		}
		
		this.oDelegate = null;
	};
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	StaticOverlayProto._getStyleClassPrefix = function(){
		return "ui5strapStaticOverlay";
	};
	
	/**
	 * @override
	 */
	StaticOverlayProto.onBeforeRendering = function(oEvent){
		if(this.getBackdrop()){
			this._$backdrop && this._$backdrop.off('click');
			delete(this._$backdrop);
		}
	};
	
	/**
	 * @override
	 */
	StaticOverlayProto.onAfterRendering = function(oEvent){
		if(this.getBackdrop()){
			var _this = this;
			this._$backdrop = this.$().find('#' + this.getId() + '--backdrop').on('click', function(){
				_this.fireClose({});
			});
		}
	};
	
	
	
	StaticOverlayProto.open = function(fCallback){
		var $oStatic = jQuery("#sap-ui-static");
		if($oStatic.length === 0){
			jQuery('body').prepend('<div id="sap-ui-static" data-sap-ui-area="sap-ui-static" style="height: 0px; width: 0px; overflow: hidden; float: left;"></div>');
		}
		
		console.log(this.getParent());
		
		if(!this.getParent()){
			if(this.oDelegate){
				//If a delegate is left for some reasons
				this.removeEventDelegate(this.oDelegate, this);
			}
			
			this.oDelegate = {
				onAfterRendering : function(){
					this.removeEventDelegate(this.oDelegate, this);
					this.oDelegate = null;
					
					Layer.register(this.getId(), this.$());
					Layer.setVisible(this.getId(), true, fCallback);
				}
			};
			
			this.addEventDelegate(this.oDelegate, this);
			
			this.addStyleClass("ui5strapLayer ui5strapLayer-type-Global ui5strap-hidden");
			this.placeAt('sap-ui-static');
		}
		else{
			Layer.setVisible(this.getId(), true, fCallback);
		}
	};
	
	StaticOverlayProto.close = function(fCallback){
		Layer.setVisible(this.getId(), false, fCallback);
	};
	
	return StaticOverlay;
});