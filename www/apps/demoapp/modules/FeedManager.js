/*
 * 
 * UI5Strap Demo App
 *
 * ui5strap.demoapp.modules.FeedManager
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

sap.ui.define(['ui5strap/library', 'ui5strap/Manager'], function(library, Manager){

	var FeedManager = Manager.extend("ui5strap.demoapp.modules.FeedManager"),
		FeedManagerProto = FeedManager.prototype;
	
	/**
	 * Refreshes the feed.
	 * 
	 * @Public
	 */
	FeedManagerProto.refreshFeed = function(){
		var _this = this;
		this.app.getFeedClient().info(function(feedInfo){
			_this.controls.feedList.setModel(new ui5strap.JSONModel(feedInfo), "FEED_INFO");
		});
	};
	
	/**
	 * Deletes the post with the given postId.
	 * 
	 * @Public
	 */
	FeedManagerProto.deletePost = function(postId){
		var _this = this;
		this.app.getFeedClient().deletePost(postId, function(){
			_this.refreshFeed();
		});
	};
	
	/**
	 * Gets the details of the post with the given id.
	 * 
	 * @Public
	 */
	FeedManagerProto.readPost = function(postId, callback){
		var _this = this;
		this.app.getFeedClient().readPost(postId, function(postData){
			callback && callback(postData);
		});
	};
	
	/**
	 * Creates a new post.
	 * 
	 * @Public
	 */
	FeedManagerProto.newPost = function(title, message){
		var _this = this;
		this.app.getFeedClient().newPost(
			{
				title : title,
				message : message
			}, 
			function(){
				_this.refreshFeed();
			}
		);
	};
	
	/**
	 * Loads the details of the post with the given postId and navigates to the PostDetail view to show the details.
	 * 
	 * @Public
	 */
	FeedManagerProto.postDetail = function(postId){
		var _this = this;
		this.readPost(postId, function(postDataDetail){
			_this.getApp().navigateTo(_this.getApp().getRootControl(), {
				"viewName" : "ui5strap.demoapp.views.PostDetail",
				"parameters" : {
					"post" : postDataDetail
				}
			});
		});
	};
	
	return FeedManager;
});