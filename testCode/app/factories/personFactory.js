(function() {
  angular.module('sigfig')
  /**
   * @ngdoc service
   * @name Sigfig.PersonFactory
   * @description Person Factory.
   */
    .factory('PersonFactory', function(Restangular) {

      var service = {
        createNewPerson : createNewPerson,
        getPeople : getPeople,
        getPerson : getPerson,
        deletePerson : deletePerson
      }

      return service;

      /**
       *  @ngdoc function
       *  @name createNewPerson
       *  @methodOf Sigfig.createNewPerson
       *  @param {person} person
       *  @description Get new person.
       */
      function createNewPerson(person) {
        console.log(person)
        var Person = Restangular.all("person")
        var postInfo = Person.post(person)
        return postInfo;
      }

      /**
       *  @ngdoc function
       *  @name getPeople
       *  @methodOf Sigfig.getPeople
       *  @param {companyId} companyId
       *  @description Get all people.
       */
      function getPeople(companyId) {
        var people = Restangular.all("companies/"+companyId+"/people").getList()
        return people;
      }

      /**
       *  @ngdoc function
       *  @name getPerson
       *  @methodOf Sigfig.getPerson
       *  @param {personId} personId
       *  @description Get a single person.
       */
      function getPerson(personId) {
        return Restangular.one("person/"+personId).get()
      }

      /**
       *  @ngdoc function
       *  @name deletePerson
       *  @methodOf Sigfig.deletePerson
       *  @param {personId} personId
       *  @description Delete a single person.
       */
      function deletePerson(personId) {
        return Restangular.one("person/"+personId).get().then(function(user){
          return user.remove();
        })
      }

    });
})()