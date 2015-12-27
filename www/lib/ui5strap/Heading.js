/*
 * 
 * UI5Strap
 *
 * ui5strap.Heading
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

	var Heading = ControlBase.extend("ui5strap.Heading", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				text : {
					type: "string", 
					defaultValue: ""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				level : {
					type: "int", 
					defaultValue: 3
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				
				type : {
					deprecated : true,
					type: "ui5strap.HeadingType", 
					defaultValue: ui5strap.HeadingType.Default
				}
				
			},
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	}),
	HeadingProto = Heading.prototype;
	
	Heading._typeToClass = {
		"PageHeader" : 'page-header',
		'ListGroupItemHeading' : 'list-group-item-heading',
		'MediaHeading' : 'media-heading'
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	HeadingProto._getStyleClassRoot = function(){
		var type = this.getType(),
			classAdd = "";
		if(ui5strap.HeadingType.Default !== type){
			classAdd = " " + Heading._typeToClass[type] + " " + this._getStyleClassType(type);
		}
		
		return classAdd;
	};
	
	ui5strap.Utils.dynamicText(HeadingProto);
	
	return Heading;
});