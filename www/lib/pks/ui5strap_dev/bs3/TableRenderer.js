/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.TableRenderer
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

sap.ui.define(['jquery.sap.global', "./library"], function(jQuery, ui5strapBs3Lib) {
	
	"use strict";
	
	/**
	 * Table renderer.
	 * @namespace
	 */
	var TableRenderer = {};
	
	TableRenderer.render = function(rm, oControl) {
		 rm.write("<table");
		    rm.writeControlData(oControl);
		    rm.addClass("table");
		    if(oControl.getCondensed()){
		    	rm.addClass('table-condensed');
		    }
		    if(oControl.getBordered()){
		    	rm.addClass('table-bordered');
		    }
		    if(oControl.getStriped()){
		    	rm.addClass('table-striped');
		    }
		    if(oControl.getHover()){
		    	rm.addClass('table-hover');
		    }
		    rm.writeClasses();
		    rm.write(">");
		    
		    var head = oControl.getHead();
	
		    if(null !== head){
		    	this.renderRow(rm, oControl, head, true);
		    }
	
		   	var rows = oControl.getBody();
	
		    for(var i = 0; i < rows.length; i++){
		    	this.renderRow(rm, oControl, rows[i]);
		    }
	
		rm.write("</table>");
	};

	TableRenderer.renderRow = function(rm, oControl, row, isHeader) {

		var aCells = row.getCells(),
			iCellsLength = aCells.length,
			severity = row.getSeverity();

		rm.write("<tr");
	    if(ui5strapBs3Lib.Severity.None !== severity){
			rm.addClass(ui5strapBs3Lib.BSSeverity[severity]);
		}
	    rm.writeClasses();
	    rm.write(">");

	    for(var i = 0; i < iCellsLength; i++){
		    this.renderCell(rm, oControl, aCells[i], i, isHeader);
		}

	    rm.write("</tr>");

	};

	TableRenderer.renderCell = function(rm, oControl, oCell, i, isHeader) {
		var tagName = isHeader ? 'th' : 'td';
		rm.write("<" + tagName);
		    
		    rm.writeClasses();
		    rm.write(">");
		    
		    var text = oCell.getText();
		    rm.writeEscaped(text);
	
		    var aontent = oCell.getContent();
	
		    for(var i = 0; i < aontent.length; i++){
		    	rm.renderControl(aContent[i]);
		    }
		rm.write("</" + tagName + ">");
	}

	return TableRenderer;
}, true);
