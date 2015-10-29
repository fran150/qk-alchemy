define(['knockout', 'quark', 'text!./history.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        // Item con el resultado
        $$.parameters({
            store: ko.observable(),
            maxLength: ko.observable(10),
            $list: ko.observableArray()
        }, params, this);

        // Lee la clave especificada y transforma el valor en un objeto
        this.read = function() {
            var json = localStorage.getItem(self.store());
            var item = JSON.parse(json);
            self.$list(item);
        }

        // Convierte el item a json y lo guarda en la clave especificada
        function save() {
            var json = JSON.stringify(self.$list());
            localStorage.setItem(self.store(), json);
        }

        this.add = function(key, name, data) {
            self.read();

            var items = self.$list() || [];
            var current = $$.routing.current();

            var newItem = {
                key: key,
                name: name,
                routeName: current.route.fullName,
                params: current.params,
                data: data
            }

            var actualizando = false;

            for (var index in items) {
                if (items[index].key == key) {
                    items[index] = newItem;
                    actualizando = true;
                }
            }

            if (!actualizando) {
                if (items.length < self.maxLength()) {
                    items.push(newItem);
                } else {
                    items.shift();
                    items.push(newItem);
                }
            }

            self.$list(items);
            save();
        }

        this.clear = function() {
            localStorage.removeItem(self.store());
            self.$list([]);
        }
    }, template);
});
