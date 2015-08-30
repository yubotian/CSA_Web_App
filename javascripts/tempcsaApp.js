//var app = angular.module('csaApp', []);

var app = angular.module('csaApp', ['ngRoute', 'ngResource']).run(function($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  $rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };
});




app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: '../index.html',
      controller: 'mainCtrl'
    })
    //the login display
    .when('/login', {
      templateUrl: '../login.html',
      controller: 'authCtrl'
    })
    //the signup display
    .when('/register', {
      templateUrl: '../register.html',
      controller: 'authCtrl'
    });
});




app.controller('newsCtrl', function($scope){
	$scope.posts = [];
	$scope.newPost = {created_by: '', text: '', created_at: ''};
	
	$scope.post = function(){
		$scope.newPost.created_at = Date.now();
		$scope.posts.push($scope.newPost);
		$scope.newPost = {created_by: '', text: '', created_at: ''};
	};
}); 

app.controller('authCtrl', function($scope){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
		$scope.error_message = 'login request for ' + $scope.user.username;
	};

	$scope.register = function(){
		$scope.error_message = 'registeration request for ' + $scope.user.username;
	};
});