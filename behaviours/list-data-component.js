define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('list-data-component', function(object) {
        // Get target object
        var target = object.target;
        var url = object.url;
        var params = object.params;
        var text = {
            list: 'Cargando...'
        }

        // Apply configuration
        $.extend(text, object.text);

        $$.parameters({
            $list: ko.observableArray()
        }, params, target);

        target.list = function(page, size, callback) {
            ko.tryBlock(target.$list);

            if ($$.isInt(page) && $$.isInt(size)) {
                url += '?page=' + page & '&size=' + size;
            }

            $$.ajax(url, 'GET', {}, {
                onSuccess: function(data) {
                    target.$list(ko.mapFromJS(data));
                    $$.call(callback, data);
                },
                onComplete: function() {
                    ko.tryUnblock(target.$list);
                }
            });
        }

    });
});
