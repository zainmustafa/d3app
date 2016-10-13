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

    function loadCSV() {

    }
  }
})();
