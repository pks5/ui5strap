sap.ui.define(['ui5strap/library', 'ui5strap/AppComponent'], function(library, AppComponent){

	var Main = AppComponent.extend("ui5strap.demoapp.modules.Main"),
		MainProto = Main.prototype;
	
	MainProto.setFeedListControl = function(feedList){
		this._feedList = feedList;
	};
	
	MainProto.refreshFeed = function(){
		var _this = this;
		this.app.getFeedClient().info(function(feedInfo){
			_this._feedList.setModel(new ui5strap.JSONModel(feedInfo), "FEED_INFO");
		});
	};
	
	MainProto.deletePost = function(postId){
		var _this = this;
		this.app.getFeedClient().deletePost(postId, function(){
			_this.refreshFeed();
		});
	};
	
	return Main;
});