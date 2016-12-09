define(['module', 'knockout', 'jquery', 'quark'], function(mod, ko, $, $$) {
    return $$.module(mod, {
        prefix: 'al',
        version: '1.0.0',
        components: {
            "pager": "components/pager.component",
            "switch": "components/switch.component",
            "panel-collapsable": "components/panel/collapsable.component"
        },
        namespaces: {
            "layout": {
                "": "components/layout.component",
                "container": "components/layout/container.component",
                "sidebar": {
                    "": "components/layout/sidebar.component",
                    "imagebutton": "components/layout/sidebar/imagebutton.component",
                    "link": "components/layout/sidebar/link.component",
                    "search": "components/layout/sidebar/search.component",
                    "title": "components/layout/sidebar/title.component"
                },
                "navbar": {
                    "": "components/layout/navbar.component",
                    "button": "components/layout/navbar/button.component",
                    "link": "components/layout/navbar/link.component",
                    "dropdown": {
                        "": "components/layout/navbar/dropdown.component",
                        "link": "components/layout/navbar/dropdown/link.component",
                        "divider": "components/layout/navbar/dropdown/divider.component",
                        "header": "components/layout/navbar/dropdown/header.component"
                    }
                }
            }
        },
        css: [
            "css/sidebar.css",
            "css/navbar.css"
        ]
    });
});
