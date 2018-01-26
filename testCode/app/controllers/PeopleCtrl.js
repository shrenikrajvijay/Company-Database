(function() {
  'use strict';

  angular
    .module('sigfig')
    .controller('PeopleCtrl', PeopleCtrl);

  PeopleCtrl.$inject = [ '$scope', 'CompanyFactory', 'PersonFactory', '$routeParams', '$location', '$rootScope', '$timeout']

  /**
   * @ngdoc controller
   * @name Sigfig.controller:PeopleCtrl
   * @description
   * # PeopleCtrl.
   */
  function PeopleCtrl($scope, CompanyFactory, PersonFactory, $routeParams, $location, $rootScope, $timeout) {

    CompanyFactory.getCompanies($routeParams.id).then(function(data){
      $scope.company = data.name
    }, function(error){
      console.log(error)
    })

    /**
     *  @ngdoc function
     *  @name getPeople
     *  @methodOf Sigfig.controller:getPeople
     *  @description getPeople function is used to get selected person.
     */
    $scope.getPeople = function(){
      PersonFactory.getPeople($routeParams.id).then(function(data){
        $scope.people = data;
      }, function(error){
        console.log(error)
      })
    }

    $scope.getPeople();

    /**
     *  @ngdoc function
     *  @name deletePerson
     *  @methodOf Sigfig.controller:deletePerson
     *  @description deletePerson function is used to delete a person.
     */
    $scope.deletePerson = function(personid){
      PersonFactory.deletePerson(personid).then(function(){
        $scope.getPeople()
        $rootScope.successMessage = "Company deleted successfully";
        $rootScope.successMessagebool = true;
        $timeout(function () {
          $rootScope.successMessagebool = false;
        }, 1000);
      }, function(){

      })
    }

    $scope.editPerson = function(personid){
      $location.path('person/'+personid)
    }

    $rootScope.$on("people updated", function() {
      $scope.getPeople();
    })
  }
})()