/*
 * 
 * UI5Strap
 *
 * ui5strap.Alert
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

(function(){

	jQuery.sap.declare("ui5strap.Alert");
	jQuery.sap.require("ui5strap.library");
  jQuery.sap.require("ui5strap.Button");
  jQuery.sap.require("ui5strap.Icon");
	
	sap.ui.core.Control.extend("ui5strap.Alert", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				}, 
        animate : {
          type:"boolean", 
          defaultValue:true
        }, 
        visible : {
          type:"boolean", 
          defaultValue:true
        },
        closable : {
          type : "boolean",
          defaultValue : false
        },
        contentPlacement : {
          type:"ui5strap.ContentPlacement",
          defaultValue : ui5strap.ContentPlacement.Start
        },
				severity : {
					type:"ui5strap.Severity", 
					defaultValue:ui5strap.Severity.Info
				}
			},
			aggregations : { 
        closeButton : {
          type : "ui5strap.Button",
          multiple : false
        },
				content : {
					singularName: "content"
				} 
			},
      events : {
        closed : {

        }
      }

		}
	});

  var AlertProto = ui5strap.Alert.prototype;

  ui5strap.Utils.dynamicText(AlertProto);

  AlertProto.init = function(){
  
  }

  var _setCloseButton = AlertProto.setCloseButton;

  AlertProto.setCloseButton = function(closeButton, suppressInvalidate){
      var _this = this;
      if(null !== closeButton){
        closeButton.attachEvent('tap', {}, function(oEvent){
          _this.close();
        });
      }

      _setCloseButton.call(this, closeButton, suppressInvalidate);
  };

  AlertProto.onBeforeRendering = function(){
      if(this.getClosable() && this.getCloseButton() === null){
          this.setCloseButton(new ui5strap.Button({ type : ui5strap.ButtonType.Close, content : [ new ui5strap.Icon({ icon : "times", iconSet : "fa" }) ] }));
      }
  };

  AlertProto.onAfterRendering = function(){
        if(this.getVisible()){
              this.$().addClass('in');
        }
  };

  AlertProto.setVisible = function(visible){
      if(this.getDomRef()){
          if(visible){
              this.$().addClass('in');
          }
          else{
              this.$().removeClass('in');
          }
          this.setProperty('visible', visible, true);
      }
      else{
         this.setProperty('visible', visible);
      }
  };

  AlertProto.close = function(){
    var $alert = this.$(),
      _this = this;
    $alert.removeClass('in')

    function removeElement() {
      _this.fireClosed({});
      _this.destroy();
    }

    $.support.transition && $alert.hasClass('fade') ?
      $alert
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  };

}());