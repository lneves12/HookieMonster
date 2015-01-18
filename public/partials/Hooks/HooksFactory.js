'use strict';

/* Services */

appServices.factory('HooksFactory', ['$http', '$filter', function($http, $filter){

  //create the script and afterwards downloads it
  function bogusRequest(data){
    return $http({
      method: 'GET',
      url: '/bogusRequest',
      data: data
    });
  }

  return {
    bogusRequest: bogusRequest
  }
}]);
