define(['knockout', 'quark', 'text!./imagebutton.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            routeName: ko.observable(),
            routeParams: ko.observable(),
            icon: ko.observable(''),
            text: ko.observable('')
        }, params, [$scope, this]);

        $scope.click = function() {
            $$.redirect($scope.url());
        }

        $scope.url = ko.pureComputed(function() {
            if (self.routeName()) {
                var url = "#" + $$.routing.hash(self.routeName(), self.routeParams());
                return url;
            }

            return "#";
        }, $scope);

    }, template);
});
