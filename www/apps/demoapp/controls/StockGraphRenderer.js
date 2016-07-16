/**
 * 
 * Stock Graph Renderer
 * 
 * Author: Jan Philipp Knoeller
 * 
 * Copyright (c) 2014 PKSoftware.de
 * 
 * http://www.pksoftware.de
 * 
 */

sap.ui.define([ 'jquery.sap.global' ], function(jQuery) {

	"use strict";

	var StockGraphRenderer = {};

	StockGraphRenderer.render = function(rm, oControl) {
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("stock_overview-graph");
		rm.writeClasses();
		rm.write(">");
		rm.write("</div>");
	};

	return StockGraphRenderer;

}, true);
