/*
 * 
 * UI5Strap
 *
 * ui5strap.AppFrame
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

(function(){

	jQuery.sap.declare("ui5strap.AppFrame");
	jQuery.sap.require("ui5strap.AppComponent");
	
	ui5strap.AppComponent.extend("ui5strap.AppFrame", {
		"constructor" : function(app, options){
			ui5strap.AppComponent.call(this, app, options);
			
			this.vTargets = {};

			this.oTargets = {};

			this.initialized = false;
		}
	});

	var AppFrame = ui5strap.AppFrame,
		AppFrameProto = AppFrame.prototype;

	/*
	 * Must be explicitely called from outside
	 * @PostConstruct
	 * @Public
	 */
	AppFrameProto.init = function(){
		var _this = this;
		
		var rootControl = this._createControl();
		
		this._initHistory();

		var oldAppShow = this.app.show;
		this.app.show = function(callback){
			oldAppShow.call(_this.app, function(firstTime){
				if(firstTime){
					_this.showInitialContent(callback);
				}
				else{
					callback && callback(firstTime);
				}
			});
			
		};
		
		this.getRootControl = function(){
			return rootControl;
		};
		
		this.app.getRootControl = function(){
			return rootControl;
		};
	};

	/*
	 * @deprecated
	 */
	AppFrameProto.getControl = function(){
		jQuery.sap.log.warning("AppFrameProto.getControl is deprecated. Use getRootControl instead.");
		return this.getRootControl();
	};

	/*
	* @deprecated
	*/
	AppFrameProto.getConfig = function(){
		jQuery.sap.log.warning("ui5strap.AppFrame.prototype.getConfig is deprecated and will be removed soon.");
		return this.app.config;
	};

	/*
	 * Creates the control that represents this AppFrame
	 * @Protected
	 */
	AppFrameProto._createControl = function(){
		jQuery.sap.log.debug("AppFrameProto._createControl");
		
		//Init default NavContainer
		var frameConfig = this.options,
			app = this.app,
			navContainerModule = frameConfig.navContainer || "ui5strap.NavContainerStandard";
		
		jQuery.sap.require(navContainerModule);
		var NavContainerConstructor = jQuery.sap.getObject(navContainerModule);
		if(!NavContainerConstructor){
			throw new Error('Invalid NavContainer: ' + navContainerModule);
		}
		
		var navContainerOptions = frameConfig.navContainerOptions || {};
		if(navContainerOptions.id){
			navContainerOptions.id = this.app.createControlId(navContainerOptions.id);
		}
		
		var rootControl = new NavContainerConstructor(navContainerOptions);
		
		if(frameConfig.events && frameConfig.events.control){
			var eKeys = Object.keys(frameConfig.events.control),
				eKeysLength = eKeys.length;
			for(var i = 0; i < eKeysLength; i++){
				var evs = frameConfig.events.control[eKeys[i]];
				
				rootControl.attachEvent(eKeys[i], { "actions" : evs }, function(oEvent, data){
					
					for(var j = 0; j < data.actions.length; j ++){
						app.runAction({
							"parameters" : data.actions[j], 
							"eventSource" : oEvent.getSource(),
							"eventParameters" : oEvent.getParameters()
						});
					}
					
					//console.log(data);
				});
			}
		}
		
		return rootControl;
	};

	/*
	* Inits History for navigation handling in browsers.
	*/
	AppFrameProto._initHistory = function(){

	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	AppFrameProto.showInitialContent = function(callback){
		jQuery.sap.log.debug("AppFrameProto.showInitialContent");

		var _this = this,
			initialViews = this.options.initialViews,
			callI = 0;

		var complete = function(){
			callI--;
			if(callI === 0){
				if(!_this.initialized){
					_this.initialized = true;
				}

				callback && callback();
			}
		}

		if(!initialViews || initialViews.length === 0){
			callI = 1;
			complete();
			return;
		}

		callI = initialViews.length;

		for(var i = 0; i < initialViews.length; i++){
			var initialViewData = jQuery.extend({}, initialViews[i]);
			if(!_this.initialized){
				initialViewData.transition = 'transition-none';
			}
			this.navigateTo(this.getRootControl(), initialViewData, complete);
		}

	};

	/*
	* Returns the currently shown page within the NavContainer's target
	* @Public
	* @deprecated
	*/
	AppFrameProto.getCurrentPage = function (target) {
		jQuery.sap.log.warning("AppFrameProto.getCurrentPage is deprecated!");
		return this.getRootControl().getTarget(target);
	};

	/*
	* Returns whether the frame supports the specified target
	* @Public
	* @deprecated
	*/
	AppFrameProto.hasTarget = function(target) {
		jQuery.sap.log.warning("AppFrameProto.hasTarget is deprecated!");
		return this.getRootControl().hasTarget(target);
	}
	
	/*
	* Returns whether a target is busy
	* @Public
	* @deprecated
	*/
	AppFrameProto.isBusy = function(target){
		jQuery.sap.log.warning("AppFrameProto.isBusy is deprecated!");
		
		return this.getRootControl().isTargetBusy(target);
	};

	/*
	 * Shows a page defined by given data
	 * @Public
	 * @deprecated
	 */
	AppFrameProto.toPage = function (viewConfig, callback) {
		jQuery.sap.log.warning("AppFrameProto.toPage is deprecated! Use navigateTo instead!");
		return this.navigateTo(this.getRootControl(), viewConfig, callback, true);
	};

	/*
	* Get the viewConfig based on a definition object. Def object must contain "viewName" attribute!
	* @deprecated
	*/
	AppFrameProto.getViewConfig = function(viewDef){
		jQuery.sap.log.warning("AppFrameProto.getViewConfig is deprecated! Use resolveViewConfig instead!");
		var viewConfig = this.app.config.getViewConfig(viewDef);

		//TODO use default target here...
		if(!viewConfig.target){
			viewConfig.target = this.getRootControl().defaultTarget;
		}

		//Override targets
		var target = viewConfig.target;
		if(target in this.oTargets){
			var overrideTarget = this.oTargets[target];
			delete this.oTargets[target];
			viewConfig = this.app.config.getViewConfig(overrideTarget);
		}

		return viewConfig;
	};
	
	/*
	* Resolve the viewConfig based on a definition object. Def object must contain "viewName" attribute!
	*/
	AppFrameProto.resolveViewConfig = function(navControl, viewDef){
		var viewConfig = this.app.config.getViewConfig(viewDef);

		//TODO use default target here...
		if(!viewConfig.target){
			viewConfig.target = navControl.defaultTarget;
		}

		//Override targets
		var target = viewConfig.target;
		if(target in this.oTargets){
			var overrideTarget = this.oTargets[target];
			delete this.oTargets[target];
			viewConfig = this.app.config.getViewConfig(overrideTarget);
		}

		return viewConfig;
	};

	/*
	 * @deprecated
	 */
	AppFrameProto.validatePage = function(viewDef){
		jQuery.sap.log.warning("ui5strap.AppFrame.prototype.validatePage is deprecated and will be removed soon! Use getViewConfig instead.");
		return this.getViewConfig(viewDef);
	};

	/*
	* @Public
	* @deprecated
	*/
	AppFrameProto.gotoPage = function (viewDef, callback) {
		jQuery.sap.log.warning("AppFrameProto.gotoPage is deprecated! Use navigateTo instead!");
		
		return this.navigateTo(this.getRootControl(), viewDef, callback);
	};
	
	AppFrameProto.navigateTo = function (navControl, viewConfig, callback, suppressResolve) {
		jQuery.sap.log.debug("AppFrameProto.toPage");
		
		if(!suppressResolve){
			viewConfig = this.resolveViewConfig(navControl, viewConfig);
		}
		
		if(!viewConfig.target){
			throw new Error('Cannot navigate to page: no "target" specified!');
		}
		
		if(navControl.isBusy(viewConfig.target)){
			jQuery.sap.log.warning('[APP_FRAME] Cannot navigate: Target is busy: "' + viewConfig.target + '"');

			return false;
		}

		var _this = this,
			target = viewConfig.target,
			oPage = this.app.createView(viewConfig);

		//Only add this page to a vTarget. Pages in vTargets are not seen by the user.
		//TODO Why???
		if(viewConfig.vTarget){
			jQuery.sap.log.debug('[APP_FRAME] VIRTUALLY NAVIGATE {' + target + '}');
			this.vTargets[target] = oPage;
		
			return;
		}

		//Set target busy
		navControl.setTargetBusy(target, true);

		//Trigger onUpdate events
		navControl.updateTarget(viewConfig.target, oPage, viewConfig.parameters);

		//Change NavContainer to page
		navControl.toPage(
			oPage, 
			target, 
			viewConfig.transition,
			function toPage_complete(){
				
				//Set target available
				navControl.setTargetBusy(target, false);
				
				//Trigger callback
				callback && callback();
			}
		);
		
		return oPage;
	};
	

}());