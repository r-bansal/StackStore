app.controller('CartController', function($scope, $window, CartFactory){
	$scope.cart = {};
	$scope.cart.products = JSON.parse($window.localStorage.cart);
	$scope.total = null;
	$scope.cart.products.forEach(function(item){
		$scope.total += (item.price/100 * item.quantity);
	});
	// console.log($scope.total/100);
	// $scope.cart.user = {};
	// $scope.user.addressBilling = "";
	// $scope.user.addressShipping = "";

	$scope.completeOrder = function(){
		// console.log($scope.user.addressBilling);
		// console.log("test");
		console.log('cart',$scope.cart);
		CartFactory.completeOrder($scope.cart).then(fulfilled, rejected)


		function fulfilled(response){
			if(response) {
				console.log('order made');
				$window.localStorage.cart = JSON.stringify([]);
			}
			else {
				console.log('failure');
			}
			// if(response){
			// }
		}
		function rejected(error){
			console.log(error);
		//ASK: Error Handling on Client
		}
	};

	$scope.editOrder = function(quantity, index){
			$scope.edit = !$scope.edit;
			console.log(quantity, index);
		
		if($scope.edit === false){
			$scope.cart.products[index].quantity = quantity;
			$window.localStorage.cart = JSON.stringify($scope.cart.products);
		}
	};
});