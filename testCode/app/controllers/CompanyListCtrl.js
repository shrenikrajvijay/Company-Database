(function() {
  'use strict';

  angular
    .module('sigfig')
    .controller('CompanyListCtrl', CompanyListCtrl);

  CompanyListCtrl.$inject = [ '$scope', 'CompanyFactory', '$rootScope', '$location']

  /**
   * @ngdoc controller
   * @name Sigfig.controller:CompanyListCtrl
   * @description
   * # CompanyListCtrl Controller.
   */
  function CompanyListCtrl($scope, CompanyFactory, $rootScope, $location) {
    /**
     *  @ngdoc function
     *  @name getCompanyList
     *  @methodOf Sigfig.controller:getCompanyList
     *  @description getCompanyList function is used to log in the user once the username is provided.
     */
    $scope.getCompanyList = function() {
      CompanyFactory.getCompanies().then(function (data) {
        $scope.companies = data;
      });
    }

    $scope.getCompanyList();


    $rootScope.$on("companies updated", function() {
      $scope.getCompanyList();
    })

    /**
     *  @ngdoc function
     *  @name getCompanyList
     *  @methodOf Sigfig.controller:editCompany
     *  @param {String} companyid Id of the company.
     *  @description editCompany is used to edit the company details
     */
    $scope.editCompany = function(companyid){
      $location.path('companies/'+companyid)
    }
  }
})()