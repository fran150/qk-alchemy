
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
define('text!qk-alchemy/components/layout/container.component.html',[],function () { return '<quark-component>\n    <div data-bind="onBind: init,\n                    css: classes,\n                    style: styles">\n        <div data-bind="css: sidebarClass, style: sidebarStyle">\n            <!-- ko content -->\n            <!-- /ko -->\n        </div>\n    </div>\n</quark-component>\n';});

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

define('qk-alchemy/components/layout/container.component',['knockout', 'quark', 'text!./container.component.html',
        'qk-alchemy/lib/utils',
        '../layout.component'],
       function(ko, $$, template, utils, LayoutComponent) {

    function LayoutContainerComponent(params, $scope, $imports) {
        var self = this;

        // The page has navbar
        var hasNavbar = ko.observable();
        // The page has sidebar
        var hasSidebar = ko.observable();

        // Layout values that can be overriden by parameters
        var layout = {
            // Stores the sidebar size observable of the layout component
            sidebarSize: ko.observable(),
            // Stores the container size observable of the layout component
            containerSize: ko.observable(),
            // Is container fluid?
            containerFluid: ko.observable()
        };

        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the main layout component
            var layoutMain = utils.findContainer(context, LayoutComponent.modelType);

            // If a main layout is defined
            if (layoutMain) {
                // Copy main layout component observables to local variables
                hasNavbar = layoutMain.hasNavbar;
                hasSidebar = layoutMain.hasSidebar;
                layout.sidebarSize = layoutMain.sidebarSize;
                layout.containerSize = layoutMain.containerSize;
                layout.containerFluid = layoutMain.containerFluid;

                // Inject values specified in local parameters
                $$.inject(params, layout);

                // Set the sidebar to false
                hasSidebar(false);

                // Publish properties of the layout as local properties of this model
                self.containerSize = layout.containerSize;
                self.containerFluid = layout.containerFluid;
            } else {
                throw Error('The al-layout-container component must be used inside an al-layout component');
            }
        }

        $scope.styles = ko.pureComputed(function() {
            var styles = {};

            if (hasNavbar()) {
                styles.marginTop = "50px";
            }

            return styles;
        })

        $scope.sidebarStyle = ko.pureComputed(function() {
            var styles = {};

            if (hasSidebar()) {
                styles.paddingLeft = layout.sidebarSize();

                if (layout.containerFluid()) {
                    styles.paddingLeft += 15;
                }

                styles.paddingLeft += "px";
            }

            return styles;
        });

        // Clases que se deben aplicar al elemento para que se muestre como corresponde.
        $scope.classes = ko.pureComputed(function() {
            var res = "container";

            if (layout.containerFluid()) {
                res += "-fluid";
            }

            return res;
        });

        // Clases que se deben aplicar al elemento para que se muestre como corresponde.
        $scope.sidebarClass = ko.pureComputed(function() {
            if (hasSidebar()) {
                return "with-sidebar-col-" + layout.containerSize();
            }

            return "";
        });

    }

    return $$.component(LayoutContainerComponent, template);
});
