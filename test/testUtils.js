function testUtils() {
  'use strict';

  function setupTranslations(moduleName, translations) {
    beforeEach(module(moduleName, function ($translateProvider) {
      $translateProvider.translations('en_US', {
        'API': {
        }
      });
    }));
  }

  function testSetup(config) {
    config = config || {};

    var moduleName = config.moduleName;
    var translations = config && config.translations || {};

    if (!moduleName) {
      throw "No Module Specified, please pass in moduleName into the config";
    }

    setupTranslations(moduleName, translations);
  }



  function spyOnAngularServiceWithPromise(service, methodName, result) {
    return spyOn(service, methodName).and.callFake(function () {
        return {
            then: function (callback) {
                return callback(result);
            }
        };
    });
}

function spyOnAngularServiceErrorWithPromise(service, methodName, result) {
    return spyOn(service, methodName).and.callFake(function () {
        return {
            then: function (callback, callbackError) {
                return callbackError(result);
            }
        };
    });
}

  return {
    testSetup: testSetup,
    spyOnAngularServiceWithPromise: spyOnAngularServiceWithPromise,
    spyOnAngularServiceErrorWithPromise: spyOnAngularServiceErrorWithPromise
  };
}
