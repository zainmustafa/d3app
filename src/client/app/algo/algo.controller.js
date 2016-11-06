(function() {
  'use strict';

  angular
    .module('app.algo')
    .controller('AlgoController', AlgoController);

  AlgoController.$inject = ['logger', '$q', '$interval', '$scope'];
  /* @ngInject */
  function AlgoController(logger, $q, $interval, $scope) {

    var vm = this;
    vm.title = 'Algo';
    vm.orderTypeArr = ["ascending", "descending", "random"];
    vm.orderType = "random";
    vm.bubbleCounter = 0;
    vm.dataArray = {
      "ascending" : [],
      "descending" : [],
      "random" : []
    };
    vm.slider = {
      value: 2500,
      options : {floor: 0, ceil: 5000}
    };

    vm.algorithams = [
      {title:'bubble sort', startClock : true},
      {title:'selection sort', startClock : false},
      {title:'insertion sort', startClock : false},
      {title:'quicksort', startClock : false},
      {title:'heapsort', startClock : false},
      {title:'mergesort', startClock : false}
    ];

    vm.clock = 0;
    vm.msUpdate = 0;
    vm.milliSeconds = '';

    function milliSecond(){
      if(vm.msUpdate == 9){
        ++vm.clock;
        vm.msUpdate = 0;
      }
      else {
        ++vm.msUpdate;
      }
    }

    vm.start = function () {
      vm.bubbleCounter = 0;

      vm.milliSeconds = $interval(milliSecond, 100);
      // vm.dataArray[vm.orderType].splice(vm.slider.value,4999);
      bubbleSort(vm.dataArray[vm.orderType]);
      // vm.stopTimer();
    };

    vm.stopTimer = function(){
      $interval.cancel(vm.milliSeconds);
      vm.milliSeconds = '';
    };

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      vm.stopTimer();
    });

    function swap(items, firstIndex, secondIndex){
      var temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
    }

    function bubbleSort(items){

      var len = items.length,
        i, j, stop;
      for (i = 0; i < len; i++){
        for (j = 0, stop = len-i; j < stop; j++){
          if (items[j] > items[j+1]){
            swap(items, j, j+1);
          }
          ++vm.bubbleCounter;
        }
      }
      vm.stopTimer();
    }

    activate();

    function activate() {


      var promises = [readData()];
      return $q.all(promises).then(function() {
        logger.info('Loaded Algorithms');

      });



      function readData(){
        d3.json("app/csv/array.json", function(error, data) {
          if(error) console.error('err ', error);
          data["random"].splice(5000,9999);
          vm.dataArray = data;
        })
      }

    }
  }
})();
