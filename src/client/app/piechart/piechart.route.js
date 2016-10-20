(function() {
  'use strict';

  angular
    .module('app.piechart')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'piechart',
        config: {
          url: '/piechart',
          templateUrl: 'app/piechart/piechart.html',
          controller: 'PieChartController',
          controllerAs: 'vm',
          title: 'PieChart',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> PieChart'
          }
        }
      }
    ];
  }
})();
