define(['knockout', 'quark', 'text!./link.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            icon: ko.observable(),
            text: ko.observable('Menu Option'),
            url: ko.observable('#'),
            opened: ko.observable(false)
        }, params, [$scope, this]);

        $scope._arrow = ko.pureComputed(function() {
           return this.opened() ? "glyphicon-menu-down" : "glyphicon-menu-right";
        }, $scope);

        $scope.toggle = this.toggle = function() {
            self.opened(!self.opened());
        };
    }, template);
});
