define(['knockout', 'quark', 'text!./switch.component.html',
        'bootstrap-switch',
        'loadCss!bootstrap-switch/bt3/css'
       ], function (ko, $$, template) {
    function SwitchComponent(params, $scope, $imports) {
        var self = this;

        var element;

        // Set component parameters
        $$.parameters({
            checked: ko.observable(false),
            size: ko.observable('mini'),
            onColor: ko.observable('primary'),
            onText: ko.observable('Si'),
            offColor: ko.observable('default'),
            offText: ko.observable('No'),
            disabled: ko.observable(false)
        }, params, this);

        // Get element
        $scope.getElement = function(node) {
            element = node;

            //Define las opciones para el switch
            var options = {
                state: self.checked(),
                disabled: self.disabled(),
                size: self.size(),
                onText: self.onText(),
                offText: self.offText(),
                onColor: self.onColor(),
                offColor: self.offColor(),
                onSwitchChange: function(event, state) {
                    if (state != self.checked()) {
                        self.checked(state);
                    }
                }
            };

            $(element).bootstrapSwitch(options);
        }

        var subscriptions = {
            checked: self.checked.subscribe(function(newValue) {
                $(element).bootstrapSwitch('state', newValue);
            }),
            disabled: self.disabled.subscribe(function(newValue) {
                $(element).bootstrapSwitch('disabled', newValue);
            }),
            size: self.size.subscribe(function(newValue) {
                $(element).bootstrapSwitch('size', newValue);
            }),
            onText: self.onText.subscribe(function(newValue) {
                $(element).bootstrapSwitch('onText', newValue);
            }),
            offText: self.offText.subscribe(function(newValue) {
                $(element).bootstrapSwitch('offText', newValue);
            }),
            onColor: self.onColor.subscribe(function(newValue) {
                $(element).bootstrapSwitch('onColor', newValue);
            }),
            offColor: self.offColor.subscribe(function(newValue) {
                $(element).bootstrapSwitch('offColor', newValue);
            })
        }

        this.dispose = function() {
            subscriptions.disabled.dispose();
            subscriptions.size.dispose();
            subscriptions.onText.dispose();
            subscriptions.offText.dispose();
            subscriptions.onColor.dispose();
            subscriptions.offColor.dispose();
        }
    }

    return $$.component(SwitchComponent, template);
});
