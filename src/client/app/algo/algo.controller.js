(function() {
  'use strict';

  angular
    .module('app.algo')
    .controller('AlgoController', AlgoController);

  AlgoController.$inject = ['logger', '$q'];
  /* @ngInject */
  function AlgoController(logger,$q) {
    var vm = this;
    vm.title = 'Algo';
    vm.orderTypeArr = ["ascending", "descending", "random"];
    vm.orderType = "random";
    vm.slider = {
      value: 2500,
      options : {floor: 0, ceil: 5000}
    };
    vm.algorithams = [
      {title:'bubble', val : 'bin'},
      {title:'selection', val : 'bin'},
      {title:'insertion', val : 'bin'},
      {title:'quicksort', val : 'bin'},
      {title:'heapsort', val : 'bin'},
      {title:'mergesort', val : 'bin'}
      ];
    activate();

    function activate() {


      var promises = [readData()];
      return $q.all(promises).then(function() {
        logger.info('Loaded Algorithms');

      });

      function swap(items, firstIndex, secondIndex){
        var temp = items[firstIndex];
        items[firstIndex] = items[secondIndex];
        items[secondIndex] = temp;
      }

      function bubbleSort(items){

        var len = items.length,
          i, j, stop;

        for (i=0; i < len; i++){
          for (j=0, stop=len-i; j < stop; j++){
            if (items[j] > items[j+1]){
              swap(items, j, j+1);
            }
          }
        }

        return items;
      }

      function readData(){
        d3.json("app/csv/array.json", function(error, data) {
          if(error) console.error('err ', error);

          data[vm.orderType].splice(vm.slider.value,4999);
          // console.log('new data ', data[vm.orderType].splice(vm.slider.value,4999));
        })
      }
    }
  }
})();
