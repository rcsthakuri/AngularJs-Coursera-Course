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
        NarrowDownCtrl.findItems = async function () {
                if(!NarrowDownCtrl.SearchTerm) {
                    NarrowDownCtrl.foundItems = []
                    NarrowDownCtrl.showNoFound = true;
                    return;
                }
                NarrowDownCtrl.foundItems = await MenuSearchService.getMatchedMenuItems(NarrowDownCtrl.SearchTerm);
                console.log(NarrowDownCtrl.foundItems, NarrowDownCtrl.SearchTerm);
             
                NarrowDownCtrl.checkResult();
        }

        NarrowDownCtrl.checkResult = function () {
            if (!NarrowDownCtrl.foundItems.length) {
                NarrowDownCtrl.showNoFound = true
            }
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