/*
 * 
 * This control is to test all control events that are provided by OpenUI5.
 *
 * ui5strap.demoapp.controls.EventTest
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

sap.ui.define(['ui5strap/library', 'ui5strap/ControlBase'], function(library, ControlBase){
	
	var EventTest = ControlBase.extend("ui5strap.demoapp.controls.EventTest", {
		metadata : {

			library : "ui5strap.demoapp",
			
		}
	}),
	EventTestProto = EventTest.prototype;

	/*
	 * Events that are liset in jquery.sap.events.js
	 */
	
	/*
	 * Click
	 */
	EventTestProto.onclick = function(oEvent){
		console.log("CLICK");
	};
	
	EventTestProto.ondblclick = function(oEvent){
		console.log("DBLCLICK");
	};
	
	/*
	 * Context menu ???
	 */
	EventTestProto.oncontextmenu = function(oEvent){
		console.log("CONTEXTMENU");
	};
	
	/*
	 * Focus
	 */
	EventTestProto.onfocusin = function(oEvent){
		console.log("FOCUSIN");
	};
	
	EventTestProto.onfocusout = function(oEvent){
		console.log("FOCUSOUT");
	};
	
	/*
	 * Key
	 */
	EventTestProto.onkeydown = function(oEvent){
		console.log("KEYDOWN");
	};
	
	EventTestProto.onkeypress = function(oEvent){
		console.log("KEYPRESS");
	};
	
	EventTestProto.onkeyup = function(oEvent){
		console.log("KEYUP");
	};
	
	/*
	 * Mouse Events
	 */
	EventTestProto.onmousedown = function(oEvent){
		console.log("MOUSEDOWN");
	};
	
	EventTestProto.onmouseout = function(oEvent){
		console.log("MOUSEOUT");
	};
	
	EventTestProto.onmouseover = function(oEvent){
		console.log("MOUSEOVER");
	};
	
	EventTestProto.onmouseup = function(oEvent){
		console.log("MOUSEUP");
	};
	
	/*
	 * Select
	 */
	EventTestProto.onselect = function(oEvent){
		console.log("SELECT");
	};
	
	EventTestProto.onselectstart = function(oEvent){
		console.log("SELECTSTART");
	};
	
	/*
	 * Drag
	 */
	EventTestProto.ondragstart = function(oEvent){
		console.log("DRAGSTART");
	};
	
	EventTestProto.ondragover = function(oEvent){
		console.log("DRAGOVER");
	};
	
	EventTestProto.ondragleave = function(oEvent){
		console.log("DRAGLEAVE");
	};
	
	EventTestProto.ondragend = function(oEvent){
		console.log("DRAGEND");
	};
	
	EventTestProto.ondrop = function(oEvent){
		console.log("DROP");
	};
	
	/*
	 * Copy / Paste
	 */
	
	EventTestProto.onpaste = function(oEvent){
		console.log("PASTE");
	};
	
	EventTestProto.oncut = function(oEvent){
		console.log("CUT");
	};
	
	/*
	 * Input
	 */
	EventTestProto.oninput = function(oEvent){
		console.log("INPUT");
	};
	
	/*
	 * Native Touch Events
	 */
	EventTestProto.ontouchstart = function(oEvent){
		console.log("TOUCHSTART");
	};
	
	EventTestProto.ontouchmove = function(oEvent){
		console.log("TOUCHMOVE");
	};
	
	EventTestProto.ontouchend = function(oEvent){
		console.log("TOUCHEND");
	};
	
	EventTestProto.ontouchcancel = function(oEvent){
		console.log("TOUCHCANCEL");
	};
	
	/*
	 * Additional Events
	 */
	EventTestProto.onswipe = function(oEvent){
		console.log("SWIPE");
	};
	
	EventTestProto.ontap = function(oEvent){
		console.log("TAP");
	};
	
	EventTestProto.onswipeleft = function(oEvent){
		console.log("SWIPELEFT");
	};
	
	EventTestProto.onswiperight = function(oEvent){
		console.log("SWIPERIGHT");
	};
	
	EventTestProto.onswipebegin = function(oEvent){
		console.log("SWIPEBEGIN");
	};
	
	EventTestProto.onswipeend = function(oEvent){
		console.log("SWIPEEND");
	};
	
	EventTestProto.onscrollstart = function(oEvent){
		console.log("SCROLLSTART");
	};
	
	EventTestProto.onscrollstop = function(oEvent){
		console.log("SCROLLSTOP");
	};
	
	return EventTest;
});