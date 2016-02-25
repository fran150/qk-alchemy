define(['module', 'knockout', 'jquery', 'quark'], function(mod, ko, $, $$) {
    return $$.module(mod, {
        prefix: 'al',
        components: {
            "datepicker": "components/datepicker/datepicker",
            "spinner": "components/spinner/spinner",
            "switch": "components/switch/switch",
            "panel-collapsable": "components/panel/collapsable",
            "select-with-id": "components/select/with-id",
            "sidebar": "components/sidebar/sidebar",
            "sidebar-imagebutton": "components/sidebar/controls/imagebutton",
            "sidebar-link": "components/sidebar/controls/link",
            "sidebar-search": "components/sidebar/controls/search",
            "submenu": "components/submenu/submenu",
            "submenu-link": "components/submenu/controls/link",
            "submenu-button": "components/submenu/controls/button",
            "submenu-version": "components/submenu/controls/version",

            "data-session-storage": "data/session-storage",
            "data-local-storage": "data/local-storage",
            "data-history": "data/history",

            "menu-new-refresh": "menu/new-refresh",
            "menu-save-delete-cancel": "menu/save-delete-cancel"
        },
        require: {
            paths: {
                "bootstrap-datepicker-es": "bower_components/bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min",
                "bootstrap-datepicker": "bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min",

                "bootstrap-switch": "bower_components/bootstrap-switch/dist/js/bootstrap-switch.min"
            },
            shim: {
                "bootstrap-datepicker-es": { deps: ["bootstrap-datepicker"] }
            }
        },
        css: [
            "css/alchemy.css",
            "bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css"

        ]
    });
});
