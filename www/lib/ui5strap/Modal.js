/*
 * 
 * UI5Strap
 *
 * ui5strap.Modal
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

sap.ui.define(['./library', './StaticOverlay'], function(library, StaticOverlay){

	var Modal = StaticOverlay.extend("ui5strap.Modal", {
		metadata : {
			
			library : "ui5strap",
			
			properties : { 
				
	        },
	        
			aggregations : { 
				header : {
					singularName: "header"
				},
				footer : {
					singularName: "footer"
				}
			},
			
			defaultAggregation : "content",
			
		    events : {
		        shown : {},
		        hidden : {}
		    }

		}
	}), ModalProto = Modal.prototype;

	/**
	 * TODO
	 */
	ModalProto._getStyleClassRoot = function(){
		return StaticOverlay.prototype._getStyleClassRoot.call(this) + " ui5strapStaticOverlay";
	};

	/**
	 * @deprecated
	 */
	ModalProto.show = function(){
		jQuery.sap.log.warning("Modal.protoype.show is deprecated. Use open instead.");
	};

	/**
	 * @deprecated
	 */
	ModalProto.hide = function(){
		jQuery.sap.log.warning("Modal.protoype.hide is deprecated. Use close instead.");
    };

    /**
     * @deprecated
     */
	ModalProto.toggle = function(){
	    throw new Error("Modal.prototype.toggle is not supported anymore.");
	};

  //Return Constructor
  return Modal;
});