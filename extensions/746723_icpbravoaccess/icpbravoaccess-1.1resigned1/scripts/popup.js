var app = angular.module('IcpBravoAccessNgApp', ['blockUI', 'ui.bootstrap']);

app.filter('cpf', function () {
    return function (input) {
        var str = input + '';
        str = str.replace(/\D/g, '');
        str = str.replace(/(\d{3})(\d)/, "$1.$2");
        str = str.replace(/(\d{3})(\d)/, "$1.$2");
        str = str.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return str;
    };
});

app.filter('cnpj', function () {
    return function (input) {
        var str = input + '';
        str = str.replace(/\D/g, '');
        str = str.replace(/^(\d{2})(\d)/, '$1.$2');
        str = str.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        str = str.replace(/\.(\d{3})(\d)/, '.$1/$2');
        str = str.replace(/(\d{4})(\d)/, '$1-$2');
        return str;
    };

});

/**
* Add your Analytics tracking ID here.
*/
var _AnalyticsCode = 'UA-XXXXXX-X';

app.controller('popUpNgController', ['$scope', '$window', 'blockUI', '$timeout', '$uibModal',
    function ($scope, $window, blockUI, $timeout, $uibModal) {
        $scope.type = { current: 'Todos' };
        $scope.CertificatesList = [];
        timeOut = 0;        
        $scope.modalInstance = null;  

        $scope.onGetCertificateList = function (type) {
            if (type) {
                type = type.toLowerCase();

                if (type.search("icpbrasil") >= 0) {
                    $scope.type.current = 'ICPBrasil';
                } else if ((type.search("unknown") >= 0) || (type.search("desconhecidos") >= 0)) {
                    type = 'unknown';
                    $scope.type.current = 'Desconhecidos';
                } else {
                    $scope.type.current = 'Todos';
                }
            } else {
                $scope.type.current = 'Todos';
            }

            blockUI.start("Getting certificates...");
            icpBravoAccessExt.getCertificateList({
                filter: { type: type },
                onSuccess: function (response) {
                    $scope.onCertificatesLoaded(response);
                    $timeout(function () {
                        blockUI.stop();
                        if ($scope.modalInstance) {
                            $scope.modalInstance.close(response);
                            $scope.modalInstance = null;
                        }
                    }, 500);
                },
                onError: onError
            });
        }
        
        $scope.onLoad = function () {
            blockUI.start("Loading...");
            icpBravoAccessExt.connect({
                license: "",
                angular: $scope,
                onSuccess: function (response) {
                    $scope.onGetCertificateList(response);
                    blockUI.stop();
                },
                onError: onError,
                onNotInstalled: function (response) {
                    onNotInstalled(response);
                    blockUI.stop();
                }
            })
        }

        /* END ----------------------------------------- icpBravoAccessExt callers ----------------------------------------- */

        /* BEGIN ----------------------------------------- icpBravoAccessExt response dealers ----------------------------------------- */

        $scope.onCertificatesLoaded = function (response) {
            var certificates = response.certificates;
            $scope.CertificatesList = response.certificates;
        }

        function onNotInstalled(response) {

            $scope.modalInstance = $uibModal.open({
                animation: true,
                controller: 'OutdatedController',
                templateUrl: 'views/outdated.html',
                backdrop: 'static',
                size: 'sm',
                resolve: {
                    info: {
                        message: response.statusMessage,
                        title: response.info,
                        download: response.downloadRequired
                    }
                },
            });
        }

        function onError(response) {
            $scope.modalInstance = $uibModal.open({
                animation: true,
                controller: 'OutdatedController',
                templateUrl: 'views/outdated.html',
                backdrop: 'static',
                size: 'sm',
                resolve: {
                    info: {
                        message: response.statusMessage,
                        title: response.info,
                        download: response.downloadRequired
                    }
                },
            });

            blockUI.stop();
            return false;
        }
        /* END ----------------------------------------- icpBravoAccessExt response dealers ----------------------------------------- */


        $scope.certificateInfoModal = function (certificate) {

            var modalInstance = $uibModal.open({
                animation: true,
                controller: 'CertificateController',
                templateUrl: 'views/certificate_info.html',
                size: 'sm',
                resolve: {
                    cert: certificate,
                    icpBravoAccessExt: icpBravoAccessExt,
                    uibModal: $uibModal
                }
            });

            modalInstance.result.then(function (response) {
                if (response) {
                    $scope.onGetCertificateList($scope.type.current);
                }                
            });

        }

        $scope.authorizedSitesModal = function () {

            $uibModal.open({
                animation: true,
                controller: 'AuthorizedController',
                templateUrl: 'views/authorized_info.html',
                size: 'sm'
            });
        }

        $scope.redirectTo = function (url) {
            $window.open(url, '_blank');
        };

    }]);


