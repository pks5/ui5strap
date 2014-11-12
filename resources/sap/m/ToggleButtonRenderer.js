/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ToggleButtonRenderer");jQuery.sap.require("sap.m.ButtonRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.m.ToggleButtonRenderer=sap.ui.core.Renderer.extend(sap.m.ButtonRenderer);
sap.m.ToggleButtonRenderer.renderButtonAttributes=function(r,t){var p=t.getPressed();if(p){r.addClass("sapMToggleBtnPressed")}r.writeAttribute('pressed',p)};
