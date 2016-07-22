define(['knockout', 'quark', 'text!./link.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            routeName: ko.observable(),
            url: ko.observable(),
            text: ko.observable('Link')
        }, params, this);

        $scope.url = ko.pureComputed(function() {
            if (self.routeName()) {
                return '#' + $$.routing.hash(self.routeName());
            } else if (self.url()) {
                return self.url();
            }

            return '#';
        }, $scope);

        $scope.isActive = ko.pureComputed(function() {
            var current = $$.routing.current();

            if (current.config.fullName == self.routeName()) {
                return true;
            }

            return false;
        }, $scope);

    }, template);
});
