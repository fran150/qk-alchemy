define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('collection-editor', function(object) {
        // Get target object
        var target = object.target;
        // Set default config
        var config = {
            name: 'collectionEditor',
            editorProperty: 'editor',
            collection: ko.observableArray(),
            onNew: function() {},
            onEdit: function(item) {},
            onRemove: function(item) { return true; },
            onSave: function(adding, item) { return true; },
            onSaved: function() {}
        }

        // Apply configuration
        $.extend(config, object.config);

        var editor = {
            editing: ko.observable(),
            getComponent: function() {
                return target[config.editorProperty];
            },
            new: function() {
                // Clear editing item
                $$.undefine(editor.editing);
                // Clear editor screen
                editor.getComponent().reset();
                // Callback
                config.onNew();
            },
            edit: function(item) {
                // Save item to edit untouched in editing variable
                editor.editing(item);
                // Copy the editing item into editor component
                $$.inject(editor.editing(), editor.getComponent().item);
                // Callback
                config.onEdit(item);
            },
            remove: function(item) {
                // If callback is true remove item from collection
                if (config.onRemove(item)) {
                    config.collection.remove(item);
                }
            },
            save: function() {
                // Check if we are adding new item or editing
                var adding = editor.editing() ? false : true;
                var item = editor.getComponent().item;

                // Check callback and if it's false exit
                if (!config.onSave(adding, item)) {
                    return;
                }

                if (adding) {
                    // Clone editor into new object and insert it into collection
                    var newItem = $$.cloneObservable(item);
                    config.collection.push(newItem);
                } else {
                    // Copy the editor values into the edited item
                    $$.inject(item, editor.editing());
                }

                // Callback
                config.onSaved();
            }
        }

        target[config.name] = editor;
    });
});
