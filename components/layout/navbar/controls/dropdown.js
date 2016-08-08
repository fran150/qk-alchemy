define(['knockout', 'quark', 'text!./dropdown.html', '../navbar'], function(ko, $$, template, Navbar) {
    function NavbarDropdown(params, $scope) {
        var self = this;

        $$.parameters({
            iconFont: ko.observable('glyphicon glyphicon-star'),
            text: ko.observable('Dropdown'),
            active: ko.observable(false)
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
    }

    return $$.component(NavbarDropdown, template);
});
