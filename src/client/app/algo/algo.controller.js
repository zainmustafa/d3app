(function() {
  'use strict';

  angular
    .module('app.algo')
    .controller('AlgoController', AlgoController);

  AlgoController.$inject = ['logger', '$q', '$interval', '$scope'];
  /* @ngInject */
  function AlgoController(logger, $q) {

    var vm = this;
    vm.title = 'Algo';
    vm.orderTypeArr = ["ascending", "descending", "random"];
    vm.orderType = "random";
    vm.bubbleCounter = 0;
    vm.selectionCounter = 0;
    vm.dataArray = {
      "ascending" : [],
      "descending" : [],
      "random" : []
    };
    vm.slider = {
      value: 20,
      options : {floor: 0, ceil: 5000}
    };

    vm.algorithams = [
      {title:'bubble sort', startClock : true, counter : 0},
      {title:'selection sort', startClock : false, counter : 0},
      {title:'insertion sort', startClock : false, counter : 0},
      {title:'quicksort', startClock : false, counter : 0},
      {title:'mergesort', startClock : false, counter : 0}
    ];


    vm.start = function () {

      vm.algorithams[0].counter = 0;
      vm.algorithams[1].counter = 0;
      vm.algorithams[2].counter = 0;
      vm.algorithams[3].counter = 0;
      vm.algorithams[4].counter = 0;


      var bubble, selection, insertion, quick,mergeArr;
      bubble = JSON.parse(JSON.stringify(vm.dataArray[vm.orderType]));
      selection = JSON.parse(JSON.stringify(vm.dataArray[vm.orderType]));
      insertion = JSON.parse(JSON.stringify(vm.dataArray[vm.orderType]));
      quick = JSON.parse(JSON.stringify(vm.dataArray[vm.orderType]));
      mergeArr = JSON.parse(JSON.stringify(vm.dataArray[vm.orderType]));

      bubble.splice(vm.slider.value,4999);
      selection.splice(vm.slider.value, 4999);
      insertion.splice(vm.slider.value, 4999);
      quick.splice(vm.slider.value, 4999);

      bubbleSort(bubble);
      selectionSort(selection);
      insertionSort(insertion);
      quickSort(quick);
      mergeSort(mergeArr);
    };

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
          ++vm.algorithams[0].counter;
        }
      }
    }

    function selectionSort(array){
      for(var i = 0; i < array.length; i++){
        //set min to the current iteration of i
        var min = i;
        for(var j = i+1; j < array.length; j++){
          if(array[j] < array[min]){
            min = j;
          }
          ++vm.algorithams[1].counter;
        }
        var temp = array[i];
        array[i] = array[min];
        array[min] = temp;
      }
      return array;
    }

    function insert(array, rightIndex, value) {
      ++vm.algorithams[2].counter;
      for(var j = rightIndex; j > 0 && array[j-1] > value; j--) {
        if(j == rightIndex){
          --vm.algorithams[2].counter;
        }
        array[j] = array[j-1];
        ++vm.algorithams[2].counter;
      }
      array[j] = value;
    }

    function insertionSort(array) {
      for(var i = 0; i < array.length; i++){
        insert(array, i, array[i]);
      }

    }

    function quickSort(items, left, right) {
      ++vm.algorithams[3].counter;
      var index;

      if (items.length > 1) {

        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;

        index = partition(items, left, right);

        if (left < index - 1) {
          quickSort(items, left, index - 1);
        }

        if (index < right) {
          quickSort(items, index, right);
        }

      }

      return items;
    }

    function partition(items, left, right) {
      ++vm.algorithams[3].counter;
      var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;


      while (i <= j) {

        while (items[i] < pivot) {
          i++;
        }

        while (items[j] > pivot) {
          j--;
        }

        if (i <= j) {
          swap(items, i, j);
          i++;
          j--;
        }
      }

      return i;
    }

    function merge(left, right){
      //--vm.algorithams[4].counter;
      var result  = [],
        il      = 0,
        ir      = 0;

      while (il < left.length && ir < right.length){
        ++vm.algorithams[4].counter;
        if (left[il] < right[ir]){
          result.push(left[il++]);
        } else {
          result.push(right[ir++]);
        }
      }

      return result.concat(left.slice(il)).concat(right.slice(ir));
    }

    function mergeSort(items){

      if (items.length < 2) {
        return items;
      }
      //++vm.algorithams[4].counter;
      var middle = Math.floor(items.length / 2),
        left    = items.slice(0, middle),
        right   = items.slice(middle),
        params = merge(mergeSort(left), mergeSort(right));

      // Add the arguments to replace everything between 0 and last item in the array
      params.unshift(0, items.length);
      items.splice.apply(items, params);
      return items;
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
          vm.dataArray = data;
        })
      }

    }
  }
})();
