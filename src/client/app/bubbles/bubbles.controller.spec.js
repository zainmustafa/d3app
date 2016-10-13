/* jshint -W117, -W030 */
describe('BubblesController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.bubbles');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('BubblesController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Bubbles controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Bubbles', function() {
        expect(controller.title).to.equal('Bubbles');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
