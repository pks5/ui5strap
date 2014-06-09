/*
 * 
 * ui5strap
 *
 * Dummy Action that does noething
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.AMDummy");

	ui5strap.ActionModule.extend("ui5strap.AMDummy");

	/*
	* @Override
	*/
	ui5strap.AMDummy.prototype.run = function(){
		 
	};

}());