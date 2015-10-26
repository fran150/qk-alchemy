define(['knockout', 'quark', 'text!./save-delete-cancel.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        function dispatchSignal(propertyName, parameterName) {
            if ($$.controller && $$.controller[propertyName] && $$.controller[propertyName].dispatch) {
                $$.controller[propertyName].dispatch();
            } else {
                throw 'This component\'s default event requires that the controller expose a signal named \'' + propertyName + '\' wich will be dispatched when the user clicks on the button. Create a signal on the controller or override the event with the ' + parameterName + ' parameter.';
            }
        }

        $$.parameters({
            onSaveClick: function() {
                dispatchSignal('save', 'onSaveClick');
            },
            onDeleteClick: function() {
                dispatchSignal('delete', 'onDeleteClick');
            },
            onCancelClick: function() {
                dispatchSignal('cancel', 'onCancelClick');
            },
            blocker: ko.pureComputed(function() {
                if ($$.controller && $$.controller.blocker) {
                    return !$$.controller.blocker();
                } else {
                    throw 'This component\'s default config requires that the controller exposes an observable named blocker wich disable the controls while is true. Provide a controller with a blocked observable or override the blocker parameter with an observable.'
                }
            }),
            updating: ko.pureComputed(function() {
                if ($$.controller && $$.controller.updating) {
                    return $$.controller.updating();
                } else {
                    throw 'This component\'s default config requires that the controller exposes an observable named updating wich makes delete button visible when true. Provide a controller with a updating observable or override the updating parameter with an observable.'
                }
            })
        }, params, this);
    }, template);
});
