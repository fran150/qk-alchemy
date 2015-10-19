define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {
    $$.behaviour('list-component', function(object) {
        // Get target object
        var target = object.target;

        // Get config
        var params = object.params || {};

        // Get scope
        var scope = object.scope || {};

        $$.parameters({
            data: ko.observableArray(),
            editable: ko.observable(true),
            deletable: ko.observable(true),
            onEdit: function(item) {},
            onDelete: function(item) {}
        }, params, target);

        scope.deleteClick = function(item) {
            target.onDelete(item);
        }

        scope.editClick = function(item) {
            target.onEdit(item);
        }
    });
});
