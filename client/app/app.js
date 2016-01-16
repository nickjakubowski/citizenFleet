angular.module('citizenfleet')
.run(runBlock);

runBlock.$inject = ['$rootScope','$state','$window'];

function runBlock ($rootScope, $state, $window) {
  
  $rootScope.$on('$stateChangeStart', function(evt,to,toParams,from,fromParams) {
    var token = $window.localStorage['isIt'];
  	console.log("to",to,"toParams", toParams,"from",from,"fromParams",fromParams);
  	if (!token) {
      console.log("token, not var:", $window.localStorage['isIt'])
      console.log("token:", token);
      console.log("access", to.access.protected);
      if (to.access.protected) {
        if(to === 'login') {
          $state.go('login');
        } else {
          evt.preventDefault();
          $state.go('login');
        }
      }
  	} else if (token) {
      console.log(to.name);
      if (to.name === 'login' || to.name === 'signup') {
        evt.preventDefault();
        $state.go('index');
       }
    }
  })
}