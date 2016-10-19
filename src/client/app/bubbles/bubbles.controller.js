(function() {
  'use strict';

  angular
    .module('app.bubbles')
    .controller('BubblesController', BubblesController);

  BubblesController.$inject = ['$q', 'logger'];
  /* @ngInject */
  function BubblesController($q, logger) {
    var vm = this;
    vm.title = 'Bubbles';

    activate();

    function activate() {

      var promises = [loadCSV()];
      return $q.all(promises).then(function() {
        logger.info('Loaded Bubbles');

      });
    }


    function loadCSV(){

      /*Source : https://jrue.github.io/coding/2014/exercises/basicbubblepackchart/*/

      var diameter = 500, //max size of the bubbles
        color    = d3.scale.category20b(); //color category

      var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

      var svg = d3.select("svg")
        .attr("class", "bubble");

      d3.csv("app/csv/student.csv", function(error, data){

        //convert numerical values from strings to numbers
        data = data.map(function(d){ d.value = +d["age"]; return d; });

        //bubbles needs very specific format, convert data to this.
        var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

        //setup the chart
        var bubbles = svg.append("g")
          .attr("transform", "translate(250,50)")
          .selectAll(".bubble")
          .data(nodes)
          .enter();

        //create the bubbles
        bubbles.append("circle")
          .attr("r", function(d){ return d.r; })
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
          .style("fill", function(d) { return color(d.value); });

        //format the text for each bubble
        bubbles.append("text")
          .attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y + 5; })
          .attr("text-anchor", "middle")
          .text(function(d){ return d["age"]; })
          .style({
            "fill":"white",
            "font-family":"Helvetica Neue, Helvetica, Arial, san-serif",
            "font-size": "12px"
          });
      })
    }
  }
})();
