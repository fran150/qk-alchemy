define(['knockout', 'quark', 'text!./link.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            routeName: ko.observable(),
            routeParams: ko.observable(),
            url: ko.observable(),
            icon: ko.observable(''),
            text: ko.observable('')
        }, params, this);

        $scope.click = function() {
            $$.redirect($scope.url());
        }

        $scope.url = ko.pureComputed(function() {
            if (self.routeName()) {
                return "#" + $$.routing.hash(self.routeName(), self.routeParams());
            } else if (self.url()) {
                return "#" + self.url();
            }

            return "#";
        }, $scope);

    }, template);
});
