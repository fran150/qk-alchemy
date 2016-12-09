
define('text!qk-alchemy/components/layout/navbar.component.html',[],function () { return '<quark-component>\n    <div class="navbar navbar-default navbar-fixed-top" role="navigation" data-bind="onBind: init">\n        <div class="container-fluid">\n            <div class="navbar-header">\n                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n                    <span class="sr-only">Desplegar menu</span>\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                    <span class="icon-bar"></span>\n                </button>\n                    <a data-bind="attr: { href: url }" class="navbar-brand">\n                        <!-- ko if: visibleIcon -->\n                            <!-- ko ifnot: iconType() == \'font\' -->\n                                <img data-bind="attr: { src: iconUrl }" />\n                            <!-- /ko -->\n                            <!-- ko if: iconType() == \'font\' -->\n                                <span class="font-icon" data-bind="css: iconUrl"></span>\n                            <!-- /ko -->\n                        <!-- /ko -->\n                        <span data-bind="text: model.brand"></span>\n                    </a>\n            </div>\n            <div class="collapse navbar-collapse">\n                <ul class="nav navbar-nav navbar-left">\n                    <!-- ko content: \'left\', virtual: true --><!-- /ko -->\n                </ul>\n\n                <ul class="nav navbar-nav navbar-right">\n                    <!-- ko content: \'right\', virtual: true --><!-- /ko -->\n                </ul>\n            </div>\n        </div>\n    </div>\n</quark-component>\n';});

define('qk-alchemy/lib/utils',['quark', 'knockout'], function($$, ko) {
    function Utils() {
        var self = this;

        this.findContainer = function(context, type) {
            // Get the context container
            var container = context.$container;

            var found = false;

            if ($$.isArray(type)) {
                for (var i = 0; i < type.length; i++) {
                    var actualType = type[i];

                    if (container instanceof actualType) {
                        found = true;
                        break;
                    }
                }
            } else {
                found = (container instanceof type);
            }

            // If the container exists and is of the requested type return it
            if (found) {
                return container;
            } else {
                // If there's a parent context search for the container type on it
                var parentContext = context.$parentContext;

                if (parentContext) {
                    return self.findContainer(parentContext, type);
                }
            }
        }
    }

    return new Utils();
});

define('text!qk-alchemy/components/layout.component.html',[],function () { return '<!-- quark-component -->\n    <!-- ko content -->\n    <!-- /ko -->\n<!-- /ko -->\n';});

define('qk-alchemy/components/layout.component',['quark', 'knockout', 'text!./layout.component.html'], function($$, ko, template) {
    function LayoutComponent(params, $scope, $imports) {
        var self = this;

        // The layout has a navbar
        this.hasNavbar = ko.observable(false);
        // The layout has a sidebar
        this.hasSidebar = ko.observable(false);

        // Component parameters
        $$.parameters({
            // Sidebar's width in pixels
            sidebarSize: ko.observable(90),
            // Main container responsive size
            containerSize: ko.observable('md'),
            // Min sidebar size in pixels
            minSidebarSize: ko.observable(20),
            // Container fluid?
            containerFluid: ko.observable(true)
        }, params, this);

        // On component init
        $imports.initComponent = function() {
            // Validate sidebar size and apply body margin
            validateSize(self.sidebarSize());
            setBodyMargin(self.hasNavbar());
        }

        // Limit sidebar size
        function validateSize() {
            var size = self.sidebarSize();
            var minSize = self.minSidebarSize();
            var maxSize = $(window).width() / 2;

            if ($$.isNumeric(minSize) && minSize > 0 && size < minSize) {
                self.sidebarSize(minSize);
            }

            if (size < 0) {
                self.sidebarSize(0);
            }

            if (size > maxSize) {
                self.sidebarSize(maxSize);
            }
        }

        // Applies the body margin if it has a navbar
        function setBodyMargin(hasNavbar) {
            if (hasNavbar) {
                $(document).css('margin-top', '50px');
            } else {
                $(document).css('margin-top', 'auto');
            }
        }

        var subscriptions = {
            // Validate sidebar size on size change
            sidebarSize: self.sidebarSize.subscribe(validateSize),
            // Validate sidebar size on min size change
            minSidebarSize: self.minSidebarSize.subscribe(validateSize),
            // Apply body margin when hasNavbar changes
            hasNavbar: self.hasNavbar.subscribe(setBodyMargin)
        };

        // Cleans component on dispose
        $scope.dispose = function() {
            subscriptions.sidebarSize.dispose();
            subscriptions.minSidebarSize.dispose();
            subscriptions.hasNavbar.dispose();
        }
    }

    return $$.component(LayoutComponent, template)
})
;
define('qk-alchemy/components/layout/navbar.component',['knockout', 'quark', 'text!./navbar.component.html',
        'qk-alchemy/lib/utils',
        '../layout.component'],
       function(ko, $$, template, utils, LayoutComponent) {

    function LayoutNavbarComponent(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            pageName: ko.observable(),
            pageParams: ko.observable(),
            brand: ko.observable('Brand Name'),
            icon: ko.observable()
        }, params, this);

        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the main layout component
            var layoutMain = utils.findContainer(context, LayoutComponent.modelType);;

            // Set the main layout component hasNavbar property to true
            if (layoutMain) {
                layoutMain.hasNavbar(true);
            } else {
                throw new Error('The navbar component must be used inside an al-layout component');
            }
        }

        // Return true if an icon is defined
        $scope.visibleIcon = ko.pureComputed(function() {
            return $$.isString(self.icon());
        }, $scope);

        // Get the icon type, font or image based on the icon property
        // first chars
        $scope.iconType = ko.pureComputed(function() {
            var icon = self.icon();

            if ($$.isString(icon)) {
                if (icon.substring(0, 4) == 'url:') {
                    return "image";
                } else if (icon.substring(0, 5) == 'font:') {
                    return "font";
                }
            }

            return "unknown";
        }, $scope);

        // Based on icon type returns the icon Url or class
        $scope.iconUrl = ko.pureComputed(function() {
            var type = $scope.iconType();
            var icon = self.icon();

            if (type == "image") {
                return icon.substring(4);
            } if (type == "font") {
                return icon.substring(5);
            } else {
                return icon;
            }
        }, $scope);

        $scope.url = ko.pureComputed(function() {
            var pageName = self.pageName();
            var pageParams = self.pageParams();

            if (pageName) {
                return '#' + $$.routing.hash(pageName, pageParams);
            }
        });
    }

    return $$.component(LayoutNavbarComponent, template);
});

define('text!qk-alchemy/components/layout/navbar/button.component.html',[],function () { return '<!-- quark-component -->\n    <li data-bind="onBind: init,\n                   css: { active: model.active }">\n        <a href="#" data-bind="click: click">\n            <!-- ko if: model.iconFont -->\n                <span data-bind="css: model.iconFont"></span>&nbsp;\n            <!-- /ko -->\n            <!-- ko if: model.text -->\n                <span data-bind="text: model.text"></span>\n            <!-- /ko -->\n        </a>\n    </li>\n<!-- /quark-component -->\n';});

define('qk-alchemy/components/layout/navbar/button.component',['knockout', 'quark', 'text!./button.component.html',
        'qk-alchemy/lib/utils',
        '../navbar.component'],
       function(ko, $$, template, utils, Navbar) {

    function LayoutNavbarButtonComponent(params, $scope) {
        var self = this;

        $$.parameters({
            text: ko.observable('Navbar Button'),
            iconFont: ko.observable('glyphicon glyphicon-star'),
            active: ko.observable(false),
            onClick: function() {}
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, Navbar.modelType);

            // Check if its a Navbar component
            if (!container) {
                throw new Error('This component must be used inside an al-layout-navbar component');
            }
        }

        $scope.click = function() {
            $$.call(self.onClick);
        }
    }

    return $$.component(LayoutNavbarButtonComponent, template);
});

define('text!qk-alchemy/components/layout/navbar/dropdown.component.html',[],function () { return '<!-- quark-component -->\n    <li class="dropdown" data-bind="onBind: init, css: { active: model.active }">\n        <a href="#" class="dropdown-toggle" data-toggle="dropdown">\n            <!-- ko if: model.iconFont -->\n                <span data-bind="css: model.iconFont"></span>&nbsp;\n            <!-- /ko -->\n            <span data-bind="text: model.text"></span>\n            <span class="caret"></span>\n        </a>\n        <ul class="dropdown-menu">\n            <!-- ko content: \'*\' -->\n            <!-- /ko -->\n        </ul>\n    </li>\n<!-- /quark-component -->\n';});

define('qk-alchemy/components/layout/navbar/dropdown.component',['knockout', 'quark', 'text!./dropdown.component.html',
        'qk-alchemy/lib/utils',
        '../navbar.component'],
       function(ko, $$, template, utils, Navbar) {

    function LayoutNavbarDropdownComponent(params, $scope) {
        var self = this;

        $$.parameters({
            iconFont: ko.observable('glyphicon glyphicon-star'),
            text: ko.observable('Dropdown'),
            active: ko.observable(false)
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, Navbar.modelType);

            // Check if its a Navbar component
            if (!container) {
                throw new Error('This component must be used inside an al-layout-navbar component');
            }
        }
    }

    return $$.component(LayoutNavbarDropdownComponent, template);
});

define('text!qk-alchemy/components/layout/navbar/dropdown/divider.component.html',[],function () { return '<!-- quark-component -->\n    <li data-bind="onBind: init" class="divider">\n    </li>\n<!-- /quark-component -->\n';});

define('qk-alchemy/components/layout/navbar/dropdown/divider.component',['knockout', 'quark', 'text!./divider.component.html',
        'qk-alchemy/lib/utils',
        '../dropdown.component'],
       function(ko, $$, template, utils, NavbarDropdown) {

    function LayoutNavbarDropdownDividerComponent(params, $scope) {
        var self = this;

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, NavbarDropdown.modelType);

            // Check if its a Navbar component
            if (!container) {
                throw new Error('This component must be used inside an al-layout-navbar-dropdown component');
            }
        }
    }

    return $$.component(LayoutNavbarDropdownDividerComponent, template);
});

define('text!qk-alchemy/components/layout/navbar/dropdown/header.component.html',[],function () { return '<!-- quark-component -->\n    <li data-bind="onBind: init, text: model.text" class="dropdown-header">\n    </li>\n<!-- /quark-component -->\n';});

define('qk-alchemy/components/layout/navbar/dropdown/header.component',['knockout', 'quark', 'text!./header.component.html',
        'qk-alchemy/lib/utils',
        '../dropdown.component'],
       function(ko, $$, template, utils, NavbarDropdown) {

    function LayoutNavbarDropdownHeaderComponent(params, $scope) {
        var self = this;

        $$.parameters({
            text: ko.observable('Header')
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, NavbarDropdown.modelType);

            // Check if its a Navbar component
            if (!container) {
                throw new Error('This component must be used inside an al-layout-navbar-dropdown component');
            }
        }
    }

    return $$.component(LayoutNavbarDropdownHeaderComponent, template);
});

define('text!qk-alchemy/components/layout/navbar/dropdown/link.component.html',[],function () { return '<!-- quark-component -->\n    <li data-bind="onBind: init, css: { active: isActive, disabled: model.disabled }">\n        <a data-bind="attr: { href: url }">\n            <!-- ko if: model.iconFont -->\n                <span data-bind="css: model.iconFont"></span>&nbsp;\n            <!-- /ko -->\n\n            <span data-bind="text: model.text"></span>\n        </a>\n    </li>\n<!-- /quark-component -->\n';});

define('qk-alchemy/components/layout/navbar/dropdown/link.component',['knockout', 'quark', 'text!./link.component.html',
        'qk-alchemy/lib/utils',
        '../dropdown.component'],
       function(ko, $$, template, utils, NavbarDropdown) {

    function LayoutNavbarDropdownLinkComponent(params, $scope) {
        var self = this;

        $$.parameters({
            pageName: ko.observable(),
            pageParams: ko.observable(),
            iconFont: ko.observable('glyphicon glyphicon-star'),
            text: ko.observable('Navbar Link'),
            disabled: ko.observable(false)
        }, params, this);

        var dropdownActive = ko.observable();

        function checkActive() {
            var current = $$.routing.current();

            if (current == self.pageName()) {
                dropdownActive(true);
                return true;
            }

            return false;
        }

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, NavbarDropdown.modelType);

            // Check if its a Navbar component
            if (container) {
                dropdownActive = container.active;
                checkActive();
            } else {
                throw new Error('This component must be used inside an al-layout-navbar-dropdown component');
            }
        }

        $scope.url = ko.pureComputed(function() {
            var pageName = self.pageName();
            var pageParams = self.pageParams();

            if (pageName) {
                return '#' + $$.routing.hash(pageName, pageParams);
            }
        }, $scope);

        $scope.isActive = ko.computed(function() {
            return checkActive();
        }, $scope);

        $scope.dispose = function() {
            $scope.isActive.dispose();
        }
    }

    return $$.component(LayoutNavbarDropdownLinkComponent, template);
});

define('text!qk-alchemy/components/layout/navbar/link.component.html',[],function () { return '<!-- quark-component -->\n    <li data-bind="onBind: init, css: { active: isActive }">\n        <a data-bind="attr: { href: url }">\n            <!-- ko if: model.iconFont -->\n                <span data-bind="css: model.iconFont"></span>&nbsp;\n            <!-- /ko -->\n\n            <span data-bind="text: model.text"></span>\n        </a>\n    </li>\n<!-- /quark-component -->\n';});

define('qk-alchemy/components/layout/navbar/link.component',['knockout', 'quark', 'text!./link.component.html',
        'qk-alchemy/lib/utils',
        '../navbar.component'],
       function(ko, $$, template, utils, Navbar) {

    function LayoutNavbarLinkComponent(params, $scope) {
        var self = this;

        $$.parameters({
            pageName: ko.observable(),
            pageParams: ko.observable(),
            iconFont: ko.observable('glyphicon glyphicon-star'),
            text: ko.observable('Navbar Link')
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Get the main layout component
            var container = utils.findContainer(context, Navbar.modelType);;

            // Check if its a Navbar component
            if (!(container instanceof Navbar.modelType)) {
                throw new Error('This component must be used inside an al-layout-navbar component');
            }
        }

        $scope.url = ko.pureComputed(function() {
            var pageName = self.pageName();
            var pageParams = self.pageParams();

            if (pageName) {
                return '#' + $$.routing.hash(pageName, pageParams);
            }
        }, $scope);

        $scope.isActive = ko.pureComputed(function() {
            var current = $$.routing.current();

            if (current == self.pageName()) {
                return true;
            }

            return false;
        }, $scope);
    }

    return $$.component(LayoutNavbarLinkComponent, template);
});
