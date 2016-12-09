
define('qk-alchemy/main',['module', 'knockout', 'jquery', 'quark'], function(mod, ko, $, $$) {
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

define('text!qk-alchemy/components/pager.component.html',[],function () { return '<quark-component>\n    <!-- ko content --><!-- /ko -->\n\n    <!-- ko if: model.pages() > 0 -->\n    <nav>\n        <ul class="pagination">\n            <li data-bind="css: { disabled: model.page() == 0 }">\n                <a href="#" data-bind="click: previous">\n                    <span>&laquo;</span>\n                </a>\n            </li>\n            <!-- ko foreach: pageArray -->\n                <li data-bind="css: { active: $parent.model.page() == $data }">\n                    <a href="#" data-bind="text: $data + 1, click: $parent.setPage">\n                    </a>\n                </li>\n            <!-- /ko -->\n            <li data-bind="css: { disabled: model.page() == (model.pages() - 1) }">\n                <a href="#" data-bind="click: next">\n                    <span>&raquo;</span>\n                </a>\n            </li>\n        </ul>\n    </nav>\n    <!-- /ko -->\n</quark-component>\n';});

define('qk-alchemy/components/pager.component',['quark', 'knockout', 'text!./pager.component.html'], function($$, ko, template) {
    function PagerComponent(params, $scope, $imports) {
        var self = this;

        var pageSizeDefault = 5;

        $$.parameters({
            data: ko.observableArray(),
            pageSize: ko.observable(pageSizeDefault),
            page: ko.observable(0)
        }, params, this);

        this.recordCount = ko.pureComputed(function() {
            if ($$.isArray(self.data())) {
                return self.data().length;
            } else {
                return 0;
            }
        });

        this.pages = ko.pureComputed(function() {
            var count = self.recordCount();
            var pageSize = self.pageSize();

            return Math.floor(count / pageSize) + ((count % pageSize) != 0 ? 1 : 0);
        });

        this.pageData = ko.pureComputed(function() {
            var page = self.page();
            var pageSize = self.pageSize();
            var recordCount = self.recordCount();

            var start = page * pageSize;
            var end = start + pageSize;

            return self.data().slice(start, end);
        });

        $scope.pageArray = ko.pureComputed(function() {
            var pages = [];

            for (var i = 0; i < self.pages(); i++) {
                pages.push(i);
            }

            return pages;
        });

        $scope.setPage = function(page) {
            self.page(page);
        }

        $scope.next = function() {
            self.page(self.page() + 1);
        }

        $scope.previous = function() {
            self.page(self.page() - 1);
        }

        var subscriptions = {
            pageSize: self.pageSize.subscribe(function(newValue) {
                if (newValue == 0) {
                    self.pageSize(pageSizeDefault);
                }
            }),
            page: self.page.subscribe(function(newValue) {
                if (newValue < 0) {
                    self.page(0);
                }

                var pageSize = self.pages() - 1;

                if (newValue > pageSize) {
                    self.page(pageSize);
                }
            })
        }

        this.dispose = function() {
            subscriptions.pageSize.dispose();
            subscriptions.page.dispose();
        }

    }

    return $$.component(PagerComponent, template);
});

define('text!qk-alchemy/components/switch.component.html',[],function () { return '<quark-component>\r\n    <input type="checkbox" data-bind="onBind: getElement, \r\n                                      checked: model.checked" />\r\n</quark-component>';});

define('qk-alchemy/components/switch.component',['knockout', 'quark', 'text!./switch.component.html',
        'bootstrap-switch',
        'css!bootstrap-switch/bt3/css'
       ], function (ko, $$, template) {
    function SwitchComponent(params, $scope, $imports) {
        var self = this;

        var element;

        // Set component parameters
        $$.parameters({
            checked: ko.observable(false),
            size: ko.observable('mini'),
            onColor: ko.observable(),
            onText: ko.observable('Si'),
            offColor: ko.observable(),
            offText: ko.observable('No'),
            disabled: ko.observable(false)
        }, params, this);

        // Get element
        $scope.getElement = function(node) {
            element = node;

            //Define las opciones para el switch
            var options = {
                disabled: self.disabled(),
                size: self.size(),
                onText: self.onText(),
                offText: self.offText(),
                onColor: self.onColor(),
                offColor: self.offColor()
            };

            $(element).bootstrapSwitch(options);
        }

        var subscriptions = {
            /*checked: self.checked.subscribe(function(newValue) {
                $(element).bootstrapSwitch('state', newValue);
            }),*/
            disabled: self.disabled.subscribe(function(newValue) {
                $(element).bootstrapSwitch('disabled', newValue);
            }),
            size: self.size.subscribe(function(newValue) {
                $(element).bootstrapSwitch('size', newValue);
            }),
            onText: self.onText.subscribe(function(newValue) {
                $(element).bootstrapSwitch('onText', newValue);
            }),
            offText: self.offText.subscribe(function(newValue) {
                $(element).bootstrapSwitch('offText', newValue);
            }),
            onColor: self.onColor.subscribe(function(newValue) {
                $(element).bootstrapSwitch('onColor', newValue);
            }),
            offColor: self.offColor.subscribe(function(newValue) {
                $(element).bootstrapSwitch('offColor', newValue);
            })
        }

        this.dispose = function() {
            subscriptions.disabled.dispose();
            subscriptions.size.dispose();
            subscriptions.onText.dispose();
            subscriptions.offText.dispose();
            subscriptions.onColor.dispose();
            subscriptions.offColor.dispose();
        }
    }

    return $$.component(SwitchComponent, template);
});
define('text!qk-alchemy/components/panel/collapsable.component.html',[],function () { return '<quark-component>\n    <div class="panel" data-bind="css: panelType">\n        <div class="panel-heading" data-bind="click: model.toggle">\n            <!-- ko hasContent: \'heading\' -->\n                <!-- ko content: \'heading\' -->\n                <!-- /ko -->\n            <!-- /ko -->\n            <!-- ko hasNotContent: \'heading\' -->\n                &nbsp;\n            <!-- /ko -->\n            <span class="pull-right">\n                <span data-bind="css: icon"></span>\n            </span>\n        </div>\n        <div class="panel-body" data-bind="visible: !model.collapsed()">\n            <!-- ko content: \'content\' -->\n            <!-- /ko -->\n        </div>\n        <!-- ko hasContent: \'footer\' -->\n            <div class="panel-footer">\n                <!-- ko content: \'footer\' -->\n                <!-- /ko -->\n            </div>\n        <!-- /ko -->\n    </div>\n</quark-component>\n';});

define('qk-alchemy/components/panel/collapsable.component',['knockout', 'quark', 'text!./collapsable.component.html'], function(ko, $$, template) {
    function PanelCollapsableComponent(params, $scope, $imports) {
        var self = this;

        var panelTypes = {
            default: 'panel-default',
            primary: 'panel-primary',
            info: 'panel-info',
            success: 'panel-success',
            warning: 'panel-warning',
            danger: 'panel-danger',
            green: 'panel-green',
            red: 'panel-red'
        };

        $$.parameters({
            type: ko.observable(),
            collapsed: ko.observable(false),
            click: function () {}
        }, params, this);

        $scope.panelType = ko.pureComputed(function() {
            if ($$.isDefined(panelTypes[self.type()])) {
                return panelTypes[self.type()];
            } else {
                return "panel panel-default";
            }
        }, self);

        this.open = function() {
            self.collapsed(false);
        }

        this.close = function() {
            self.collapsed(true);
        }

        this.toggle = function() {
            $$.call(self.click);
            self.collapsed(!self.collapsed());
        }

        $scope.icon = ko.pureComputed(function() {
            if (self.collapsed()) {
                return "glyphicon glyphicon-chevron-up";
            } else {
                return "glyphicon glyphicon-chevron-down";
            }
        }, $scope);
    }

    return $$.component(PanelCollapsableComponent, template);
});

require(["qk-alchemy/main"]);

require.config({
  "bundles": {
    "qk-alchemy/layout": [
      "text!qk-alchemy/components/layout.component.html",
      "qk-alchemy/components/layout.component",
      "text!qk-alchemy/components/layout/container.component.html",
      "qk-alchemy/lib/utils",
      "qk-alchemy/components/layout/container.component"
    ],
    "qk-alchemy/sidebar": [
      "text!qk-alchemy/components/layout/sidebar.component.html",
      "qk-alchemy/lib/utils",
      "text!qk-alchemy/components/layout.component.html",
      "qk-alchemy/components/layout.component",
      "qk-alchemy/components/layout/sidebar.component",
      "text!qk-alchemy/components/layout/sidebar/imagebutton.component.html",
      "qk-alchemy/components/layout/sidebar/imagebutton.component",
      "text!qk-alchemy/components/layout/sidebar/link.component.html",
      "qk-alchemy/components/layout/sidebar/link.component",
      "text!qk-alchemy/components/layout/sidebar/search.component.html",
      "qk-alchemy/components/layout/sidebar/search.component",
      "text!qk-alchemy/components/layout/sidebar/title.component.html",
      "qk-alchemy/components/layout/sidebar/title.component"
    ],
    "qk-alchemy/navbar": [
      "text!qk-alchemy/components/layout/navbar.component.html",
      "qk-alchemy/lib/utils",
      "text!qk-alchemy/components/layout.component.html",
      "qk-alchemy/components/layout.component",
      "qk-alchemy/components/layout/navbar.component",
      "text!qk-alchemy/components/layout/navbar/button.component.html",
      "qk-alchemy/components/layout/navbar/button.component",
      "text!qk-alchemy/components/layout/navbar/dropdown.component.html",
      "qk-alchemy/components/layout/navbar/dropdown.component",
      "text!qk-alchemy/components/layout/navbar/dropdown/divider.component.html",
      "qk-alchemy/components/layout/navbar/dropdown/divider.component",
      "text!qk-alchemy/components/layout/navbar/dropdown/header.component.html",
      "qk-alchemy/components/layout/navbar/dropdown/header.component",
      "text!qk-alchemy/components/layout/navbar/dropdown/link.component.html",
      "qk-alchemy/components/layout/navbar/dropdown/link.component",
      "text!qk-alchemy/components/layout/navbar/link.component.html",
      "qk-alchemy/components/layout/navbar/link.component"
    ]
  }
});
