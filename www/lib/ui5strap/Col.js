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

	ui5strap.Control.extend("ui5strap.Col", {
		metadata : {
			interfaces : ["ui5strap.IColumn"],
			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				columnsExtraSmall : {
					type:"int", defaultValue:-1
				},
				columnsSmall : {
					type:"int", defaultValue:-1
				},
				columnsMedium : {
					type:"int", defaultValue:-1
				},
				columnsLarge : {
					type:"int", defaultValue:-1
				},
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
			},
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	});

}());