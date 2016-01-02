/*
 * 
 * UI5Strap Server Library
 *
 * library.js
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
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

var RestController = require("./RestController");

/*
 * Node Module Exports
 */
module.exports = {
	"restController" : function(controllerName, controllerImpl){
		var Controller = function(options, configLocation){
			this.configLocation = configLocation;
			this.options = options;
			
			if(controllerImpl){ 
				var implKeys = Object.keys(controllerImpl);
				for(var i = 0; i < implKeys.length; i++){
					this[implKeys[i]] = controllerImpl[implKeys[i]];
				}
			}
		};
		Controller.prototype = new RestController();
		return Controller;
	}
};