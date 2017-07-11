var scotchTodo = angular.module('demoApp', []);

function mainController($scope, $http) {
     console.log("log request 1");
    
    $scope.getlogGroups=function(){
        console.log("log request 2");
        if (typeof(loggroupData) != "undefined")
        {
            delete loggroupData;
        }
        var restUrl = "/loggroupname";
         $scope.logroupLoading=true;
        $http.get(restUrl, {headers: {'Accept': '*/*;q=0.8'}})
         .success(function (data) {
                // set False to indicate data fetching is completed
                $scope.logroupLoading=false;
                $scope.loggroupData = data.logGroups;
            })
            .error(function (data) {
                
                $scope.logroupLoading=false;

                console.log("ERROR loggroupname");
                
            });
    };
    
    var nextTotkenArray=['NOTOKEN'];
    $scope.getlogstreams=function(value){
        console.log("log request 3");

        if (typeof(logstreamData) != "undefined")
        {
            delete logstreamData;
        }
        
        if(value==0){
            $scope.increment=0;
        }
        else if(value==1){
            $scope.increment+=1;
        }
        else if(value==-1){
            $scope.increment-=1;
        }
        if($scope.increment<=0){
            $scope.increment=0;
        }
        if($scope.increment>=nextTotkenArray.length){
            $scope.increment=0;
        }
         console.log($scope.increment, nextTotkenArray.length);
        var nextToken=nextTotkenArray[$scope.increment];
        
        var restUrl = "/logstream";
        $scope.logstreamLoading=true;
        $http.get(restUrl, {params:{ loggroupname : $scope.loggroupnameForLogstream, nextToken : nextToken}})
         .success(function (data) {
                // set False to indicate data fetching is completed
                $scope.logstreamLoading=false;
            
                if(typeof(data.nextToken)!="undefined"){
                    if(nextTotkenArray.indexOf(data.nextToken) == -1) {
                        nextTotkenArray.push(data.nextToken);
                    }
                }
               
                $scope.logstreamData = data.logStreams;
            })
            .error(function (data) {
                $scope.logstreamLoading=false;
                
                console.log("ERROR logstream");
            });
    };
    
    $scope.getlogeventswithfilters=function(){
        console.log("log request 3");
        if (typeof(logeventwithFliterData) != "undefined")
        {
            delete logeventwithFliterData;
        }
        var restUrl = "/logeventsfliter";
         $scope.logeventwithFliterLoading=true;
        $http.get(restUrl, {params:{ loggroupname : $scope.loggroupnameForLogeventswithFliter, pattern : $scope.logeventsfliter}})
         .success(function (data) {
                // set False to indicate data fetching is completed
                $scope.logeventwithFliterLoading=false;
                $scope.logeventwithFliterData = data.events;
            })
            .error(function (data) {
                $scope.logeventwithFliterLoading=false;
                
                console.log("ERROR logeventsfliter");
            });
    };
    
    
//	$scope.formData = {};
//
//	// when landing on the page, get all todos and show them
//	$http.get('/api/todos')
//		.success(function(data) {
//			$scope.todos = data;
//		})
//		.error(function(data) {
//			console.log('Error: ' + data);
//		});
//
//	// when submitting the add form, send the text to the node API
//	$scope.createTodo = function() {
//		$http.post('/api/todos', $scope.formData)
//			.success(function(data) {
//				$scope.formData = {}; // clear the form so our user is ready to enter another
//				$scope.todos = data;
//				console.log(data);
//			})
//			.error(function(data) {
//				console.log('Error: ' + data);
//			});
//	};
//
//	// delete a todo after checking it
//	$scope.deleteTodo = function(id) {
//		$http.delete('/api/todos/' + id)
//			.success(function(data) {
//				$scope.todos = data;
//			})
//			.error(function(data) {
//				console.log('Error: ' + data);
//			});
//	};

}
