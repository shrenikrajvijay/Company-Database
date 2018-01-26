(function() {
  'use strict';
  /**
   * @ngdoc overview
   * @name Sigfig
   * @description
   * # Sigfig
   *
   * Sigfig app is a cool Company and employee tracker application.
   **/
  angular
    .module('sigfig', [
      'ngRoute', 'restangular', 'ngAnimate'
    ])
    .config(routeProvider)

  routeProvider.$inject = ['$routeProvider']

  function routeProvider($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/company_list.html'
      })
      .when('/companies/:id/people', {
        templateUrl: 'views/partials/people.html',
      })
      .when('/person/:id', {
        templateUrl: 'views/partials/edit_person.html',
      })
      .when('/companies/:id', {
        templateUrl: 'views/partials/edit_company.html',
      })
      .otherwise({
        redirectTo: '/'
      })
  };
})()