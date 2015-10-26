define(['module', 'knockout', 'jquery', 'quark'], function(mod, ko, $, $$) {
    return $$.module(mod, {
        prefix: 'al',
        components: {
            "datepicker": "components/datepicker/datepicker",
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

            "menu-new-refresh": "menu/new-refresh",
            "menu-save-delete-cancel": "menu/save-delete-cancel"
        },
        require: {
            paths: {
                "bootstrap-datepicker-es": "bower_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min",
                "bootstrap-datepicker": "bower_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min"
            },
            shim: {
                "bootstrap-datepicker-es": { deps: ["bootstrap-datepicker"] }
            }
        },
        css: [
            "css/alchemy.css"
        ]
    });
});
