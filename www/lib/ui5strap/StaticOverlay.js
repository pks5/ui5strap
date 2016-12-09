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

sap.ui.define(['./library', "pks/ui5strap/core/ControlBase", "pks/ui5strap/core/Layer"], function(uLib, ControlBase, Layer){
	
	/**
	 * Constructor for a new StaticOverlay instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating static overlays.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.StaticOverlay
	 * 
	 */
	var StaticOverlay = ControlBase.extend("ui5strap.StaticOverlay", {
		metadata : {

			library : "ui5strap",
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
	StaticOverlayProto = StaticOverlay.prototype;
	
	/**
	 * @Protected
	 */
	
	StaticOverlayProto._getStyleClassRoot = function(){
		return this.getLocal() ? " ui5strap-layer ui5strap-hidden" : "";
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