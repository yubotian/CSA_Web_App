var app = angular.module('csaApp', ['ngRoute', 'ngResource']).run(function($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = '';

  $rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };
});


app.factory('postService', function($resource){
  return $resource('/api/posts/:id');
});


app.controller('mainCtrl', function(){
});


app.controller ('newsCtrl' , function( $scope, $rootScope, postService ) {
	$scope.posts = postService.query();
	$scope.newPost = { event_time : '', event_title : '' , created_by : '' , created_location : '' , text : '' , created_time : '' } ; //TODO: picture


	$scope.post = function() {
    $scope.newPost.created_by = $rootScope.current_user;
    $scope.newPost.created_time = Date.now(); 

    postService.save($scope.newPost, function(){
      $scope.posts = postService.query();
      $scope.newPost = { event_time : '', event_title : '' , created_by: '' , created_location : '' , text : '' , created_time : '' } ;
    });
    
	};
});


app.controller('authCtrl', function($scope , $rootScope, $http , $location){
  $scope.user = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        //redirect user
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});


app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: '../welcome.html',
      controller: 'mainCtrl'
    })
    //the login display
    .when('/login', {
      templateUrl: '../login.html',
      controller: 'authCtrl'
    })
    //the signup display
    .when('/signup', {
      templateUrl: '../register.html',
      controller: 'authCtrl'
    });
});

