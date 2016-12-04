define(['quark', 'quark-testviewloader'], function($$, Loader) {
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
