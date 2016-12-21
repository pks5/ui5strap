/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.ex.BarNavContainer
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

sap.ui.define(['./library', "../core/library", '../core/NavContainer', '../core/ResponsiveTransition'], function(ui5strapExLib, ui5strapCoreLib, NavContainer, ResponsiveTransition){
	
	"use strict";
	
	/**
	 * Constructor for a new BarNavContainer instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating nav containers with navigation bar.
	 * @extends pks.ui5strap.core.NavContainer
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.1-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.ex.BarNavContainer
	 * 
	 */
	var BarNavContainer = NavContainer.extend("pks.ui5strap.ex.BarNavContainer", /** @lends pks.ui5strap.ex.BarNavContainer.prototype */ {
		metadata : {

			library : "pks.ui5strap.ex",
			
			properties : { 
				barVisible : {
					type : "boolean",
					defaultValue : true
				},
				
				//Bar Mode DOES NOT inherit from smaller sizes
				//TODO add barMode for all sizes?
				
				barModeExtraSmall : {
					type : "pks.ui5strap.ex.BarNavContainerMode",
					defaultValue : ui5strapExLib.BarNavContainerMode.Intrude
				},
				barModeSmall : {
					type : "pks.ui5strap.ex.BarNavContainerMode",
					defaultValue : ui5strapExLib.BarNavContainerMode.Intrude
				},
				barModeMedium : {
					type : "pks.ui5strap.ex.BarNavContainerMode",
					defaultValue : ui5strapExLib.BarNavContainerMode.Intrude
				},
				barModeLarge : {
					type : "pks.ui5strap.ex.BarNavContainerMode",
					defaultValue : ui5strapExLib.BarNavContainerMode.Intrude
				},
				//TODO add barModeExtraLarge on Bootstrap 4 Upgrade
				
				barSizeMax : {
					type : "int",
					defaultValue : 4
				},
				
				//Bar Size DOES inherit from smaller sizes
				//TODO rename to barSize
				barSizeExtraSmall : {
					type : "int",
					defaultValue : 1
				},
				//TODO rename to barSizeSmallUp
				barSizeSmall : {
					type : "int",
					defaultValue : -1
				},
				//TODO rename to barSizeMediumUp
				barSizeMedium : {
					type : "int",
					defaultValue : -1
				},
				//TODO rename to barSizeLargeUp
				barSizeLarge : {
					type : "int",
					defaultValue : -1
				},
				//TODO Add barSizeExtraLarge on Bootstrap 4 Upgrade
				
				//Bar placement DOES NOT inherit from smaller sizes
				//TODO add barPlacement for all sizes?
				
				barPlacementExtraSmall : {
					type : "pks.ui5strap.ex.BarNavContainerPlacement",
					defaultValue : ui5strapExLib.BarNavContainerPlacement.Left
				},
				barPlacementSmall : {
					type : "pks.ui5strap.ex.BarNavContainerPlacement",
					defaultValue : ui5strapExLib.BarNavContainerPlacement.Left
				},
				barPlacementMedium : {
					type : "pks.ui5strap.ex.BarNavContainerPlacement",
					defaultValue : ui5strapExLib.BarNavContainerPlacement.Left
				},
				barPlacementLarge : {
					type : "pks.ui5strap.ex.BarNavContainerPlacement",
					defaultValue : ui5strapExLib.BarNavContainerPlacement.Left
				},
				//TODO add barPlacementExtraLarge on Bootstrap 4 Upgrade
				
				//Bar Transition DOES NOT inherit from smaller sizes
				//TODO add barTransition for all sizes?
				
				barTransitionExtraSmall : {
					type : "string",
					defaultValue : ""
				},
				barTransitionSmall : {
					type : "string",
					defaultValue : ""
				},
				barTransitionMedium : {
					type : "string",
					defaultValue : ""
				},
				barTransitionLarge : {
					type : "string",
					defaultValue : ""
				},
				//TODO add barTransitionExtraLarge on Bootstrap 4 Upgrade
				
				barTransitionSpeed : {
					type : "pks.ui5strap.core.TransitionSpeed",
					defaultValue : ui5strapCoreLib.TransitionSpeed.Normal
				}
				
			},
			
			events : {
				barChanged : {}
			}

		},

		//Use default NavContainerRenderer
		renderer : "pks.ui5strap.core.NavContainerRenderer"
	}),
	/**
	 * @alias pks.ui5strap.ex.BarNavContainer.prototype
	 */
	BarNavContainerProto = BarNavContainer.prototype;
	
	/**
	* @Override
	* @Protected
	*/
	BarNavContainerProto._initNavContainer = function(){
		//NavContainer type string
		this.ncType = "bar";

		//Default target
		this.defaultTarget = "content";

		//Available targets
		this.targets = {
				
				"content" : null,
				"bar" : null
		};
	};
	
	BarNavContainerProto._getBarTransitionByPlacement = function(placement){
		var transition = "none none";
		if(placement === ui5strapExLib.BarNavContainerPlacement.Left){
			transition = "slide-ltr slide-rtl";
		}
		else if(placement === ui5strapExLib.BarNavContainerPlacement.Top){
			transition = "slide-ttb slide-btt";
		}
		else if(placement === ui5strapExLib.BarNavContainerPlacement.Right){
			transition = "slide-rtl slide-ltr";
		}
		else if(placement === ui5strapExLib.BarNavContainerPlacement.Bottom){
			transition = "slide-btt slide-ttb";
		}
		return transition;
	};
	
	BarNavContainerProto._getBarTransitionExtraSmall = function(){
		var transition = this.getBarTransitionExtraSmall();
		
		if(!transition){
			//Get transition by placement
			transition = this._getBarTransitionByPlacement(this.getBarPlacementExtraSmall());
		}
		
		return transition;
	};
	
	BarNavContainerProto._getBarTransitionSmall = function(){
		var transition = this.getBarTransitionSmall();
		
		if(!transition){
			if(-1 < this.getBarSizeSmall()){
				//Get transition by placement
				transition = this._getBarTransitionByPlacement(this.getBarPlacementSmall());
			}
			else{
				//Get Transition from extra small
				transition = this._getBarTransitionExtraSmall();
			}
		}
		
		return transition;
	};
	
	BarNavContainerProto._getBarTransitionMedium = function(){
		var transition = this.getBarTransitionMedium();
		
		if(!transition){
			if(-1 < this.getBarSizeMedium()){
				//Get transition by placement
				transition = this._getBarTransitionByPlacement(this.getBarPlacementMedium());
			}
			else{
				//Get Transition from small
				transition = this._getBarTransitionSmall();
			}
		}
		
		return transition;
	};
	
	BarNavContainerProto._getBarTransitionLarge = function(){
		var transition = this.getBarTransitionLarge();
		
		if(!transition){
			if(-1 < this.getBarSizeLarge()){
				//Get transition by placement
				transition = this._getBarTransitionByPlacement(this.getBarPlacementLarge());
			}
			else{
				//Get Transition from medium
				transition = this._getBarTransitionMedium();
			}
		}
		
		return transition;
	};
	
	BarNavContainerProto._getBarTransition = function(transition, newBarVisible){
		transition = transition.split(/ /);
		if(transition.length > 2){
			throw new Error("Transition string cannot contain more than 2 transitions!");
		}
		if(transition.length === 1){
			transition.push(transition[0]);
		}
		
		return newBarVisible ? transition[0] : transition[1];
	};
	
	BarNavContainerProto.setBarVisible = function(newBarVisible, suppressInvalidate){
		if(this.getDomRef()){
			jQuery.sap.log.debug("Setting barVisible to " + newBarVisible);
			
			var isBarVisible = this.getBarVisible();
			
			if(!this._barTransitionBusy && isBarVisible !== newBarVisible){
				this.setProperty('barVisible', newBarVisible, true);
				
				this._barTransitionBusy = true;
				
				var _this = this,
					$target = jQuery('#' + this.targetDomId('bar')),
					transition = new ResponsiveTransition(
						{
							"transitionExtraSmall" : this._getBarTransition(this._getBarTransitionExtraSmall(), newBarVisible),
							"transitionSmall" : this._getBarTransition(this._getBarTransitionSmall(), newBarVisible),
							"transitionMedium" : this._getBarTransition(this._getBarTransitionMedium(), newBarVisible),
							"transitionLarge" : this._getBarTransition(this._getBarTransitionLarge(), newBarVisible),
							"transitionSpeed" : this.getBarTransitionSpeed().toLowerCase(),
							"$current" : newBarVisible ? null : $target, 
							"$next" : newBarVisible ? $target : null , 
							"id" : 'bar-navcontainer-bar-change'
						}
					),
					transitionComplete = function (){
						_this._barTransitionBusy = false;
						
						if(_this.getBarVisible()){
							_this.$().removeClass("navcontainer-flag-bar-hidden");
						}
						else{
							_this.$().addClass("navcontainer-flag-bar-hidden");
						}
							
						$target.attr('class', _this._getTargetClassString('bar'));
							
						_this.fireBarChanged();
						
						jQuery.sap.log.debug("[BarNavContainer] Transition complete.")
					};
				
				transition.on("last", transitionComplete);	
					
				//RAF start
				ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF1(){
					
					//Prepare Transition
					transition.prepare();
					
					//RAF
					ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF2(){
						//Execure Transition
						transition.execute();
						
						if(newBarVisible){
							_this.$().removeClass("navcontainer-flag-bar-hide");
						}
						else{
							_this.$().addClass("navcontainer-flag-bar-hide");
						}
					});
	
				});
			}
			//RAF end
		}
		else{
			this.setProperty('barVisible', newBarVisible, suppressInvalidate);
		}
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	BarNavContainerProto._getStyleClassRoot = function(){
		var classes = " navcontainer-type-" + this.ncType,
			modeExtraSmall = this.getBarModeExtraSmall(),
			modeSmall = this.getBarModeSmall(),
			modeMedium = this.getBarModeMedium(),
			modeLarge = this.getBarModeLarge(),
			placementExtraSmall = this.getBarPlacementExtraSmall(),
			placementSmall = this.getBarPlacementSmall(),
			placementMedium = this.getBarPlacementMedium(),
			placementLarge = this.getBarPlacementLarge(),
			columnsExtraSmall = this.getBarSizeExtraSmall(),
			columnsSmall = this.getBarSizeSmall(),
			columnsMedium = this.getBarSizeMedium(),
			columnsLarge = this.getBarSizeLarge(),
			sizeMax = this.getBarSizeMax(),
			transitionSpeed = this.getBarTransitionSpeed();
		
		//Transition Speed
		//Applies for all sizes
		if(transitionSpeed !== ui5strapCoreLib.TransitionSpeed.Normal){
			classes += " ui5strap-transition-speed-" + transitionSpeed.toLowerCase();
		}
			
		//SIZE_EXTRA_SMALL
		if(-1 < columnsExtraSmall){
			if(columnsExtraSmall > sizeMax){
				columnsExtraSmall = sizeMax;
			}
			
			classes += " navcontainer-flag-xs" + columnsExtraSmall;
			classes += " navcontainer-flag-" + placementExtraSmall.toLowerCase() + "-xs";
			classes += " navcontainer-flag-" + modeExtraSmall.toLowerCase() + "-xs";
	    }
		
		//SIZE_SMALL
	    if(-1 < columnsSmall){
	    	if(columnsSmall > sizeMax){
	    		columnsSmall = sizeMax;
			}
		    
	    	classes += " navcontainer-flag-sm" + columnsSmall;
		    classes += " navcontainer-flag-" + placementSmall.toLowerCase() + "-sm";
		    classes += " navcontainer-flag-" + modeSmall.toLowerCase() + "-sm";
	    }
	    
	    //SIZE_MEDIUM
	    if(-1 < columnsMedium){
	    	if(columnsMedium > sizeMax){
	    		columnsMedium = sizeMax;
			}
	    	
	    	classes += " navcontainer-flag-md" + columnsMedium;
	    	classes += " navcontainer-flag-" + placementMedium.toLowerCase() + "-md";
	    	classes += " navcontainer-flag-" + modeMedium.toLowerCase() + "-md";
		}
	    
	    //SIZE_LARGE
	    if(-1 < columnsLarge){
	    	if(columnsLarge > sizeMax){
	    		columnsLarge = sizeMax;
			}
	    	
	    	classes += " navcontainer-flag-lg" + columnsLarge;
	    	classes += " navcontainer-flag-" + placementLarge.toLowerCase() + "-lg";
	    	classes += " navcontainer-flag-" + modeLarge.toLowerCase() + "-lg";
	    }
		
	    //TODO add columnsExtraLarge on BOOTSTRAP_4 Upgrade
		
		if(!this.getBarVisible()){
			classes += " navcontainer-flag-bar-hide navcontainer-flag-bar-hidden";
		}
		
		return classes;
	};
	
	BarNavContainerProto._getTargetClassString = function(target){
		if(target === "bar"){
			return this.getBarVisible() 
				? 'navcontainer-target navcontainer-target-bar' 
				: 'navcontainer-target navcontainer-target-bar ui5strap-hidden';
		}
		else if(target === "content"){
			
		}
		
		return NavContainer.prototype._getTargetClassString.call(this, target);
	}
	
	return BarNavContainer;
});