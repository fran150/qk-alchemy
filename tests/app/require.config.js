var require;

require = requireConfigure(QuarkRequireConf('bower_modules', true), {
    baseUrl: '..',
    paths: {
        'qk-alchemy': './src',
        'testing-views': 'tests/views',
        'bootstrap/js': 'bower_modules/bootstrap/dist/js/bootstrap.min',
        'bootstrap/css': 'bower_modules/bootstrap/dist/css/bootstrap.min',
        'json': 'bower_modules/requirejs-plugins/src/json',
        '$switchery-require': 'bower_modules/switchery-require/dist',
        'loading-overlay': 'bower_modules/gasparesganga-jquery-loading-overlay/src/loadingoverlay.min'
    },
    shim: {
        "bootstrap/js": {
            "deps": ['jquery']
        }
    }
});

// It's not obvious, but this is a way of making Jasmine load and run in an AMD environment
// Credit: http://stackoverflow.com/a/20851265
var jasminePath = 'bower_modules/jasmine-core/lib/jasmine-core/';
require.paths['jasmine'] = jasminePath + 'jasmine';
require.paths['jasmine-html'] = jasminePath + 'jasmine-html';
require.paths['jasmine-boot'] = jasminePath + 'boot';
require.shim['jasmine'] = { exports: 'window.jasmineRequire' };
require.shim['jasmine-html'] = { deps: ['jasmine'], exports: 'window.jasmineRequire' };
require.shim['jasmine-boot'] = { deps: ['jasmine', 'jasmine-html'], exports: 'window.jasmineRequire' };
