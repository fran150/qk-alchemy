define(['quark', 'knockout', 'quark-testing-helper'], function($$, ko, Helper) {
    var helper = new Helper({});

    describe('al-switch Tests', function() {
        beforeAll(function(done) {
            helper.load('switch', done);
        })

        afterAll(function() {
            helper.reset();
        });
    });
});
