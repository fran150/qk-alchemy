/**
    @component Adds a pager to the specified content. It can be used to page any
    array on the browser. It exposes a pageData property with the data
    to show on the current page. The content can be bound to this property to show
    the information of a given page.
    @allowContent
*/
define([
    'quark',
    'knockout',
    'text!./pager.component.html'
], function($$, ko, template) {

    function PagerComponent(params, $scope, $imports) {
        var self = this;

        var pageSizeDefault = 10;

        $$.parameters({
            /**
                @parameter Array Data to page.
                @observable @exposed
            */
            data: ko.observableArray(),
            /**
                @parameter int The Max number of records to show on each page.
                @observable @exposed
            */
            pageSize: ko.observable(pageSizeDefault),
            /**
                @parameter int The zero index number of the current page
                @observable @exposed
            */
            page: ko.observable(0)
        }, params, this);

        /**
            @property int Total record count in the data parameter
            @computed
        */
        this.recordCount = ko.pureComputed(function() {
            if ($$.isArray(self.data())) {
                return self.data().length;
            } else {
                return 0;
            }
        });

        /**
            @property int Number of pages given the record count and the page size
            @computed
        */
        this.pages = ko.pureComputed(function() {
            var count = self.recordCount();
            var pageSize = self.pageSize();

            return Math.floor(count / pageSize) + ((count % pageSize) != 0 ? 1 : 0);
        });

        /**
            @property Array The data to show on the current page. The content can be
            bound to this property allowing to show only the data of the active page.
            @computed
        */
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

    }

    return $$.component(PagerComponent, template);
});
