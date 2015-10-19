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
        $.extend(true, config, object.config);

        var editor = {
            editing: ko.observable(),
            new: function() {
                // Clear editing item
                editor.editing(undefined);
                // Clear editor screen
                target[config.editorProperty].clear();
                // Callback
                config.onNew();
            },
            edit: function(item) {
                // Save item to edit untoched in editing variable
                editor.editing(item);
                // Copy item values into the editor item
                $$.inject(item, target[config.editorProperty].item);
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

                if (!adding) {
                    // If callback is true copy values from editor to edited item
                    if (config.onSave(adding, target[config.editorProperty].item)) {
                        $$.inject(target[config.editorProperty].item, editor.editing());
                        config.onSaved();
                    }
                } else {
                    // If callback is true clone editor into new object and insert into collection
                    if (config.onSave(adding, target[config.editorProperty].item)) {
                        var newItem = $$.cloneObservable(target[config.editorProperty].item);
                        config.collection.push(newItem);
                        config.onSaved();
                    }
                }
            }
        }

        target[config.name] = editor;
    });
});
