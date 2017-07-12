var app = angular.module('yousnippet.services', ['ngResource']);

var baseUrl = 'http://localhost:3000/';



app.factory('ViewProfileService', function($http, $rootScope, $sessionStorage){
  var ViewProfileService = {};
  ViewProfileService.viewprofile = function(id){
       return   $http({
           url: baseUrl+'viewprofile/'+$sessionStorage.userToken+'/'+id+'/'+$sessionStorage.userObj._id,
           method: 'GET'
         });
       }
  ViewProfileService.sendRequest = function(idr){
    return $http({
      url: baseUrl+'request/sendRequest/'+$sessionStorage.userObj._id+'/'+idr+'/'+$sessionStorage.userToken,
      method: 'POST'
    });
  }
  return ViewProfileService;
});

app.factory('profileService', function($http, $rootScope, $sessionStorage){
  var profileService = {};
    profileService.updateUser = function(user){
      return $http({
        url: baseUrl+'updateaccount',
        method: 'POST',
        data : user
      });
    }
    profileService.updateic = function(user){
      return $http({
        url: baseUrl+'pushic/'+$rootScope.userToken+'/'+$rootScope.userConn._id,
        method: 'POST',
        data: user
      });
    }
    profileService.deleteic = function(load){
      return $http({
        url : baseUrl+'deleteic/'+$rootScope.userToken+'/'+$rootScope.userConn._id,
        method: 'POST',
        data : load
      });
    }

    profileService.loadPosts = function(){
        return $http({
                 method: 'GET',
                 url: baseUrl+'post/'+$rootScope.userToken+'/'+$rootScope.userConn._id
               });
          }
    profileService.post = function(fd){
        return   $http({
            url: 'http://localhost:3000/post',
            method: 'POST',
            headers: {
              'Content-Type': undefined
            },
            data: fd,
            transformRequest: angular.identity
          });
        }
   profileService.deletePost = function(post_id){
     return $http({
       method: 'DELETE',
       url: baseUrl+'post/'+$rootScope.userToken+'/'+$rootScope.userConn._id+'/'+post_id
     });
   }
   profileService.picture = function(fd){
         return   $http({
             url: baseUrl+'post/picture/'+$rootScope.userToken+'/'+$rootScope.userConn._id,
             method: 'POST',
             headers: {
               'Content-Type': undefined
             },
             data: fd,
             transformRequest: angular.identity
           });
       }

  return profileService;
});

app.factory('homeService', function($http, $rootScope){
  var homeService = {};
      homeService.loadPosts = function(){
            return $http({
                     method: 'GET',
                     url: baseUrl+'post/feed/'+$rootScope.userToken+'/'+$rootScope.userConn._id
                   });
              }
      homeService.post = function(fd){
            return   $http({
                url: 'http://localhost:3000/post',
                method: 'POST',
                headers: {
                  'Content-Type': undefined
                },
                data: fd,
                transformRequest: angular.identity
              });
          }
    homeService.share = function(newpost){
        return   $http({
            url: 'http://localhost:3000/post',
            method: 'POST',
            data: newpost
          });
        }
     homeService.deletePost = function(post_id){
       return $http({
         method: 'DELETE',
         url: baseUrl+'post/'+$rootScope.userToken+'/'+$rootScope.userConn._id+'/'+post_id
       });
     }
     homeService.like = function(post_id){
       return $http({
         method: 'POST',
         url : baseUrl+'post/like/'+$rootScope.userToken+'/'+post_id+'/'+$rootScope.userConn._id
       })
     }
     homeService.comment = function(post_id, commentaire){
       return $http({
         method: 'POST',
         url : baseUrl+'comment/'+$rootScope.userToken+'/'+post_id+'/'+$rootScope.userConn._id,
         data : commentaire
       })
     }
     homeService.subcomment = function(post_id, comment_id,commentaire){
       return $http({
         method: 'POST',
         url : baseUrl+'comment/sub/'+$rootScope.userToken+'/'+post_id+'/'+comment_id+'/'+$rootScope.userConn._id,
         data : commentaire
       })
     }
   return homeService;
});



app.factory('AuthSrvc', function($resource, $http, $rootScope) {
  var dataFactory = {};
  dataFactory.register = function(user) {
    return $http.post(baseUrl + "register", user);
  };
  dataFactory.login = function(user) {
    return $http({
      url: baseUrl + 'login',
      method: 'POST',
      data: user
    });
  };
  dataFactory.facebook = function(){
    return $http({
      url: baseUrl+'auth/facebook',
      method: 'GET'
    });
  }

  return dataFactory;
});


app.factory('ensureAuth', function($sessionStorage, $rootScope, $location) {
    $rootScope.return_to = $location.url();
  return {
    getUser: function() {
      $rootScope.userConn = $sessionStorage.userObj;
      $rootScope.userToken = $sessionStorage.userToken;
      if ($rootScope.userConn && $sessionStorage.userToken) {
          $rootScope.nav = false
          $rootScope.auth = true;
      } else {
          $rootScope.nav = false
          $rootScope.auth = false;
          $location.path('/login');
      }
    }
  };
});

app.factory('navAuth', function($sessionStorage, $rootScope, $http, $rootScope) {
  return {
    getNavAuth: function() {
      var userConn = $sessionStorage.userObj;
      if (userConn) {
        $rootScope.userConn = userConn;
        $rootScope.nav = false;
        $rootScope.auth = true;
      } else {
        $rootScope.nav = false;
        $rootScope.auth = false;
      }
    },
    loadRequests : function(){
      return $http({
        url: baseUrl+'request/'+'requests/'+$rootScope.userToken+'/'+$rootScope.userConn._id,
        method: 'GET'
      });
    },
    loadNotifs : function(){
      return $http({
        url: baseUrl+'notification/'+$rootScope.userToken+'/'+$rootScope.userConn._id,
        method: 'GET'
      });
    },
    confirmReq : function(ids){
      return $http({
        url : baseUrl+'request/confirm/'+$rootScope.userToken+'/'+ids+'/'+$rootScope.userConn._id,
        method: 'POST'
      })
    }
};
});




/*
app.factory('rewardFactory', function ($resource) {
	return $resource(baseUrl + '/reward', {}, {

        create: { method: 'POST' }
    });
});

app.factory('deleterewardFactory', function ($resource) {
    return $resource(baseUrl + '/reward/delete?id=:id', {}, {

        remove: { method: 'DELETE', params: {id: '@id'} }
    });
});
app.factory('Updatereward', function ($resource) {
    return $resource(baseUrl + '/reward/update?id=:id', {}, {
    	update: { method: 'PUT', params: {id: '@id'} }
    });
});


app.factory('rewardPutFactory', function ($resource) {
    return $resource(baseUrl + '/reward/update/:id', {}, {
        update: { method: 'PUT', params: {id: '@id'} }
    });
});
*/
