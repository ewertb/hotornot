angular.module('hotornot').factory('VotableResource', function($resource){
    var resource = $resource('rest/votables/:VotableId',{VotableId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});