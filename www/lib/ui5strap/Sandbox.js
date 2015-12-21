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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Sandbox = ControlBase.extend("ui5strap.Sandbox", {
		metadata : {

			library : "ui5strap",
			
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

		}
	}),
	SandboxProto = Sandbox.prototype;

	SandboxProto.init = function(){
		var iframe = document.createElement('iframe');
		iframe.className = 'sandbox-iframe';
		iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-pointer-lock'; //allow-popups
		iframe.id = this.getId() + '----iframe';
		this.$iframe = jQuery(iframe);
	};


	SandboxProto.setSrc = function(src){
		this.$iframe.attr('src', src);
		this.setProperty('src', src, this.getDomRef());
	};
	
	SandboxProto.goHistoryBack = function(){
		this.$iframe[0].contentWindow.history.go(-1);
	};
	
	SandboxProto.goHistoryForward = function(){
		this.$iframe[0].contentWindow.history.go(1);
	};
	
	SandboxProto.refreshContent = function(){
		this.$iframe[0].contentWindow.location.reload();
	};

	SandboxProto.setFrameName = function(frameName){
		this.$iframe.attr('frameName', frameName);
		this.setProperty('frameName', frameName, this.getDomRef());
	};

	SandboxProto.onBeforeRendering = function(){
        if(this.getDomRef()){
            this.$iframe.detach();
		}
	};

	SandboxProto.onAfterRendering = function(){
		this.$().html(this.$iframe);
	};

	SandboxProto.sendMessage = function(appMessage, targetOrigin){
		this.$iframe[0].contentWindow.postMessage(appMessage, targetOrigin);
	};
	
	return Sandbox;
});