var ui5strap = require("../../../lib/ui5strap/library.js");

/*
 * Construct
 */
module.exports = ui5strap.restController({
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
		payload.id = this._db.feeds.default.feed.length;
		this._db.feeds.default.feed.push(payload);
		return "OK";
	}
});