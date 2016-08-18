/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','./TableExtension','./TableUtils'],function(q,B,T,a){"use strict";var b=B.extend("sap.ui.table.TableKeyboardDelegate2",{constructor:function(t){B.call(this);},destroy:function(){B.prototype.destroy.apply(this,arguments);},getInterface:function(){return this;}});return b;});
