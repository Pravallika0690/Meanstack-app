/**
 * http://usejsdoc.org/
 */
   //https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
(function() {
	//var myapp= angular.module("myapp",["app", "hello"]);
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
//			var landingUrl = "http://" + $window.location.host + "/succ";
//			$window.location.href = landingUrl;
			
			window.location.href =("/js/succ.html") ;
			
			
			//$window.location.reload();
		}, function(err_resp) {
			alert("error happened while saving data"+ err_resp.data.flag);
		})
		
	
	//myservice.set(users);
	}
//	$scope.redirect= function(path) {
//		$location.path(path);
//	}
//	myapp.config(['$routeProvider', function($routeProvider) {
//		
//		
//		$routeProvider.when('/succ', {templateUrl:"/succ.html"});
//	}])
	
	} 
}]);
//var first= document.getElementById("div1");

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
		//console.log(students_data);
		
	}, function(err_resp) {
		alert("error occured");
	
	})		
	
}
	//$rootScope.users = myservice.get();
	$scope.mail = function(form){
		
	}

}])

//app.factory("myservice", function() {
//	window._data= "default";
//	
//	return {
//		setData: function(users) {
//			console.log("setData called with val= ")
//		},
//		get: get
//	}
//});
//angular.element(document).ready(function() {
//	angular.bootstrap(document.getElementById("myapp"), ['control']);
//	angular.bootstrap(document.getElementById("hello"), ['hellocontrol']);
//});

})();

//