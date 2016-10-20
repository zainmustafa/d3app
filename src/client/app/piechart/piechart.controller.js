(function() {
  'use strict';

  angular
    .module('app.piechart',[])
    .controller('PieChartController', PieChartController);

  PieChartController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function PieChartController($q, logger) {
    var vm = this;
    vm.title = 'PieChart';
    vm.radius = "Walc";
    vm.properties = [
      "Dalc",
      "G3",
      "Walc",
      "age",
      "failures",
      "studytime"
    ];
    // vm.yAxisArray = ["ExtremeValue", "failures", "guardian", "reason"];
    activate();

    function activate() {

      var promises = [loadCSV()];
      return $q.all(promises).then(function() {
        logger.info('Loaded Bubbles');

      });
    }


    function loadCSV(){

      d3.selectAll("svg > *").remove();

      var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

      var labelArc = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

      var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.Dalc; });

      var svg = d3.select("svg")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      d3.csv("app/csv/student.csv", type, function(error, data) {
        if (error) throw error;

        var g = svg.selectAll(".arc")
          .data(pie(data))
          .enter()
          .append("g")
          .attr("class", "arc");

        g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.Dalc); });

        g.append("text")
          .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          .attr("dy", ".35em")
          .text(function(d) { return d.Dalc; });
      });

      function type(d) {
        d.Dalc = +d.Dalc;
        return d;
      }
    }
    vm.reDraw = function () {
      loadCSV();
    };
  }
})();
