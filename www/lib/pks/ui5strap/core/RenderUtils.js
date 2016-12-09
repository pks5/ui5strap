/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.RenderUtils
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

sap.ui.define([ './library', './Utils'], function(ui5strapLibrary, Utils) {
	
	/*
	 * ---------
	 * 
	 * Rendering
	 * 
	 * ---------
	 */

	/**
	 * @Package
	 * @Public
	 */
	var RenderUtils = {};

	/**
	 * Renders title content, used in Panel
	 * 
	 * @Public
	 * @Static
	 */
	RenderUtils.renderTitleContent = function(rm,
			oControl, text) {
		var content = oControl.getTitleContent(), contentPlacement = oControl
				.getTitleContentPlacement(), text = text
				|| oControl.getTitle();

		if (contentPlacement === ui5strap.ContentPlacement.End) {
			rm.writeEscaped(text);
		}

		for (var i = 0; i < content.length; i++) {
			rm.renderControl(content[i]);
		}

		if (contentPlacement === ui5strap.ContentPlacement.Start) {
			rm.writeEscaped(text);
		}
	};

	

	/**
	 * Default rendering for controls that have both text
	 * property and content aggregation
	 * 
	 * @Public
	 * @Static
	 */
	RenderUtils.renderContent = function(rm, oControl) {
		var content = oControl.getContent(), contentPlacement = oControl
				.getContentPlacement(), text = oControl.getText
				&& oControl.getText(), parse = oControl.getParse && oControl.getParse();

		if (contentPlacement === ui5strap.ContentPlacement.End) {
			if (parse) {
				rm.write(Utils.parseText(text));
			} else {
				rm.writeEscaped(text);
			}
		}

		for (var i = 0; i < content.length; i++) {
			rm.renderControl(content[i]);
		}

		if (contentPlacement === ui5strap.ContentPlacement.Start) {
			if (parse) {
				rm.write(Utils.parseText(text));
			} else {
				rm.writeEscaped(text);
			}
		}
	};

	/**
	 * Trail mapping
	 */
	RenderUtils.trailHtml = {
		Space : ' ',
		DoubleSpace : '&nbsp; ',
		Break : '<br />'
	};

	/**
	 * Renders the trail after inline controls
	 */
	RenderUtils.renderTrail = function(rm, oControl,
			text) {
		var trail = oControl.getTrail();

		if (trail !== ui5strap.TrailHtml.None) {
			rm.write(this.trailHtml[trail]);
		}
	};
	
	return RenderUtils;
});