/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.unified.ShellHeadUserItem");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.ui.unified.ShellHeadUserItem",{metadata:{library:"sap.ui.unified",properties:{"username":{type:"string",group:"Appearance",defaultValue:''},"image":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null}},events:{"press":{}}}});sap.ui.unified.ShellHeadUserItem.M_EVENTS={'press':'press'};jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.getIconInfo("","");
sap.ui.unified.ShellHeadUserItem.prototype.onclick=function(e){this.firePress()};
sap.ui.unified.ShellHeadUserItem.prototype.onsapspace=sap.ui.unified.ShellHeadUserItem.prototype.onclick;
sap.ui.unified.ShellHeadUserItem.prototype.setImage=function(i){this.setProperty("image",i,true);if(this.getDomRef()){this._refreshImage()}return this};
sap.ui.unified.ShellHeadUserItem.prototype._refreshImage=function(){var i=this.$("img");var I=this.getImage();if(!I){i.html("").css("style","").css("display","none")}else if(sap.ui.core.IconPool.isIconURI(I)){var o=sap.ui.core.IconPool.getIconInfo(I);i.html("").css("style","");if(o){i.text(o.content).css("font-family","'"+o.fontFamily+"'")}}else{var $=this.$("img-inner");if($.length==0||$.attr("src")!=I){i.css("style","").html("<img id='"+this.getId()+"-img-inner' src='"+jQuery.sap.encodeHTML(I)+"'></img>")}}};
sap.ui.unified.ShellHeadUserItem.prototype._checkAndAdaptWidth=function(s){if(!this.getDomRef()){return false}var r=this.$(),n=this.$("name");var b=r.width();r.toggleClass("sapUiUfdShellHeadUsrItmLimit",false);var m=240;if(s){m=Math.min(m,0.5*document.documentElement.clientWidth-225)}if(m<n.width()){r.toggleClass("sapUiUfdShellHeadUsrItmLimit",true)}return b!=r.width()};
