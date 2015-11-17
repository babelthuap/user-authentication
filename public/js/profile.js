$(document).ready(function() {

  $('#save').click(update);

  function update() {
    var userId = $('#userId').text();
    var picture = $('#pictureInput').val() || $('#picture').attr('src');
    var username = $('#usernameInput').val() || $('#username').text();
    var password = $('#passwordInput').val() || $('#password').text();
    var email = $('#emailInput').val() || $('#email').text();
    var birthday = $('#birthdayInput').val() || $('#birthday').text();

    $.ajax({
      url: '/users/update',
      method: 'PUT',
      data: {
        _id: userId,
        picture: picture,
        username: username,
        password: password,
        email: email,
        birthday: birthday
      }
    })
    .done(function(data){
      window.location.replace('/profile');
    })
    .fail(function(err){
      swal('It Seems Change Is Impossible', 'Unable to update.', 'error');
    });
  }

})