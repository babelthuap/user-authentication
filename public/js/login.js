'use strict';

$(function(){
  $('#login').click(login);
  $('input').on('keypress', function(e) {
    if (e.keyCode === 13) login();
  });
})

function login() {
  var username = $('#username').val();
  var pass = $('#pass').val();

  $.post('/users/login', {username: username, password: pass})
  .done(function(data){
    window.location.replace('/profile');
  })
  .fail(function(err){
    $('#username').val('');
    $('#pass').val('');
    swal('No Cookies For You!', 'Incorrect username or password.', 'error');
  });
}
