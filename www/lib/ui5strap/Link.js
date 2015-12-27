/*
 * 
 * UI5Strap
 *
 * ui5strap.Link
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
	
	var Link = ControlBase.extend("ui5strap.Link", {
		metadata : {

			interfaces : ["ui5strap.IText"],
			
			library : "ui5strap",

			properties : { 
				
				text : {
					type:"string", 
					defaultValue : ""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				title : {
					type: "string", 
					defaultValue : ""
				},
				
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue : ui5strap.TrailHtml.None
				},
				
				//Default functionality
				href : {
					type : "string", 
					defaultValue : ""
				},
				target  : {
					type : "string", 
					defaultValue : ""
				},	
				
				//@deprecated
				type : {
					deprecated : true,
					type : "ui5strap.LinkType",
					defaultValue : ui5strap.LinkType.Default
				},
				bsAction : {
					deprecated : true,
					type : "ui5strap.BsAction", 
					defaultValue : ui5strap.BsAction.None
				}
			},

			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			
			defaultAggregation : "content",
			
			events : {
				
				//TODO Rename 'tap' event to 'press' sometimes
		        tap : {allowPreventDefault : true}
		    }

		}
	}),
	LinkProto = Link.prototype;
	
	LinkProto._typeToClass = {
		Thumbnail : "thumbnail"
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	LinkProto._getStyleClassDesign = function(){
		var styleClass = "";
		
		var type = this.getType();
		if(ui5strap.LinkType.Default !== type){
			styleClass += " " + this._typeToClass[type];
		}
		
		return styleClass;
	};
	
	ui5strap.Utils.dynamicAttributes(
		LinkProto, 
		[
			"title",
			"href",
			"target"
		]
	);

	ui5strap.Utils.dynamicText(LinkProto);
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	LinkProto._handlePress = function(oEvent) {
		//if (this.getEnabled()) {
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		oEvent.setMarked("ui5strap.Link");

			if (!this.fireTap() || !this.getHref()) {
				oEvent.preventDefault();
			}
		//} else {
		//	oEvent.preventDefault();
		//}
	};
	
	if(ui5strap.support.touch){
		LinkProto.ontap = LinkProto._handlePress;
	}
	else{
		LinkProto.onclick = LinkProto._handlePress;
	}
	
	return Link;

});