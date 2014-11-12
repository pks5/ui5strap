/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.unified.Currency");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.unified.Currency",{metadata:{publicMethods:["getFormattedValue","getCurrencySymbol"],library:"sap.ui.unified",properties:{"value":{type:"float",group:"Appearance",defaultValue:0},"currency":{type:"string",group:"Appearance",defaultValue:null},"maxPrecision":{type:"int",group:"Appearance",defaultValue:3},"useSymbol":{type:"boolean",group:"Appearance",defaultValue:true}}}});jQuery.sap.require('sap.ui.core.format.NumberFormat');jQuery.sap.require('sap.ui.core.LocaleData');sap.ui.unified.Currency.FIGURE_SPACE='\u2007';sap.ui.unified.Currency.PUNCTUATION_SPACE='\u2008';
sap.ui.unified.Currency.prototype.init=function(){this._oFormat=sap.ui.core.format.NumberFormat.getCurrencyInstance({showMeasure:false})};
sap.ui.unified.Currency.prototype.getFormattedValue=function(){if(this.getCurrency()==="*"){return""}var p=this.getMaxPrecision()-this._oFormat.oLocaleData.getCurrencyDigits(this.getCurrency());var v=this._oFormat.format(this.getValue(),this.getCurrency());if(p==this.getMaxPrecision()&&this.getMaxPrecision()>0){v+=sap.ui.unified.Currency.PUNCTUATION_SPACE}if(p>0){v=jQuery.sap.padRight(v,sap.ui.unified.Currency.FIGURE_SPACE,v.length+p)}else if(p<0){v=v.substr(0,v.length+p)}return v};
sap.ui.unified.Currency.prototype.getCurrencySymbol=function(){return this._oFormat.oLocaleData.getCurrencySymbol(this.getCurrency())};
sap.ui.unified.Currency.prototype.setValue=function(v){var h=this._hasValue(),H=this.$().hasClass("sapUiUfdCurrencyNoVal");if(h===H){this.invalidate()}this.setProperty("value",v);return this};
sap.ui.unified.Currency.prototype._hasValue=function(){var v=this.getBinding("value"),h=v!==undefined,H=h?v.getValue()!==undefined:true;return H};
