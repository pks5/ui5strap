var Library = require("../../../lib/ui5strap/library.js");

/*
 * Construct
 */
var Feed = function(options){
	this.options = options;
};
module.exports = Feed;
Feed.prototype = new Library.RestController();
var FeedProto = Feed.prototype;

/**
 * Initialize Controller
 */
FeedProto._init = function(){
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
}

/**
 * 
 */
FeedProto.info = function(){
	return this._db.feeds.default;
};

FeedProto.goodBye = function(){
	return { message: "Good Bye!"};
};