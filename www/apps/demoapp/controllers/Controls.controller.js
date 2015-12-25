/*
 * 
 * UI5Strap Demo App
 *
 * ui5strap.demoapp.controllers.Controls
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

sap.ui.define(['ui5strap/Controller'], function(Controller){

	var controllerImpl = {
		onAfterRendering : function(){
			if(this.getView().getViewName() === "ui5strap.demoapp.views.Controls"){
				this.getApp().setLoaderVisible(false);
			}
		},	
	
		showModal : function(){
			this.getView().byId('myModal').show();
		},
	
		_showStatusMessage : function(message){
			alert(message);
		},
	
		newAlert : function(oEvent){
			var al = new ui5strap.Alert({ visible : true, closable : true, text : 'Just a new alert!' });
			al.placeAt(this.getView().byId('alerts').getId());
		},
	
		buttonTap : function(oEvent){
			oEvent.getSource().setText("Tapped!");
		},
	
		buttonDropdownTap : function(oEvent){
			console.log("BUTTON DROPDOWN");
		},
		
		listDropdownMenuTap : function(oEvent){
			console.log("DROPDOWN MENU");
		},
	
		alertClosed : function(oEvent){
			this._showStatusMessage('You just closed an alert!');
		},
	
		closeOtherAlert : function(oEvent){
			var otherAlert = this.getView().byId('otherAlertId');
			if(otherAlert){
				otherAlert.close();
			}
		},
	
		modalShown : function(oEvent){
			this._showStatusMessage('A modal has just been shown!');
		},
	
		modalHidden : function(oEvent){
			this._showStatusMessage('A modal has just been hidden!');
		},
	
		popoverShown : function(oEvent){
			this.getView().byId('popoverEventIndicator').setText('Popover shown!');
		},
	
		popoverHidden : function(oEvent){
			this.getView().byId('popoverEventIndicator').setText('Popover hidden!');
		},
	
		popoverFromOutside : function(oEvent){
			this.getView().byId('popoverBottom').toggle();
		},
	
		tooltipFromOutside : function(oEvent){
			this.getView().byId('tipTop').toggle();
		},
	
		tooltipShown : function(oEvent){
			this.getView().byId('tooltipEventIndicator').setText('Tooltip shown!');
		},
	
		tooltipHidden : function(oEvent){
			this.getView().byId('tooltipEventIndicator').setText('Tooltip hidden!');
		},
	
		startProgressBar : function(id, callback){
			var _this = this;
			var bar = this.getView().byId(id).getFirstBar();
			var startValue = bar.getValue();
			var value = startValue;
			var endValue = bar.getMaxValue();
			
			var interval = window.setInterval(function(){
				value = value + 2;
				if(value >= endValue){
					value = endValue;
					bar.setValue(value);
					window.clearInterval(interval);
					window.setTimeout(callback, 1000);
				}
				else{
					bar.setValue(value);
				}
			}, 100);
		},
	
		resetBars : function(button){
			button.setSelected(false);
			button.setSeverity(ui5strap.Severity.Success);
				button.setText('Start Progress');
				var icon = button.getContent()[0];
				icon.setIcon('play');
				icon.setSpin(false);
				button.setEnabled(true);
				this.getView().byId('progress1').getFirstBar().setValue(30);
				this.getView().byId('progress2').getFirstBar().setValue(20);
				this.getView().byId('progress3').getFirstBar().setValue(40);
				this.getView().byId('progress4').getFirstBar().setValue(60);
				this.getView().byId('progress5').getFirstBar().setValue(80);
		},
	
		startProgress : function(oEvent){
			var _this = this;
			var button = oEvent.getSource();
			if(!button.getSelected()){
				button.setSelected(true);
				var icon = button.getContent()[0];
				icon.setIcon('spinner');
				icon.setSpin(true);
				button.setSeverity(ui5strap.Severity.Danger);
				button.setText('Please wait...');
				button.setEnabled(false);
				var callI = 5;
				var callback = function(){
					callI --;
					if(callI === 0){
						_this.resetBars(_this.getView().byId('progressButton'));
					}
				};
				this.startProgressBar('progress1',callback);
				this.startProgressBar('progress2',callback);
				this.startProgressBar('progress3',callback);
				this.startProgressBar('progress4',callback);
				this.startProgressBar('progress5',callback);
			}
			else{
				this.resetBars(button);
			}
	
		}
	};
	
	//Return Module Constructor
	return Controller.extend("ui5strap.demoapp.controllers.Controls", controllerImpl);
});