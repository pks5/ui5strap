/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.ui.layout.form.FormContainer control
sap.ui.define([],
	function() {
	"use strict";

	return {
		aggregations : {
			formElements : {
				domRef : function() {
					var oDomRef = this.getDomRef();
					if (!oDomRef && this.getFormElements().length === 0) {
						var oGroupHeader = this.getTitle() || this.getToolbar();
						if (oGroupHeader) {
							return oGroupHeader.getDomRef();
						}
					} else {
						return oDomRef;
					}
				}
			}
		}
	};

}, /* bExport= */ false);