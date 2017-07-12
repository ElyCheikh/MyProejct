var app = angular.module('yousnippet.controllers', [
    'ngResource',
    'ngStorage'
]);

app.controller('HeaderCtrl', function($scope, $location, navAuth){
    $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
    };
    
    $scope.loadRequests = function(){
        navAuth.loadRequests().success(function(data, status){
            if(data.des =='OK'){
                $scope.requests = data.requests;
            }
        });
    }
    
    $scope.confirmReq= function(id){
        navAuth.confirmReq(id).success(function(data, status){
            if(data.dess =='OK'){
                $scope.requests = data.requests;
            }
        })
    }
    
});
 app.controller('LogoutCtrl', function($location, $sessionStorage){
     console.log('logout');
     $sessionStorage.$reset();
     $location.path('/login');
 })

app.controller('LoginCtrl', function($localStorage, $sessionStorage, AuthSrvc, ensureAuth, navAuth, $scope, $rootScope, $location){
    ensureAuth.getUser();
    navAuth.getNavAuth();
    $scope.login = function(){
    var user = $scope.user;
    AuthSrvc.login(user).then(function successCallback(response) {
        if(response.data.des =='OK'){
                $sessionStorage.$reset();
                $sessionStorage.userObj = response.data.user;
                $sessionStorage.userToken = response.data.authToken;
                $location.path('/home');
            }else if(response.data.des =='!OK'){
                $rootScope.verified = false;
                $rootScope.info = false;
                $rootScope.invalid = false;
                $rootScope.danger = false;
                $rootScope.verify = true;
                $rootScope.alertMessage = 'Vous devez verifiez votre email';
            }else if(response.data.des =='err'){
                console.log('err')
                $rootScope.info = false;
                $rootScope.verify = false;
                $rootScope.verified = false;
                $rootScope.invalid = false;
                $rootScope.danger = true;
                $rootScope.alertMessage = 'Erreur Majeur';
            }
      }, function errorCallback(response) {
             if(response.status == 401){
                $rootScope.invalid = true;
                $rootScope.info = false;
                $rootScope.verify = false;
                $rootScope.verified = false;
                $rootScope.danger = false;
                $rootScope.alertMessage ='Email ou mot de passe non valide!';
            }
    });
    }
});


app.controller('RegistrationCtrl', function(){
    console.log('Registration Controller');
});



/////////////////////// HOME  ///////////////////
app.controller('HomeCtrl', function($localStorage, $sessionStorage, AuthSrvc, ensureAuth, navAuth, $scope, $rootScope, $location, homeService){
    ensureAuth.getUser();
    navAuth.getNavAuth();
    
    function loadPosts(){
        homeService.loadPosts().success(function(data, status){
            if(data.des =='OK'){
                $scope.posts = data.posts;
            }else{console.log('err')}
        })
    }
    
    $scope.post= function(){
        myfile = $scope.myFile;
        desc = $scope.desc;
        var fd = new FormData();
        fd.append('userId', $rootScope.userConn._id);
        fd.append('desc', desc);
        fd.append('file', myfile);  
        homeService.post(fd).success(function(data, status){
            if(data.des=='OK'){
                $scope.desc ='';
                loadPosts();
            }else if(data.err){console.log('err')}
        })
    }
    $scope.share= function(post){
        console.log('post');
        console.log(post);
        sharedesc = $scope.sharedesc;
        shareaccount = $rootScope.userConn._id;
        var newpost = {};
        newpost.oldpost = post._id;
        newpost.account = post.account._id;
        newpost.desc = post.desc;
        newpost.original = post.original;
        newpost.mime = post.mime;
        newpost.path = post.path;
        newpost.size = post.size;
        newpost.sharedesc = sharedesc;
        newpost.shareaccount = shareaccount;
         
        homeService.share(newpost).success(function(data, status){
            if(data.des=='OK'){
                $scope.desc ='';
                loadPosts();
            }else if(data.err){console.log('err')}
        })
    }
    
    $scope.deletePost = function(id){
         homeService.deletePost(id).success(function(data, status){
           if(data.des =='OK'){
               loadPosts();
           }else{console.log('err')}
        });
    }
    
    $scope.like = function(id, index){
        homeService.like(id).success(function(data, status){
            if(data.des =='OK'){
                $scope.posts[index].likes = data.post.likes;
            }else {console.log('err')}
        });
    }
    $scope.comment = function(id, commnetaire, index){
        homeService.comment(id, commnetaire).success(function(data, status){
            if(data.des =='OK'){
                $scope.posts[index].comments.push(data.comment);
            }
        })
    }
    $scope.subcomment= function(pid, cid, subcommentaire, index, key, keys){
        var commentaire = {};
        commentaire.username =$rootScope.userConn.username;
        commentaire.userpicture =$rootScope.userConn.picture;
        commentaire.content = subcommentaire.content;
        
        
        homeService.subcomment(pid, cid, commentaire).success(function(data, status){
            if(data.des =='OK'){
                $scope.posts[key].comments[index].subcomments = data.comment.subcomments;
            }
        })
    }
    
    $scope.getPostKey= function(key){
        $scope.partagerPostKey = key;
    }
    loadPosts();
});


///////////////////// PROFILE   /////////////////////////
app.controller('ProfileCtrl', function(ensureAuth, navAuth, profileService, $scope, $rootScope, $sessionStorage){
    ensureAuth.getUser();
    navAuth.getNavAuth();
    
    function loadPosts(){
        profileService.loadPosts().success(function(data, status){
            $scope.posts = data.posts;
        });
    };
    $scope.updateUser = function(){
        var user = $scope.user;
        console.log(user);
        user._id = $rootScope.userConn._id;
        profileService.updateUser(user).success(function(data, status){
            if(data.des == 'OK'){
                console.log(data.user);
                $sessionStorage.userObj = data.user;
                $rootScope.userConn = data.user;
            }
        });
    }
    $scope.picture = function(){
        myfile = $scope.myFile;
        var fd = new FormData();
        fd.append('userId', $rootScope.userConn._id);
        fd.append('file', myfile);        
        profileService.picture(fd).success(function(data, status){
            if(data.des == 'OK'){
                $sessionStorage.userObj = data.user;
                $rootScope.userConn = data.user;
            }else if(data.des =='err'){console.log('err')}
                
        })
    }
    
    $scope.updateic =function(user){
        profileService.updateic(user).success(function(data, status){
            if(data.des == 'OK'){
               $sessionStorage.userObj = data.user;
               $rootScope.userConn = data.user; 
            }else{console.log('err')}
        });
    }
     $scope.deleteic =function(x, id){
         var load = {};
         load.tp = x;
         load.id = id;
        profileService.deleteic(load).success(function(data, status){
            if(data.des == 'OK'){
               $sessionStorage.userObj = data.user;
               $rootScope.userConn = data.user; 
            }else{console.log('err')}
        });
    }
    $scope.deletePost= function(id){
        profileService.deletePost(id).success(function(data, status){
           if(data.des =='OK'){
               loadPosts();
           } 
        });
    }
    loadPosts();
});



app.controller('AccueilCtrl', function($location){
    console.log('Accueil Controller');
});
app.controller('TestCtrl', function($location){
    console.log('Test Controller');
});
app.controller('ViewprofileCtrl', function($location, ViewProfileService, $routeParams, $scope, ensureAuth, navAuth){
    console.log('Viewprofile Controller');
    ensureAuth.getUser();
    navAuth.getNavAuth();
    
    function viewprofile(){
        ViewProfileService.viewprofile($routeParams.id).success(function(data, staus){
        if(data.des =='OK'){
            $scope.hisprofile = data.user;
            $scope.relation = data.relation;
            $scope.posts = data.posts;   
        }
    });
    }
    
    $scope.sendRequest= function(idr){
       ViewProfileService.sendRequest(idr).success(function(data, status){
           if(data.des =='OK'){
               viewprofile();
           }
       }) 
    }
    viewprofile();
});