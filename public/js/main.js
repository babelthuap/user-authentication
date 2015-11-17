'use strict';

$(document).ready(init);

function init() {
  if (document.cookie) {
    $('#editLink, #logoutLink').show();
  } else {
    $('#registerLink, #loginLink').show();
  }

  $('#logout').click(logout);
}

function logout() {
  $.post('/users/logout')
  .done(function(){
    window.location.replace('/');
  });
}

