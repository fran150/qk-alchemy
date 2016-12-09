define(['quark', 'jquery', 'quark-testviewloader'], function($$, $, Loader) {
    var loader = new Loader();

    describe('al-switch tests', function() {
        beforeAll(function(done) {
            loader.load('switch', done);
        });

        afterAll(function() {
            loader.reset();
        });

        it('Must enable and disable via code', function() {
            var model = loader.models.switch;

            var foundElements;

            expect(model.disabled()).toBe(false);
            foundElements = $(loader.testArea).find('.bootstrap-switch-disabled');
            expect(foundElements.length).toBe(0);

            model.disabled(true);
            expect(model.disabled()).toBe(true);
            foundElements = $(loader.testArea).find('.bootstrap-switch-disabled');
            expect(foundElements.length).toBe(1);

            model.disabled(false);
            expect(model.disabled()).toBe(false);
        });

        it('Must check and uncheck via code', function() {
            var model = loader.models.switch;

            var foundElements;

            expect(model.checked()).toBe(false);
            foundElements = $(loader.testArea).find('.bootstrap-switch-off');
            expect(foundElements.length).toBe(1);

            model.checked(true);
            expect(model.checked()).toBe(true);
            foundElements = $(loader.testArea).find('.bootstrap-switch-on');
            expect(foundElements.length).toBe(1);
        });
    });

});
