define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('list-data-component', function(object) {
        // Get target object
        var target = object.target;
        var url = object.url;
        var params = object.params;
        var text = {
            list: 'Cargando Registros...'
        }

        // Apply configuration
        $.extend(text, object.text);

        if (!target.blocker) {
            $$.parameters({
                blocker: ko.observable()
            }, params, target);
        }

        $$.parameters({
            $list: ko.observableArray()
        }, params, target);

        target.list = function(page, size, callback) {
            target.blocker(text.list);

            if ($$.isInt(page) && $$.isInt(size)) {
                url += '?page=' + page & '&size=' + size;
            }

            $$.ajax(url, 'GET', {}, {
                onSuccess: function(data) {
                    target.$list(ko.mapFromJS(data));
                    $$.call(callback, data);
                },
                onComplete: function() {
                    target.blocker('');
                }
            });
        }

    });
});
