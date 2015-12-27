/*
 * 
 * UI5Strap
 *
 * ui5strap.ScrollContainer
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

sap.ui.define(['./library', './ControlBase', './CommonRenderers'], function(library, ControlBase, CommonRenderers){

	var ScrollContainer = ControlBase.extend("ui5strap.ScrollContainer", {
		
		metadata : {

			library : "ui5strap",

			properties : { 
				vertical : {
					type:"boolean", 
					defaultValue:false
				},
				horizontal : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			
			defaultAggregation : "content"
		},
		
		renderer : "ui5strap.CommonRenderers.DivWithContent"
	
	}),
	ScrollContainerProto = ScrollContainer.prototype;
	
	/**
	 * @Protected
	 * @Override
	 */
	ScrollContainerProto._getStyleClassRoot = function(){
		var styleClass = "";
		if(this.getHorizontal()){
			styleClass += " " + this._getStyleClassFlag("Horizontal");
		}
		
		if(this.getVertical()){
			styleClass += " " + this._getStyleClassFlag("Vertical");
		}
		
		return styleClass;
	};
	
	/**
	 * @Override
	 */
	ScrollContainerProto.onBeforeRendering = function(){
		if(this.getDomRef()){
			this._scrollTop = this.getDomRef().scrollTop;
		}
		else{
			this._scrollTop =  null;
		}
	};

	/**
	 * @Override
	 */
	ScrollContainerProto.onAfterRendering = function(){
		if(this._scrollTop){
			this.getDomRef().scrollTop = this._scrollTop;
		}
	};
	
	//Return Module Constructor
	return ScrollContainer;
});