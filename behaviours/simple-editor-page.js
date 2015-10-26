define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('simple-editor-page', function(object) {

        if (!object) {
            throw 'Must specify this behaviour configuration';
        }

        // Get target object
        var target;
        if (object.target) {
            target = object.target;
        } else {
            throw 'Must specify the object where to apply this behaviour on the \'target\' property';
        }

        // Get params
        var params = object.params || {};

        // Set default config
        var config = {
            id: undefined,
            dataProperty: 'data',
            editorProperty: 'editor',
            dataSourceProperty: 'dataSource',
        }

        // Apply configuration
        $.extend(config, object.config);


        // Get the datasource from target using configured property name
        function dataSource() {
            return target[config.dataSourceProperty];
        }


        // Generic error on operations
        function errorOnId(oper) {
            throw 'Id must be an observable, config.id must be an observable containing the id of the object to ' + oper + '. Assign a valid observable to the config.id or redefine the ' + oper + ' operation specifying a function in the operations.' + oper + ' config';
        }

        function errorOnOperation(oper) {
            throw 'Could not find a ' + oper + ' method on the datasource, check config.dataSourceProperty to be a targets property containing a valid datasource o redefine the ' + oper + ' operation specifying a function in the operations.' + oper + ' config';
        }


        // Set default operations
        var operations = {
            create: function(callback) {
                if (dataSource() && dataSource().create) {
                    dataSource().create(callback);
                } else {
                    errorOnOperation('create');
                }
            },
            read: function(callback) {
                if (dataSource() && dataSource().read) {
                    if (!ko.isObservable(config.id)) {
                        errorOnId('read');
                    }

                    var id = config.id();
                    dataSource().read(id, callback);
                } else {
                    errorOnOperation('read');
                }
            },
            update: function(callback) {
                if (dataSource() && dataSource().update) {
                    if (!ko.isObservable(config.id)) {
                        errorOnId('update');
                    }

                    var id = config.id();
                    dataSource().update(id, callback);
                } else {
                    errorOnOperation('update');
                }
            },
            delete: function(callback) {
                if (dataSource() && dataSource().delete) {
                    if (!ko.isObservable(config.id)) {
                        errorOnId('delete');
                    }

                    var id = config.id();
                    dataSource().delete(id, callback);
                } else {
                    errorOnOperation('delete');
                }
            },
        }

        $.extend(operations, object.operations);


        // Set default events
        var events = {
            onNew: function() { return true; },
            onCreate: function() { return true; },
            onRead: function() { return true; },
            onUpdate: function() { return true; },
            onDelete: function() { return true; },
            onSave: function() { return true; },

            created: function(data) {},
            readed: function() {},
            updated: function(data) {},
            deleted: function(data) {},
            saved: function(data) {}
        }

        $.extend(events, object.events);


        // Create current mode parameter
        $$.parameters({
            updating: ko.observable(false)
        }, params, target);

        // Creates a property for the data
        target[config.dataProperty] = ko.observable();

        // Creates a new method wich configures component for creating a new object
        target.new = function() {
            if (events.onNew()) {
                // Undefine the current item, reset the editor and set the updating flag to false
                $$.undefine(target[config.dataProperty]);
                target[config.editorProperty].reset();
                target.updating(false);
            }
        }

        // Creates a method that reads a new record into the data property
        target.read = function() {
            if (events.onRead()) {
                // Read the record, when finish inject it into the editor and call the after event
                operations.read(function(data) {
                    $$.inject(target[config.dataProperty](), target[config.editorProperty].item);
                    target.updating(true);
                    events.readed();
                });
            }
        }

        // Creates a method that saves changes in the editor to the data
        target.save = function() {
            var ok = false;

            // Call the generic save event
            if (events.onSave()) {
                // Call the specific event based on updating observable
                if (target.updating()) {
                    ok = events.onUpdate();
                } else {
                    ok = events.onCreate();
                }

                // If all events allow to continue
                if (ok) {
                    // Copy editor value into data item
                    target[config.dataProperty](target[config.editorProperty].item);

                    // Based on updating flag call the corresponding operation and events
                    if (target.updating()) {
                        operations.update(function(data) {
                            events.updated(data);
                            events.saved(data);
                        });
                    } else {
                        operations.create(function(data) {
                            events.created(data);
                            events.saved(data);
                        });
                    }
                }
            }
        }

        // Creates a method that deletes the record with the id
        target.delete = function() {
            if (events.onDelete()) {
                operations.delete(events.deleted);
            }
        }
    });
});
