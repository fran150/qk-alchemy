define(['knockout', 'quark', 'text!./button.html', '../navbar'], function(ko, $$, template, Navbar) {
    function NavbarButton(params, $scope) {
        var self = this;

        $$.parameters({
            text: ko.observable('Navbar Button'),
            iconFont: ko.observable('glyphicon glyphicon-star'),
            active: ko.observable(false),
            onClick: function() {}
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = context.$container;

            // Check if its a Navbar component
            if (!(container instanceof Navbar.modelType)) {
                self.componentErrors.throw('This component must be used inside an al-navbar component');
            }
        }

        $scope.click = function() {
            $$.call(self.onClick);
        }
    }

    return $$.component(NavbarButton, template);
});
