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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){
	
	var StaticOverlay = ControlBase.extend("ui5strap.StaticOverlay", {
		metadata : {

			library : "ui5strap",
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
	StaticOverlayProto = StaticOverlay.prototype;
	
	StaticOverlayProto.onBeforeRendering = function(oEvent){
		if(this.getBackdrop()){
			this._$backdrop && this._$backdrop.off('click');
			delete(this._$backdrop);
		}
	};
	
	StaticOverlayProto.onAfterRendering = function(oEvent){
		if(this.getBackdrop()){
			var _this = this;
			this._$backdrop = this.$().find('#' + this.getId() + '--backdrop').on('click', function(){
				_this.fireClose({});
			});
		}
	};
	
	StaticOverlayProto.addContent = function(oObject, bSuppressInvalidate){
		this.addAggregation("content", oObject, bSuppressInvalidate);
		oObject.addStyleClass('modal-dialog');
	};
	
	return StaticOverlay;
});