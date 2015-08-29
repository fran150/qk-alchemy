define(['jquery', 'knockout', './router', 'bootstrap', 'knockout-projections'], function($, ko, router) {
    ko.components.register('nav-bar', { require: 'components/pages/nav-bar/nav-bar' });
    ko.components.register('home-page', { require: 'components/pages/home-page/home' });

    // bower:components
    // endbower

    ko.components.register('datepicker-page', { require: 'components/areas/datepicker-page/datepicker-page' });

    // [Scaffolded areas will be inserted here. To retain this feature, don't remove this comment.]

    ko.components.register('al-datepicker', { require: 'components/alchemy/datepicker/datepicker' });
    ko.components.register('al-sidebar', { require: 'components/alchemy/sidebar/sidebar' });
    ko.components.register('al-sidebar-item', { require: 'components/alchemy/sidebar-item/sidebar-item' });
    ko.components.register('al-sidebar-search', { require: 'components/alchemy/sidebar-search/sidebar-search' });
    // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

    // Start the application
    ko.applyBindings({ route: router.currentRoute });
});
