/*
 * 
 * CoolUI5
 *
 * Dummy Action that does noething
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/coolui5
 *
 * ALL RIGHTS RESERVED
 * 
 */

(function(){

	jQuery.sap.declare("a__.DummyAction");

	a__.ActionModule.extend("a__.DummyAction");

	/*
	* @Override
	*/
	a__.DummyAction.prototype.run = function(){
		 
	};

}());