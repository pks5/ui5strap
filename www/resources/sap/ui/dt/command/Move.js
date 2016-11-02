/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/dt/command/BaseCommand','sap/ui/dt/ElementUtil'],function(q,B,E){"use strict";var M=B.extend("sap.ui.dt.command.Move",{metadata:{properties:{movedElements:{type:"array"},target:{type:"object"},source:{type:"object"}}}});M.prototype._executeWithElement=function(e){var t=this;this.getMovedElements().forEach(function(m){var s=t.getSource();var T=t.getTarget();E.removeAggregation(s.parent,s.aggregation,m.element);E.insertAggregation(T.parent,T.aggregation,m.element,m.targetIndex);});};return M;},true);
