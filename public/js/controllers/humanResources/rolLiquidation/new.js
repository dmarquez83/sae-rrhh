'use strict';
angular.module('app').controller('RolLiquidationCtrl', [
  '$scope',
  '$modal',
  'server',
  function ($scope, server) {

    $scope.openDptoEmployeModal = function () {
      var modalInstance = $modal.open({
        templateUrl: '../../views/humanResources/rolLiquidation/dptoEmployeSelections.html',
        controller: 'RolLiquidationCtrl',
        size: 'lg',
        resolve: {
          Id_Depart: function() //scope del modal
          {
            //console.log($scope.massiveBonus.department_id);
            return $scope.rolLiquidation.department_id;

          }
        }
      });
      modalInstance.result.then(function () {
        $window.location.reload();
      });
    };

    $scope.openPreLiquidarModal = function () {
      var modalInstance = $modal.open({
        templateUrl: '../../views/humanResources/rolLiquidation/employePreLiquidados.html',
        controller: 'RolLiquidationCtrl',
        size: 'lg',
        resolve: {
          Id_Depart: function() //scope del modal
          {
            //console.log($scope.massiveBonus.department_id);
            return $scope.rolLiquidation.department_id;

          }
        }
      });
      modalInstance.result.then(function () {
        $window.location.reload();
      });
    };

    handlePanelAction();
  }
]);
