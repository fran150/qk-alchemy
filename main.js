define(['module', 'knockout', 'jquery', 'quark'], function(mod, ko, $, $$) {
    return $$.module(mod, {
        prefix: 'al',
        version: '1.0.0',
        components: {
            "pager": "components/pager/pager",
            "panel-collapsable": "components/panel/collapsable"
        },
        namespaces: {
            "layout": {
                "": "components/layout/layout",
                "container": "components/layout/container",
                "sidebar": {
                    "": "components/layout/sidebar/sidebar",
                    "imagebutton": "components/layout/sidebar/controls/imageButton",
                    "link": "components/layout/sidebar/controls/link",
                    "search": "components/layout/sidebar/controls/search",
                    "title": "components/layout/sidebar/controls/title"
                },
                "navbar": {
                    "": "components/layout/navbar/navbar",
                    "button": "components/layout/navbar/controls/button",
                    "link": "components/layout/navbar/controls/link",
                    "dropdown": {
                        "": "components/layout/navbar/controls/dropdown",
                        "link": "components/layout/navbar/controls/dropdown-items/link",
                        "divider": "components/layout/navbar/controls/dropdown-items/divider",
                        "header": "components/layout/navbar/controls/dropdown-items/header"
                    }
                }
            }
        },
        css: [
            "bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css",
            "css/style.css",
            "css/navbar.css"
        ],
        require: {
            paths: {
                "bootstrap-switch": "bower_components/bootstrap-switch/dist/js/bootstrap-switch.min"
            }
        }
    });
});
