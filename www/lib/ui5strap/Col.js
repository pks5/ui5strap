/*
 * 
 * UI5Strap
 *
 * ui5strap.Col
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

	var Col = ControlBase.extend("ui5strap.Col", {
		metadata : {
			interfaces : ["ui5strap.IColumn"],
			
			library : "ui5strap",
			
			properties : { 
				//Size DOES inherit from smaller sizes
				//TODO rename to sizeExtraSmall
				columnsExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeSmall
				columnsSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeMedium
				columnsMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeLarge
				columnsLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add sizeExtraLarge on Bootstrap 4 Upgrade
				
				//Offset DOES inherit from smaller sizes
				offsetExtraSmall : {
					type:"int", defaultValue:-1
				},
				offsetSmall : {
					type:"int", defaultValue:-1
				},
				offsetMedium : {
					type:"int", defaultValue:-1
				},
				offsetLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add offsetExtraLarge on Bootstrap 4 Upgrade
				
				//Pull DOES inherit from smaller sizes
				pullExtraSmall : {
					type:"int", defaultValue:-1
				},
				pullSmall : {
					type:"int", defaultValue:-1
				},
				pullMedium : {
					type:"int", defaultValue:-1
				},
				pullLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add pullExtraLarge on Bootstrap 4 Upgrade
				
				//Push DOES inherit from smaller sizes
				pushExtraSmall : {
					type:"int", defaultValue:-1
				},
				pushSmall : {
					type:"int", defaultValue:-1
				},
				pushMedium : {
					type:"int", defaultValue:-1
				},
				pushLarge : {
					type:"int", defaultValue:-1
				}
				//TODO add pushExtraLarge on Bootstrap 4 Upgrade
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				} 
			},
			
			defaultAggregation : "content"

		} // END metadata
	});
	
	return Col;
});