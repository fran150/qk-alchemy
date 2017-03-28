/**
    @component <p>Shows a bootstrap panel that can be collapsed by the user.</p>
    <p>It allows three content tags:
    <ul>
        <li>heading: content to show on the panel heading</li>
        <li>content: content to show on the panel</li>
        <li>footer: content to show on the panel footer</li>
    </ul></p>
*/
define([
    'knockout',
    'quark',
    'text!./collapsable.component.html'
], function(ko, $$, template) {

    function PanelCollapsableComponent(params, $scope, $imports) {
        var self = this;

        var panelTypes = {
            default: 'panel-default',
            primary: 'panel-primary',
            info: 'panel-info',
            success: 'panel-success',
            warning: 'panel-warning',
            danger: 'panel-danger',
            green: 'panel-green',
            red: 'panel-red'
        };

        $$.parameters({
            /**
                @parameter string Bootstrap type indicating the color style of the panel
                @observable @exposed
            */
            type: ko.observable(),
            /**
                @parameter int True if the panel is collapsed
                @observable @exposed
            */
            collapsed: ko.observable(false),
            /**
                @parameter callback Called when the user clicks on the collapse button
                @observable @exposed
            */
            onClick: function () {}
        }, params, this);

        $scope.panelType = ko.pureComputed(function() {
            if ($$.isDefined(panelTypes[self.type()])) {
                return panelTypes[self.type()];
            } else {
                return "panel panel-default";
            }
        }, self);

        /**
            @method Opens the panel
        */
        this.open = function() {
            self.collapsed(false);
        }

        /**
            @method Close the panel
        */
        this.close = function() {
            self.collapsed(true);
        }

        /**
            @method Toggle the panel collapsed state
        */
        this.toggle = function() {
            $$.call(self.onClick);
            self.collapsed(!self.collapsed());
        }

        $scope.icon = ko.pureComputed(function() {
            if (self.collapsed()) {
                return "glyphicon glyphicon-chevron-up";
            } else {
                return "glyphicon glyphicon-chevron-down";
            }
        }, $scope);
    }

    return $$.component(PanelCollapsableComponent, template);
});
