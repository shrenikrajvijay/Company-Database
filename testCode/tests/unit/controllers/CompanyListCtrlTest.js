'use strict'

describe("Company List controller - ", () => {

  var $CompanyListCtrl;
  var $scope;
  var $location;

  beforeEach(module("sigfig"));

  beforeEach(inject(function($controller, $rootScope, _$location_){
    $scope = $rootScope.$new();
    $CompanyListCtrl = $controller("CompanyListCtrl", {$scope : $scope});
    $location = _$location_
  }))

  it("should redirect to correct path", () => {
    $scope.editCompany('123');
    expect($location.path()).toBe('/companies/123');
  })

});
