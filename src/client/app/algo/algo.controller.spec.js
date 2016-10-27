/* jshint -W117, -W030 */
describe('AlgoController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.algo');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('AlgoController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Algo controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of algo', function() {
        expect(controller.title).to.equal('Algo');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
