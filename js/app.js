
var matchApp = angular.module("matchApp", []);
var api = "16fba1d36fc694ecddc5dfba908bcd8e" 

matchApp.controller('matchController', function($scope){
  
  $scope.currentUser = { name:"Samuel Blanco", tel:"526142406190", mail : "samuel.drach@gmail.com" };
  
  // { name:"", tel:"", img:""}
  $scope.allUsers = [
      { name:"Samuel Blanco",   tel:"526142406190",       mail:"samuel@mail.com"},
      { name:"Alex Rodriguez",  tel:"+1-202-555-0132",    mail:"alex@mail.com"},
      { name:"Francisco Tejon", tel:"+1-202-444-0143",    mail:"tejon@mail.com"},
      { name:"David Saenz",     tel:"+1-202-333-0140",    mail:"david@mail.com"},
      { name:"Martin Guzman",   tel:"+1-202-222-0111  ",  mail:"martin@mail.com"},
      { name:"Mario Contreras", tel:"+1-202-111-0154",    mail:"mario@mail.com"},
      { name:"Sofia Terrazas",  tel:"+1-202-555-0140",    mail:"david@mail.com"}
    
    ];
  $scope.matchedTo = [
      { name:"Alex Rodriguez"},
      { name:"Francisco Tejon"},
      { name:"David Saenz"},
      { name:"Sofia Terrazas"},
    ];
  $scope.matchedBy = [
      { name:"David Saenz"},
      { name:"Sofia Terrazas"},
    ];
  // CHILLING METHODS
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
  };
  $scope.unchill = function( name ){
    for( i =0 ; i < $scope.matchedTo.length ; i++  ){
      if( $scope.matchedTo[i].name == name ){
        $scope.matchedTo.splice(i,1);
        console.log("removido "+ name);
      }
    }
    //delete user for chill
  };
  // MATCHED VERIFICATION METHODS
  $scope.isMatchedBy = function( name ){
    for( i=0 ; i < $scope.matchedBy.length ; i++){
      if( $scope.matchedBy[i].name == name ){
        return true;
      }
    }     
    return false;
  };
  $scope.isMatchedTo = function( name ){
    for( i=0 ; i < $scope.matchedTo.length ; i++){
      if( $scope.matchedTo[i].name == name ){
        return true;
      }
    } 
    return false;
      
  };
  // GETTERS AND SETTERS METHODS
  
  $scope.getUserByName = function( name ){
    // get user by name 
    for( i = 0 ; i < $scope.allUsers.length ; i++ ){
      if( $scope.allUsers[i].name == name ){
        return $scope.allUsers[i];
      }
    }
  };
  $scope.getMatchedUsers = function(){
    //$scope.allUsers = get all matched users
  };
  $scope.getMatchedBy = function(){
    //$scope.matchedBy = get all matchedTo users
  };
  $scope.getMatchedTo = function(){
    //$scope.matchedTo = get all matchedBy users
  };
  
  
});
//////////////////////////////////////////////////////////////////////////////// MOVIES
matchApp.controller("movieController", function($scope, $http){
  $scope.dbURL = "http://api.themoviedb.org/3/search/movie?";
  $scope.type = "Movie";
  $scope.allMovies =[
      ];
        
  $scope.myMovies = [
      ];
  // SELECTION AN DESELECTION OF MOVIES
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
    $http.get("http://www.omdbapi.com/?i=" + movieID).success(
      function(response){
        $scope.myMovies.push(response);
        console.log("added: " + movieID);
    });
    // POST TO CREATE RELATION USR-MOVIE
  };
  $scope.deselectMovie = function( movieID ){
    for( i =0 ; i< $scope.myMovies.length ; i++){
      if( $scope.myMovies[i].imdbID == movieID ){
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
          console.log($scope.allMovies)
        }else{
          $scope.allMovies =[];

        }
    });
  };
  
});