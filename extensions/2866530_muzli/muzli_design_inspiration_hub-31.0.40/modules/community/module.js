(function() {

    function isValidURL(str) {
    
        var regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            
        if (regexp.test(str)) {
          return true;
        } else {
          return false;
        }
    }

    angular.module('community', []);

    angular.module('community').controller('contentController', ['$scope', 'contentService', 'trackService',
        function ($scope, contentService, trackService) {

            $scope.isLoading = false;
            $scope.item = {};
            $scope.displayError = false;

            $scope.submitItem = function(link) {

                trackService.track({
                    category: 'UGC',
                    action: 'Form Submit',
                });

                $scope.displayError = false;

                if (!$scope.item.link) {
                    $scope.displayError = 'Please provide a link';
                    return;
                }

                if (!isValidURL($scope.item.link)) {
                    $scope.displayError = 'The link seems broken. Could you double check it?';
                    return;
                }

                $scope.isLoading = true;

                contentService
                .submitItem($scope.item)
                .then(function(item) {

                    $scope.isLoading = false;

                    // Show generic error if it comes from the server
                    if (item.displayError) {
                        $scope.displayError = item.displayError;
                    }

                    if (item.badLink) {
                        $scope.displayError = 'Please provide a valid link';
                    }
                    
                    if (item.maxDailySubmissions) {
                        $scope.displayError = 'You have reached your daily submission limit.'
                    }

                    if (item.noImage) {
                        $scope.displayError = 'Sorry! We weren\'t able to fetch any image from this link.';
                    }

                    if (item.dribbbleProhibited) {
                        $scope.dribbbleProhibited = 'We\'re sorry but Dribbble links are not supported at this time.';
                    }

                    if (item.itemAlreadyExists) {
                        $scope.displayError = 'The link you provided already exists on Muzli, try another maybe?';
                        $scope.existingUrl = MUZLI_SEARCH_URL + '/' + btoa(item.itemId).slice(0,10);
                    }

                    if (item.id) {
                        window.location.href = MUZLI_SEARCH_URL + '/' + btoa(item.id).slice(0,10) + '?success=true';
                    }

                })
            };

    }]);

})();
