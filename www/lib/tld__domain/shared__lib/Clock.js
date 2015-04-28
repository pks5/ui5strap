/*
 * 
 * Analogue Clock
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */

(function(){

	//Declare the module
	jQuery.sap.declare("tld__domain.shared__lib.Clock");
	
	//Require the library
	jQuery.sap.require("tld__domain.shared__lib.library");

	//Define the contstructor
	sap.ui.core.Control.extend("tld__domain.shared__lib.Clock", {
		"metadata" : {

			"library" : "tld__domain.shared__lib",

			"properties" : {
				"design" : {
					"type" : "string",
					"defaultValue" : "default"
				},
				"offset" : {
					"type" : "float", 
					"group" : "Misc", 
					"defaultValue" : 1.0
				}
			}

		}
	});

	/*
	* Shorthand for the prototype object
	*/
	var ClockProto = tld__domain.shared__lib.Clock.prototype;

	/*
	* The clock timer reference
	*/
	ClockProto._interval = null;

	/*
	* On before rendering, stop the clock timer.
	*/
	ClockProto.onBeforeRendering = function(){
		this.stop();
	};

	/*
	* On after rendering update the clock and start the timer.
	*/
	ClockProto.onAfterRendering = function(){
		this.updateClock();
		this.start();
	};

	/*
	* Start the clock timer
	*/
	ClockProto.start = function(){
		if(null === this._interval){
			this._interval = window.setInterval(jQuery.proxy(this.updateClock, this), 1000);
		}
	};

	/*
	* Stop the clock timer
	*/
	ClockProto.stop = function(){
		if(null !== this._interval){
			window.clearInterval(this._interval);
			this._interval = null;
		}
	};

	/*
	* Rotates the hands regarding to the time
	*/
	ClockProto.updateClock = function(){
		var angle = 360/60,
	    d = new Date();

	    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	    
	    var date = new Date(utc + (3600000 * this.getOffset()));

	    var hour = date.getHours() % 12,
	    minute = date.getMinutes(),
	    second = date.getSeconds(),
	    hourAngle = (360/12) * hour + (360/(12*60)) * minute;

	    var minuteCss = 'rotate(' + (angle * minute) + 'deg)',
	    	secondCss = 'rotate(' + (angle * second) + 'deg)',
	    	hourCss = 'rotate(' + hourAngle + 'deg)';

	    this.$().find('.clock-control-minute').attr('style', 'transform: ' + minuteCss + '; -webkit-transform:' + minuteCss);
	    this.$().find('.clock-control-second').attr('style', 'transform: ' + secondCss + '; -webkit-transform:' + secondCss);
	    this.$().find('.clock-control-hour').attr('style', 'transform: ' + hourCss + '; -webkit-transform:' + hourCss);
	};

}());