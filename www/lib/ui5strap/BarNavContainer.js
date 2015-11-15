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
					defaultValue : false
				}
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
	
	ui5strap.BarNavContainer.prototype.setBarVisible = function(newBarVisible, suppressInvalidate){
		if(this.getDomRef()){
			this.setProperty('barVisible', newOptions, true);
			
			var transition = new ui5strap.Transition(
					"transition-slide", 
					this.$(), 
					null, 
					'x'
			);
			
			//RAF start
			ui5strap.polyfill.requestAnimationFrame(function RAF1(){
				
				//Prepare Transition
				transition.prepare();
				
				//RAF
				ui5strap.polyfill.requestAnimationFrame(function RAF2(){
					
					//Execure Transition
					transition.execute(function transitionComplete(){
						alert('test');
					}, null);
					
				});

			});
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
		
		return classes;
	};

}());