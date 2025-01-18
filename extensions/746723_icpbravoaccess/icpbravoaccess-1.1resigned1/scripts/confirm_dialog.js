app.controller('ConfirmDialog', ['$scope', '$uibModalInstance', 'content', function ($scope, $uibModalInstance, content) {

    $scope.title = content.title ? content.title : "Confirmação";
    $scope.message = content.message ? content.message : "Tem certeza?";
    $scope.okButton = content.okButton ? content.okButton : "Ok";
    $scope.cancelButton = content.cancelButton ? content.cancelButton : "Cancelar";

    $scope.yes = function () {
        $uibModalInstance.close(true);
    };
    $scope.no = function () {
        $uibModalInstance.close(false);
    };
}]);