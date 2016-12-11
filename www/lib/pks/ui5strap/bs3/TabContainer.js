/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.TabContainer
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

sap.ui.define(['./library', "../core/library", "../core/ControlBase", '../core/ResponsiveTransition'], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, ResponsiveTransition){
	
	"use strict";
	
	/**
	 * Constructor for a new TabContainer instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap tab containers.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.TabContainer
	 * 
	 */
	var TabContainer = ControlBase.extend("pks.ui5strap.bs3.TabContainer", {
		metadata : {
			interfaces : ["pks.ui5strap.core.ISelectionProvider"],

			// ---- object ----
			defaultAggregation : "panes",
			
			// ---- control specific ----
			library : "pks.ui5strap.bs3",

			properties : { 
				
				selectedIndex : {
					type : "int",
					defaultValue : 0
				},
				
				transition : {
					type : "string",
					defaultValue : "fade"
				},
				
				customAssociation : {
					deprecated : true,
					type : "string",
					defaultValue : "",
					bindable : false
				},
				
				fullHeight : {
					type:"boolean", 
			        defaultValue:false
			    }
			},
			
			aggregations : { 
				panes : {
					singularName: "pane"
				}
			},
			
			associations : {
				"source" : {
					type : "pks.ui5strap.core.ISelectionProvider",
					multiple : false
				}
			}

		},
		
		renderer : function(rm, oControl) {
			var content = oControl.getPanes(),
				selectedIndex = oControl.getSelectedIndex(),
				customAssociation = oControl.getCustomAssociation();

			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < content.length; i++){ 
				var item = content[i];
				
				rm.write('<div role="tabpanel"');
				
				rm.writeAttribute('data-pane-index', i);
				if(customAssociation){
					rm.writeAttribute('data-pane-key', item.data(customAssociation));
				}
				rm.addClass(oControl._getStyleClassPart("pane"));
				if(selectedIndex > -1 && i === selectedIndex){
					rm.addClass('active');
				}
				else{
					rm.addClass('ui5strap-hidden');
				}
				rm.writeClasses();
				rm.write(">");
				
				rm.renderControl(item);

				rm.write("</div>");
			};

			rm.write("</div>");
		}
	}),
	TabContainerProto = pks.ui5strap.bs3.TabContainer.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	TabContainerProto._getStyleClassPrefix = function(){
		return "ui5strapTabContainer";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	TabContainerProto._getStyleClassRoot = function(){
		var styleClass = " tab-content";
		
		if(this.getFullHeight()){
			styleClass += " " + this._getStyleClassFlag("FullHeight");
		}
		return styleClass;
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	TabContainerProto._getStyleClassPart = function(partName){
		var classPart = ControlBase.prototype._getStyleClassPart.call(this, partName);
		
		if("pane" === partName){
			classPart += " tab-pane";
		}
		
		return classPart;
	};
	
	/**
	 * @Public
	 */
	TabContainerProto.onBeforeRendering= function(){
  		var _this = this;
  		
  		if(!this.sourceControl){
  			this.sourceControl = sap.ui.getCore().byId(this.getSource());
		    
			this.sourceControl.attachEvent("tap", {}, function(oEvent){
				if(oEvent.getParameter("updates")){
					_this.synchronize();
				}
				
			});

			this.synchronize();
		}
	};
	
	/**
	 * @Public
	 * @deprecated
	 */
	TabContainerProto.synchronize = function(){
  		var customAssociation = this.getCustomAssociation();
  		if(!customAssociation){
			this.setSelectedIndex(this.sourceControl.getSelectionIndex()[0], true);
		}
		else{
			var panes = this.getPanes();
			
			for(var i = 0; i < panes.length; i++){
				if(this.sourceControl.getSelection()[0].data(customAssociation) === panes[i].data(customAssociation)){
					this.setSelectedIndex(i, true);
					break;
				}
			}
		}
	};
	
	/**
	 * @Public
	 */
	TabContainerProto._showSelectedPane = function(){
		var _this = this,
			$current = this.$().find('> .active'),
			$next = this.$().find('.tab-pane').eq(this.getSelectedIndex());
		
		var transition = new ResponsiveTransition(
				{
					"$current" : $current, 
					"$next" : $next, 
					"id" : 'tab-container-page-change',
					"transitionAll" : this.getTransition()
				}
			);
		
		this._transition = transition;
			
		var transitionNextComplete = function (){
				if(transition.madeChanges() && $next.data("paneIndex") === _this.getSelectedIndex()){
					$next.attr("class", _this._getStyleClassPart("pane") + " active");
				}
			},
			transitionCurrentComplete = function (){
				if(transition.madeChanges() && $current.data("paneIndex") !== _this.getSelectedIndex()){
					$current.attr("class", _this._getStyleClassPart("pane") + " ui5strap-hidden");
				}
			};
		
		//RAF start
			ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF1(){
			
			//Prepare Transition
			transition.prepare();
			
			$next.addClass("active");
			
			//RAF
			ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF2(){
				//Execure Transition
				transition.execute(transitionCurrentComplete, transitionNextComplete);
			});
	
		});
	};
	
	/**
	 * @Public
	 * @Override
	 */
	TabContainerProto.setSelectedIndex = function(newIndex, suppressInvalidate){
		if(this.getDomRef()){
			
			this.setProperty('selectedIndex', newIndex, true);

			if(this._transition){
				var _this = this;
				this._transition.cancel();
				this._transition.on("last", function(){
					_this._transition = null;
					_this._showSelectedPane();
				});
			}
			else{
				this._showSelectedPane();
			}
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

	return TabContainer;
});