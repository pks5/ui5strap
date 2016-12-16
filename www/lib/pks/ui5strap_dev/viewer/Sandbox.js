/*
 * 
 * UI5Strap
 *
 * ui5strap.Sandbox
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

sap.ui.define(['./library', "../core/ControlBase"], function(ui5strapViewerLib, ControlBase){
	
	"use strict";
	
	/**
	 * Constructor for a new Sandbox instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating secure sandboxes for showing html pages.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.viewer.Sandbox
	 * 
	 */
	var Sandbox = ControlBase.extend("pks.ui5strap.viewer.Sandbox", /** @lends pks.ui5strap.viewer.Sandbox.prototype */{
		metadata : {

			library : "pks.ui5strap.viewer",
			
			properties : { 
				src : {
					type : "string", 
					defaultValue : ""
				}, 
				frameName : {
					type : "string", 
					defaultValue : ""
				}
			}

		},
		
		renderer : function(rm, oControl) {
			 rm.write("<div");
			 rm.writeControlData(oControl);
			 rm.addClass("sandbox");
			 rm.writeClasses();
			 rm.write(">");
			 rm.write("</div>");
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.Sandbox.prototype
	 */
	SandboxProto = Sandbox.prototype;

	/**
	 * Initialize
	 * @override
	 */
	SandboxProto.init = function(){
		var iframe = document.createElement('iframe');
		iframe.className = 'sandbox-iframe';
		iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-pointer-lock'; //allow-popups
		iframe.id = this.getId() + '----iframe';
		this.$iframe = jQuery(iframe);
	};

	/**
	 * Cleanup
	 * @override
	 */
	SandboxProto.exit = function(){
		this.$iframe.remove();
	};

	/**
	 * @override
	 */
	SandboxProto.setSrc = function(src){
		this.$iframe.attr('src', src);
		this.setProperty('src', src, this.getDomRef() ? true : false);
		return this;
	};
	
	/**
	 * 
	 */
	SandboxProto.goHistoryBack = function(){
		this.$iframe[0].contentWindow.history.go(-1);
	};
	
	/**
	 * 
	 */
	SandboxProto.goHistoryForward = function(){
		this.$iframe[0].contentWindow.history.go(1);
	};
	
	/**
	 * 
	 */
	SandboxProto.refreshContent = function(){
		this.$iframe[0].contentWindow.location.reload();
	};

	/**
	 * @override
	 */
	SandboxProto.setFrameName = function(frameName){
		this.$iframe.attr('frameName', frameName);
		this.setProperty('frameName', frameName, this.getDomRef() ? true : false);
		return this;
	};

	/**
	 * @override
	 */
	SandboxProto.onBeforeRendering = function(){
        if(this.getDomRef()){
            this.$iframe.detach();
		}
	};

	/**
	 * @override
	 */
	SandboxProto.onAfterRendering = function(){
		this.$().html(this.$iframe);
	};

	/**
	 * Sends a frame message.
	 */
	SandboxProto.sendMessage = function(appMessage, targetOrigin){
		this.$iframe[0].contentWindow.postMessage(appMessage, targetOrigin);
	};
	
	//Return Constructor
	return Sandbox;
});