/*
 * 
 * UI5Strap
 *
 * ui5strap.ControlBase
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

sap.ui.define(['./library', './BaseSupport', './PositionSupport', './OptionsSupport'], function(library, BaseSupport, PositionSupport, OptionsSupport){

	var _meta = {
		library : "ui5strap",
		"abstract" : true,
		
		properties : {
			
		}
	};
	
	BaseSupport.meta(_meta);
	PositionSupport.meta(_meta);
	OptionsSupport.meta(_meta);
	
	var ControlBase = ui5strap.Control.extend("ui5strap.ControlBase", {
		metadata : _meta
	}),
	ControlBaseProto = ControlBase.prototype;
	
	BaseSupport.proto(ControlBaseProto);
	PositionSupport.proto(ControlBaseProto);
	OptionsSupport.proto(ControlBaseProto);
	
	/**
	 * Returns the computed value for a css property.
	 * 
	 * @Public
	 */
	ControlBaseProto.getComputedStyle = function(strCssRule) {
		return library.Utils.getComputedStyle(this.$()[0], strCssRule);
	};
	
	/**
	 * Checks whether the pixel value for the container width is
	 * already available.
	 * 
	 * @Private
	 */
	var _waitForRendering = function(_this, cssProperty, callback) {
		if (!_this.getDomRef() || _this._waitRenderingTime >= ui5strap.options.waitRenderingTimeout) {
			window.clearTimeout(_this._waitRenderingTimer);
			_this._waitRenderingTimer = null;
			
			throw new Error("Cannot render control: required CSS could not be loaded.");
		}
		
		var width = _this.getComputedStyle(cssProperty);
		// We want to find out whether we can get the width of
		// container in pixels.
		// This is needed if the width of the container is
		// specified in percent.
		// Its takes a short moment until the CSS is rendered.
		if (-1 !== width.indexOf('px')) {
			window.clearTimeout(_this._waitRenderingTimer);
			_this._waitRenderingTimer = null;
			
			callback && callback();
		} else {
			jQuery.sap.log
					.debug("Control CSS is not rendered yet...");

			_this._waitRenderingTimer = window.setTimeout(
					function() {
						_waitForRendering(_this, cssProperty, callback);
					}, ui5strap.options.waitRenderingInterval);
			
			_this._waitRenderingTime += ui5strap.options.waitRenderingInterval;
		}
	};

	/**
	 * Waits until the pixel value for the container width is
	 * available.
	 * 
	 * @Protected
	 */
	ControlBaseProto._waitForRendering = function(cssProperty, callback) {
		//Reset the counter
		this._waitRenderingTime = 0;
		
		//Check if a existing timer is running.
		if(!this._waitRenderingTimer){
			_waitForRendering(this, cssProperty, callback);
		}
	};
	
	return ControlBase;
});