define(['knockout', 'quark', 'text!./dropdown.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            text: ko.observable('Dropdown'),
            options: ko.observableArray([
                {
                    routeName: 'main/home',
                    text: 'Option 1'
                },
                {
                    divider: true
                },
                {
                    routeName: 'main/home',
                    text: 'Option 2'
                }
            ])
        }, params, [this, $scope]);

        $scope.isDivider = function(item) {
            if ($$.isDefined(item['divider'])) {
                return true;
            } else {
                return false;
            }
        }

        $scope.isMainActive = ko.pureComputed(function() {
            var current = $$.routing.current().config.fullName;

            for (var i = 0; i < self.options().length; i++) {
                var item = self.options()[i];
                if ($$.isDefined(item.routeName)) {
                    if (item.routeName == current) {
                        return true;
                    }
                }
            }

            return false;
        }, $scope);

        $scope.url = function(routeName) {
            return $$.routing.link(routeName);
        };

        $scope.isActive = function(routeName) {
            var current = $$.routing.current().config.fullName;

            if (current == routeName) {
                return true;
            }

            return false;
        }

    }, template);
});
