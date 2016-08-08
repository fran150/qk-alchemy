define(['module', 'knockout', 'jquery', 'quark'], function(mod, ko, $, $$) {
    return $$.module(mod, {
        prefix: 'al',
        version: '1.0.0',
        components: {
            "switch": "components/switch/switch",
            "pager": "components/pager/pager",
            "panel-collapsable": "components/panel/collapsable"
        },
        namespaces: {
            "layout": {
                "": "components/layout/layout",
                "sidebar": {
                    "": "components/layout/sidebar/sidebar",
                    "imagebutton": "components/layout/sidebar/controls/imageButton",
                    "link": "components/layout/sidebar/controls/link",
                    "search": "components/layout/sidebar/controls/search"
                },
                "navbar": {
                    "": "components/layout/navbar/navbar",
                    "button": "components/layout/navbar/controls/button"
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
