/*
 * 
 * UI5Strap
 *
 * TabContainer
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.TabContainer");

	sap.ui.core.Control.extend("ui5strap.TabContainer", {
		metadata : {

			// ---- object ----
			defaultAggregation : "panes",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				listenTo : {
					type : "string",
					defaultValue : "select",
					bindable : false
				},
				paneIdAttribute : {
					type : "string",
					defaultValue : "",
					bindable : false
				}
			},
			
			aggregations : { 
				panes : {
					singularName: "pane"
				}
			},

			associations : {
				"source" : {
					multiple : false
				}
			}

		}
	});

	var TabContainer = ui5strap.TabContainer;

	TabContainer.prototype.init = function(){
		this.sourceControl = null;
	};

	  TabContainer.prototype.onAfterRendering= function(){
	  	var _this = this;
			var sourceControl = this.getSourceControl();
			if(typeof sourceControl !== 'undefined'){
				sourceControl.attachEvent(this.getListenTo(), {}, function(oEvent){
					
					_this.synchronize(sourceControl);
					
				});

				this.synchronize(sourceControl);
			}
	  };

	  TabContainer.prototype.synchronize = function(srcControl){
	  		if('' === this.getPaneIdAttribute()){
				this.setSelectedIndex(srcControl.getSelectedIndex());
			}
			else{
				var relatedId = srcControl.getSelectedControl().data(this.getPaneIdAttribute());
				this.setSelectedPane(relatedId);
			}
	  };

	  TabContainer.prototype.getSourceControl = function(){
	      if(null === this.sourceControl){
	        this.sourceControl = sap.ui.getCore().byId(this.getSource());
	        
	      }

	      return this.sourceControl;
	  };

	  TabContainer.prototype.getSourceDomRef = function(){
	      return this.getSourceControl().$();
	  };

	TabContainer.prototype.setSelectedIndex = function(newIndex){
		this.$().find('.tab-pane').attr('class', 'tab-pane');
		this.$().find('.tab-pane').eq(newIndex).addClass('active fade in');
	};

	TabContainer.prototype.setSelectedPane = function(controlId){
		this.$().find('.tab-pane').attr('class', 'tab-pane');
		var $pane = this.$().find(controlId + '---pane');
		$pane.addClass('active fade in');
	};
}());