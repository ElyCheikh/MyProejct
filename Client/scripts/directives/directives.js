var app = angular.module('yousnippet.directives', []);

app.directive('fileModel', ['$parse', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var parsedFile = $parse(attrs.fileModel);
      var parsedFileSetter = parsedFile.assign;

      element.bind('change', function() {
        scope.$apply(function() {
          parsedFileSetter(scope, element[0].files[0])
        });
      });
    }
  }
}]);
app.directive('enterSubmitComment', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      $('.commentText').keydown(function(event) {
          if (event.keyCode == 13) {
            var idt = attrs.id+'input';
            $('#'+idt).trigger('click');
             event.stopImmediatePropagation();
             $(this).val('');
              return false;
          }
      });
    }
  }
});
app.directive('enterSubmitSubcomment', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      $('.subCommentText').keydown(function(event) {
          if (event.keyCode == 13) {
              var id = attrs.id+'subinput';
              $('#'+id).trigger('click');
              event.stopImmediatePropagation();
              $(this).val('');
              return false;
          }
      });
    }
  }
});


app.directive('fileUpload', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs){
          $('#openFile').click(function(){
            $('#inputfile').trigger('click');
          })
          $('#inputfile').on('change', function(){
            var val = $(this).val();
            $(this).siblings('small').text(val);
          })
        }
    }
});


app.directive('popover', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      if (attrs.toggle=="tooltip"){
        $(element).tooltip();
      }
      if (attrs.toggle=="popover"){
        $(element).popover();
      }
    }
  };
});


app.directive('dataContent', function(){
  req = [
    users =[
      {username : 'tara'},
      {username : 'baha'}
    ]
  ];
  return {
    restrict: 'E',
    template: '<ul ng-repeat="t in req.users"><li>{{t.username}}</li></ul>'
  }
});
