var app = angular.module('flapperNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $stateProvider.state('home', {url: '/home', templateUrl: '/home.html', controller: 'MainCtrl'})
        .state('posts', {url: '/posts/{id}', templateUrl: '/posts.html', controller: 'PostsCtrl'});
    $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function(){
    var posts_model = {posts: []};
    return posts_model;
}]);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
    $scope.posts = posts.posts;

    $scope.addPost = function(){
        if(!$scope.title || $scope.title === ''){ return; }
        $scope.posts.push({title: $scope.title, link: $scope.link, upvotes: 0});
        $scope.title = '';
        $scope.link = '';

        $scope.posts.push({
          title: $scope.title,
          link: $scope.link,
          upvotes: 0,
          comments: [
            {author: 'Joe', body: 'Cool post!', upvotes: 0},
            {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
          ]
        });
    };

    $scope.incrementUpvotes = function(post){
        post.upvotes += 1;
    };
    $scope.posts = [
        {title: 'Post1', upvotes: 7},
        {title: 'Post2', upvotes: 52},
        {title: 'Post3', upvotes: 3},
        {title: 'Post4', upvotes: 51},
        {title: 'Post5', upvotes: 2}

    ];
}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
}]);
