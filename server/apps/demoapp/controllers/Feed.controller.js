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
	}
});