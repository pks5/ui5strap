sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/m/MessageToast"
            ], function (Controller, MessageToast) {
               "use strict";
               return Controller.extend("sap.ui.demo.wt.controller.HelloPanel", {
            	   onInit : function(){
               			console.log(this.getOwnerComponent().getApp());
               		},
            	   
            	   onShowHello : function () {
                	// read msg from i18n model
                      var oBundle = this.getView().getModel("i18n").getResourceBundle();
                      var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                      var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                      // show message
                      MessageToast.show(sMsg);
                      
                      alert(this.createId("test2"));
                  },
                  _getDialog : function () {
                     // create dialog lazily
                     if (!this._oDialog) {
                        // create dialog via fragment factory
                        this._oDialog = sap.ui.xmlfragment("sap.ui.demo.wt.view.HelloDialog", this);
                        // connect dialog to view (models, lifecycle)
                        this.getView().addDependent(this._oDialog);
                     }
                     return this._oDialog;
                  },
          		onOpenDialog : function () {
        			this.getOwnerComponent().helloDialog.open(this.getView());
        		}
               });
            });