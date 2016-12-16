/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Alert
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

sap.ui.define([ './library', "../core/library", "../core/ControlBase", "../core/Utils", "../core/RenderUtils" ], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, Utils, RenderUtils) {
	
	"use strict";
	
	/**
	 * Constructor for a new Alert instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * The Alert Control creates a Boostrap alert.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Alert
	 * 
	 */
	var Alert = ControlBase.extend("pks.ui5strap.bs3.Alert", /** @lends pks.ui5strap.bs3.Alert.prototype */ {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "pks.ui5strap.bs3",

			properties : {
				text : {
					type : "string",
					defaultValue : ""
				},
				animate : {
					type : "boolean",
					defaultValue : true
				},
				visible : {
					type : "boolean",
					defaultValue : true
				},
				closable : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type : "pks.ui5strap.core.ContentPlacement",
					defaultValue : ui5strapCoreLib.ContentPlacement.Start
				},
				severity : {
					type : "pks.ui5strap.bs3.Severity",
					defaultValue : ui5strapBs3Lib.Severity.Info
				}
			},
			aggregations : {
				closeButton : {
					type : "pks.ui5strap.bs3.Button",
					multiple : false
				},
				content : {
					singularName : "content"
				}
			},
			events : {
				closed : {

				}
			}

		},
		
		renderer : function(rm, oControl) {
			
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");

			var closeButton = oControl.getCloseButton();
			if(null !== closeButton && oControl.getClosable()){
				rm.renderControl(closeButton);
			}
			
			RenderUtils.renderContent(rm, oControl);

			rm.write("</div>");

		}
	}), 
	/**
	 * @alias pks.ui5strap.bs3.Alert.prototype
	 */
	AlertProto = Alert.prototype;

	Utils.dynamicText(AlertProto);
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	AlertProto._getStyleClassPrefix = function(){
		return "ui5strapAlert";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	AlertProto._getStyleClassDesign = function(){
		var styleClass = " alert";
		
		styleClass += " alert-" + ui5strapBs3Lib.BSSeverity[this.getSeverity()] + (this.getAnimate() ? " fade" : '');
		
		return styleClass;
	};

	var _setCloseButton = AlertProto.setCloseButton;

	AlertProto.setCloseButton = function(closeButton, suppressInvalidate) {
		var _this = this;
		if (null !== closeButton) {
			closeButton.attachEvent('tap', {}, function(oEvent) {
				_this.close();
			});
		}

		_setCloseButton.call(this, closeButton, suppressInvalidate);
	};

	AlertProto.onBeforeRendering = function() {
		if (this.getClosable() && this.getCloseButton() === null) {
			this.setCloseButton(new pks.ui5strap.bs3.Button({
				type : ui5strapBs3Lib.ButtonType.Close,
				content : [ new pks.ui5strap.bs3.Icon({
					icon : "times",
					iconSet : "fa"
				}) ]
			}));
		}
	};

	AlertProto.onAfterRendering = function() {
		if (this.getVisible()) {
			this.$().addClass('in');
		}
	};

	AlertProto.setVisible = function(visible) {
		if (this.getDomRef()) {
			if (visible) {
				this.$().addClass('in');
			} else {
				this.$().removeClass('in');
			}
			this.setProperty('visible', visible, true);
		} else {
			this.setProperty('visible', visible);
		}
	};

	AlertProto.close = function() {
		var $alert = this.$(), _this = this;
		$alert.removeClass('in')

		function removeElement() {
			_this.fireClosed({});
			_this.destroy();
		}

		ui5strapBs3Lib.support.transition && $alert.hasClass('fade') ? $alert.one(
				ui5strapBs3Lib.support.transition.end, removeElement)
				.emulateTransitionEnd(150) : removeElement()
	};

	return Alert;

});