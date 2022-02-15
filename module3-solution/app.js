//IIFE
(function () {
    angular.module("NarrowItDownApp", [])
    .controller("NarrowDownController", NarrowDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItems);

    NarrowDownController.$inject = ["MenuSearchService", "$timeout"];
    function NarrowDownController(MenuSearchService, $timeout) {
        NarrowDownCtrl = this;
        NarrowDownCtrl.foundItems = [];
        NarrowDownCtrl.showNoFound = false;
        // NarrowDownCtrl.wait = MenuSearchService.wait
        console.log(NarrowDownCtrl.wait);
        NarrowDownCtrl.findItems = function () {
            $timeout(
                function () {
                if(!NarrowDownCtrl.SearchTerm) {
                    NarrowDownCtrl.foundItems = []
                    return 
                }
                NarrowDownCtrl.foundItems = MenuSearchService.getMatchedMenuItems(NarrowDownCtrl.SearchTerm);
                console.log(NarrowDownCtrl.foundItems, NarrowDownCtrl.SearchTerm);
             }, 1000);
             NarrowDownCtrl.checkResult();
        }

        NarrowDownCtrl.checkResult = function () {
            $timeout(
                function() {
                    if (!NarrowDownCtrl.foundItems.length) {
                         NarrowDownCtrl.showNoFound = true
                    }
             }, 6000);
        }
        
        NarrowDownCtrl.removeItem = function (index) {
            NarrowDownCtrl.foundItems.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ["$http"];
    function MenuSearchService($http) {
        var service = this;
        var description;
        service.wait = {status: true};
        service.getMatchedMenuItems = function(searchTerm) {
            service.foundItems = [];
            var response = $http({
                method: "GET",
                url:  ("https://davids-restaurant.herokuapp.com/menu_items.json")
            });
            response.then(function (result) {
                console.log(result.data.menu_items);
                for (let i = 0; i < result.data.menu_items.length; i++)
                {
                    description = result.data.menu_items[i].description.toLowerCase();
                    if (description.includes(searchTerm.toLowerCase())) {
                        service.foundItems.push(result.data.menu_items[i]);
                    }
                }
            }
            );
            service.wait = true;
            return service.foundItems;
        };
    }
    function FoundItems() {
        var ddo = {
            templateUrl: "foundItems.html",
        };
        return ddo;
    }

    
})();