define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('simple-editor-page', function(object) {
        // Get target object
        var target = object.target;
        // Set default config
        var config = {
            dataProperty: '',
            editorProperty: 'editor',
            create: function(callback) { callback(); },
            read: function(callback) { callback() },
            update: function(callback) { callback(); },
            delete: function(callback) { callback(); },

            onNew: function() { return true; },
            onCreate: function() { return true; },
            onUpdate: function() { return true; },
            onDelete: function() { return true; },
            readed: function() {},
            saved: function(data) { },
            deleted: function(data) { }
        }

        // Apply configuration
        $.extend(config, object.config);

        // Current Mode
        target.updating = ko.observable(false);

        // Creates a property for the data
        target[config.dataProperty] = ko.observable();

        // Configures object for add item
        target.new = function() {
            // Undefine the current item and reset the editor
            if (config.onNew()) {
                $$.undefine(target[config.dataProperty]);
                target[config.editorProperty].reset();
                target.updating(false);
            }
        }

        // Reads a new record into the current item
        target.read = function() {
            // Read the record, call the event and inject it into the editor
            config.read(function(data) {
                $$.inject(target[config.dataProperty](), target[config.editorProperty].item);
                target.updating(true);
                config.readed();
            });
        }

        // Saves the changes
        target.save = function() {
            target[config.dataProperty](target[config.editorProperty].item);

            var ok = false;

            if (target.updating()) {
                ok = config.onUpdate();
            } else {
                ok = config.onCreate();
            }

            if (ok) {
                if (target.updating()) {
                    config.update(config.saved);
                } else {
                    config.create(config.saved);
                }
            }
        }

        // Deletes the record
        target.delete = function() {
            if (config.onDelete()) {
                config.delete(config.deleted);
            }
        }
    });
});
