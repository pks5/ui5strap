/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Button','./library'],function(q,B,l){"use strict";var T=B.extend("sap.ui.commons.ToggleButton",{metadata:{library:"sap.ui.commons",properties:{pressed:{type:"boolean",group:"Data",defaultValue:false}}}});T.prototype.onclick=function(e){if(this.getEnabled()){this.setPressed(!this.getPressed());if(this.$().is(":visible")){this.firePress({pressed:this.getPressed()})}}e.preventDefault();e.stopPropagation()};T.prototype.setPressed=function(p){if(p!=this.getProperty("pressed")){this.setProperty("pressed",p,true);if(!this.getPressed()){this.getRenderer().ondeactivePressed(this)}else{this.getRenderer().onactivePressed(this)}this.getRenderer().updateImage(this)}return this};T.prototype.onAfterRendering=function(){if(!this.getPressed()){this.getRenderer().ondeactivePressed(this)}else{this.getRenderer().onactivePressed(this)}};return T},true);
