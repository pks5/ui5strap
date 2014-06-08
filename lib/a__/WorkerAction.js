/*
 * 
 * a__
 *
 * WorkerAction
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de/a__
 *
 * ALL RIGHTS RESERVED
 * 
 */

(function(){

	jQuery.sap.declare("a__.WorkerAction");

	a__.ActionModule.extend("a__.WorkerAction");

	var WorkerActionProto = a__.WorkerAction.prototype;

	/*
	* @Override
	*/
	WorkerActionProto.namespace = 'worker';

	/*
	* @Override
	*/
	WorkerActionProto.parameters = {
		"workerSrc" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	WorkerActionProto.run = function(){
		var workerUrl = jQuery.sap.getModulePath(this.getParameter("workerSrc")) + '.worker.js',
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
				
				a__.Action.run(actionParameters);
			}

		}, false);

		worker.postMessage('START');
	};

}());