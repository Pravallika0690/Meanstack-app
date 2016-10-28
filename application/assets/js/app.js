/**
 * http://usejsdoc.org/
 */
   //https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
(function() {
var app= angular.module("myapp", ["hello"]);
app.controller("control",["$scope","$http","$rootScope", function($scope, $http, $rootScope) {

	$scope.form= {};
	
	$scope.submit= function(form) {
		//alert(form.fname);
		var obj= {
		"firstname":form.fname,
		"lastname": form.lname,
		"address": form.address,
		"state": form.state,
		"city": form.city,
		"zip": form.zip,
		"phonenum": form.phonenum,
		"username": form.username
		}
		console.log(obj);
		if(form.$valid) {
			
		$http.post("http://localhost:8090/save_details", obj).then(function(success_resp) {
			alert("data saved successfully="+ success_resp.data.flag);
			window.location.href =("/js/succ.html") ;
		}, function(err_resp) {
			alert("error happened while saving data"+ err_resp.data.flag);
		})
	}
	} 
}]);


var hello= angular.module("hello", []);
 hello.controller("app2Ctrl",["$scope", "$rootScope","$http", function($scope, $rootScope, $http) {
	console.log("coming to controller");
	 $scope.form= {};
	$scope.submit= function(form) {
		alert("submit button is working");
		 var user_obj ={ 
				 'emailid': form.emailid,
				 'username': form.username,
				 'password':form.password
		 };
		 console.log(user_obj);
		 
		 $http.post('http://localhost:8090/login_details', user_obj).then(function(success_rep) {
						alert('Users saved successfully = '+success_rep.data.flag);
						},
					function(err_rep) {
						alert('Error happened while saving data'+err_rep.data.flag);
					}
				);
	 };
	
	
$scope.view= function(form) {
	$http.get("http://localhost:8090/get_details/"+ form.username).then(function(succ_resp) {
		console.log("entered get details app");
		$scope.students_data = succ_resp.data;
		console.log($scope.students_data);
		
	}, function(err_resp) {
		alert("error occured");
	})		
}
	$scope.mail = function(form){
		
	}

}])

})();

//