app.controller('OutdatedController', ['$scope', 'info',
    function ($scope, info) {
        $scope.message = info.message;
        $scope.title = info.title;
        $scope.donloadButton = info.download;
}]);