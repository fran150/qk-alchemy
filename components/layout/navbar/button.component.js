define(['knockout', 'quark', 'text!./button.component.html',
        'qk-alchemy/lib/utils',
        '../navbar.component'],
       function(ko, $$, template, utils, Navbar) {

    function LayoutNavbarButtonComponent(params, $scope) {
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
            var container = utils.findContainer(context, Navbar.modelType);

            // Check if its a Navbar component
            if (!container) {
                throw new Error('This component must be used inside an al-layout-navbar component');
            }
        }

        $scope.click = function() {
            $$.call(self.onClick);
        }
    }

    return $$.component(LayoutNavbarButtonComponent, template);
});
