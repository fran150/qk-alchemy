define(['quark', 'knockout', 'quark-testing-helper'], function($$, ko, Helper) {
    var helper = new Helper({});

    describe('al-switch Tests', function() {
        beforeAll(function(done) {
            helper.load('switch', done);
        })

        afterAll(function() {
            helper.reset();
        });

        it('must contain the correct message', function() {
            var model = helper.models.SwitchComponent;

            expect(model.message).toBe("This is a switch component");
        });
    });
});
