define(['knockout', 'quark', 'text!./collapsable.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        var panelTypes = {
            default: 'panel-default',
            primary: 'panel-primary',
            info: 'panel-info',
            success: 'panel-success',
            warning: 'panel-warning',
            danger: 'panel-danger'
        };

        $$.parameters({
            type: ko.observable('default')
        }, params, self);

        $$.parameters({
            title: ko.observable('Titulo'),
            collapsed: ko.observable(false)
        }, params, [self, $scope]);

        $scope.panelType = ko.pureComputed(function() {
            if ($$.isDefined(panelTypes[self.type()])) {
                return panelTypes[self.type()];
            } else {
                return "panel panel-default";
            }
        }, self);

        self.open = function() {
            self.collapsed(false);
        }

        self.close = function() {
            self.collapsed(true);
        }

        $scope.toggle = self.toggle = function() {
            self.collapsed(!self.collapsed());
        }

        $scope.icon = ko.pureComputed(function() {
            if (self.collapsed()) {
                return "glyphicon glyphicon-chevron-up";
            } else {
                return "glyphicon glyphicon-chevron-down";
            }
        }, self);
    }, template);
});
