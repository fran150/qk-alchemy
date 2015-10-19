define(['knockout', 'quark', 'text!./button.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            onClick: function() {},
            icon: ko.observable(''),
            text: ko.observable('')
        }, params, this);

        $scope.click = function() {
            $$.call(self.onClick);
        }

        $scope.url = ko.pureComputed(function() {
            if (self.routeName()) {
                return "#" + $$.routing.hash(self.routeName());
            } else if (self.url()) {
                return "#" + self.url();
            }

            return "#";
        }, $scope);

    }, template);
});
