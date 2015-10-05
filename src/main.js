define(['module', 'knockout', 'jquery', 'quark'], function(mod, ko, $, $$) {
    debugger;
    $$.module(mod, {
        prefix: 'al',
        components: {
            "datepicker": "components/datepicker/datepicker",
            "panel-collapsable": "components/panel/collapsable",
            "select-with-id": "components/select/with-id",
            "sidebar": "components/sidebar/sidebar",
            "sidebar-imagebutton": "components/sidebar/controls/imagebutton",
            "sidebar-link": "components/sidebar/controls/link",
            "sidebar-search": "components/sidebar/controls/search",
        },
        require: {
            paths: {
                "bootstrap-datepicker-es": "bower_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min",
                "bootstrap-datepicker": "bower_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min"
            },
            shim: {
                "bootstrap-datepicker-es": { deps: ["bootstrap-datepicker"] }
            }
        }
    }, function(moduleName) {
        require(['link!./alchemy/css/alchemy.css'], function(some) {
            debugger;
        })
    });
});

