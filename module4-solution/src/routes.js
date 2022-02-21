(function () {
    
    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'src/templates/home.template.html'
        })

        .state('categories', {
            url: '/categories',
            templateUrl: 'src/templates/categories.template.html',
            controller: 'categoriesController as $ctrl',
            resolve: {
                category: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        .state('categories.item', {
            url: '/items/{itemId}',
            templateUrl: 'src/templates/items.template.html',
            controller: 'ItemsController as itemDetail',
            resolve: {
                items : ['$stateParams', 'MenuDataService', 'category', function ($stateParams, MenuDataService, category) {
                    //console.log(category.data[$stateParams.itemId]);
                    return MenuDataService.getItemsForCategory(category.data[$stateParams.itemId].short_name);
                }]

            }
            
        });
    }
})();