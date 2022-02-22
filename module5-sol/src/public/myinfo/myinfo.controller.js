(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    // MenuItemsController.$inject = ['menuItems'];
    // function MenuItemsController(menuItems) {
    //   var $ctrl = this;
    //   $ctrl.menuItems = menuItems;
    // }
    MyInfoController.$inject = ['UserPreferenceService'];
    function MyInfoController(UserPreferenceService) {
        var $ctrl = this;
        $ctrl.preference = UserPreferenceService.preference;
    }
    
    })();
    