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

(function(){

	jQuery.sap.declare("ui5strap.Col");
	jQuery.sap.require("ui5strap.library");

	ui5strap.ControlBase.extend("ui5strap.Col", {
		metadata : {
			interfaces : ["ui5strap.IColumn"],
			
			library : "ui5strap",
			
			properties : { 
				//Size DOES inherit from smaller sizes
				//TODO rename to size
				columnsExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeSmallUp
				columnsSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeMediumUp
				columnsMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to sizeLargeUp
				columnsLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add sizeExtraLarge on Bootstrap 4 Upgrade
				
				//Offset DOES inherit from smaller sizes
				//TODO rename to offset
				offsetExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to offsetSmallUp
				offsetSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to offsetMediumUp
				offsetMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to offsetLargeUp
				offsetLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add offsetExtraLarge on Bootstrap 4 Upgrade
				
				//Pull DOES inherit from smaller sizes
				//TODO rename to pull
				pullExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pullSmallUp
				pullSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pullMediumUp
				pullMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pullLargeUp
				pullLarge : {
					type:"int", defaultValue:-1
				},
				//TODO add pullExtraLarge on Bootstrap 4 Upgrade
				
				//Push DOES inherit from smaller sizes
				//TODO rename to push
				pushExtraSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pushSmallUp
				pushSmall : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pushMediumUp
				pushMedium : {
					type:"int", defaultValue:-1
				},
				//TODO rename to pushLargeUp
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

}());