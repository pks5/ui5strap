/*
 * 
 * ui5strap
 *
 * AMWorker
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

	jQuery.sap.declare("ui5strap.AMWorker");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMWorker");

	var AMWorkerProto = ui5strap.AMWorker.prototype;

	/*
	* @Override
	*/
	AMWorkerProto.namespace = 'worker';

	/*
	* @Override
	*/
	AMWorkerProto.parameters = {
		"workerName" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMWorkerProto.run = function(){
		var workerUrl = jQuery.sap.getModulePath(this.getParameter("workerName")) + '.worker.js',
			worker = new Worker(workerUrl),
			app = this.context.app,
			controller = this.context.controller;

		worker.addEventListener('message', function(e) {
			
			if(!(typeof(e.data) === 'object') || !("type" in e.data)){
				throw new Error('Invalid worker message: ' + JSON.stringify(e.data));
			}
			
			var messageType = e.data.type;
			if('ACTION' === messageType){

				var actionParameters = {
					"parameters" : e.data.message, 
					"app" : app,
					"controller" : controller  
				};
				
				ui5strap.Action.run(actionParameters);
			}

		}, false);

		worker.postMessage('START');
	};

}());