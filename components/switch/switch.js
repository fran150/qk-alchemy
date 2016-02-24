define(['knockout', 'quark', 'text!./switch.html', 'bootstrap-switch'], function (ko, $$, template, testSwitchery) {
    return $$.component(function(params, $scope) {
        var self = this;

        // Set component parameters
        $$.parameters({
            value: ko.observable(false),
            size: ko.observable(),
            onColor: ko.observable(),
            onText: ko.observable(),
            offColor: ko.observable(),
            offText: ko.observable(),
            disabled: ko.observable(false)
        }, params, this);

        // ELement container for switch
        var container = null;
        // switch base element
        var element = null;

        // Gets switch container
        $scope.getContainer = function(elem) {
            container = elem;
        }

        // Get element
        $scope.getElement = function(elem) {
            //Cuando hace click, cambia el valor de la variable
            var onChange = function() {
                if (self.value()) {
                    self.value(false);
                } else {
                    self.value(true);
                }
            }

            //Define las opciones para el switch
            var options = {
                state: self.value(),
                disabled: self.disabled(),
                size: self.size(),
                onText: self.onText(),
                offText: self.offText(),
                onColor: self.onColor(),
                offColor: self.offColor(),
                onSwitchChange: onChange
            };

            //Obtengo el elemento y aplico el switch
            element = elem;
            $("#switch").bootstrapSwitch(options);
        }

    }, template);
});
