define(['quark', 'knockout', 'text!./pager.html'], function($$, ko, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        var pageSizeDefault = 5;

        $$.parameters({
            data: ko.observableArray(),
            pageSize: ko.observable(pageSizeDefault),
            page: ko.observable(0)
        }, params, this);

        this.recordCount = ko.pureComputed(function() {
            if ($$.isArray(self.data())) {
                return self.data().length;
            } else {
                return 0;
            }
        });

        this.pages = ko.pureComputed(function() {
            var count = self.recordCount();
            var pageSize = self.pageSize();

            return Math.floor(count / pageSize) + ((count % pageSize) != 0 ? 1 : 0);
        });

        this.pageData = ko.pureComputed(function() {
            var page = self.page();
            var pageSize = self.pageSize();
            var recordCount = self.recordCount();

            var start = page * pageSize;
            var end = start + pageSize;

            return self.data().slice(start, end);
        });

        $scope.pageArray = ko.pureComputed(function() {
            var pages = [];

            for (var i = 0; i < self.pages(); i++) {
                pages.push(i);
            }

            return pages;
        });

        $scope.setPage = function(page) {
            self.page(page);
        }

        $scope.next = function() {
            self.page(self.page() + 1);
        }

        $scope.previous = function() {
            self.page(self.page() - 1);
        }

        var subscriptions = {
            pageSize: self.pageSize.subscribe(function(newValue) {
                if (newValue == 0) {
                    self.pageSize(pageSizeDefault);
                }
            }),
            page: self.page.subscribe(function(newValue) {
                if (newValue < 0) {
                    self.page(0);
                }

                var pageSize = self.pages() - 1;

                if (newValue > pageSize) {
                    self.page(pageSize);
                }
            })
        }

        this.dispose = function() {
            subscriptions.pageSize.dispose();
            subscriptions.page.dispose();
        }

    }, template);
});
