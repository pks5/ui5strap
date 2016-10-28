/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui
		.define(['jquery.sap.global', 'sap/ui/dt/command/BaseCommand', 'sap/ui/dt/ElementUtil'],
				function(jQuery, BaseCommand, ElementUtil) {
					"use strict";

					/**
					 * Move Element from one place to another
					 *
					 * @class
					 * @extends sap.ui.dt.command.BaseCommand
					 * @author SAP SE
					 * @version 1.40.7
					 * @constructor
					 * @private
					 * @since 1.40
					 * @alias sap.ui.dt.command.Move
					 * @experimental Since 1.40. This class is experimental and provides only limited functionality. Also the API
					 *               might be changed in future.
					 */
					var Move = BaseCommand.extend("sap.ui.dt.command.Move", {
						metadata : {
							properties : {
								movedElements : {
									type : "array"
								},
								target : {
									type : "object"
								},
								source : {
									type : "object"
								}
							}
						}
					});

					Move.prototype._executeWithElement = function(oElement) {
						var that = this;
						this.getMovedElements().forEach(function(mMovedElement){
							var mSource = that.getSource();
							var mTarget = that.getTarget();
							ElementUtil.removeAggregation(mSource.parent, mSource.aggregation, mMovedElement.element);
							ElementUtil.insertAggregation(mTarget.parent, mTarget.aggregation, mMovedElement.element, mMovedElement.targetIndex);
						});


					};

					return Move;

				}, /* bExport= */true);
