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

sap.ui.define(['pks/ui5strap/viewer/Controller'], function(Controller){

	var controllerImpl = {
		onInit : function(){
			var oDialog = sap.ui.xmlfragment({
				id : "abc",
				fragmentName : "com.ui5strap.apps.demoapp.views.bscon.Dialog1"
			}, this);
			
			this._oDialog1 = oDialog;
		},	
			
		onShowModal : function(oEvent){
			
			
			this._oDialog1.open();
		},
		
		onCloseModal : function(oEvent){
			this._oDialog1.close();
		},
		
		onShowModalInApp : function(oEvent){
			var oDialog = sap.ui.xmlfragment({
				id : "abc",
				fragmentName : "com.ui5strap.apps.demoapp.views.bscon.Dialog2"
			}, this);
			
			oDialog.data("transitionOut", oEvent.getSource().data("transitionOut"));
			//var oDialog = this.getView().byId("myModal");
			this.getApp().showOverlay(oDialog, null, oEvent.getSource().data("transitionIn"));
		},
		
		onCloseModalInApp : function(oEvent){
			this.getApp().hideOverlay(null, this.getApp().getOverlayNavigator().getTarget("content").data("transitionOut"));
		},
		
		_showStatusMessage : function(test){
			
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
		}
	};
	
	//Return Module Constructor
	return Controller.extend("com.ui5strap.apps.demoapp.controllers.bscon.Dialogs", controllerImpl);
});