// Angular JS code
// declare to prevent console errors
var app = angular.module("AeroPreAlert", []);
app.controller('SignInFormController', ['$scope', function($scope) {
  $scope.number = /^(\d*)$/;
}]);
