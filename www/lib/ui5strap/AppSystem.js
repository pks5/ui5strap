/*
 * 
 * Ui5OS
 * 
 * AppSystem
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

 sap.ui.define(['./library', './App'], function(library, App){

	 var AppSystem = App.extend("ui5strap.AppSystem", {
		"constructor" : function(config, viewer){
			App.call(this, config, viewer);

			this.getViewer = function(){
				return viewer;
			};
		}
	});

	//Return Module Constructor
	return AppSystem;
});