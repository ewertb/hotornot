'use strict';

angular.module('hotornot',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/Votables',{templateUrl:'views/Votable/search.html',controller:'SearchVotableController'})
      .when('/Votables/new',{templateUrl:'views/Votable/detail.html',controller:'NewVotableController'})
      .when('/Votables/edit/:VotableId',{templateUrl:'views/Votable/detail.html',controller:'EditVotableController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {

  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
