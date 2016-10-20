/* jshint -W117, -W030 */
describe('PieChartController', function() {
  var controller;

  beforeEach(function() {
    bard.appModule('app.bubbles');
    bard.inject('$controller', '$log', '$rootScope');
  });

  beforeEach(function() {
    controller = $controller('PieChartController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('PieChart Controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of PieChart', function() {
        expect(controller.title).to.equal('PieChart');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });
    });
  });
});
