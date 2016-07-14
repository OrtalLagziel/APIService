/* globals testUtils */
describe('Service: API', function () {
  'use strict';

  var scope, APIService;

  testUtils().testSetup({
    'moduleName': 'APIModule',
    'translations': {
      'API': {
        'name': {
          'first': 'Luke'
        }
      }
    }
  });

  beforeEach(inject(function ($rootScope, _APIService_) {
    scope = $rootScope;
    APIService = _APIService_;
  }));

  afterEach(function() {
    scope.$destroy();
  });

  it('should correctly say hello', function () {
    expect(APIService.sayHello()).toEqual('hello Luke');
  });
});
