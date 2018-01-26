(function() {
  'use strict';

  angular
    .module('sigfig')
    .controller('EditCompanyCtrl', EditCompanyCtrl);

  EditCompanyCtrl.$inject = [ '$scope', 'CompanyFactory', 'PersonFactory', '$routeParams', '$rootScope', '$timeout']

  /**
   * @ngdoc controller
   * @name Sigfig.controller:EditCompanyCtrl
   * @description
   * # EditCompanyCtrl.
   */
  function EditCompanyCtrl($scope, CompanyFactory, PersonFactory, $routeParams, $rootScope, $timeout) {

    /**
     *  @ngdoc function
     *  @name getCompanies
     *  @methodOf Sigfig.controller:getCompanies
     *  @description getCompanies function is used to get list of all the companies
     */
    var getCompanies = function(){
      if($routeParams.id) {
        CompanyFactory.getCompanies($routeParams.id).then(function (data) {
          $scope.data = data;
        }, function (error) {
          console.log(error)
        })
      } else {
        $scope.data = {}
      }
    }

    getCompanies();

    /**
     *  @ngdoc function
     *  @name updateCompany
     *  @methodOf Sigfig.controller:updateCompany
     *  @description updateCompany function is used to update/create company.
     */
    $scope.updateCompany = function(){
      if(typeof $scope.data.put !== 'undefined') {
        $scope.data.put().then(function () {

          $rootScope.successMessage = "Company updated successfully";
          $rootScope.successMessagebool = true;
          $timeout(function () {
            $rootScope.successMessagebool = false;
          }, 1000);

        }, function () {
          console.log("update failed")
        })
      } else {
        var company = {
          "name" : $scope.data.name,
          "address" : $scope.data.address,
          "revenue" : $scope.data.revenue,
          "phone" : $scope.data.phone
        }
        CompanyFactory.setCompanies(company).then(function(){
          var listener = $rootScope.$broadcast("companies updated")
          $scope.data.name = ""
          $scope.data.address = ""
          $scope.data.revenue = ""
          $scope.data.phone = ""

          $scope.$on('$destroy', function(){
            listener();
          })

          $rootScope.successMessage = "Company added successfully";
          $rootScope.successMessagebool = true;
          $timeout(function () {
            $rootScope.successMessagebool = false;
          }, 1000);

        }, function() {
          console.log("error")
        });
      }
    }

  }
})()