/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainerStandard
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

	jQuery.sap.declare("ui5strap.BarNavContainer");
	jQuery.sap.require("ui5strap.NavContainer");
	
	ui5strap.NavContainer.extend("ui5strap.BarNavContainer", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				barVisible : {
					type : "boolean",
					defaultValue : true
				},
				
				barModeExtraSmall : {
					type : "ui5strap.BarNavContainerMode",
					defaultValue : ui5strap.BarNavContainerMode.Intrude
				},
				barModeSmall : {
					type : "ui5strap.BarNavContainerMode",
					defaultValue : ui5strap.BarNavContainerMode.Intrude
				},
				barModeMedium : {
					type : "ui5strap.BarNavContainerMode",
					defaultValue : ui5strap.BarNavContainerMode.Intrude
				},
				barModeLarge : {
					type : "ui5strap.BarNavContainerMode",
					defaultValue : ui5strap.BarNavContainerMode.Intrude
				},
				
				barSizeExtraSmall : {
					type : "integer",
					defaultValue : -1
				},
				barSizeSmall : {
					type : "integer",
					defaultValue : -1
				},
				barSizeMedium : {
					type : "integer",
					defaultValue : -1
				},
				barSizeLarge : {
					type : "integer",
					defaultValue : -1
				},
				
				barPlacementExtraSmall : {
					type : "ui5strap.BarNavContainerPlacement",
					defaultValue : ui5strap.BarNavContainerPlacement.Left
				},
				barPlacementSmall : {
					type : "ui5strap.BarNavContainerPlacement",
					defaultValue : ui5strap.BarNavContainerPlacement.Left
				},
				barPlacementMedium : {
					type : "ui5strap.BarNavContainerPlacement",
					defaultValue : ui5strap.BarNavContainerPlacement.Left
				},
				barPlacementLarge : {
					type : "ui5strap.BarNavContainerPlacement",
					defaultValue : ui5strap.BarNavContainerPlacement.Left
				},
				
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
				}
				
			},
			
			events : {
				barChanged : {}
			}

		},

		//Use default NavContainerRenderer
		renderer : "ui5strap.NavContainerRenderer"
	});

	/**
	* @Override
	* @Protected
	*/
	ui5strap.BarNavContainer.prototype._initNavContainer = function(){
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
	
	ui5strap.BarNavContainer.prototype._getBarTransitionByPlacement = function(placement){
		var transition = "none none";
		if(placement === ui5strap.BarNavContainerPlacement.Left){
			transition = "slide-ltr slide-rtl";
		}
		else if(placement === ui5strap.BarNavContainerPlacement.Top){
			transition = "slide-ttb slide-btt";
		}
		else if(placement === ui5strap.BarNavContainerPlacement.Right){
			transition = "slide-rtl slide-ltr";
		}
		else if(placement === ui5strap.BarNavContainerPlacement.Bottom){
			transition = "slide-btt slide-ttb";
		}
		return transition;
	};
	
	ui5strap.BarNavContainer.prototype._getBarTransitionExtraSmall = function(){
		var transition = this.getBarTransitionExtraSmall();
		
		if(!transition){
			//Get transition by placement
			transition = this._getBarTransitionByPlacement(this.getBarPlacementExtraSmall());
		}
		
		return transition;
	};
	
	ui5strap.BarNavContainer.prototype._getBarTransitionSmall = function(){
		var transition = this.getBarTransitionSmall();
		
		if(!transition){
			if(0 < this.getBarSizeSmall()){
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
	
	ui5strap.BarNavContainer.prototype._getBarTransitionMedium = function(){
		var transition = this.getBarTransitionMedium();
		
		if(!transition){
			if(0 < this.getBarSizeMedium()){
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
	
	ui5strap.BarNavContainer.prototype._getBarTransitionLarge = function(){
		var transition = this.getBarTransitionLarge();
		
		if(!transition){
			if(0 < this.getBarSizeLarge()){
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
	
	ui5strap.BarNavContainer.prototype._getBarTransition = function(transition, newBarVisible){
		transition = transition.split(/ /);
		if(transition.length > 2){
			throw new Error("Transition string cannot contain more than 2 transitions!");
		}
		if(transition.length === 1){
			transition.push(transition[0]);
		}
		
		return newBarVisible ? transition[0] : transition[1];
	};
	
	ui5strap.BarNavContainer.prototype.setBarVisible = function(newBarVisible, suppressInvalidate){
		if(this.getDomRef()){
			jQuery.sap.log.debug("Setting barVisible to " + newBarVisible);
			
			var isBarVisible = this.getBarVisible();
			
			if(!this._barTransitionBusy && isBarVisible !== newBarVisible){
				this.setProperty('barVisible', newBarVisible, true);
				
				this._barTransitionBusy = true;
				
				var _this = this,
					$target = jQuery('#' + this.targetDomId('bar')),
					transition = new ui5strap.ResponsiveTransition(
						{
							"transitionExtraSmall" : this._getBarTransition(this._getBarTransitionExtraSmall(), newBarVisible),
							"transitionSmall" : this._getBarTransition(this._getBarTransitionSmall(), newBarVisible),
							"transitionMedium" : this._getBarTransition(this._getBarTransitionMedium(), newBarVisible),
							"transitionLarge" : this._getBarTransition(this._getBarTransitionLarge(), newBarVisible),
							"$current" : newBarVisible ? null : $target, 
							"$next" : newBarVisible ? $target : null , 
							"id" : 'x'
						}
					),
					transitionComplete = function (){
						_this._barTransitionBusy = false;
						$target.attr('class', _this._getTargetClassString('bar'));
						_this.fireBarChanged();
					};
				
				//RAF start
				ui5strap.polyfill.requestAnimationFrame(function RAF1(){
					
					//Prepare Transition
					transition.prepare();
					
					//RAF
					ui5strap.polyfill.requestAnimationFrame(function RAF2(){
						if(newBarVisible){
							_this.$().removeClass("navcontainer-flag-bar-hidden");
						}
						else{
							_this.$().addClass("navcontainer-flag-bar-hidden");
						}
						
						//Execure Transition
						transition.execute(transitionComplete, transitionComplete);
						
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
	 */
	ui5strap.BarNavContainer.prototype._getBaseClassString = function(){
		var classes = "navcontainer navcontainer-type-" + this.ncType,
			modeExtraSmall = this.getBarModeExtraSmall(),
			modeSmall = this.getBarModeSmall(),
			modeMedium = this.getBarModeMedium(),
			modeLarge = this.getBarModeLarge();
			placementExtraSmall = this.getBarPlacementExtraSmall(),
			placementSmall = this.getBarPlacementSmall(),
			placementMedium = this.getBarPlacementMedium(),
			placementLarge = this.getBarPlacementLarge();
			columnsExtraSmall = this.getBarSizeExtraSmall(),
			columnsSmall = this.getBarSizeSmall(),
			columnsMedium = this.getBarSizeMedium(),
			columnsLarge = this.getBarSizeLarge();
		
		//Ensure that at least size xs is set
		if(1 > columnsExtraSmall){
			classes += " navcontainer-flag-col-xs-1";
		}
		else{
	      classes += " navcontainer-flag-col-xs-" + columnsExtraSmall;
	    }
		
	    if(0 < columnsSmall){
	      classes += " navcontainer-flag-col-sm-" + columnsSmall;
	    }
	    if(0 < columnsMedium){
		  classes += " navcontainer-flag-col-md-" + columnsMedium;
		}
	    if(0 < columnsLarge){
	      classes += " navcontainer-flag-col-lg-" + columnsLarge;
	    }
		    
		//Placement
		classes += " navcontainer-flag-placement-xs-" + placementExtraSmall.toLowerCase();
        classes += " navcontainer-flag-placement-sm-" + placementSmall.toLowerCase();
        classes += " navcontainer-flag-placement-md-" + placementMedium.toLowerCase();
        classes += " navcontainer-flag-placement-lg-" + placementLarge.toLowerCase();
        
        //Mode
		classes += " navcontainer-flag-mode-xs-" + modeExtraSmall.toLowerCase();
        classes += " navcontainer-flag-mode-sm-" + modeSmall.toLowerCase();
        classes += " navcontainer-flag-mode-md-" + modeMedium.toLowerCase();
        classes += " navcontainer-flag-mode-lg-" + modeLarge.toLowerCase();
        
		if(!this.getBarVisible()){
			classes += " navcontainer-flag-bar-hidden";
		}
		
		return classes;
	};
	
	ui5strap.BarNavContainer.prototype._getTargetClassString = function(target){
		if(target === "bar"){
			return this.getBarVisible() 
				? 'navcontainer-target navcontainer-target-bar' 
				: 'navcontainer-target navcontainer-target-bar ui5strap-hidden';
		}
		else if(target === "content"){
			
		}
		
		return ui5strap.NavContainer.prototype._getTargetClassString.call(this, target);
	}

}());