
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
  
  return HomeMain;
});