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
				animate : {
		          type:"boolean", 
		          defaultValue:true
		        }, 
				customAssociation : {
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
					
					_this.synchronize(oEvent.getParameter('selectionSource'));
					
				});

				this.synchronize(sourceControl);
			}
	  };

	  TabContainer.prototype.synchronize = function(srcControl){
	  		var customAssociation = this.getCustomAssociation();
	  		if('' === customAssociation){
				this.setSelectedIndex(srcControl.getSelectedIndex());
			}
			else{
				var relatedId = srcControl.getSelectedControl().data(customAssociation);
				this.setSelectedControlById(relatedId);
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
		this.setSelectedPane(this.$().find('.tab-pane').eq(newIndex));
	};

	TabContainer.prototype.setSelectedControlById = function(controlId){
		this.setSelectedPane(this.$().find('#' + this.getId() + '---' + controlId));
	};

	TabContainer.prototype.setSelectedPane = function($pane){
		var $active = this.$().find('> .active'),
			_this = this;

			if($pane.length === 0){
				return;
			}
		//this.$().find('.tab-pane').attr('class', 'tab-pane fade');
		var transition = $.support.transition
      					&& $active.hasClass('fade');

		var next = function(){
			$pane.addClass('active' + (_this.getAnimate() ? ' fade in' : ''));
			$active.removeClass('active');
		};

		transition ?
		      $active
		        .one($.support.transition.end, next)
		        .emulateTransitionEnd(150) :
		      next();

        $active.removeClass('in');
	};

}());