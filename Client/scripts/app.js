angular.module('yousnippet', [
    'yousnippet.services',
    'yousnippet.controllers',
    'yousnippet.directives',
    'ngRoute',
    'monospaced.elastic',
    'infinite-scroll'
  ])
  .run(function($rootScope,$location, $http){
    $rootScope.$on('$locationChangeStart', function(event, current, previous){
      $rootScope.current = current;
      $rootScope.previous = previous;
    })

  })
  .config(function($routeProvider, $httpProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
       'self',
       'http://localhost:3000/**'
     ]);

    $routeProvider.when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    });
    $routeProvider.when('/login', {
      templateUrl: 'Partials/auth/login.html',
      controller: 'LoginCtrl',
    });
    $routeProvider.when('/register', {
      templateUrl: 'Partials/auth/register.html',
      controller: 'RegistrationCtrl',
    });
    $routeProvider.when('/test', {
      templateUrl: 'partials/test.html',
      controller: 'TestCtrl'
    });
    $routeProvider.when('/accueil', {
      templateUrl: 'partials/accueil',
      controller: 'AccueilCtrl'
    });
    $routeProvider.when('/logout', {
      templateUrl: 'partials/accueil',
      controller: 'LogoutCtrl'
    });
    $routeProvider.when('/profile', {
      templateUrl: 'partials/auth/profile.html',
      controller: 'ProfileCtrl'
    });
    $routeProvider.when('/viewprofile/:id', {
      templateUrl: 'partials/viewprofile.html',
      controller: 'ViewprofileCtrl'
    })
    $routeProvider.when('/verify_email/:token', {
      template: '<p>Cheking...</p>',
      controller: 'VerifyEamilCtrl'
    });
    $routeProvider.when('/forgot_password', {
      templateUrl: 'partials/auth/forgotPassword',
      controller: 'forgotPasswordCtrl'
    });
    $routeProvider.when('/pass_recovery_email/:token', {
      templateUrl: 'partials/auth/passRecoveryEmail.html',
      controller: 'PassRecoveryEmailCtrl'
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });
  })


;
