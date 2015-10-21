define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('simple-list-page', function(object) {
        // Get target object
        var target = object.target;
        // Set default config
        var config = {
            redirectNew: function() { return '' },
            redirectEdit: function(item) { return { name: '', config: {} } },
            delete: function(item, callback) { callback(item); },
            list: function(callback) { callback(item); },

            onNew: function() { return true; },
            onEdit: function(item) { return item; },
            onDelete: function(item) { return true; },
            onList: function() { return true; },
            listed: function() { return true; }
        }

        // Apply configuration
        $.extend(config, object.config);

        target.data = ko.observableArray();

        target.new = function() {
            if (config.onNew()) {
                var hashName = config.redirectNew();
                $$.redirectHash(hashName);
            }
        }

        target.edit = function(item) {
            var item = config.onEdit(item);
            if (item) {
                var redirect = config.redirectEdit(item);
                $$.redirectHash(redirect.name, redirect.config);
            }
        }

        target.delete = function(item) {
            if (config.onDelete(item)) {
                config.delete(item, function(data) {
                    target.list();
                });
            }
        }

        target.list = function() {
            if (config.onList()) {
                config.list(function() {
                    config.listed();
                });
            }
        }
    });
});
