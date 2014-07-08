var jsdom = require('jsdom').jsdom;
document = jsdom('<html><head><script></script></head><body></body></html>');
window = document.createWindow();
//jQuery = $ = requirejs(['jquery']);
navigator = window.navigator = {};
DEBUG = false;
navigator.userAgent = 'NodeJs JsDom';
navigator.appVersion = '';

window.mocha = true;

angular = window.angular = {};
module = window.module = {};

global.angular = window.angular = require("./js/angular/index.js");
require("./js/angular-mocks.js");

requirejs('./js/app');

describe('MyAppModuleTests', function() {

    // You need to load modules that you want to test,
    // it loads only the "ng" module by default.
    beforeEach(angular.mock.module('myApplicationModule'));

    // inject() is used to inject arguments of all given functions
    it('should provide a version', angular.mock.inject(function(mode, version) {
        assert.equal(version,'v1.0.1');
        assert.equal(mode,'app');
    }));

    // The inject and module method can also be used inside of the it or beforeEach
    it('should override a version and test the new version is injected', function() {
        // module() takes functions or strings (module aliases)
        angular.mock.module(function($provide) {
            $provide.value('version', 'overridden'); // override version here
        });

        angular.mock.inject(function(version) {
            assert.equal(version,'overridden');
        });
    });

     it('should get controller', angular.mock.inject(function($controller) {

        console.log("$controller");
        console.dir($controller.toString());

        //How can I get the scope - injecting it doesn't work?
        //$controller('AppController', {$scope:scope});

       /* var scope = {},
            ctrl = $controller('AppController', {$scope:scope});*/

        //expect(scope.phones.length).toBe(3);
    }));
});
