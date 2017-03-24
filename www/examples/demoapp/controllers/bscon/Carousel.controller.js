/*
 * 
 * UI5Strap Demo App
 *
 * com.ui5strap.apps.demoapp.controllers.Controls
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

sap.ui.define(['pks/ui5strap/viewer/Controller', "pks/ui5strap/bs3/Container", "pks/ui5strap/bs3/Icon"], function(Controller, Container, Icon){

	var controllerImpl = {
			
			addItem : function(oEvent){
				var oContainer = new Container({
					type : "Fluid",
					fullHeight : true
				});
				
				oContainer.addContent(new Icon({ icon : "star" }));
				
				oContainer.addStyleClass("example-carousel-page");
				
				this.getView().byId("carousel1").addItem(oContainer);
			},
			
			removeItem : function(oEvent){
				var oCarousel = this.getView().byId("carousel1");
				oCarousel.removeItem(oCarousel.getItems()[oCarousel.getItems().length - 1]);
			}
			
	};
	
	//Return Module Constructor
	return Controller.extend("com.ui5strap.apps.demoapp.controllers.bscon.Carousel", controllerImpl);
});