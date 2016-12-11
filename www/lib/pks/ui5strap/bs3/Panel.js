/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Panel
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

sap.ui.define(['./library', "../core/library", "../core/ControlBase", './PanelGroup'], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, PanelGroup){
	
	"use strict";
	
	/**
	 * Constructor for a new Panel instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap panels.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Panel
	 * 
	 */
	var Panel = ControlBase.extend("pks.ui5strap.bs3.Panel", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			properties : { 
				severity : {
					type: "pks.ui5strap.bs3.Severity", 
					defaultValue: ui5strapBs3Lib.Severity.Default
				},
				title : {
					type:"string", defaultValue:""
				},
				titleContentPlacement : {
					type:"pks.ui5strap.core.ContentPlacement",
					defaultValue : ui5strapCoreLib.ContentPlacement.Start
				},
				collapse : {
					type : "boolean",
					defaultValue : false
				},
				collapsed : {
					type : "boolean",
					defaultValue : true
				},
				text : {
					type:"string", defaultValue:""
				},
				contentPlacement : {
					type:"pks.ui5strap.core.ContentPlacement",
					defaultValue : ui5strapCoreLib.ContentPlacement.Start
				}
			},
			aggregations : { 
				titleContent : {
					singularName: "titleContent"
				},
				content : {
					singularName: "content"
				} 
			},
			events : {
				
				//TODO Add panelCollapse events
			}

		}
	}),
	PanelProto = pks.ui5strap.bs3.Panel.prototype;

	/**
	 * @Protected
	 * @Override
	 */
	PanelProto._getStyleClassDesign = function(){
		var styleClass = " panel",
			severity = this.getSeverity();
		
		if(ui5strapBs3Lib.Severity.None !== severity){
			styleClass += " panel-" + ui5strapBs3Lib.BSSeverity[severity];
		}
		
		if(this.getCollapse()){
			styleClass += " panel-collapsible";
		}
		
		return styleClass;
	};
	
	PanelProto.setCollapsed = function(newCollapsed, suppressInvalidate){
		if(!this.getCollapse() || newCollapsed === this.getCollapsed()){
			return this;
		}

		if(this.getDomRef()){
			var $collapse = jQuery('#panel-collapse---' + this.getId());
			if(newCollapsed){
				$collapse
			      .height($collapse.height())
			      [0].offsetHeight

			    $collapse
			      .addClass('collapsing')
			      .removeClass('collapse')
			      .removeClass('in')

			    var complete = function () {
			      $collapse
			        .removeClass('collapsing')
			        .addClass('collapse')
			    }

			    if (!ui5strapBs3Lib.support.transition) return complete.call(this)

			    $collapse
			      .height(0)
			      .one(ui5strapBs3Lib.support.transition.end, complete)
			      .emulateTransitionEnd(350)

			}
			else{
				//$collapse.addClass('collapse in').height('auto');
			
				$collapse
      			.removeClass('collapse')
      			.addClass('collapsing')
      			.height(0);

    			var complete = function () {
			      	$collapse
			        .removeClass('collapsing')
			        .addClass('collapse in')
			        .height('auto')
			    	//fire event collapse completed
			    }

    			if (!ui5strapBs3Lib.support.transition) return complete.call(this)

    			$collapse
			      .one(ui5strapBs3Lib.support.transition.end, complete)
			      .emulateTransitionEnd(350)
			      
			      .height($collapse[0]["scrollHeight"])
			}

			this.setProperty('collapsed', newCollapsed, true);
		}
		else{
			this.setProperty('collapsed', newCollapsed, suppressInvalidate);
		}

		return this;
	};

	PanelProto.toggle = function(){
		this.setCollapsed(!this.getCollapsed());
		
		return this;
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	PanelProto._handlePress = function(oEvent){
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		
		var $target = jQuery(oEvent.target);
		if($target.hasClass('panel-heading') || $target.parent().hasClass('panel-heading')){
			var parent = this.getParent();
			if(parent instanceof PanelGroup){
				parent.setSelectedControl(this);
			}
			else{ 
				this.toggle();
			}
		}
	};

	//Registering Event Handler
	//TODO Desktop / Mobile Test!!!
	if(ui5strapBs3Lib.support.touch){
		PanelProto.ontap = PanelProto._handlePress;
	}
	else{
		PanelProto.onclick = PanelProto._handlePress;
	}
	
	return Panel;
});