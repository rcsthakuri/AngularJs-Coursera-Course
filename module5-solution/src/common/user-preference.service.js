(function () {
    "use strict";
    
    angular.module('common')
    .service('UserPreferenceService', UserPreferenceService);

    function UserPreferenceService()
    {
        var service = this;
        service.preference;
    }



})();