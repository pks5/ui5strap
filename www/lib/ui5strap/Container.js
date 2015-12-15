/*
 * 
 * UI5Strap
 *
 * ui5strap.Container
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

	var Container = ControlBase.extend("ui5strap.Container", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
					type : {
						type:"ui5strap.ContainerType", 
						defaultValue: ui5strap.ContainerType.Default
					},
					
					severity : {
						type: "ui5strap.Severity", 
						defaultValue: ui5strap.Severity.None
					},
					
					align : {
						type : "ui5strap.Alignment",
						defaultValue : ui5strap.Alignment.Default
					},
					
					html : {
						type : "string",
						defaultValue : ""
					},
					
					//Visibility DOES inherit from smaller sizes
					//TODO remove visibility since it does same as visibilityExtraSmall
					visibility : {
						deprecated : true,
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilityExtraSmall : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilitySmall : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilityMedium : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilityLarge : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					//TODO add visibilityExtraLarge on Bootstrap 4 Upgrade
					
					//Deprecated
					invisible : {
						deprecated : true,
						type : "boolean",
						defaultValue : false
					}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			
			defaultAggregation : "content"
			
		} //END metadata
	}),
	ContainerProto = Container.prototype;
	
	ContainerProto._stylePrefix = "ui5strapContainer";
	
	ContainerProto._typeData = {
		Default : {
			tagName : "div",
			className : ""
		},
		Text : {
			tagName : "span",
			className : ""
		},
		
		//Bootstrap Components
		Fluid : {
			tagName : "div",
			className : "container-fluid"
		},
		Website : {
			tagName : "div",
			className : "container"
		},
		Jumbotron : {
			tagName : "div",
			className : "jumbotron"
		},
		Well : {
			tagName : "div",
			className : "well"
		},
		WellLarge : {
			tagName : "div",
			className : "well well-lg"
		},
		PageHeader : {
			tagName : "div",
			className : "page-header"
		},
		
		
		
		//Deprecated
		FluidInset : {
			tagName : "div",
			className : "container-fluid"
		}
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ContainerProto._getStyleClassRoot = function(){
		return this._stylePrefix + " " + this._getStyleClassType(this.getType());
	};
	
	//Return Module Constructor
	return Container;
	
});