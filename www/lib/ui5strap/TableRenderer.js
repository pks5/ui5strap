/*
 * 
 * UI5Strap
 *
 * ui5strap.TableRenderer
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

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	
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

		var columns = row.getColumns(),
			columnsLength = columns.length,
			severity = row.getSeverity();

		rm.write("<tr");
	    if(ui5strap.Severity.None !== severity){
			rm.addClass(ui5strap.BSSeverity[severity]);
		}
	    rm.writeClasses();
	    rm.write(">");

	    for(var i = 0; i < columnsLength; i++){
		    this.renderColumn(rm, oControl, columns[i], i, isHeader);
		}

	    rm.write("</tr>");

	};

	TableRenderer.renderColumn = function(rm, oControl, col, i, isHeader) {
		var tagName = isHeader ? 'th' : 'td';
		rm.write("<" + tagName);
		    
		    rm.writeClasses();
		    rm.write(">");
		    
		    var text = col.getText();
		    rm.writeEscaped(text);
	
		    var content = col.getContent();
	
		    for(var i = 0; i < content.length; i++){
		    	rm.renderControl(content[i]);
		    }
		rm.write("</" + tagName + ">");
	}

	return TableRenderer;
}, true);
