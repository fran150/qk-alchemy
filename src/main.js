define([
    'module',
    'knockout',
    'jquery',
    'quark',
    'json!./main.json',
    'bootstrap/js',
    'loadCss!bootstrap/css',
    'loadCss!qk-alchemy/css/sidebar.css',
    'loadCss!qk-alchemy/css/navbar.css',
    'loadCss!qk-alchemy/css/submenu.css',
    './bindings/overlay'
], function(mod, ko, $, $$, config) {

    return $$.module(mod, config);
});
