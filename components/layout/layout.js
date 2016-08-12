define(['quark', 'knockout', 'text!./layout.html'], function($$, ko, template) {
    function Layout(params, $scope, $imports) {
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
        function validateSize(size) {
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
            // Apply body margin when hasNavbar changes
            hasNavbar: self.hasNavbar.subscribe(setBodyMargin)
        };

        // Cleans component on dispose
        $scope.dispose = function() {
            subscriptions.sidebarSize.dispose();
            subscriptions.hasNavbar.dispose();
        }
    }

    return $$.component(Layout, template)
})
