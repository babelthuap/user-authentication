'use strict';

$(function(){
  $('#register').click(register);
})

function register(e) {
  e.preventDefault();

  var username = $('#username').val();
  var pass1 = $('#pass1').val();
  var pass2 = $('#pass2').val();

  if(pass1 !== pass2 && username){
    $('#pass1').val('');
    $('#pass2').val('');
    swal('Error:', 'Passwords do not match.', 'error');
  } else {
    $.post('/users/register', {username: username, password: pass1})
    .done(function(data){
      window.location.replace('/login');
    })
    .fail(function(err){
      swal('Error:', 'Username already taken.', 'error');
    });
  }
}
