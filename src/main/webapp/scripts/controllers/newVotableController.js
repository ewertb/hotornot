
angular.module('hotornot').controller('NewVotableController', function ($scope, $location, locationParser, flash, VotableResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.votable = $scope.votable || {};
    
    $scope.typeList = [
        "CELEBRITY",
        "CAR"
    ];
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The votable was created successfully.'});
            $location.path('/Votables');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        VotableResource.save($scope.votable, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Votables");
    };
});