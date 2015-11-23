/*
var app = angular.module("calculator", []);
app.controller("myCtrl", function($scope){

  $scope.nombre = 'samuel';

});*/
var vanish;
$(document).ready(function() {
    $('.movie').click(function () {
        $(this).toggleClass('selected');

    });
    $('a.login-window').click(function() {


    var loginBox = $(this).attr('href');

    $(loginBox).fadeIn(300);

    var popMargTop = ($(loginBox).height() + 24) / 2;
    var popMargLeft = ($(loginBox).width() + 24) / 2;

    $(loginBox).css({
        'margin-top' : -popMargTop,
        'margin-left' : -popMargLeft
    });

    // Add the mask to body
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);

    return false;
    });


    $('a.close, #mask').click( function() {
        $('#mask , .login-popup').fadeOut(300 , function() {
        $('#mask').remove();
    });
        return false;
    });
    
    $('#register').click( function() {
        $('#mask , .login-popup').fadeOut(300 , function() {
        $('#mask').remove();
    });
        return false;
    });
    
    $('#login').click( function() {
        $('#mask , .login-popup').fadeOut(300 , function() {
        $('#mask').remove();
    });
        return false;
    });
    
    
});


