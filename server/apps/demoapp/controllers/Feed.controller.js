var Library = require("../../../lib/Library.js");

/*
 * Construct
 */
var Feed = function(){};
module.exports = Feed;
Feed.prototype = new Library.RestController();
var FeedProto = Feed.prototype;

/**
 * Configure
 */
FeedProto.configure = function(){
	this.options.url = "feed";
	
	this.options.methods.info = {
			path : "info"
			
	};
	
	this.options.methods.goodBye = {
			
	};
};

/**
 * 
 */
FeedProto.info = function(){
	return { 
		feed: [
		       {
		    	   id : 1,
		    	   title : "John Doe",
		    	   message : "Hello World!",
		    	   image : "ui5strap.demoapp.img.awesome"
		       },
		       {
		    	   id : 2,
		    	   title : "Michael Smith",
		    	   message : "Hello World!",
		    	   image : "ui5strap.demoapp.img.awesome"
		       },
		       {
		    	   id : 3,
		    	   title : "James Mayer",
		    	   message : "Hello World!",
		    	   image : "ui5strap.demoapp.img.awesome"
		       },
		       {
		    	   id : 4,
		    	   title : "Christine Peters",
		    	   message : "Hello World!",
		    	   image : "ui5strap.demoapp.img.awesome"
		       }
		]
	};
};

FeedProto.goodBye = function(){
	return { message: "Good Bye!"};
};