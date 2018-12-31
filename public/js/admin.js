(function () {
  
  $('.verifyUser').click(() => {
    let id = event.target.id;
    $.post('/verifyUser', { id: id }, function (data) {
      window.location.replace("/admin?secret_token=" + token);
    }).fail(function (e) {
      console.error("function ('.verifyUser') failed");
    });
  });
  
  $('.deleteUser').click(() => {
    let id = event.target.id;
    $.post('/deleteUser', { id: id }, function (data) {
      window.location.replace("/admin?secret_token=" + token);
    }).fail(function (e) {
      console.error("function ('.deleteUser') failed");
    });
  });

}());