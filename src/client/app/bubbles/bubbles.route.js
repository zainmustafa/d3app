(function() {
  'use strict';

  angular
    .module('app.bubbles')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'bubbles',
        config: {
          url: '/bubbles',
          templateUrl: 'app/bubbles/bubbles.html',
          controller: 'BubblesController',
          controllerAs: 'vm',
          title: 'bubbles',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Bubbles'
          }
        }
      }
    ];
  }
})();
