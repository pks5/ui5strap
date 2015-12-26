/*
 * 
 * UI5Strap Demo App
 *
 * ui5strap.demoapp.controllers.NewPost
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

sap.ui.define(['ui5strap/Controller'], function(Controller){

	var controllerImpl = {
			onUpdate : function(oEvent){
				var post = oEvent.getParameter("post");
				this.getView().setModel(new ui5strap.JSONModel(post), "POST");
			}
	};
	
	//Return Module Constructor
	return Controller.extend("ui5strap.demoapp.controllers.PostDetail", controllerImpl);

});