/*
 * 
 * UI5Strap
 *
 * ui5strap.Form
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

	var Form = ControlBase.extend("ui5strap.Form", {
		metadata : {

			defaultAggregation : "content",
			
			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.FormType", 
					defaultValue:ui5strap.FormType.Default
				},
				action : {
					type:"string", 
					defaultValue:""
				},
				method : {
					type:"ui5strap.FormMethod", 
					defaultValue:ui5strap.FormMethod.None
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			events : {
				submit : {

				}
			}

		}
	}),
	FormProto = Form.prototype;
	
	var _typeToClass = {
		"Horizontal" : 'form-horizontal',
		"Inline" : 'form-inline',
	};
	
	FormProto._getStyleClassDesign = function(){
		return  " " + _typeToClass[this.getType()];
	};
	
	FormProto.onAfterRendering = function(){
		var _this = this;
		this.$().on('submit', function(){
			_this.fireSubmit({});
			if(_this.getMethod() === ui5strap.FormMethod.None){
				return false;
			}
		});
	};
	
	return Form;
});