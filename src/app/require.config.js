// Configuración de Require.js
var require = {
    baseUrl: ".",
    paths: {
        // bower:modules
        "jquery": "bower_modules/jquery/dist/jquery",
        "bootstrap": "bower_modules/bootstrap/dist/js/bootstrap",
        "crossroads": "bower_modules/crossroads/dist/crossroads.min",
        "signals": "bower_modules/js-signals/dist/signals",
        "hasher": "bower_modules/hasher/dist/js/hasher",
        "requirejs": "bower_modules/requirejs/require",
        "text": "bower_modules/requirejs-text/text",
        "knockout": "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections.min",
        "knockout-mapping": "bower_modules/knockout-mapping/knockout.mapping",
        "blockUI": "bower_modules/blockui/jquery.blockUI",
        "accounting-js": "bower_modules/accounting.js/accounting",
        "quark": "bower_modules/quark/dist/quark",
        "bootstrap-datepicker-es": "bower_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min",
        "bootstrap-datepicker": "bower_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min",
        // endbower
    },
    shim: {
        // bower:shim
        "bootstrap": { deps: ["jquery"] },
        "knockout-mapping": { deps: ["knockout","jquery"] },
        "bootstrap-datepicker-es": { deps: ["bootstrap-datepicker"] },
        // endbower
    }
};
