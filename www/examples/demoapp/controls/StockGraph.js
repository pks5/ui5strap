/**
 * 
 * Stock Graph
 * 
 * Author: Jan Philipp Knoeller
 * 
 * Copyright (c) 2014 PKSoftware.de
 * 
 * http://www.pksoftware.de
 * 
 */

sap.ui.define(['ui5strap/ControlBase', "./d3_min"], function(ControlBase){

    "use strict";
    
	//Define the Constructor
    var StockGraph = ControlBase.extend(
			"com.ui5strap.apps.demoapp.controls.StockGraph", {
				metadata : {

					library : "com.ui5strap.apps.demoapp",

					properties : {},

					aggregations : {}

				}
			}),
	StockGraphProto = StockGraph.prototype;

    /**
     * 
     */
	StockGraphProto._parseDateString = function(dateString, addSecs) {
		var parts = dateString.split("T");
		var year = parts[0].substr(0, 4);
		var month = parts[0].substr(4, 2);
		var day = parts[0].substr(6, 2);

		var daySeconds = parseInt(parts[1].substr(0, parts[1].length - 1));

		if (addSecs)
			daySeconds += addSecs;

		var dayMinutes = Math.floor(daySeconds / 60);

		var dayHours = Math.floor(dayMinutes / 60);
		var minutesLeft = dayMinutes - dayHours * 60;

		var secondsLeft = daySeconds - dayMinutes * 60;

		return new Date(year, month, day, dayHours, dayMinutes, daySeconds, 0);
	};

	/**
	 * 
	 */
	StockGraphProto.clear = function() {
		var graphContainer = d3.select("#" + this.getId());
		graphContainer.append('div').attr('class', 'please-wait').text(
				'Please wait...');
		graphContainer.select('.root-container').remove();
	};

	/**
	 * 
	 */
	StockGraphProto.prepareData = function() {
		var data = {
			players : []
		};

		function randomDate(start, end) {
			return new Date(start.getTime() + Math.random()
					* (end.getTime() - start.getTime()));
		}

		var minDate = new Date(2014, 0, 1);
		var maxDate = new Date(2014, 0, 31);

		var stock = 300;

		data.minAmount = 0;
		data.maxAmount = stock;

		for (var i = 0; i < 31; i++) {
			data.players.push({
				"date" : new Date(minDate.getTime() + i * 24 * 3600 * 1000),

				"segments" : [ {
					"value" : 20 + Math.round(Math.random() * 40),
					"type" : "A1"
				}, {
					"value" : -30 + Math.round(Math.random() * -20),
					"type" : "B1"
				}, {
					"value" : 20 + Math.round(Math.random() * 40),
					"type" : "A2"
				}, {
					"value" : -30 + Math.round(Math.random() * -40),
					"type" : "B2"
				} ]
			});
			var segmentPlus = 0, segmentMinus = 0, segmentStart = 0;

			for (var j = 0; j < data.players[i].segments.length; j++) {

				var value = data.players[i].segments[j].value;
				if (value > 0) {
					segmentStart = segmentPlus;
					segmentPlus += value;

				} else {
					segmentStart = segmentMinus;
					segmentMinus += value;
				}

				stock += value;

				if (segmentMinus < data.minAmount) {
					data.minAmount = segmentMinus;
				}

				if (segmentPlus > data.maxAmount) {
					data.maxAmount = segmentPlus;
				}

				data.players[i].segments[j].start = segmentStart;
			}

			data.players[i].stock = stock;
		}

		data.minDate = minDate;
		data.maxDate = maxDate;
		data.safetyStock = 150;

		return data;
	}
	
	/**
	 * Updates the Home Screen Grid
	 * @override
	 */
	StockGraphProto.onAfterRendering = function(){
		var _this = this;
		this._waitForCss(
			function() {
				_this.refresh();
			}
		);
	};

	/**
	 * 
	 */
	StockGraphProto.refresh = function() {
		/* implementation heavily influenced by http://bl.ocks.org/1166403 */

		var containerWidth = this.$().width();
		var containerHeight = this.$().height();

		// define dimensions of graph
		var m = [ 40, 80, 40, 80 ]; // margins
		var w = containerWidth - m[1] - m[3]; // width
		var h = containerHeight - m[0] - m[2]; // height

		// Add an SVG element with the desired dimensions and margin.
		var container = d3.select("#" + this.getId());

		var graphSvg = container.select('.graph-svg');

		if (graphSvg.empty()) {
			graphSvg = container.append("svg:svg").attr('class', 'graph-svg');
		} else {
			graphSvg.select('.root-container').remove();
		}

		graphSvg.attr("width", w + m[1] + m[3]).attr("height", h + m[0] + m[2]);

		var graph = graphSvg.append("svg:g").attr('class', 'root-container').attr(
				"transform", "translate(" + m[3] + "," + m[0] + ")");

		var data = this.prepareData();
		//console.log(data);

		container.selectAll('.please-wait').remove();

		if (false === data) {
			container.append('div').attr('class', 'please-wait')
					.text('No Data');
			return false;
		}

		var barWidth = 16;

		// X scale will fit all values from data[] within pixels 0-w
		var x2 = d3.time.scale().domain([ data.minDate, data.maxDate ]).range(
				[ 0, w ]);

		// Y scale will fit values from 0-10 within pixels h-0 (Note the
		// inverted domain for the y-scale: bigger is up!)
		// var y = d3.scale.linear().domain([0, 10]).range([h, 0]);
		// automatically determining max range can work something like this
		var space = (data.maxAmount - data.minAmount) / 10;
		var y = d3.scale.linear()
				.domain(
						[ Math.min(0, data.minAmount - space),
								data.maxAmount + space ]).range([ h, 0 ]);

		// create a line function that can convert data[] into x and y points
		var line = d3.svg.line()
		// assign the X function to plot our line as we wish
		.x(function(d, i) {

			// return the X coordinate where we want to plot this datapoint
			return x2(d.date);
		}).y(function(d) {

			// return the Y coordinate where we want to plot this datapoint
			return y(d.stock);
		})

		// create yAxis
		var xAxis = d3.svg.axis().scale(x2).tickSize(-h).tickSubdivide(true);

		/*
		 * .ticks(d3.time.day, 1).tickFormat(function(d, i){
		 * 
		 * return d.getDate(); //"Year1 Year2, etc depending on the tick value -
		 * 0,1,2,3,4" })
		 */
		var color = d3.scale.category20();
		// Add the x-axis.
		graph.append("svg:g").attr("class", "x axis").attr("transform",
				"translate(0," + h + ")").call(xAxis);

		// create left yAxis
		var yAxisLeft = d3.svg.axis().scale(y).ticks(8).orient("left");
		// Add the y-axis to the left
		graph.append("svg:g").attr("class", "y axis").attr("transform",
				"translate(-25,0)").call(yAxisLeft);

		var bar = graph.selectAll("g.stock_overview-graph-bar").data(
				data.players);

		bar.enter().append("svg:g").attr("class", "stock_overview-graph-bar");

		bar.attr("transform", function(d, i) {
			return "translate(" + x2(d.date) + "," + 0 + ")";
		});

		var barSegment = bar.selectAll("rect.stock_overview-graph-bar-segment")
				.data(function(d, i) {
					return d.segments;
				});

		barSegment
				.enter()
				.append('svg:rect')

				.attr(
						'class',
						function(d, i) {
							return 'stock_overview-graph-bar-segment stock_overview-graph-bar-segment-'
									+ (d.value > 0 ? 'plus' : 'minus')
									+ ' stock_overview-graph-bar-segment-type-'
									+ d.type;
						}).attr("x", -barWidth / 2).attr("width", barWidth)
				.attr("y", y(0)).attr("height", 0);

		barSegment.transition().delay(250).attr(
				"y",
				function(d, i) {
					return y(d.start)
							- (d.value > 0 ? y(0) - y(Math.abs(d.value)) : 0);
				}).attr("height", function(d, i) {
			return y(0) - y(Math.abs(d.value)) - 1.5;
		});

		var stockLineContainer = graph.append("svg:g").attr("transform",
				"translate(0,0)").attr('width', 0);

		var stockLine = stockLineContainer.append("svg:path")

		.attr('class', 'stock_overview-graph-stock-line').attr("stroke",
				function(d, i) {
					return color(i);
				});

		stockLine.attr("d", line(data.players));

		stockLineContainer
				.selectAll('circle.stock_overview-graph-stock-line-circle')
				.data(data.players)
				.enter()
				.append('svg:circle')
				.attr(
						'class',
						function(d, i) {
							return 'stock_overview-graph-stock-line-circle stock_overview-graph-stock-line-circle-'
									+ (d.stock >= data.safetyStock ? 'beyond'
											: 'below');
						}).attr('cx', function(d, i) {
					return x2(d.date);
				}).attr('cy', function(d, i) {
					return y(d.stock);
				}).attr('r', 5);

		var safetyStockLine = graph.append("svg:line")

		.attr('x1', -barWidth).attr('y1', y(data.safetyStock))

		.attr('y2', y(data.safetyStock)).attr('x2', -barWidth)

		.attr('class', 'stock_overview-graph-safety-stock');

		safetyStockLine.transition().delay(500).attr('x2', w + barWidth)

		// graph.append("svg:path").attr("d", line(dataSpent)).attr('class',
		// 'spent');
		// graph.append("svg:path").attr("d", line(dataTotal)).attr('class',
		// 'total');
	};

	//Return the constructor
	return StockGraph;
});