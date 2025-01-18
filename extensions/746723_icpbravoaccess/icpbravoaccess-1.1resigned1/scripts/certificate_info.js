app.controller('CertificateController', ['$scope', '$window', '$uibModalInstance', 'cert', 'icpBravoAccessExt', 'uibModal', function ($scope, $window, $uibModalInstance, cert, icpBravoAccessExt, uibModal) {

    $scope.Certificate = cert;
    $scope.certType = ["Desconhecido", "ICPBrasil"];
    $scope.selected_tab = 'info';
    $scope.SiteList = [];

    $scope.init = function(){
        chrome.storage.sync.get(null, function (result) {
            $scope.SiteList = result[cert.thumbprint];
        });
    }

    $scope.close = function () {
        $uibModalInstance.close();
    };

    //$scope.adicionaSite = function () {
    //    var site = document.getElementById("myTextarea").value;

    //    chrome.storage.sync.get(null, function (result) {
    //        var list = result[cert.thumbprint];
    //        if (!list) {
    //            list = new Array();
    //        }
    //        list.push(site);
    //        var obj = new Object();
    //        obj[cert.thumbprint] = list;
    //        chrome.storage.sync.set(obj);
    //        $scope.SiteList = list;
    //    });
    //}

    //$scope.atualizaSites = function () {
    //    chrome.storage.sync.get(null, function (result) {
    //        $scope.SiteList = result[cert.thumbprint];
    //    });
    //}

    $scope.removeWebSite = function (site) {
        content = {
            title: "Confirmação",
            message: "Tem certeza que deseja remover o site " + site + " da lista de sites confiáveis?",
            okButton: "Sim",
            cancelButton: "Não",
        }
        var modalConfirmationInstance = uibModal.open({
            animation: true,
            controller: 'ConfirmDialog',
            templateUrl: 'views/confirm_dialog.html',
            size: 'sm',
            resolve: {
                content: content,
            }
        });

        modalConfirmationInstance.result.then(function (response) {
            if (response) {
                chrome.storage.sync.get(cert.thumbprint, function (result) {
                    var list = result[cert.thumbprint];
                    var index = list.indexOf(site);
                    if (index > -1) {
                        list.splice(index, 1);

                        var obj = new Object();
                        obj[cert.thumbprint] = list;
                        chrome.storage.sync.set(obj);
                        
                    }
                    $scope.SiteList = list;
                });
            }
        });
    };

    $scope.removeCertificate = function () {
        content = {
            title: "Confirmação",
            message: "Tem certeza que deseja remover o certificado [ "+$scope.Certificate.subjectName+" ] do computador?",
            okButton: "Sim",
            cancelButton: "Não",
        }
        var modalConfirmationInstance = uibModal.open({
            animation: true,
            controller: 'ConfirmDialog',
            templateUrl: 'views/confirm_dialog.html',
            size: 'sm',
            resolve: {
                content: content,
            }
        });

        modalConfirmationInstance.result.then(function (response) {
            if (response) {
                icpBravoAccessExt.remove({
                    thumbprint: $scope.Certificate.thumbprint,
                    onSuccess: function (response) { $scope.onGetRemoveSuccess(response); },
                    onError: function (response) { alert(response.statusMessage); },
                });
            }                
        });
    };

    $scope.exportCertificate = function () {

        icpBravoAccessExt.getCertificate({
            thumbprint: $scope.Certificate.thumbprint,
            onSuccess: function (response) {
                var byteCharacters = atob(response.certificate);

                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                var blob = new Blob([byteArray], { type: "application/pkix-cert" });
                var blobUrl = $window.URL.createObjectURL(blob);

                var hiddenElement = document.createElement('a');
                hiddenElement.href = blobUrl;
                hiddenElement.target = '_blank';
                hiddenElement.download = $scope.Certificate.subjectName + '.cer';
                hiddenElement.click();
            },
            onError: function (error) { alert("error") },
        });
    };

    $scope.onGetRemoveSuccess = function (response) {
        $uibModalInstance.close(response);
    };
}]);