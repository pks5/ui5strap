/**
 * 
 * Ui5OS
 * 
 * ui5os.controls.HomeScreenIcon
 * 
 * Author: Jan Philipp Knoeller
 * 
 * Copyright (c) 2013 Philipp Knoeller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

sap.ui.define(['ui5strap/ControlBase'], function(ControlBase){
	
	var HomeScreenIcon = ControlBase.extend("com.ui5strap.apps.home.controls.HomeScreenIcon", {
		metadata : {
	
			library : "ui5os",
			properties : { 
				"title" : {
					type : "string", 
					group : "Misc", 
					defaultValue : ""
				},
				"sandbox" : {
					type : "boolean", 
					group : "Misc", 
					defaultValue : false
				},
				"index" : {
					type : "int", 
					group : "Misc", 
					defaultValue : 0
				},
				"icon" : {
					type : "string", 
					group : "Misc", 
					defaultValue : null
				},
				"appUrl" : {
					type : "string", 
					group : "Misc", 
					defaultValue : null
				},
				"iconStyle" : {
					type : "string", 
					group : "Misc", 
					defaultValue : "Precomposed"
				},	
				"closable" : {
					type : "boolean", 
					group : "Misc", 
					defaultValue : false
				},
				"counter" : {
					type : "int", group : "Misc", defaultValue : 0
				}
			},
			events : {
				"tap" : {
					allowPreventDefault : true
				},
				"closeTap" : {
					allowPreventDefault : true
				}
			}
	
		}
	}),
	HomeScreenIconProto = HomeScreenIcon.prototype;
	
	HomeScreenIconProto._getStyleClassPrefix = function(){
		return "ui5strapHomeScreenIcon";
	};
	
	HomeScreenIconProto.init = function(){
		this._loaderVisible = false;
		this._timeTouchStart = null;
		this._lockedUntil = null;
	};
	
	HomeScreenIconProto.ontouchstart = function(oEvent){
		var timeNow = Date.now();
		if(null !== this._timeTouchStart || (null !== this._lockedUntil && timeNow < this._lockedUntil) ){
			this._timeTouchStart = null;
			return;
		}
		this._timeTouchStart = timeNow;
		
		
	}
	
	HomeScreenIconProto.ontouchend = function(oEvent){
	
		if(null === this._timeTouchStart){
			return;
		}
	
		var timeNow = Date.now();
		var touchDuration = timeNow - this._timeTouchStart;
		this._timeTouchStart = null;
		
		if(800 > touchDuration){
			this._lockedUntil = timeNow + 500;
			if(false === this._loaderVisible){
				var icon = this, 
					$target = jQuery(oEvent.target);
	
				if($target.hasClass('ui5strapHomeScreenIcon-actionsClose')){
					if(!icon.getClosable()){
						throw new Error("Cannot close icon: not closable!");
					}
					icon.fireCloseTap({"icon" : icon});
				}
				else if($target.hasClass('ui5strapHomeScreenIcon-topLayer')){ 
					icon.setLoaderVisible(true)
						.fireTap({"icon" : icon});
					window.setTimeout(function(){
						icon.setLoaderVisible(false);
					}, 4000);
				}
			}
			
		}
	};
	
	
	HomeScreenIconProto.onAfterRendering = function(){
		this._loaderVisible = false;
	};
	
	HomeScreenIconProto.setLoaderVisible = function(visible){
		if(visible){
			this.$().addClass('ui5strapHomeScreenIcon-loader');
		}
		else{
			this.$().removeClass('ui5strapHomeScreenIcon-loader');
		}
		this._loaderVisible = visible;
	
		return this;
	};

	return HomeScreenIcon;
});