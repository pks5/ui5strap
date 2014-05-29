/*
 * 
 * UI5Strap
 *
 * NavBar
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

	jQuery.sap.declare("ui5strap.NavBar");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.NavBar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "collapse",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.NavBarType", 
					defaultValue:ui5strap.NavBarType.Default
				},
				inverse : {
					type:"boolean", 
					defaultValue:false
				},
				fluid : {
					type:"boolean", 
					defaultValue:false
				},
				collapsed : {
					type : "boolean",
					defaultValue : true
				},
				position : {
					type:"ui5strap.NavBarPosition", 
					defaultValue: ui5strap.NavBarPosition.Default
				}
			},

			aggregations : { 
				
				collapse : {
					singularName: "collapse"
				},

				brand : {
					multiple : false,
					type : "ui5strap.Link"
				},

				contentLeft : {
					
				},

				content : {

				},

				contentRight : {
					
				}
			}

		}
	});

	var NavBarProto = ui5strap.NavBar.prototype;

	NavBarProto.getCollapseId = function(){
		return this.getId() + '---collapse';
	};

	NavBarProto.setCollapsed = function(newCollapsed){
		if(newCollapsed === this.getCollapsed()){
			return this;
		}

		if(this.getDomRef()){
			var $collapse = jQuery('#' + this.getCollapseId());
			if(newCollapsed){
				$collapse
			      .height($collapse.height())
			      [0].offsetHeight

			    $collapse
			      .addClass('collapsing')
			      .removeClass('collapse')
			      .removeClass('in')

			    var complete = function () {
			      $collapse
			        .removeClass('collapsing')
			        .addClass('collapse')
			    }

			    if (!$.support.transition) return complete.call(this)

			    $collapse
			      .height(0)
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)

			}
			else{
				//$collapse.addClass('collapse in').height('auto');
			
				$collapse
      			.removeClass('collapse')
      			.addClass('collapsing')
      			.height(0);

    			var complete = function () {
			      	$collapse
			        .removeClass('collapsing')
			        .addClass('collapse in')
			        .height('auto')
			    	//fire event collapse completed
			    }

    			if (!$.support.transition) return complete.call(this)

    			$collapse
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)
			      
			      .height($collapse[0]["scrollHeight"])

			}


			this.setProperty('collapsed', newCollapsed, true);
		}
		else{
			this.setProperty('collapsed', newCollapsed);
		}

		return this;
	};

	NavBarProto.toggle = function(){
		this.setCollapsed(!this.getCollapsed());
	};

}());