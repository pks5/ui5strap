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
			className : "container-default"
		},
		Text : {
			tagName : "span",
			className : "container-text"
		},
		Section : {
			tagName : "section",
			className : "container-section"
		},
		
		//Bootstrap container and container-fluid
		//container-inset is an additional class that adds padding-top and padding-bottom
		
		Fluid : {
			tagName : "div",
			className : "container-fluid"
		},
		Inset : {
			tagName : "div",
			className : "container-inset"
		},
		Full : {
			tagName : "div",
			className : "container-full"
		},
		
		FluidInset : {
			tagName : "div",
			className : "container-fluid container-inset"
		},
		FluidFull : {
			tagName : "div",
			className : "container-fluid container-full"
		},
		InsetFull : {
			tagName : "div",
			className : "container-inset container-full"
		},
		FluidInsetFull : {
			tagName : "div",
			className : "container-fluid container-inset container-full"
		},
		
		
		//Bootstrap Components
		Website : {
			tagName : "div",
			className : "container"
		},
		Jumbotron : {
			tagName : "div",
			className : "container-jumbotron jumbotron"
		},
		Well : {
			tagName : "div",
			className : "container-well well"
		},
		WellLarge : {
			tagName : "div",
			className : "container-well well well-lg"
		},
		PageHeader : {
			tagName : "div",
			className : "container-page-header page-header"
		},
		
		
		
		//Deprecated
		Page : {
			tagName : "div",
			className : "container"
		},
		Paragraph : {
			tagName : "div",
			className : "container-paragraph"
		},
		Phrasing : {
			tagName : "div",
			className : "container-phrasing"
		},
		Floating : {
			tagName : "div",
			className : "container-floating"
		}
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ContainerProto._getStyleClassesRoot = function(){
		return this._stylePrefix + " " + this._getStyleClassType(this.getType());
	};
	
	//Return Module Constructor
	return Container;
	
});