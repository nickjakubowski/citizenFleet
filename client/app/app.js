angular.module('citizenfleet')
.run(runBlock);

runBlock.$inject = ['$rootScope','$state','$window'];

function runBlock ($rootScope, $state, $window) {
  
  $rootScope.$on('$stateChangeStart', function(evt,to,toParams,from,fromParams) {
    var token = $window.localStorage['isIt'];
  	if (!token) {
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
};
