/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ButtonRenderer','sap/ui/core/Renderer'],function(q,B,R){"use strict";var T=R.extend(B);T.renderButtonAttributes=function(r,t){var p=t.getPressed();if(p){r.addClass("sapMToggleBtnPressed")}r.writeAttribute('pressed',p)};return T},true);
