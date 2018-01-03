define([
    'module',
    'knockout',
    'jquery',
    'quark',
    'json!./main.json',
    'bootstrap/js',
    'loadCss!bootstrap/css',
    'loadCss!./css/sidebar.css',
    'loadCss!./css/navbar.css',
    'loadCss!./css/submenu.css',
    './bindings/overlay'
], function(mod, ko, $, $$, config) {

    return $$.module(mod, config);
});
