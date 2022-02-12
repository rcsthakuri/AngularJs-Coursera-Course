//IIFE
(function (){
    "use strict";
    angular.module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);
    
    LunchCheckController.inject = ["$scope"];

    function LunchCheckController($scope) {
        $scope.noDataMessage;
        $scope.feedBackMessage;
       
        $scope.check = function () {
            
            //Check for empty (empty string or string with just space)
            if (!$scope.lunchMenu) {
                $scope.feedBackMessage = "";
                $scope.noDataMessage = "Please enter data first";
            }
            else {
                //Work Flow - spliting with delmiter ',' -> applying array filter with builtin -
                // function `Boolean` to remove empty string
                $scope.noDataMessage = "";
                var splitLunchMenu = $scope.lunchMenu.split(",").filter(Boolean);
                if (splitLunchMenu.length <= 3) {
                    $scope.feedBackMessage = "Enjoy!";
                }
                else
                {
                    $scope.feedBackMessage = "Too much!";
                }
            }
         };
    }
})();