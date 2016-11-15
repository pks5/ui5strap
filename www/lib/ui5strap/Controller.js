/*
 * 
 * UI5Strap
 *
 * ui5strap.Controller
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

sap.ui.define(['./library', "./AppBase", 'sap/ui/core/mvc/Controller'], function(uLib, AppBase, ControllerBase){

	/**
	 * Constructor for a new Controller instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Abstract base class for all controllers.
	 * @extends sap.ui.core.mvc.Controller
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Controller
	 * 
	 */
	var Controller = ControllerBase.extend("ui5strap.Controller"),
		ControllerProto = Controller.prototype;
	
	/**
	 * Attaches the init actions defined in config to the view's afterInit event.
	 * @override
	 */
	ControllerProto.connectToView = function(oView) {
		oView.attachAfterInit(function(oEvent){
			this._runEventActions(oEvent, "init");
		}, this);
		
		oView.attachBeforeExit(function(oEvent){
			this._oApp = null;
		}, this);
		
		ControllerBase.prototype.connectToView.call(this, oView);
	};
	
	/**
	 * @protected
	 */
	ControllerProto._runEventActions = function(oEvent, sEventName){
		var app = this.getApp();
		
		if(!app){
			jQuery.sap.log.warning("Cannot run controller event '" + sEventName + "', no app referencce available.");
			return;
		}
			
		var _this = this,
			viewId = this.getView().getId(),
			updateEvents = app.config.getEvents('controller', sEventName, viewId),
			updateEventsLength = updateEvents.length,
			nextAction = function(j){
				if(j >= updateEventsLength){
					return;
				}
				
				var sActionName = updateEvents[j];
				app.log.debug("Executing action '" + sActionName + "' (view: '" + viewId + "', event: '" + sEventName + "') ...");
				
				app.runAction({
					"parameters" : sActionName, 
					"controller" : _this,
					"eventSource" : oEvent.getSource(),
					"eventParameters" : oEvent.getParameters(),
					callback : function(){
						nextAction(j+1);
					}
				});
			};
			
		nextAction(0);
	};
	
	/**
	 * Fires a page event from a ui5strap NavContainer.
	 */
	ControllerProto.firePageEvent = function(oEvent, eventId){
		var sEventHandler = 'on' + jQuery.sap.charToUpperCase(eventId, 0);
		
		this._runEventActions(oEvent, eventId);
		this[sEventHandler] && this[sEventHandler](oEvent);
		
		//@deprecated
		if("pageUpdate" === eventId){
			this._runEventActions(oEvent, "update");
			this.onUpdate && this.onUpdate(oEvent);
		}
	};
	
	/**
	 * Extracts the action names for the given event.
	 * @protected
	 */
	ControllerProto._getActionFromEvent = function(oEvent, customDataKey){
		var actionName = oEvent.getSource().data(customDataKey),
			actionNamesList = uLib.Utils.parseIContent(actionName);
		
		if(actionNamesList && typeof actionNamesList === 'object'){
			var eventId = oEvent.getId();
			
			//Different actions for each event
			if(!eventId || !actionNamesList[eventId]){
				jQuery.sap.log.warning('Cannot execute action: no action for eventId: ' + eventId);
				return null;
			}
			
			actionName = actionNamesList[eventId];
		}
		
		return actionName;
	};

	/**
	 * Action event handler
	 * TODO Rethink names "__exceute" and "__action"
	 */
	ControllerProto.__execute = function(oEvent){
		//No callback needed
		this.getApp().runAction({
			"eventSource" : oEvent.getSource(),
			"eventParameters" : oEvent.getParameters(),
			"controller" : this,
			"parameters" : this._getActionFromEvent(oEvent, "__action")
		});
	};
	
	/**
	 * Gets the reference to the app core module.
	 * FIXME When using a standard UIComponent with app property, the app reference is not available in onInit methods of controllers.
	 * FIXME When using a standard Component, getOwnerComponent returns undefined.
	 */
	ControllerProto.getApp =  function(){
		if(!this._oApp){
			this._oApp = AppBase.getOwnerAppFor(this);
		}
		
		return this._oApp;
    };
    
    /*
     * ===========
     * START Tools
     * ===========
     */
    
    var mTools = {};
    
    /*
    mTools.showOverlay = function(oEvent){
    	
    };
    */
    
    ControllerProto.tools = mTools;
    
    /*
     * =========
     * END Tools
     * =========
     */
    
    /*
     * ================
     * START Formatters
     * ================
     */
	
	/**
	 * All available formatters
	 */
    var mFormatters = {};
	
	/**
	 * Formatter that resolves a i18n string.
	 */
    mFormatters.localeString = function(localeString){
		//FIXME
		//If the language is changed dynamically, the methods still returns the value for previous language.
		//It seems to be a bug in OpenUI5
		//console.log(sap.ui.getCore().getConfiguration().getLanguage());
		return this.getApp().getLocaleString(localeString);
		//return this.getApp().getModelProperty(localeString, 'i18n');
	};
	
	/**
	 * Formatter that resolves a relative package name. 
	 */
	mFormatters.resolvePackage = function(packageName){
		if(!packageName){
			return packageName;
		}
		
		return this.getApp().config.resolvePackage(packageName);
	};
	
	ControllerProto.formatters = mFormatters;
	
	/*
     * ==============
     * END Formatters
     * ==============
     */
	
	//Return constructor
	return Controller;
});