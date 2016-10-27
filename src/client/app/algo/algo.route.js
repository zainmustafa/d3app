(function() {
  'use strict';

  angular
    .module('app.algo')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'algo',
        config: {
          url: '/algo',
          templateUrl: 'app/algo/algo.html',
          controller: 'AlgoController',
          controllerAs: 'vm',
          title: 'Algo',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Algorithms'
          }
        }
      }
    ];
  }
})();
