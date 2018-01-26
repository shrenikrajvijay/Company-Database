(function() {
  'use strict';

  angular
    .module('sigfig')
    .controller('EditPersonCtrl', EditPersonCtrl);

  EditPersonCtrl.$inject = [ '$scope', 'CompanyFactory', 'PersonFactory', '$routeParams', '$rootScope', '$timeout', '$window']

  /**
   * @ngdoc controller
   * @name Sigfig.controller:EditPersonCtrl
   * @description
   * # EditPersonCtrl.
   */
  function EditPersonCtrl($scope, CompanyFactory, PersonFactory, $routeParams, $rootScope, $timeout, $window) {

    CompanyFactory.getCompanies().then(function(data){
      $scope.companies = data;
    });

    PersonFactory.getPerson($routeParams.id).then(function(data){
      if(data) {
        $scope.data = data;
      } else {
        $scope.data = {}
      }
    }, function (error) {
      console.log(error)
    })

    /**
     *  @ngdoc function
     *  @name updatePerson
     *  @methodOf mychat.controller:updatePerson
     *  @description updatePerson function is used to update person details/create new person.
     */
    $scope.updatePerson = function(){
      if(typeof $scope.data.put !== 'undefined') {
        $scope.data.companyId = $scope.data.companyId._id;
        $scope.data.put().then(function () {

          $rootScope.successMessage = "Person updated successfully";
          $rootScope.successMessagebool = true;
          $timeout(function () {
            $rootScope.successMessagebool = false;
          }, 1000);

          $window.history.back();

        }, function () {
          console.log("update failed")
        })
      } else {
        var person = {
          'name': $scope.data.name,
          'companyId' : $scope.data.companyId,
          'email': $scope.data.email
        }
        PersonFactory.createNewPerson(person).then(function(){
          var listener = $rootScope.$broadcast("people updated")
          $scope.data.name = "";
          $scope.data.email = "";
          $scope.data.companyId = "";
          $scope.$on('$destroy', function(){
            listener();
          })

          $rootScope.successMessage = "Person added successfully";
          $rootScope.successMessagebool = true;
          $timeout(function () {
            $rootScope.successMessagebool = false;
          }, 1000);

        }, function(error){
          console.log(error)
        })
      }
    }

  }
})()