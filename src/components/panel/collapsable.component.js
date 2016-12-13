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
            type: ko.observable(),
            collapsed: ko.observable(false),
            click: function () {}
        }, params, this);

        $scope.panelType = ko.pureComputed(function() {
            if ($$.isDefined(panelTypes[self.type()])) {
                return panelTypes[self.type()];
            } else {
                return "panel panel-default";
            }
        }, self);

        this.open = function() {
            self.collapsed(false);
        }

        this.close = function() {
            self.collapsed(true);
        }

        this.toggle = function() {
            $$.call(self.click);
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
