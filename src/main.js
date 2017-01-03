define([
    'module',
    'knockout',
    'jquery',
    'quark',
    'json!./main.json',
    'bootstrap/js',
    'loadCss!bootstrap/css'
], function(mod, ko, $, $$, config) {

    return $$.module(mod, config);
});
