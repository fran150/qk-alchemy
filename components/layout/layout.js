define(['quark', 'knockout', 'text!./layout.html'], function($$, ko, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            sidebarSize: ko.observable(90),
            containerSize: ko.observable('md'),
            minSidebarSize: ko.observable(20)
        }, params, this);

        this.initComponent = function() {
            validateSize(20);
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

        var subscriptions = {
            sidebarSize: self.sidebarSize.subscribe(function(newValue) {
                validateSize(newValue);
            })
        };

        // Al eliminar el componente limpia las subscripciones y listeners
        this.dispose = function() {
            subscriptions.sidebarSize.dispose();
        }
    }, template)
})
