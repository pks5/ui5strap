/*
 * 
 * UI5Strap Demo App Rest Controller
 *
 * ui5strap.demoapp.server.controllers.Feed
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

var library = require("../../../lib/ui5strap/library.js");

/*
 * Construct
 */
module.exports = library.restController("ui5strap.demoapp.server.controllers.Feed", {
	onInit : function(){
		this._db = {
				feeds : {
					"default" : 
						
						{ feed: [
					    		       {
					    		    	   id : 1,
					    		    	   title : "John Doe",
					    		    	   message : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
					    		    	   image : "ui5strap.demoapp.img.awesome"
					    		       },
					    		       {
					    		    	   id : 2,
					    		    	   title : "Michael Smith",
					    		    	   message : "At vero eos et accusam et justo duo dolores et ea rebum.",
					    		    	   image : "ui5strap.demoapp.img.awesome"
					    		       },
					    		       {
					    		    	   id : 3,
					    		    	   title : "James Mayer",
					    		    	   message : "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
					    		    	   image : "ui5strap.demoapp.img.awesome"
					    		       },
					    		       {
					    		    	   id : 4,
					    		    	   title : "Christine Peters",
					    		    	   message : "At vero eos et accusam et justo duo dolores et ea rebum.",
					    		    	   image : "ui5strap.demoapp.img.awesome"
					    		       }
					    		]
						}
				}
		};
		
		this._autoInc = this._db.feeds.default.feed.length + 1;
	},
	
	info : function(){
		return this._db.feeds.default;
	},
	
	deletePost : function(postId){
		var feed = this._db.feeds.default.feed;
		var returnText = "ERROR";
		for(var i = 0; i < feed.length; i++){
			if(feed[i].id == postId){
				feed.splice(i, 1);
				returnText = "Deleted post #" + postId;
				break;
			}
		}
		console.log(returnText);
		return returnText;
	},
	
	readPost : function(postId){
		var feed = this._db.feeds.default.feed;
		var returnPost = null;
		for(var i = 0; i < feed.length; i++){
			if(feed[i].id == postId){
				returnPost = feed[i];
				break;
			}
		}
		return returnPost;
		
	},
	
	newPost : function(payload){
		payload.id = this._autoInc;
		this._autoInc++;
		payload.image = "ui5strap.demoapp.img.awesome";
		this._db.feeds.default.feed.push(payload);
		return "OK";
	}
});