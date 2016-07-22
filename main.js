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
                    "imagebutton": "components/layout/sidebar/controls/imageButton"
                },
                "navbar": {
                    "": "components/layout/navbar/navbar",
                    "alert": "components/layout/navbar/controls/alert",
                    "button": "components/layout/navbar/controls/button",
                    "dropdown": "components/layout/navbar/controls/dropdown",
                    "link": "components/layout/navbar/controls/link",
                }
            }
        },
        css: [
            "bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css",
            "css/style.css"
        ],
        require: {
            paths: {
                "bootstrap-switch": "bower_components/bootstrap-switch/dist/js/bootstrap-switch.min"
            }
        }
    });
});
