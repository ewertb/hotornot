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
  .controller('LandingPageController', function LandingPageController($scope, $http, $filter, VotableResource) {
      $scope.search={};
      $scope.currentPage = 0;
      $scope.pageSize= 10;
      $scope.searchResults = [];
      $scope.filteredResults = [];
      $scope.pageRange = [];
      $scope.numberOfPages = function() {
          var result = Math.ceil($scope.filteredResults.length/$scope.pageSize);
          var max = (result == 0) ? 1 : result;
          $scope.pageRange = [];
          for(var ctr=0;ctr<max;ctr++) {
              $scope.pageRange.push(ctr);
          }
          return max;
      };
      $scope.typeList = [
          "CELEBRITY",
          "CAR"
      ];
    $scope.filteredResults =  VotableResource.queryAll(function(){
        $scope.filteredResults = $filter('searchFilter')($scope.filteredResults, $scope);
    });

    $scope.upvote = function(votable) {
        votable.votes += 1;
        VotableResource.update(votable);
    }
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
