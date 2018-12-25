/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.Console
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2015 Jan Philipp Knöller <info@pksoftware.de>
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

sap.ui.define(['./library', '../core/ControlBase'], function(ui5strapViewerLib, ControlBase){
	
	"use strict";
	
	var sDefaultLogName = '__DEFAULT_LOG';
	
	/**
	 * Constructor for a new Console instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating a output console.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Console
	 * 
	 */
	var Console = ControlBase.extend("pks.ui5strap.viewer.Console", /** @lends pks.ui5strap.viewer.Console.prototype */ {
		metadata : {

			library : "pks.ui5strap.viewer",
			properties : { 
				"logLevel" : {
					type:"int", 
					defaultValue:6
				},
				"currentLog" : {
					type:"string",
					defaultValue : sDefaultLogName
				}
			},

		},
		
		renderer : function(rm, oControl) {
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass("ui5strap-console-container");
			rm.writeClasses();
			rm.write(">");
			    
		   		rm.write("<div");
		   		rm.addClass("ui5strap-console");
		   		rm.writeClasses();
			    rm.write(">");
			    
			    rm.write("<div");
		   		rm.addClass("ui5strap-console-inner");
		   		rm.writeClasses();
			    rm.write(">");
			    
			    rm.write("</div>");
			rm.write("</div>");
			    
			rm.write("</div>");
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.Console.prototype
	 */
	ConsolePrototype = Console.prototype;

	Console.MAX_SIZE = 200;
	Console.MAX_LINES = 500;

	ConsolePrototype.init = function(){
		this.m_iScrollTimer = null;

		this.m_oLogs = {};
		
		this._createLog();
	};
	
	ConsolePrototype._createLog = function(sLogName){
	    if(!sLogName){
            sLogName = sDefaultLogName;
        }
	    
	    if(!this.m_oLogs[sLogName]){
	        this.m_oLogs[sLogName] = {
                    log: [],
                    firstLine:0,
                    lastLine: 0,
                    logName: sLogName
            };
        }
	};

	ConsolePrototype.setCurrentLog = function(sLogName){
	    if(this.m_iScrollTimer){
	        window.clearTimeout(this.m_iScrollTimer);
	    }
	    
		if(!sLogName){
			sLogName = sDefaultLogName;
		}
		
		this._createLog(sLogName);
		
		this.setProperty("currentLog", sLogName, true);
		
		this.flush();
	};

	ConsolePrototype.setLogLevel = function(newLogLevel){
		this.setProperty("logLevel", newLogLevel, true);
	}; 

	Console.dateString = function(){
	    var d = new Date();
	    
	    var dateMonth = (d.getMonth() + 1);
	    if(dateMonth < 10) dateMonth = '0' + dateMonth;
	    
	    var dateDay = d.getDate();
	    if(dateDay < 10) dateDay = '0' + dateDay;

	    var dateHour = d.getHours();
	    if(dateHour < 10) dateHour = '0' + dateHour;

	    var dateMinutes = d.getMinutes();
	    if(dateMinutes < 10) dateMinutes = '0' + dateMinutes;
	    
	    var dateSeconds = d.getSeconds();
	    if(dateSeconds < 10) dateSeconds = '0' + dateSeconds;

	    return d.getFullYear() + '-' + dateMonth + '-' + dateDay + ' ' + dateHour + ':' + dateMinutes + ':' + dateSeconds;
	};

	ConsolePrototype.addLine = function(sMessage, logType, sLogName){
		if(!logType){
			logType = 'info';
		}

		if(!sLogName){
			sLogName = sDefaultLogName;
		}

		this._createLog(sLogName);
		
		var oLog = this.m_oLogs[sLogName];

		oLog.log.push({
            "logType" : logType,
            "message" : sMessage,
            "date" : Console.dateString()
        });
		
		//Delete old lines
		var iLogLength = oLog.log.length;
        
        if(iLogLength > Console.MAX_SIZE){
            var iLinesToDelete = iLogLength - Console.MAX_SIZE;
            
            oLog.firstLine += iLinesToDelete;
            oLog.log.splice(0, iLinesToDelete);
        }

        if(sLogName === this.getCurrentLog()){
    		if(this.m_iScrollTimer){
    			return;
    		}
    		
    		var that = this;
    		this.m_iScrollTimer = window.setTimeout(function(){
    		    that.flush();
    			
    			that.m_iScrollTimer = null;
    		}, 100);
        }
	};

	ConsolePrototype.flush = function(iScrollY){
		var sLogName = this.getCurrentLog(),
		    oLog = this.m_oLogs[sLogName];
		
		if(!oLog){
			throw new Error("Cannot flush undefined log: '" + sLogName + "'");
		}

		var $console = this.$().find('.ui5strap-console');
		if($console.size() > 0){
			var $consoleInner = $console.find('.ui5strap-console-inner');

			var iStartAt = 0;

			if($consoleInner.size() > 0){
				var sOldLogName = $consoleInner.attr('data-log-name');

				if(sOldLogName === sLogName){
					var iFirstLineNo = oLog.firstLine,
					    iLastLineNo = oLog.lastLine;

					if(iLastLineNo >= iFirstLineNo){
						iStartAt = iLastLineNo - iFirstLineNo + 1;
					}

					$consoleInner.detach();
				}
				else{ 
					$consoleInner.remove();
					$consoleInner = jQuery('<div class="ui5strap-console-inner ui5strap-console-inner-' + sLogName + '" data-log-name="' + sLogName + '"></div>');
					
				}
			}
			else{ 
				$consoleInner = jQuery('<div class="ui5strap-console-inner ui5strap-console-inner-' + sLogName + '" data-log-name="' + sLogName + '"></div>');
				
			}

			var iLastLineNo = null;
			for(var i = iStartAt; i < oLog.log.length; i++){
				var oLine = oLog.log[i];
				iLastLineNo = i + oLog.firstLine;
				$consoleInner.append('<div class="ui5strap-console-line ui5strap-console-line-' + oLine.logType  + '">' + iLastLineNo + ' ' + oLine.date + ' ' + oLine.message.replace(/\n/g, '<br />') + '</div>');
			}

			if(null !== iLastLineNo){
				oLog.lastLine = iLastLineNo;
			}

			//Remove old lines
			var $lines = $consoleInner.find('.ui5strap-console-line'),
			    i=0,
			    iLinesToDelete = $lines.size() - Console.MAX_LINES;
			
			while(i < iLinesToDelete){
				$lines[i].remove();
				i++;
			}

			$console.append($consoleInner);
			
			this._scrollToBottom(iScrollY);
		}
	};

	ConsolePrototype._scrollToBottom = function(scrollY){
		var $inner = this.$().find('.ui5strap-console');
		if($inner.size() > 0){
				$inner[0].scrollTop = scrollY ? scrollY : $inner[0].scrollHeight;
		}
	};

	ConsolePrototype.info = function(sMessage, sLogName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.INFO){
			this.addLine(sMessage, 'info', sLogName);
		}
	};

	ConsolePrototype.debug = function(sMessage, sLogName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.DEBUG){
			this.addLine(sMessage, 'debug', sLogName);
		}
	};

	ConsolePrototype.warning = function(sMessage, sLogName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.WARNING){
			this.addLine(sMessage, 'warning', sLogName);
		}
	};

	ConsolePrototype.error = function(sMessage, sLogName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.ERROR){
			this.addLine(sMessage, 'error', sLogName);
		}
	};

	ConsolePrototype.fatal = function(sMessage, sLogName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.FATAL){
			this.addLine(sMessage, 'fatal', sLogName);
		}
	};

	ConsolePrototype.onBeforeRendering = function(){
        if(this.getDomRef()){
            this.m_iScrollTop = this.$().find('.ui5strap-console')[0].scrollTop;

            this.m_$controlContent = this.$().children().first().detach();
		}
	};

	ConsolePrototype.onAfterRendering = function(){
        if(null !== this.m_$controlContent){
            this.flush(this.m_iScrollTop);
            
            this.$().html(this.m_$controlContent);

            this.m_$controlContent = null;
		}
        else{
            this.flush();
        }
    };
    
    return Console;
});