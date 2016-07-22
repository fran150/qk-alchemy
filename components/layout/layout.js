define(['quark', 'knockout', 'text!./layout.html'], function($$, ko, template) {
    return $$.component(function(params, $scope, $imports) {
        var self = this;

        this.hasNavbar = ko.observable(false);
        this.hasSidebar = ko.observable(false);

        $$.parameters({
            sidebarSize: ko.observable(90),
            containerSize: ko.observable('md'),
            minSidebarSize: ko.observable(20)
        }, params, this);

        $imports.initComponent = function() {
            validateSize(self.sidebarSize());
            setBodyMargin(self.hasNavbar());
        }

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

        function setBodyMargin(hasNavbar) {
            if (hasNavbar) {
                $(document).css('margin-top', '50px');
            } else {
                $(document).css('margin-top', 'auto');
            }
        }

        var subscriptions = {
            sidebarSize: self.sidebarSize.subscribe(function(newValue) {
                validateSize(newValue);
            }),
            hasNavbar: self.hasNavbar.subscribe(function(newValue) {
                setBodyMargin(newValue);
            })
        };

        // Al eliminar el componente limpia las subscripciones y listeners
        $scope.dispose = function() {
            subscriptions.sidebarSize.dispose();
            subscriptions.hasNavbar.dispose();
        }
    }, template)
})
