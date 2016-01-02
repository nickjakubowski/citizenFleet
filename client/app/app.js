angular.module('citizenfleet')
.run(runBlock);

runBlock.$inject = ['$rootScope','$state','$window'];

function runBlock ($rootScope, $state, $window) {
  
  var token = $window.localStorage['isIt'];
  
  $rootScope.$on('$stateChangeStart', function(evt,to,toParams,from,fromParams) {
  	console.log("to",to,"toParams", toParams,"from",from,"fromParams",fromParams);
  	if (!token) {
      if (to.name === ('login' || 'signup')) {
      	evt.preventDefault();
        $state.transitionTo(to.name, notify:false);
      } else {
      	evt.preventDefault();
       	$state.transitionTo('login', notify:false);
      }
  	}
  })
}