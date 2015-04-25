app.directive('accountDetails',function($http){
	return{
		restrict: 'E',
		templateUrl: 'js/account/account-template.html',
		link: function(scope){
			//GET for Orders for User
			//GET for User Data
			$http.get('api/account/').then(fulfilled, rejected);

			//TODO: Cleanup to remove only email from being sent
			//TODO: Place $http req in factory (general clean-up)
			function fulfilled(userInfo){
				// console.log(userInfo.data);
				scope.user = userInfo.data.user;
				scope.orders = userInfo.data.orders;
			}
			function rejected(err){
				console.log(err);
			}

			scope.edit = false;
			scope.editAction = "Edit my info";

			scope.makeEditable = function() {
				if(!scope.edit) {
					scope.editAction = "Save my info";
				}
				else {
					var user = scope.user;

					UserFactory.updateUser(user._id, user).then(fulfilled, rejected);

					function fullfulled(updatedUser) {
						if (updatedUser) {
							scope.edit = !scope.edit;
							scope.editAction = "Edit my info";
						}
					}

					function rejected(error) {
						console.log("account.directive.js: user creation rejected! ", error);
					}

				}
			};
		}
	};
});