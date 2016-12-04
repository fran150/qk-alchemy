define(['quark', 'jquery', 'knockout'], function($$, $, ko) {
    function Loader() {
        var self = this;

        var body = $(document).find('body');
        var test;

        // Callback when loading is done
        var done = function() {};

        this.models = {};

        // Main imports object
        this.$imports = $$.tracker();


        $$.wait(self.$imports.ready, function(name) {
            done();
        });

        var listener = self.$imports.readied.add(function(name, model) {
            self.models[name] = model;
        });

        // Call to load component
        this.load = function(view, callback) {
            // Save the callback
            done = callback;

            // Add a new div to the body
            test = $('<div></div>').appendTo(body);

            // Load the required view
            require(['text!./views/' + view + '.html'], function(template) {
                test.append(template);

                ko.applyBindings(self, test.get(0));
            });
        }

        this.reset = function() {
            ko.cleanNode(test.get(0));
            $(test).remove();
            self.$imports.reset();
            self.models = {};
            $$.wait(self.$imports.ready, function(name) {
                done();
            });
        }
    }

    var loader = new Loader();

    describe('al-layout tests', function() {
        afterEach(function() {
            loader.reset();
        });

        it('Must set properties of hasNavbar and hasSidebar to false when those controls are NOT added as content', function(ready) {
            loader.load('layout', function() {
                var layout = loader.models.layout;

                expect(layout.hasNavbar()).toBe(false);
                expect(layout.hasSidebar()).toBe(false);

                ready();
            });
        });

        it('Must set properties of hasNavbar and hasSidebar to true when those controls ARE added as content', function(ready) {
            loader.load('full-layout', function() {
                var layout = loader.models.layout;

                expect(layout.hasNavbar()).toBe(true);
                expect(layout.hasSidebar()).toBe(true);

                ready();
            });
        });
    });

});
