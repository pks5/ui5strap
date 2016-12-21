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
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.1-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.TabContainer
	 * 
	 */
	var TabContainer = ControlBase.extend("pks.ui5strap.bs3.TabContainer", /** @lends pks.ui5strap.bs3.TabContainer.prototype */ {
		metadata : {
			interfaces : ["pks.ui5strap.core.ISelectionProvider"],

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
			
			defaultAggregation : "panes",
			
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
				sCustomAssoc = oControl.getCustomAssociation();

			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < content.length; i++){ 
				var item = content[i];
				
				rm.write('<div role="tabpanel"');
				
				rm.writeAttribute('data-pane-index', i);
				if(sCustomAssoc){
					rm.writeAttribute('data-pane-key', item.data(sCustomAssoc));
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
	/**
	 * @alias pks.ui5strap.bs3.TabContainer.prototype
	 */
	TabContainerProto = pks.ui5strap.bs3.TabContainer.prototype;
	
	TabContainerProto.init = function(){
		var _this = this;
		this._fnSource = function(oEvent){
			if(oEvent.getParameter("updates")){
				_this.synchronize();
			}
		};
	};
	
	TabContainerProto.exit = function(){
		this._fnSource = null;
		this._oSelectionProvider = null;
		this._oTransition = null;
	};
	
	
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
	
	TabContainerProto.setSource = function(vSource, bSuppressRendering){
		var vOldSource = this.getSource();
		
		if(vSource !== vOldSource){
			this.setAssociation("source", vSource, true);
			
			if(this._oSelectionProvider){
				this._oSelectionProvider.detachEvent("tap", this._fnSource);
			}
			
			this._oSelectionProvider = sap.ui.getCore().byId(vSource);
		    
			this._oSelectionProvider.attachEvent("tap", {}, this._fnSource);
			
			this.synchronize();
		}
		
		return this;
	};
	
	/**
	 * @protected
	 */
	TabContainerProto.synchronize = function(){
  		var sCustomAssoc = this.getCustomAssociation();
  		if(!sCustomAssoc){
			this.setSelectedIndex(this._oSelectionProvider.getSelectionIndex()[0], true);
		}
		else{
			var panes = this.getPanes();
			
			for(var i = 0; i < panes.length; i++){
				if(this._oSelectionProvider.getSelection()[0].data(sCustomAssoc) === panes[i].data(sCustomAssoc)){
					this.setSelectedIndex(i, true);
					break;
				}
			}
		}
	};
	
	/**
	 * @protected
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
		
		this._oTransition = transition;
		
		transition.on("last", function(){
			$next.attr("class", _this._getStyleClassPart("pane") + " active");
			
			$current.attr("class", _this._getStyleClassPart("pane") + " ui5strap-hidden");
			
			_this._oTransition = null;
		});
			
		ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF1(){
			
			//Prepare Transition
			transition.prepare();
			
			$next.addClass("active");
			
			//RAF
			ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF2(){
				//Execure Transition
				transition.execute();
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

			if(this._oTransition){
				var _this = this;
				
				this._oTransition.cancel();
				
				this._oTransition.on("last", function(){
					_this._oTransition = null;
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
	
	return TabContainer;
});