define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {
    ko.components.register('nav-bar', { require: 'pages/nav-bar/nav-bar' });
    ko.components.register('home-page', { require: 'pages/home-page/home' });

    // bower:components
    // endbower

    ko.components.register('datepicker-page', { require: 'areas/datepicker-page/datepicker-page' });

    // [Scaffolded areas will be inserted here. To retain this feature, don't remove this comment.]

    ko.components.register('al-datepicker', { require: 'components/datepicker/datepicker' });
    ko.components.register('al-panel-collapsable', { require: 'components/panel/collapsable' });
    ko.components.register('al-select-with-id', { require: 'components/select/with-id' });
    ko.components.register('al-sidebar', { require: 'components/sidebar/sidebar' });
    ko.components.register('al-sidebar-imagebutton', { require: 'components/sidebar/controls/imagebutton' });
    ko.components.register('al-sidebar-link', { require: 'components/sidebar/controls/link' });
    ko.components.register('al-sidebar-search', { require: 'components/sidebar/controls/search' });
    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application
    ko.applyBindings({ route: router.currentRoute });
});
