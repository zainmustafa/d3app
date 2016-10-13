/* jshint -W117, -W030 */
describe('bubbles routes', function() {
  describe('state', function() {
    var view = 'app/bubbles/bubbles.html';

    beforeEach(function() {
      module('app.bubbles', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state admin to url /bubbles ', function() {
      expect($state.href('admin', {})).to.equal('/bubbles');
    });

    it('should map /bubbles route to admin View template', function() {
      expect($state.get('bubbles').templateUrl).to.equal(view);
    });

    it('of admin should work with $state.go', function() {
      $state.go('bubbles');
      $rootScope.$apply();
      expect($state.is('bubbles'));
    });
  });
});
