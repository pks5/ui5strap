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
				},
				selectedIndex : {
					type : "int",
					defaultValue : 1
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
		if(this.getDomRef()){
			
			this.setProperty('selectedIndex', newIndex, true);

			this.setSelectedPane(this.$().find('.tab-pane').eq(newIndex));
		}
		else{
			this.setProperty('selectedIndex', newIndex);
		}
	};

	TabContainer.prototype.setSelectedControlById = function(controlId){
		this.setSelectedPane(this.$().find('#' + this.getId() + '---' + controlId));
	};

	TabContainer.prototype.setSelectedPane = function($pane){
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

	TabContainer.prototype.$getSelectedPane = function(){
		return this.$().find('> .active');
	};

	TabContainer.prototype.getSelectedControl = function(){
		var selectedIndex = this.$getSelectedPane().attr('data-pane-index');

		return this.getPanes()[selectedIndex];
	};

	TabContainer.prototype.setSelectedControl = function(pane){
		this.setSelectedControlById(pane.getId());
	};

}());