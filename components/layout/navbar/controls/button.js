define(['knockout', 'quark', 'text!./button.html'], function(ko, $$, template) {
    function NavbarButton(params, $scope) {
        debugger;

        var self = this;

        $$.parameters({
            text: ko.observable('Navbar Button'),
            iconFont: ko.observable('glyphicon glyphicon-star'),
            visible: ko.observable(true),
            onClick: function() {}
        }, params, this);

        $scope.click = function() {
            $$.call(self.onClick);
        }
    }

    return $$.component(NavbarButton, template);
});
