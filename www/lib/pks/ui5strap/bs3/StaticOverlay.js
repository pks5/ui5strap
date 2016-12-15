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
	 * @version 1.0.0-SNAPSHOT
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
				},
				local : {
					type : "boolean",
					defaultValue : false
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
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	StaticOverlayProto._getStyleClassPrefix = function(){
		return "ui5strapStaticOverlay";
	};
	
	/**
	 * @Protected
	 */
	
	StaticOverlayProto._getStyleClassRoot = function(){
		return this.getLocal() ? " ui5strapLayer ui5strap-hidden" : "";
	};
	
	
	/**
	 * @override
	 */
	StaticOverlayProto.onBeforeRendering = function(oEvent){
		if(this.getLocal()){
			Layer.unregister(this.getId());
		}
		
		if(this.getBackdrop()){
			this._$backdrop && this._$backdrop.off('click');
			delete(this._$backdrop);
		}
	};
	
	/**
	 * @override
	 */
	StaticOverlayProto.onAfterRendering = function(oEvent){
		if(this.getLocal()){
			Layer.register(this.getId(), this.$());
		}
		
		if(this.getBackdrop()){
			var _this = this;
			this._$backdrop = this.$().find('#' + this.getId() + '--backdrop').on('click', function(){
				_this.fireClose({});
			});
		}
	};
	
	StaticOverlayProto.open = function(app, fCallback, transitionName){
		var _this = this;
		
		if(this.getLocal()){
			Layer.setVisible(this.getId(), true, fCallback);
		}
		else if(app){
			//TODO transition handling
			app.showOverlay(this, fCallback, transitionName);
		}
	};
	
	StaticOverlayProto.close = function(app, fCallback, transitionName){
		if(this.getLocal()){
			Layer.setVisible(this.getId(), false, fCallback);
		}
		else if(app){ 		
			//TODO transition handling
			app.hideOverlay(fCallback, transitionName);
		}
		
	};
	
	return StaticOverlay;
});