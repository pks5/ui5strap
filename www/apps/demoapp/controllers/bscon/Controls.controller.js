/*
 * 
 * UI5Strap Demo App
 *
 * com.ui5strap.apps.demoapp.controllers.Controls
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
		onInit : function(){
			
			console.log("bscon", this);
		},	
			
		onUpdate : function(){
			//console.log(this.getView().oPropagatedProperties);
		},	
			
		onAfterRendering : function(){
			//console.log("View rendered: " + this.getView().getViewName());
		},	
		
		handleEmailChange : function(oEvent){
			alert("Change!");
		},
		
		handleEmailSubmit : function(oEvent){
			alert("Submit!");
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
	
		},
		
		/*
		 * Wheels
		 */
		
		selectWheelWithIcons : function(){
			this.getView().byId("wheelWithNumbers").setSelectionByProperty("text", "2.5");
		},
		
		alertWheelValue : function(oEvent){
			console.log(oEvent.getSource().getSelectionCustomData("value")[0]);
		}
	};
	
	//Return Module Constructor
	return Controller.extend("com.ui5strap.apps.demoapp.controllers.bscon.Controls", controllerImpl);
});