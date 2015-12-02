/*
 * 
 * UI5Strap
 *
 * ui5strap.TabContainer
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

(function(){

	jQuery.sap.declare("ui5strap.TabContainer");
	jQuery.sap.require("ui5strap.library");
	
	ui5strap.Control.extend("ui5strap.TabContainer", {
		metadata : {
			interfaces : ["ui5strap.ISelectionProvider"],

			// ---- object ----
			defaultAggregation : "panes",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
				animate : {
		          type:"boolean", 
		          defaultValue:true
		        },
		        
				selectedIndex : {
					type : "int",
					defaultValue : 1
				}
				
				,
				"listenTo" : {
					type : "string",
					defaultValue : "select",
					bindable : false
				},
				"customAssociation" : {
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
			
			"associations" : {
				"source" : {
					"deprecated" : true,
					"type" : "ui5strap.ISelectionProvider",
					multiple : false
				}
			}

		}
	});

	var TabContainerProto = ui5strap.TabContainer.prototype;

	TabContainerProto.init = function(){
		this.sourceControl = null;
	};

	  TabContainerProto.onAfterRendering= function(){
	  	var _this = this;
			var sourceControl = this.getSourceControl();
			if(typeof sourceControl !== 'undefined'){
				sourceControl.attachEvent(this.getListenTo(), {}, function(oEvent){
					
					_this.synchronize(sourceControl);
					
				});

				this.synchronize(sourceControl);
			}
	  };

	  TabContainerProto.synchronize = function(srcControl){
	  		var customAssociation = this.getCustomAssociation();
	  		if('' === customAssociation){
				this.setSelectedIndex(srcControl.getSelectedIndex());
			}
			else{
				var relatedId = srcControl.getSelectedControl().data(customAssociation);
				this.setSelectedControlById(relatedId);
			}
	  };

	  TabContainerProto.getSourceControl = function(){
	      if(null === this.sourceControl){
	        this.sourceControl = sap.ui.getCore().byId(this.getSource());
	      }

	      return this.sourceControl;
	  };

	 TabContainerProto.setSelectedIndex = function(newIndex){
		if(this.getDomRef()){
			
			this.setProperty('selectedIndex', newIndex, true);

			this.setSelectedPane(this.$().find('.tab-pane').eq(newIndex));
		}
		else{
			this.setProperty('selectedIndex', newIndex);
		}
	};

	TabContainerProto.setSelectedControlById = function(controlId){
		this.setSelectedPane(this.$().find('#' + this.getId() + '---' + controlId));
	};

	TabContainerProto.setSelectedPane = function($pane){
		var $active = this.$getSelectedPane(),
			_this = this;

			if($active.attr('data-pane-index') === $pane.attr('data-pane-index') || $pane.length === 0){
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

	TabContainerProto.$getSelectedPane = function(){
		return this.$().find('> .active');
	};

	TabContainerProto.getSelectedControl = function(){
		var selectedIndex = this.$getSelectedPane().attr('data-pane-index');

		return this.getPanes()[selectedIndex];
	};

	TabContainerProto.setSelectedControl = function(pane){
		this.setSelectedControlById(pane.getId());
	};

}());