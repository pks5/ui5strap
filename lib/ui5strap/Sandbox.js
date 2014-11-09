/*
 * 
 * UiStrap
 * 
 * CONTROL Sandbox
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

(function ui5osControlSandbox(){

	jQuery.sap.declare("ui5strap.Sandbox");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Sandbox", {
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
	});

	var SandboxProto = ui5strap.Sandbox.prototype;

	SandboxProto.init = function(){
		var iframe = document.createElement('iframe');
		iframe.className = 'sandbox-iframe';
		iframe.id = this.getId() + '----iframe';
		this.$iframe = jQuery(iframe);
	};


	SandboxProto.setSrc = function(src){
		this.$iframe.attr('src', src);
		this.setProperty('src', src, this.getDomRef());
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
}());