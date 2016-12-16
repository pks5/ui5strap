/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.TableRow
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

sap.ui.define(['./library', '../core/ElementBase'], function(ui5strapBs3Lib, ElementBase){
	
	"use strict";
	
	/**
	 * Constructor for a new TableRow instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Element for creating rows for the Table control.
	 * @extends ui5strap.ElementBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.TableRow
	 * 
	 */
	var TableRow = ElementBase.extend("pks.ui5strap.bs3.TableRow", /** @lends pks.ui5strap.bs3.TableRow.prototype */ {
		metadata : {
	
			// ---- object ----
			defaultAggregation : "cells",
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
	
			properties : {
				severity : {
					type: "pks.ui5strap.bs3.Severity", 
					defaultValue: ui5strapBs3Lib.Severity.None
				}
			},
	
			aggregations : { 
				"cells" : {
					type : "pks.ui5strap.bs3.TableCell"
				} 
			}
	
		}
	});
	
	return TableRow;

});