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
				placement : {
					type : "ui5strap.Placement",
					defaultValue : ui5strap.Placement.Left
				},
				barVisible : {
					type : "boolean",
					defaultValue : true
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
				"bar" : null,
				"content" : null
			
		};
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
					transition = newBarVisible 
					? new ui5strap.Transition(
							"transition-slide-ttb", 
							null, 
							$target, 
							'x'
					)
					: new ui5strap.Transition(
						"transition-slide-ttb", 
						$target, 
						null, 
						'x'
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
							_this.$().removeClass("navcontainer-flag-no-bar");
						}
						else{
							_this.$().addClass("navcontainer-flag-no-bar");
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
			placement = this.getPlacement();
		
		if(placement !== ui5strap.Placement.Default){
            classes += " navcontainer-flag-placement-" + ui5strap.BSPlacement[placement];
        }
		
		if(!this.getBarVisible()){
			classes += " navcontainer-flag-no-bar";
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