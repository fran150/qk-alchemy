define(['quark', 'knockout'], function($$, ko) {
    function Utils() {
        var self = this;

        this.findContainer = function(context, type) {
            // Get the context container
            var container = context.$container;

            // If the container exists and is of the requested type return it
            if (container instanceof type) {
                return container;
            } else {
                // If there's a parent context search for the container type on it
                var parentContext = context.$parentContext;

                if (parentContext) {
                    return self.findContainer(parentContext, type);
                }
            }
        }

    }

    return new Utils();
});
