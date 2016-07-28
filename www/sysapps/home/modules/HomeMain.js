
sap.ui.define(['ui5strap/library', 'ui5strap/Manager'], function(uLib, Manager){
  
  //Define Constructor
  var HomeMain = Manager.extend("com.ui5strap.apps.home.modules.HomeMain", {
    "constructor" : function(app, options){
      //Call super constructor
      Manager.call(this, app, options);

    }
  }),
  HomeMainProto = HomeMain.prototype;

  HomeMainProto.init = function(){
	  var _this = this,
	  	  $homeButton = jQuery('#ui5strap-button-home'),
		  $taskmanagerButton = jQuery('#ui5strap-button-taskmanager');
			
	  	this.$barHome = jQuery('#ui5strap-bar-home');
			
		$homeButton.on('click', function(){
			//_this.app.getViewer().executeApp(_this.app.getUrl(), false);
			_this.app.getViewer().showApp(_this.app.getId(), null, function showAppComplete(){
				
			});
		});
		
		$taskmanagerButton.on('click', function(){
			jQuery.sap.log.info("Opening Task Manager...");
			_this.app.getViewer().showOverlay({
				"appId" : _this.app.getId(),
				"target" : "content",
		        "viewName" : _this.app.config.data.app.package + ".views.TaskManager",
		        "id" : "taskManager"
			});
		});
  };
  
  HomeMainProto.onLoad = function(){
	  jQuery('body').addClass('ui5strap-with-bar-home');
  };
  
  /**
	 * Triggered when the Viewer is resized.
	 */
  HomeMainProto.onShow = function(oEvent){
		
		var rootControl = this.getApp().getRootControl(),
			currentPage = rootControl.getTarget("content");
		
		if(currentPage && currentPage.getId() === this.getApp().config.createControlId("Home")){
			currentPage.byId("homeScreen").updateGrid();
		}
	};
  
  /**
	 * Triggered when the Viewer is resized.
	 */
  HomeMainProto.onResize = function(oEvent){
		var currentPage = this.getApp().getRootControl().getTarget("content");
		if(currentPage && currentPage.getId() === this.getApp().config.createControlId("Home")){
			currentPage.byId("homeScreen").updateGrid();
		}
	};
  
	/**
	* Hide, stop and unload an App.
	*/
	HomeMainProto.closeApp = function(sappId, callback){
		var viewer = this.app.getViewer();
		
		if(!sappId){
			throw new Error("Cannot close app: no App ID provided.");
		}

		var appInstance = viewer.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot close app "' + sappId + '" - app not loaded.');
		}

		if ( viewer.getApp() === appInstance ) {
			this.hideApp('transition-zoom2', function hideAppComplete(){
				viewer.stopApp(sappId);
				viewer.unloadApp(sappId);
				callback && callback();
			});
		}	
		else{ 
			viewer.stopApp(sappId);
			viewer.unloadApp(sappId);

			callback && callback();
		}
	};
	
	/**
	 * Hide an App
	 */
	HomeMainProto.hideApp = function(transitionName, callback){
		var _this = this
		this.app.getViewer().showApp(this.app.getId(), transitionName, function showAppComplete(appInstance){
			_this.onResize();
			callback && callback();
			//appInstance.hidden();
		});
	};
	
  return HomeMain;
});