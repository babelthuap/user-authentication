'use strict';

$(function(){
  $('#login').click(login);
})

function login(e) {
  e.preventDefault();

  var username = $('#username').val();
  var pass = $('#pass').val();

  $.post('/users/login', {username: username, password: pass})
  .done(function(data){
    window.location.replace('/profile');
  })
  .fail(function(err){
    $('#username').val('');
    $('#pass').val('');
    swal('No Beans For You!', 'Incorrect username or password.', 'error');
  });
}
