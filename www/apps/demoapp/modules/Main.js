sap.ui.define(['ui5strap/library', 'ui5strap/AppComponent'], function(library, AppComponent){

	var Main = AppComponent.extend("ui5strap.demoapp.modules.Main"),
		MainProto = Main.prototype;
	
	MainProto.refreshFeed = function(){
		var _this = this;
		this.app.getFeedClient().info(function(feedInfo){
			_this.controls.feedList.setModel(new ui5strap.JSONModel(feedInfo), "FEED_INFO");
		});
	};
	
	MainProto.deletePost = function(postId){
		var _this = this;
		this.app.getFeedClient().deletePost(postId, function(){
			_this.refreshFeed();
		});
	};
	
	MainProto.readPost = function(postId, callback){
		var _this = this;
		this.app.getFeedClient().readPost(postId, function(postData){
			callback && callback(postData);
		});
	};
	
	MainProto.newPost = function(title, message){
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
	
	return Main;
});