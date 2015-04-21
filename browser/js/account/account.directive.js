app.directive('accountDetails',function($http){
	return{
		restrict: 'E',
		templateUrl: 'js/account/account-template.html',
		link: function(scope){
			//GET for Orders for User
			//GET for User Data
			$http.get('api/accounts/details').then(fulfilled, rejected);

			//TODO: Cleanup to remove only email from being sent
			//TODO: Place $http req in factory (general clean-up)
			function fulfilled(user){
				console.log(user);
				scope.user = user.data;
			}
			function rejected(err){
				console.log(err);
			}
		}
	}
})