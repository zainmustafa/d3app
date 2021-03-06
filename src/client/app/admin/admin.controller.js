(function() {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['logger', '$q'];
  /* @ngInject */
  function AdminController(logger,$q) {
    var vm = this;
    vm.title = 'BarChart';
    vm.yAxis = "Walc";
    vm.xAxis = "guardian";
    vm.properties = [
      "Dalc",
      "G3",
      "Walc",
      "age",
      "failures",
      "studytime"
    ];
    vm.yAxisArray = ["ExtremeValue", "failures", "guardian", "reason"];
    activate();

    function activate() {


      var promises = [loadCSV()];
      return $q.all(promises).then(function() {
        logger.info('Loaded BarChart');

      });

    }

    function loadCSV(){

      d3.selectAll("svg > *").remove();
      var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var formatPercent = d3.format(".0%");

      var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
        .range([height, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Frequency:</strong> <span style='color:red'>" + d[vm.yAxis] + "</span>";
        });

      var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.call(tip);

      d3.csv("app/csv/all-students.csv", type, function(error, data) {
        // vm.properties = Object.getOwnPropertyNames(data[0]).sort();
        x.domain(data.map(function(d) { return d[vm.xAxis]; }));
        y.domain([0, d3.max(data, function(d) { return d[vm.yAxis]; })]);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")

          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");

        svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d[vm.xAxis]); })
          .attr("width", x.rangeBand())
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .attr("y", height)
          .transition()
          .delay(500)
          .attr("y", function(d) { return y(d[vm.yAxis]); })
          .attr("height", function(d) { return height - y(d[vm.yAxis]); })


      });

      function type(d) {
        d[vm.yAxis] = +d[vm.yAxis];
        return d;
      }


      return true;
    }

    vm.reDraw = function(){
      loadCSV();
    }
  }
})();
