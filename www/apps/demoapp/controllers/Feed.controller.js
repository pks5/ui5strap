/*
 * 
 * UI5Strap Demo App
 *
 * ui5strap.demoapp.controllers.Feed
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
			onInit : function(){
				this.getApp().getMain().registerControls({ 
					"feedList" : this.getView().byId("feed") 
				});
			},
			
			onUpdate : function(oEvent){
				this.getApp().getMain().refreshFeed();
			},
			
			handleFeedTap : function(oEvent){
				var _this = this;
				var command = oEvent.getParameter("srcControl").data("command");
				if(command === "DELETE"){
					this.getApp().getMain().deletePost(oEvent.getParameter("srcItem").data("postId"));
				}
				else{
					var postData = oEvent.getParameter("srcItem").getBindingContextData("FEED_INFO");
					this.getApp().getMain().readPost(postData.id, function(postDataDetail){
						_this.getApp().getFrame().navigateTo(_this.getApp().getFrame().getRootControl(), {
							"viewName" : "ui5strap.demoapp.views.PostDetail",
							"parameters" : {
								"post" : postDataDetail
							}
						});
					});
					
				}
			}
	};
	
	//Return Module Constructor
	return Controller.extend("ui5strap.demoapp.controllers.Feed", controllerImpl);

});