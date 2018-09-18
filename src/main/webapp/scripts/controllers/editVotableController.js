

angular.module('hotornot').controller('EditVotableController', function($scope, $routeParams, $location, flash, VotableResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.votable = new VotableResource(self.original);
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The votable could not be found.'});
            $location.path("/Votables");
        };
        VotableResource.get({VotableId:$routeParams.VotableId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.votable);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The votable was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.votable.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Votables");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The votable was deleted.'});
            $location.path("/Votables");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.votable.$remove(successCallback, errorCallback);
    };
    
    $scope.typeList = [
        "CELEBRITY",  
        "CAR"  
    ];
    
    $scope.get();
});