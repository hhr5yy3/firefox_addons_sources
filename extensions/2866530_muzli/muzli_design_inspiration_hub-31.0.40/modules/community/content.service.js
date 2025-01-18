angular.module('community').factory('contentService', ['$q', '$http',
    function ($q, $http) {

        // TODO get API url from config
        var muzliApiUrl = window.MUZLI_SERVER;

        // API METHODS
        return {

            //MUZLI API
            submitItem: function(item) {
                return $http.post(muzliApiUrl + '/community/submit', {
                    link: item.link,
                    ownContent: item.ownContent,
                }).then(function(response) {
                    return response.data
                })
            }, 

        }

    }
]);


