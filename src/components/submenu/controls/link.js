define(['knockout', 'quark', 'text!./link.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            routeName: ko.observable(),
            icon: ko.observable(''),
            text: ko.observable('')
        }, params, this);

        $scope.url = ko.pureComputed(function() {
            if (self.routeName()) {
                return "#" + $$.routing.hash(self.routeName());
            }

            return "#";
        }, $scope);

    }, template);
});
