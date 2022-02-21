(function () {
    angular.module('MenuApp')
    .controller('categoriesController', categoriesController)
    .component('categories', {
        templateUrl: 'categories.template.html',
        bindings: {
            category: '<',
            // categoryShortName: ''
        }
    });    
    categoriesController.$inject = ['category', '$scope']
    function categoriesController(category, $scope) {
        var $ctrl = this;
        $ctrl.item;
        $ctrl.category = category.data;
        console.log($ctrl.category);
    
    }
})();