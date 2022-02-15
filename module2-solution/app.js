//IFFE
(function (){

    var ShoppingList =  [
        { name : "MSI RTX 3080", quantity : 1},
        { name : "RE Himalayan 500 Black", quantity : 1},
        { name : "Kwiss Cheeseball", quantity : 5},
        { name : "Wai Wai Noodles", quantity : 10},
        { name : "Coca Cola Jombo", quantity : 2}

    ];

    angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOff);

    ToBuyController.inject = ["ShoppingListCheckOffService"];
    AlreadyBoughtController.inject = ["ShoppingListCheckOffService"];

    function ToBuyController(ShoppingListCheckOffService) {
        var ToBuyCtrl = this;
        ToBuyCtrl.ShoppingList = ShoppingListCheckOffService.ToBuyList;
        ToBuyCtrl.bought = function() {
            ShoppingListCheckOffService.OnBought(ToBuyCtrl.$index);
            console.log(ToBuyCtrl.ShoppingList);
        };

    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var AlreadyBoughtCtrl = this;
        AlreadyBoughtCtrl.BoughtList = ShoppingListCheckOffService.BoughtList;
    }
    
    function ShoppingListCheckOff() {
        this.ToBuyList = ShoppingList;
        this.BoughtList = [];
        this.OnBought = function(index) {
            var bought_item = this.ToBuyList.splice(index, 1)[0];
            this.BoughtList.push(bought_item);
        }
    }

})();