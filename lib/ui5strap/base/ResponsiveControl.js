/*
 * 
 * UI5Strap
 *
 * Base Class for responsive Controls
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("de_pksoftware.ui5strap.base.ResponsiveControl");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.base.ResponsiveControl", {
		metadata : {

			library : "de_pksoftware.ui5strap",
			
			properties : { 
				hiddenExtraSmall : {
					type:"boolean", defaultValue:false
				},
				hiddenSmall : {
					type:"boolean", defaultValue:false
				},
				hiddenMedium : {
					type:"boolean", defaultValue:false
				},
				hiddenLarge : {
					type:"boolean", defaultValue:false
				},
				
				visibleExtraSmall : {
					type:"boolean", defaultValue:false
				},
				visibleSmall : {
					type:"boolean", defaultValue:false
				},
				visibleMedium : {
					type:"boolean", defaultValue:false
				},
				visibleLarge : {
					type:"boolean", defaultValue:false
				}
			}
		}
	});

}());