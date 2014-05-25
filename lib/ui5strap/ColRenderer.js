/*
 * 
 * UI5Strap
 *
 * Col Renderer
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.ColRenderer");

	ui5strap.ColRenderer = {};

	ui5strap.ColRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		rm.write("<div");
		rm.writeControlData(oControl);
		var columsMedium = oControl.getColumnsMedium(),
			columsLarge = oControl.getColumnsLarge(),
			columsSmall = oControl.getColumnsSmall(),
			columsExtraSmall = oControl.getColumnsExtraSmall();

		if(0 < columsMedium){
			rm.addClass("col-md-" + columsMedium);
		}
		if(0 < columsLarge){
			rm.addClass("col-lg-" + columsLarge);
		}
		if(0 < columsSmall){
			rm.addClass("col-sm-" + columsSmall);
		}
		if(0 < columsExtraSmall){
			rm.addClass("col-xs-" + columsExtraSmall);
		}

		var offsetMedium = oControl.getOffsetMedium(),
			offsetLarge = oControl.getOffsetLarge(),
			offsetSmall = oControl.getOffsetSmall(),
			offsetExtraSmall = oControl.getOffsetExtraSmall();

		if(0 < offsetMedium){
			rm.addClass("col-md-offset-" + offsetMedium);
		}
		if(0 < offsetLarge){
			rm.addClass("col-lg-offset-" + offsetLarge);
		}
		if(0 < offsetSmall){
			rm.addClass("col-sm-offset-" + offsetSmall);
		}
		if(0 < offsetExtraSmall){
			rm.addClass("col-xs-offset-" + offsetExtraSmall);
		}

		var pullMedium = oControl.getPullMedium(),
			pullLarge = oControl.getPullLarge(),
			pullSmall = oControl.getPullSmall(),
			pullExtraSmall = oControl.getPullExtraSmall();

		if(0 < pullMedium){
			rm.addClass("col-md-pull-" + pullMedium);
		}
		if(0 < pullLarge){
			rm.addClass("col-lg-pull-" + pullLarge);
		}
		if(0 < pullSmall){
			rm.addClass("col-sm-pull-" + pullSmall);
		}
		if(0 < pullExtraSmall){
			rm.addClass("col-xs-pull-" + pullExtraSmall);
		}

		var pushMedium = oControl.getPushMedium(),
			pushLarge = oControl.getPushLarge(),
			pushSmall = oControl.getPushSmall(),
			pushExtraSmall = oControl.getPushExtraSmall();

		if(0 < pushMedium){
			rm.addClass("col-md-push-" + pushMedium);
		}
		if(0 < pushLarge){
			rm.addClass("col-lg-push-" + pushLarge);
		}
		if(0 < pushSmall){
			rm.addClass("col-sm-push-" + pushSmall);
		}
		if(0 < pushExtraSmall){
			rm.addClass("col-xs-push-" + pushExtraSmall);
		}

		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};


}());
