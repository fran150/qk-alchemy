define(['module', 'knockout', 'jquery', 'quark'], function(mod, ko, $, $$) {
    return $$.module(mod, {
        prefix: 'al',
        version: '1.0.0',
        components: {
            "datepicker": "components/datepicker/datepicker",
            "spinner": "components/spinner/spinner",
            "switch": "components/switch/switch",
            "panel-collapsable": "components/panel/collapsable",
            "select-with-id": "components/select/with-id",

            "menu-new-refresh": "menu/new-refresh",
            "menu-save-delete-cancel": "menu/save-delete-cancel"
        },
        css: [
            "bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css",
            "bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css"
        ],
        require: {
            paths: {
                "jqueryui":         "bower_components/jquery-ui/ui",
                "bootstrap-switch": "bower_components/bootstrap-switch/dist/js/bootstrap-switch.min"
            }
        }
    });
});
