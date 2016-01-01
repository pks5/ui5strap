/*
 * 
 * UI5Strap
 *
 * ui5strap.PanelGroup
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var PanelGroup = ControlBase.extend("ui5strap.PanelGroup", {
		metadata : {

			// ---- object ----
			defaultAggregation : "panels",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
			
			aggregations : { 
				panels : {
					type : "ui5strap.Panel",
					singularName: "panel"
				}
			}

		}
	}),
	PanelGroupProto = PanelGroup.prototype;
	
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