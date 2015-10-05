define(['knockout', 'quark', 'text!./imagebutton.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            routeName: ko.observable(),
            icon: ko.observable(),
            text: ko.observable()
        }, params, [$scope, this]);

        $scope.url = ko.pureComputed(function() {
            if (self.routeName()) {
                return "#" + $$.routing.hash(self.routeName());
            }

            return "#";
        }, $scope);

    }, template);
});
