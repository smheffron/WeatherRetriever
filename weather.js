var app = angular.module("weather", []); 
                        
        app.factory('weatherService', function($http){
            
        return {
            
            weatherForZip: function(zip){                
                if(!zip) {
                    return weather;
                }
                
                var weatherForcast = {};
                
                $http({
                    method: 'GET',
                    url: "https://api.openweathermap.org/data/2.5/weather?zip="+zip+"&units=imperial&appid=05ca92b71c7910f591e41e0ff4839f0c"

                }).then(function successCallback(response) {
                    angular.extend(weatherForcast, response.data);

                  }, function errorCallback(response) {
                        alert('API call failed, possibly due to rate limiting or bad zip code.');
                  });
                
                return weatherForcast; 
  
            }
          };
        });
            
        app.factory('weatherObject', function() {
            var weatherObject = {};
            
            function setWeatherObject(weather) {
                weatherObject = weather;
                
            }
            
            function getWeatherObject() {
                return weatherObject;   
            }
            
            return {
                setWeatherObject:setWeatherObject,
                getWeatherObject:getWeatherObject
            }
        });
            
              
        app.controller("weatherSearchController", function($scope, weatherService, weatherObject) {   
            
            $scope.validateSearch = function() {
                
                if($('#zip').val().length != 5) {
                    return false;
                }
                
                weatherObject.setWeatherObject(weatherService.weatherForZip($scope.zipCode));
            }
        });
            
        app.controller("weatherDisplayController", function($scope, weatherService, weatherObject) {            
                $scope.weatherForcast = weatherObject.getWeatherObject;

                
        });