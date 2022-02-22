(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    // MenuItemsController.$inject = ['menuItems'];
    // function MenuItemsController(menuItems) {
    //   var $ctrl = this;
    //   $ctrl.menuItems = menuItems;
    // }
    SignUpController.$inject = ['UserPreferenceService', '$scope', '$http']
    function SignUpController(UserPreferenceService, $scope, $http) {
        var $ctrl = this;
        $ctrl.completed = false;
        $ctrl.reg = {
            firstName : '',
            lastName: '',
            email: '',
            menuNum: ''
            
        }
        $ctrl.clearForm = function() {
            $ctrl.reg = {
                firstName : '',
                lastName: '',
                email: '',
                menuNum: ''
                
            };
            // $scope.regForm.$setPristine();
            $scope.regForm.$setUntouched();
        };
        $ctrl.submit = async function () {
            $ctrl.noSuchMenu = '';
            var menu_items = await $ctrl.retMenuItem($ctrl.reg.menuNum);
            if(menu_items === false) {
                $ctrl.noSuchMenu = "No such menu number exists";
                $ctrl.clearForm();
                return;
            }
            console.log(menu_items);
            UserPreferenceService.preference = $ctrl.reg;
            UserPreferenceService.preference.menu_items = menu_items;
            $ctrl.test = UserPreferenceService.preference;
            $ctrl.clearForm();
            $ctrl.completed = true;
            
        };
        $ctrl.retMenuItem = function(short_name) {
            var response = $http({
                method: "GET",
                url:  ("https://ramchandra-fscourse.herokuapp.com/menu_items/" + short_name + '.json')
            }).then(res=>res.data, res=>false);
            return response;
        }
        // console.log($ctrl.reg)

    }
    
    })();
    