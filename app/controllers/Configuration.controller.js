sap.ui.controller("com_mycompany.my_app.controllers.Configuration", {

	app : liberty.getViewer().getApp(),

	switchTheme : function(oEvent){
		var app = this.app,
			_this = this,
			btn = oEvent.getSource();

		app.setLoaderVisible(true, function(){
			var newTheme = btn.getCustomData()[0].getValue('theme');
			if('default' === newTheme){
				newTheme = jQuery.sap.getModulePath('ui5strap') + '/bootstrap-3.1.1-dist/css/bootstrap.min.css';
			}
			if(!_this.activeButton){
				_this.activeButton = _this.getView().byId('defaultThemeButton');
			}
			_this.activeButton.setSelected(false);
			btn.setSelected(true);
			_this.activeButton = btn;

			_this.setTheme(newTheme);
			
		}, 'opaque');
	},

	setTheme : function(newTheme){
		var app = this.app;

		window.setTimeout(function(){
			
			//This is a hack: older browser do not fire the onload event for stylesheets
			//We use window.requestAnimationFrame to find out how old the broser is
			//TODO: Find a better way to securely detect if the browser does support onload on stylesheets
			if(window.requestAnimationFrame){
				jQuery.sap.includeStyleSheet(newTheme, 'bootstrap-css', function(){
					window.setTimeout(function(){
						app.setLoaderVisible(false);
					}, 500);
				}, null);
			}
			else{
				jQuery.sap.includeStyleSheet(newTheme, 'bootstrap-css', function(){}, null);
				window.setTimeout(function(){
					app.setLoaderVisible(false);
				}, 800);
			}

		}, 500);
	},

	submitThemeForm : function(oEvent){
		var app = this.app,
			_this = this;
		

		var newTheme = this.getView().byId('themeInput').getValue();

		if('' === newTheme){
			return false;
		}

		if(!this.isValidBootstrapTheme(newTheme)){
			//Todo Change to BS Modal

			alert(newTheme + ' is not a valid Bootstrap theme!');

			return false;
		}
		else{
			app.setLoaderVisible(true, function(){
			
				if(this.activeButton){
					this.activeButton.setSelected(false);
				}

				_this.setTheme(newTheme);

			}, 'opaque');
		}
	},

	isValidBootstrapTheme : function(themeUrl){
 		return /bootstrap(\.min)?\.css$/.test(themeUrl);
	}
	
});