
var matchApp = angular.module("matchApp", ["ngCookies"]);
var api = "16fba1d36fc694ecddc5dfba908bcd8e" ;
var user = "" ;
  var serverRoute = "http://52.24.232.83:8080/netflixandchill/";
  
matchApp.controller('matchController', function($scope, $http, $cookies){
  
  $scope.getCurrentUserId = function(){
    console.log( "Current user is: " + $cookies.getObject("user"));
    return $cookies.getObject("user");
    
  };
  $scope.getCurrentUserId(
    
    );
  
  $scope.currentUser = { name:"Samuel Blanco", tel:"526142406190", mail : "samuel.drach@gmail.com" };
  //$scope.currentUser = user;
  console.log( $scope.currentUser );
  // { name:"", tel:"", img:""}
  $scope.allUsers = [
      { name:"Alex Rodriguez",  tel:"+1-202-555-0132",    mail:"alex@mail.com"},
      { name:"Francisco Tejon", tel:"+1-202-444-0143",    mail:"tejon@mail.com"},
      { name:"David Saenz",     tel:"+1-202-333-0140",    mail:"david@mail.com"},
      { name:"Martin Guzman",   tel:"+1-202-222-0111  ",  mail:"martin@mail.com"},
      { name:"Mario Contreras", tel:"+1-202-111-0154",    mail:"mario@mail.com"},
      { name:"Sofia Terrazas",  tel:"+1-202-555-0140",    mail:"david@mail.com"}
    
    ];
  
  $scope.matchedTo = [
     
    ];
  $scope.matchedBy = [
      { name:"David Saenz"},
      { name:"Sofia Terrazas"},
    ];
  // CHILLING METHODS
  $scope.getUserByName = function( name ){
    // get user by name 
    for( i = 0 ; i < $scope.allUsers.length ; i++ ){
      if( $scope.allUsers[i].username == name ){
        return $scope.allUsers[i];
      }
    }
    
  };
  $scope.getMatchedBy = function(){
    //$scope.matchedBy = get all matchedTo users
    req = {
      url : serverRoute + "matchedBy/" + $scope.getCurrentUserId()  ,
      method: "GET",
    };
    console.log("GET-");
    console.log(req);
    $http(req).then(
      function(response){
      console.log(response.data);
      $scope.matchedBy = response.data; 
    },function(err){
      console.log(err);
    });
    
  };
  $scope.getMatchedTo = function(){
    //$scope.matchedTo = get all matchedBy users
    req = {
      url : serverRoute + "matchedTo/" + $scope.getCurrentUserId()  ,
      method: "GET",
    };
    console.log("GET-");
    console.log(req);
    $http(req).then(
      function(response){
      console.log(response);
      $scope.matchedTo = response.data;
    },function(err){
      console.log(err);
    });
  };
  $scope.getMatchedTo();
  $scope.getMatchedBy();
  $scope.matchTo = function( usrId ){
    req = {
      url : serverRoute + "matchedTo",
      method : "POST",
      data : { 
        "fromId" : $scope.getCurrentUserId(),
        "toId" : usrId
      }
    };
    
    $http(req).then(
        function(response){
        console.log(response.data);
      }, function(err){
        console.log(err);
      });
  };
  $scope.unmatchTo = function( usrId ){
    req = {
      url : serverRoute + "matchedTo",
      method : "DELETE",
      data : { 
        "from_id" : $scope.getCurrentUserId(),
        "to_id" : usrId
      }
    };
    
    $http(req).then(
        function(response){
        console.log(response.data);
      }, function(err){
        console.log(err);
      });
  };
  
  $scope.toggleChill = function( name ){
    if ( $scope.isMatchedTo(name) ){
      $scope.unchill( name );    
    }else{
      $scope.chill( name );
    }
  };
  $scope.chill = function( name ){
    $scope.matchedTo.push( $scope.getUserByName(name) );
    // post user for chill
    console.log("agregado "+ name);
    $scope.matchTo($scope.getUserByName(name).id);
    $scope.getMatchedTo();
    $scope.getMatchedBy();
  
  };
  $scope.unchill = function( name ){
    for( i =0 ; i < $scope.matchedTo.length ; i++  ){
      if( $scope.matchedTo[i].username == name ){
        $scope.matchedTo.splice(i,1);
        console.log("removido "+ name);
      }
    }
    $scope.unmatchTo($scope.getUserByName(name).id);
    $scope.getMatchedTo();
    $scope.getMatchedBy();
  
    //delete user for chill
  };
  // MATCHED VERIFICATION METHODS
  $scope.isMatchedBy = function( name ){
    for( i=0 ; i < $scope.matchedBy.length ; i++){
      if( $scope.matchedBy[i].username == name ){
        return true;
      }
    }     
    return false;
  };
  $scope.isMatchedTo = function( name ){
    for( i=0 ; i < $scope.matchedTo.length ; i++){
      if( $scope.matchedTo[i].username == name ){
        return true;
      }
    } 
    return false;
      
  };
  // GETTERS AND SETTERS METHODS
  
  $scope.getMatchedUsers = function(){
    //$scope.allUsers = get all matched users
    req = {
      url : serverRoute + "users/",
      method: "GET",
    };
    console.log("GET-");
    console.log(req);
    $http(req).then(
      function(response){
      console.log(response.data);
      $scope.allUsers = response.data; 
    },function(err){
      console.log(err);
    });
  };
  $scope.getMatchedUsers();
  
  
  $scope.test = function(  ){
    $scope.getMatchedTo( );
  };
  
});
//////////////////////////////////////////////////////////////////////////////// MOVIES
matchApp.controller("movieController", function($scope, $http, $cookies){
  $scope.dbURL = "http://api.themoviedb.org/3/search/movie?";
  $scope.type = "Movie";
  
  
  // USER SESSIONS
  $scope.allMovies =[
      ];
        
  $scope.myMovies = [
      ];
  // SELECTION AN DESELECTION OF MOVIES
  $scope.getMovieById = function( movieID ){
    for( i =0 ; i< $scope.allMovies.length ; i++){
      if( $scope.allMovies[i].id == movieID ){
        return $scope.allMovies[i];
      }
    }
    return false ;
  };
  $scope.getMoviePoster = function(movieID){
    movie = $scope.getMovieById( movieID );
    console.log(movie.poster_path);
    if( movie.poster_path  ){
      result = "http://image.tmdb.org/t/p/w92"+ movie.poster_path; 
      return result ;
      
    }else{
      return "img/netflix.jpg";
    }
  };
  $scope.isSelectedMovie = function( movieID){ // CHECKS IF MOVIE IN myMovies
    for( i =0 ; i< $scope.myMovies.length ; i++){
      if( $scope.myMovies[i].id == movieID ){
        return true;
      }
    }
    return false;
  };
  $scope.toggleMovie = function(movieID){
    if( $scope.isSelectedMovie(movieID) ){
      $scope.deselectMovie(movieID);
    }else{
      $scope.selectMovie(movieID);
    }
  };
  $scope.selectMovie = function( movieID ){
    
    movieToAdd = $scope.getMovieById(movieID);
    if( movieToAdd !== false ){
      $scope.myMovies.push( movieToAdd );
    }
    // POST TO CREATE RELATION USR-MOVIE
  };
  $scope.deselectMovie = function( movieID ){
    for( i =0 ; i< $scope.myMovies.length ; i++){
      if( $scope.myMovies[i].id == movieID ){
        console.log( "removed " + $scope.myMovies.splice(i,1) );
      }
    }
    // POST TO DELETE RELATION USR-MOVIE
  };
  $scope.selectionClass = function( movieID ){ // IF THE MOVIE IS IN myMovies SELECT IT
    if( $scope.isSelectedMovie( movieID ) ){
      return "selected";
    }
    else{ 
      return "";
    }
  };
  //SEARCH BAR 
  $scope.fetchMovies = function( ){
    $http.get("http://api.themoviedb.org/3/search/movie?api_key="+api+"&query=" + $scope.movieSearchParameter).success(
      function(response){
        if(response.results){
          $scope.allMovies = response.results;
          //console.log($scope.allMovies);
        }else{
          $scope.allMovies =[];

        }
    });
  };
  route = "http://52.24.232.83:8080/netflixandchill/";
  
  
});

matchApp.controller("sessionController", function($scope, $http, $cookies, $window, $location){
  $scope.route = "http://52.24.232.83:8080/netflixandchill/";
  
  $scope.loginUser = "";
  $scope.loginPassword = "";
  
  $scope.registerUser = "";
  $scope.registerPassword = "";
  $scope.registerRePassword = "";
  $scope.registerPhone = "";
  $scope.registerEmail = "";
  
  $scope.test = function(){
    console.log($cookies.getAll());
  };
  $scope.setSession = function( usrName ){
    $cookies.put("user", usrName);
  };
  $scope.logIn = function(){
    req = {
      method: "POST",
      url : $scope.route + "login/",
      headers:{
        "Content-Type": "application/x-www-form-urlencoded", 
        "Accept": "*/*"
      },
      data : {
          name: $scope.loginUser,
          password: $scope.loginPassword,
      },
    };
    $http(req).then( function(result){ 
      console.log( result.data.id); 
      if( result.data.id !== undefined ){
        $scope.setSession(result.data.id  );
        user = result.data;
        url = "/netflixnchill/preferences.html";
        //console.log(url);
        $window.location.href = url ;
      }else{
        alert("El usuario no existe");
      }
    }, function(err){
      console.log("error :" + err); 
      
    });
  };
  
  $scope.register = function(){
    req = {
      method: "POST",
      url : $scope.route + "register/",
      headers:{
        "Content-Type": "application/x-www-form-urlencoded", 
        "Accept": "*/*",
      },
      data : {
          name: $scope.registerUser,
          password: $scope.registerPassword,
          phone : $scope.registerPhone,
          email:$scope.registerEmail
      },
    };
    $http(req).then( function(result){ 
      console.log( result); 
      
    }, function(err){
      console.log("error :" + err); 
      
    } );
    
  };
  $scope.test = function(){
    console.log($cookies.getAll());
  };
  
});