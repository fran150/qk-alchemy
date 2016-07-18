define(['module', 'knockout', 'jquery', 'quark'], function(mod, ko, $, $$) {
    return $$.module(mod, {
        prefix: 'al',
        version: '1.0.0',
        components: {
            "layout": "components/layout/layout",
            "switch": "components/switch/switch",
            "pager": "components/pager/pager",
            "panel-collapsable": "components/panel/collapsable"
        },
        namespaces: {
            "layout": {
                "sidebar": "components/layout/sidebar/sidebar"
            },
            "layout-sidebar": {
                "imagebutton": "components/layout/sidebar/controls/imageButton"
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
