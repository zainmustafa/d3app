/* jshint -W117, -W030 */
describe('piechart routes', function() {
  describe('state', function() {
    var view = 'app/piechart/piechart.html';

    beforeEach(function() {
      module('app.piechart', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function() {
      $templateCache.put(view, '');
    });

    it('should map state admin to url /piechart ', function() {
      expect($state.href('admin', {})).to.equal('/piechart');
    });

    it('should map /piechart route to admin View template', function() {
      expect($state.get('piechart').templateUrl).to.equal(view);
    });

    it('of admin should work with $state.go', function() {
      $state.go('piechart');
      $rootScope.$apply();
      expect($state.is('piechart'));
    });
  });
});
