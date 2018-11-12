(function () {

  $('.deleteCustomer').click(() => {
    let id = event.target.id;
    $.post('/deleteCustomer', { id: id }, function (data) {
       window.location.replace("/customers");
    }).fail(function (e) {
      console.error("function ('.deleteCustomer') failed");
    });
  });

}());