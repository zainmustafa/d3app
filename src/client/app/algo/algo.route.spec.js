/* jshint -W117, -W030 */
describe('algo routes', function() {
  describe('state', function() {
    var view = 'app/algo/algo.html';

    beforeEach(function() {
      module('app.algo', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state algo to url /algo ', function() {
      expect($state.href('algo', {})).to.equal('/algo');
    });

    it('should map /algo route to algo View template', function() {
      expect($state.get('algo').templateUrl).to.equal(view);
    });

    it('of algo should work with $state.go', function() {
      $state.go('algo');
      $rootScope.$apply();
      expect($state.is('algo'));
    });
  });
});
