(function () {
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController,)
    .component('items', {
        templateUrl: 'items.template.html',
        
        bindings: {
            items: '<',
            categoryShortName: '<'
        }
    });
    
    ItemsController.$inject = ['$stateParams', 'category', 'MenuDataService', 'items'];
    function ItemsController($stateParams, category, MenuDataService, items) {
        var $ctrl = this; 
        var item = category.data[$stateParams.itemId]; 
        // $ctrl.item = category.data[$index];
        $ctrl.items = item;
        $ctrl.categoryShortName = item.short_name;
        // $ctrl.categoryShortName);
        $ctrl.items = items.data.menu_items;
        console.log($ctrl.items);
    }
})();