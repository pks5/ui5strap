/*
 * 
 * UI5Strap
 *
 * Carousel
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

	jQuery.sap.declare("ui5strap.Carousel");


	sap.ui.core.Control.extend("ui5strap.Carousel", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
			// ---- control specific ----
			library : "com.sap.chio",
			properties : { 
				index : {
					type:"int", defaultValue : 0
				},
				controls : {
					type:"boolean", defaultValue : true
				},
				pagination : {
					type:"boolean", defaultValue : true
				} 
			},
			aggregations : {

				"items" : {}

			},
			events : {
				"change" : {}
			}

		}
	});

	ui5strap.Carousel.prototype.init = function(){
		this.pagesCount = 0;
	};

	ui5strap.Carousel.prototype.onAfterRendering = function(){
		var _this = this;
		this.$().carousel({ interval : false })
		.on('slide.bs.carousel', function (e) {

		})
		.on('slid.bs.carousel', function () {
			var newIndex = _this.$().data("bs.carousel").getActiveIndex();
			_this.setProperty('index', newIndex, true);
			_this.fireChange();
		});
	};


}());