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
					defaultValue : 0
				}
				
				,
				"listenTo" : {
					type : "string",
					defaultValue : "select",
					bindable : false
				},
				"customAssociation" : {
					deprecated : true,
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
	
	/**
	 * @Public
	 */
	TabContainerProto.onBeforeRendering= function(){
  		var _this = this;
  		
  		if(!this.sourceControl){
			this.sourceControl = sap.ui.getCore().byId(this.getSource());
		    
			this.sourceControl.attachEvent(this.getListenTo(), {}, function(oEvent){
				
				_this.synchronize();
				
			});

			this.synchronize();
		}
	};
	
	/**
	 * @Public
	 */
	TabContainerProto.synchronize = function(){
  		var customAssociation = this.getCustomAssociation();
  		if(!customAssociation){
			this.setSelectedIndex(this.sourceControl.getSelectionIndex(), true);
		}
		else{
			var panes = this.getPanes();
			
			for(var i = 0; i < panes.length; i++){
				if(this.sourceControl.getSelection().data(customAssociation) === panes[i].data(customAssociation)){
					this.setSelectedIndex(i, true);
					break;
				}
			}
		}
	};
	
	

	/**
	 * @Public
	 */
	TabContainerProto.setSelectedPane = function($pane){
		var $active = this.$().find('> .active'),
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

	/**
	 * @Public
	 * @Override
	 */
	TabContainerProto.setSelectedIndex = function(newIndex, suppressInvalidate){
		if(this.getDomRef()){
			
			this.setProperty('selectedIndex', newIndex, true);

			this.setSelectedPane(this.$().find('.tab-pane').eq(newIndex));
		}
		else{
			this.setProperty('selectedIndex', newIndex, suppressInvalidate);
		}
	};
	
	/*
	 * ----------
	 * DEPRECATED
	 * ----------
	 */
	
	/**
	 * @Public
	 * @deprecated
	 */
	TabContainerProto.getSelectedControl = function(){
		return this.getPanes()[this.getSelectedIndex()];
	};

	/**
	 * @Public
	 * @deprecated
	 */
	TabContainerProto.setSelectedControl = function(pane, suppressInvalidate){
		var panes = this.getPanes();
		
		for(var i = 0; i < panes.length; i++){
			if(panes[i].getId() === pane.getId()){
				this.setSelectedIndex(i, suppressInvalidate);
				break;
			}
		}
	};

}());