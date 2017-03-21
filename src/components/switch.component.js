define([
    'quark',
    'knockout',
    'jquery',
    'switchery/js',
    'text!./switch.component.html',
    'loadCss!switchery/css'
], function($$, ko, $, Switchery, template) {

    function SwitchComponent(params, $scope, $imports) {
        var self = this;

        var element;
        var switchElement;
        var config = {};

        $$.parameters({
            value: ko.observable(false),
            disabled: ko.observable(false)
        }, params, this);

        $$.parameters({
            color: '#64bd63',
            secondaryColor: '#dfdfdf',
            jackColor: '#fff',
            jackSecondaryColor: null,
            size: 'small'
        }, params, config);

        function setDisabled() {
            if (self.disabled()) {
                switchElement.disable();
            } else {
                switchElement.enable();
            }
        }

        $scope.getElement = function(dom) {
            element = dom;

            element.checked = self.value();

            switchElement = new Switchery(element, config);

            setDisabled();

            element.onchange = function() {
                if (self.value() != element.checked) {
                    self.value(element.checked);
                }
            };
        }

        var subscriptions = {
            value: self.value.subscribe(function(value) {
                if (element.checked != value) {
                    $(element).trigger('click');
                    element.checked = value;
                }
            }),
            disabled: self.disabled.subscribe(function(value) {
                setDisabled();
            })
        }

        $scope.dispose = function() {
            if (switchElement) {
                switchElement.destroy();
            }

            subscriptions.value.dispose();
            subscriptions.disabled.dispose();
        }
    }

    return $$.component(SwitchComponent, template);
});
