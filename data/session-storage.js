define(['knockout', 'quark', 'text!./session-storage.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        // Item con el resultado
        $$.parameters({
            $item: ko.observable()
        }, params, this);

        // Lee la clave especificada y transforma el valor en un objeto
        this.read = function(key) {
            var json = sessionStorage.getItem(key);
            var item = JSON.parse(json);
            self.$item(item);
        }

        // Convierte el item a json y lo guarda en la clave especificada
        this.save = function(key) {
            var json = JSON.stringify(self.$item());
            sessionStorage.setItem(key, json);
        }

        this.delete = function(key) {
            sessionStorage.removeItem(key);
        }

    }, template);
});
