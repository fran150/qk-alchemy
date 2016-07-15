define(['knockout', 'quark', 'text!./search.html'], function(ko, $$, template) {
    // Campo de busqueda en el sidebar
    return $$.component(function(params, $scope) {
        var self = this;

        // Parametros del componente
        $$.parameters({
            // Texto ingresado en el campo de busqueda
            text: ko.observable(''),
            // Se dispara al hacer click en el boton buscar
            onSearch: function(texto) {}
        }, params, [this, $scope]);

        // Al hacer clic en el boton buscar invoca al evento con el texto ingresado
        $scope.search = function() {
            $$.call(self.onSearch, self.text());
        };
    }, template);
});
