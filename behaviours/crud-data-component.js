define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('crud-data-component', function(object) {
        // Get target object
        var target = object.target;
        var url = object.url;
        var params = object.params;
        var text = {
            create: 'Guardando...',
            read: 'Cargando Registro...',
            update: 'Guardando...',
            delete: 'Eliminando...'
        }

        // Apply configuration
        $.extend(text, object.text);

        $$.parameters({
            $item: ko.observable()
        }, params, target);

        target.create = function(callback) {
            ko.tryBlock(target.$item, 'Guardando...');
            $$.ajax(url, 'POST', ko.mapToJS(target.$item), {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    ko.tryUnblock(target.$item);
                }
            });
        }

        target.read = function(id, callback) {
            ko.tryBlock(target.$item);
            $$.ajax(url + '/' + id, 'GET', {}, {
                onSuccess: function(data) {
                    target.$item(ko.mapFromJS(data));
                    $$.call(callback, data);
                },
                onComplete: function() {
                    ko.tryUnblock(target.$item);
                }
            });
        }

        target.update = function(id, callback) {
            ko.tryBlock(target.$item, 'Guardando...');
            $$.ajax(url + '/' + id, 'PUT', ko.mapToJS(target.$item), {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    ko.tryUnblock(target.$item);
                }
            });
        }

        target.delete = function(id, callback) {
            $$.ajax(url + '/' + id, 'DELETE', {}, {
                onSuccess: function(data) {
                    $$.call(callback, data);
                }
            });
        }
    });
});
