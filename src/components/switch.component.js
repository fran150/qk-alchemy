/**
    @component A <a href="http://abpetkov.github.io/switchery/">Switchery</a> wrap.
    An ios like switch.
*/
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
            /**
                @parameter bool Indicates that the switch is on or off
                @observable @exposed
            */
            value: ko.observable(false),
            /**
                @parameter bool Indicates if the switch is disabled
                @observable @exposed
            */
            disabled: ko.observable(false)
        }, params, this);

        $$.parameters({
            /**
                @parameter string Color of the switch element (HEX or RGB value)
            */
            color: '#64bd63',
            /**
                @parameter string Secondary color for the background color and border, when the switch is off
            */
            secondaryColor: '#dfdfdf',
            /**
                @parameter string Default color of the jack/handle element
            */
            jackColor: '#fff',
            /**
                @parameter string Color of unchecked jack/handle element
            */
            jackSecondaryColor: null,
            /**
                @parameter string Size of the swich (small, normal, large)
            */
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
