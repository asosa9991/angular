var playersApp = angular.module('playersApp', ['ngResource']);

playersApp.controller('playersController', ['$scope','$resource',function ($scope,$resource) {

var Player = $resource('/api/players');

Player.query(function(results){
$scope.players=results;
});

  $scope.players=[];
  
  $scope.createPlayer = function(){
  var player = new Player();
  player.name = $scope.playerName;
  player.$save(function(result){
  $scope.players.push(result);
  $scope.playerName='';
  });
  };
  
}]);
