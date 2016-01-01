/*
 * 
 * UI5Strap
 *
 * ui5strap.AMWorker
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

sap.ui.define(['./library', './ActionModule'], function(library, ActionModule){

	var AMWorker = ActionModule.extend("ui5strap.AMWorker"),
		AMWorkerProto = AMWorker.prototype;

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
					"controller" : controller  
				};
				
				app.runAction(actionParameters);
			}

		}, false);

		worker.postMessage('START');
	};
	
	return AMWorker;
});