/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.PanelGroup
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

sap.ui.define(['./library', "../core/ControlBase"], function(ui5strapBs3Lib, ControlBase){
	
	"use strict";
	
	/**
	 * Constructor for a new PanelGroup instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap panel groups.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.PanelGroup
	 * 
	 */
	var PanelGroup = ControlBase.extend("pks.ui5strap.bs3.PanelGroup", /** @lends pks.ui5strap.bs3.PanelGroup.prototype */ {
		metadata : {

			// ---- object ----
			defaultAggregation : "panels",
			
			// ---- control specific ----
			library : "pks.ui5strap.bs3",

			properties : { 
				
			},
			
			aggregations : { 
				panels : {
					type : "pks.ui5strap.bs3.Panel",
					singularName: "panel"
				}
			}

		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.PanelGroup.prototype
	 */
	PanelGroupProto = PanelGroup.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	PanelGroupProto._getStyleClassPrefix = function(){
		return "ui5strapPanelGroup";
	};
	
	PanelGroupProto._getStyleClassDesign = function(){
		return " panel-group";
	};

	PanelGroup.prototype.setSelectedControl = function(panel){
		var panels = this.getPanels();
		for(var i = 0; i < panels.length; i++){
			var panelI = panels[i];
			if(panelI.getCollapse()){
				if(panelI !== panel){
					panelI.setCollapsed(true);
				}
				else{
					panelI.setCollapsed(!panelI.getCollapsed());
				}
			}
		}
	};
	
	return PanelGroup;
});