(function() {
  angular.module('sigfig')
  /**
   * @ngdoc service
   * @name Sigfig.CompanyFactory
   * @description Company Factory.
   */
    .factory('CompanyFactory', function(Restangular) {

      var service = {
        getCompanies: getCompanies,
        setCompanies: setCompanies,
      }

      return service;

      /**
       *  @ngdoc function
       *  @name getCompanies
       *  @methodOf Sigfig.getCompanies
       *  @description Gets all the companies
       */
      function getCompanies(id) {
        if(typeof id === 'undefined') {
          return Restangular.all("companies").getList();
        } else {
          return Restangular.one("companies/"+id).get();
        }
      }

      /**
       *  @ngdoc function
       *  @name setCompanies
       *  @methodOf Sigfig.setCompanies
       *  @description Sets all the companies
       */
      function setCompanies(company) {
        if(company.companyId){

        } else {
          var companies = Restangular.all("companies");
          var postInfo = companies.post(company);
          return postInfo;
        }
      }
    });
})()