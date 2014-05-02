/*
 * 
 * UI5Strap
 *
 * Table Renderer
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

jQuery.sap.declare("ui5strap.TableRenderer");

ui5strap.TableRenderer = {
};

ui5strap.TableRenderer.render = function(rm, oControl) {
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

ui5strap.TableRenderer.renderRow = function(rm, oControl, row, isHeader) {

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

ui5strap.TableRenderer.renderColumn = function(rm, oControl, col, i, isHeader) {
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

}());
