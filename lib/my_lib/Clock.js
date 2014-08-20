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

	jQuery.sap.declare("my_lib.Clock");
	jQuery.sap.require("my_lib.library");

	sap.ui.core.Control.extend("my_lib.Clock", {
		metadata : {

			// ---- object ----
			
			// ---- control specific ----
			library : "my_lib",

			properties : { 
				"offset" : {type : "float", group : "Misc", defaultValue : 1.0}
			},
			
			aggregations : { 
				
			},

			events : {
				
			}

		}
	});

	var ClockProto = my_lib.Clock.prototype;

	ClockProto._interval = null;

	ClockProto.onBeforeRendering = function(){
		this.stop();
	};

	ClockProto.onAfterRendering = function(){
		this.updateClock();
		this.start();
	};

	ClockProto.start = function(){
		if(null === this._interval){
			this._interval = window.setInterval(jQuery.proxy(this.updateClock, this), 1000);
		}
	};

	ClockProto.stop = function(){
		if(null !== this._interval){
			window.clearInterval(this._interval);
			this._interval = null;
		}
	};



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