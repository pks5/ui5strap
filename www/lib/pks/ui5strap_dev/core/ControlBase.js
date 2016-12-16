/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.ControlBase
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

sap.ui.define(['./library', "sap/ui/core/Control", './BaseSupport', './OptionsSupport', "./Utils"], function(ui5strapCoreLib, SapControlBase, BaseSupport, OptionsSupport, Utils){
	
	"use strict";
	
	var _meta = {
		library : "pks.ui5strap.core",
		"abstract" : true,
		
		properties : {
			
		}
	};
	
	BaseSupport.meta(_meta);
	OptionsSupport.meta(_meta);
	
	/**
	 * Constructor for a new ControlBase instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Abstract base class for all ui5strap controls.
	 * @extends sap.ui.core.Control
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.core.ControlBase
	 * 
	 */
	var ControlBase = SapControlBase.extend("pks.ui5strap.core.ControlBase", /** @lends pks.ui5strap.core.ControlBase.prototype */ {
		metadata : _meta,
		renderer : null
	}),
	/**
	 * @alias pks.ui5strap.core.ControlBase.prototype
	 */
	ControlBaseProto = ControlBase.prototype;
	
	BaseSupport.proto(ControlBaseProto);
	OptionsSupport.proto(ControlBaseProto);
	
	/**
	 * Returns the computed value for a css property.
	 * 
	 * @Public
	 */
	ControlBaseProto.getComputedStyle = function(sCssRule) {
		return Utils.getComputedStyle(this.getDomRef(), sCssRule);
	};
	
	/**
	 * Checks whether the pixel value for the container width is
	 * already available.
	 * 
	 * @Private
	 */
	var _testCssReady = function(_this, callback, iTimeout) {
		window.clearTimeout(_this._waitRenderingTimer);
		_this._waitRenderingTimer = null;
		
		var oDomRef = _this.getDomRef();
		
		if(!oDomRef){
			//No DOM reference, so cancel waiting.
			return;
		}
		
		if(ui5strapCoreLib.polyfill.isDocumentHidden()){
			//Document is hidden
			_this._waitForResume(callback);
			
			return;
		}
		
		if (_this._waitRenderingTime >= iTimeout) {
			throw new Error("[" + _this.getId() + "] Cannot determine required CSS.");
		}
		
		//Test if the css is ready
		if (_this._isCssReady(oDomRef)) {
			jQuery.sap.log
			.debug("[" + _this.getId() + "] Required CSS is now available.");
			callback && callback();
		} else {
			jQuery.sap.log
					.debug("[" + _this.getId() + "] Required CSS isn't available yet.");

			_this._waitRenderingTimer = window.setTimeout(
					function() {
						_testCssReady(_this, callback, iTimeout);
					}, ui5strapCoreLib.options.intervalWaitForCss);
			
			_this._waitRenderingTime += ui5strapCoreLib.options.intervalWaitForCss;
		}
	};
	
	ControlBaseProto._isCssReady = function(oDomRef){
		return -1 !== Utils.getComputedStyle(oDomRef, "width").indexOf("px") && jQuery(oDomRef).height() > 0;
	};

	ControlBaseProto._waitForResume = function(callback, iTimeout){
		jQuery.sap.log
		.debug("Document is hidden. Waiting for resume...");
		
		var _this = this,
		fnListener = function(){
			if(!ui5strapCoreLib.polyfill.isDocumentHidden()){
				jQuery.sap.log
				.debug("Document is visible again.");
				document.removeEventListener(ui5strapCoreLib.polyfill.visibilityChange, fnListener, false);
				
				_this._waitForCss(callback, iTimeout);
			}
		};
		
		document.addEventListener(ui5strapCoreLib.polyfill.visibilityChange, fnListener, false);
		//TODO Cleanup on exit!!!
	};
	
	/**
	 * Waits until the pixel value for the container width is
	 * available.
	 * 
	 * @Protected
	 */
	ControlBaseProto._waitForCss = function(callback, iTimeout) {
		jQuery.sap.log
		.debug("[" + this.getId() + "] Waiting for required css rules...");
		
		//Reset the counter
		this._waitRenderingTime = 0;
		
		//Check if a existing timer is running.
		if(!this._waitRenderingTimer){
			_testCssReady(this, callback, iTimeout || ui5strapCoreLib.options.timeoutWaitForCss);
		}
	};
	
	return ControlBase;
});