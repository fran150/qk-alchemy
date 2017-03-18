define([
    'module',
    'knockout',
    'jquery',
    'quark',
    'json!./main.json',
    'bootstrap/js',
    'loadCss!bootstrap/css',
    './bindings/overlay'
], function(mod, ko, $, $$, config) {

    return $$.module(mod, config);
});
