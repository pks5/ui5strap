module.exports = function(app)
{
	
	var feedData = { feed: [
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
			},
			autoInc = feedData.feed.length + 1;
	
	/**
	 * About HTML
	 */
	app.get('/about',function(req,res){
        res.render('about.html');
    });
     
     
	/**
	 * Info
	 */
     app.get('/api/feed/info',function(req,res){
         res.json(feedData);
     });
     
     /**
      * Read Post
      */
     app.get('/api/feed/read-post/:postId',function(req,res){
    	var returnPost = null;
 		for(var i = 0; i < feedData.feed.length; i++){
 			if(feedData.feed[i].id == req.params.postId){
 				returnPost = feedData.feed[i];
 				break;
 			}
 		}
 		
         res.json(returnPost);
     });
     
     /**
      * Delete Post
      */
     app.post('/api/feed/delete-post',function(req,res){
    	var returnText = "ERROR";
 		for(var i = 0; i < feedData.feed.length; i++){
 			if(feedData.feed[i].id == req.body.postId){
 				feedData.feed.splice(i, 1);
 				returnText = "Deleted post #" + req.body.postId;
 				break;
 			}
 		}
  		
          res.json(returnText);
      });
     
     /**
      * New Post
      */
     app.post('/api/feed/new-post',function(req,res){
    	 var payload = req.body;
    	 payload.id = autoInc;
 	     autoInc++;
 		
 		payload.image = "ui5strap.demoapp.img.awesome";
 		feedData.feed.push(payload);
 		
 		res.json("OK");
      });
}