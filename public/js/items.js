(function () {


  let length = '';
  let color = '';
  let serialnumber = '';
  $('#itemColor').keyup(() => {
    //get simcha
    color = $('#itemColor').val();
    $('#itemName').val(color + '-' + length + '-' + serialnumber);
  });
  $('#itemLength').keyup(() => {
    //get simcha
    length = $('#itemLength').val();
    $('#itemName').val(color + '-' + length + '-' + serialnumber);
  });
  $('#serialNumber').keyup(() => {
    //get simcha
    serialnumber = $('#serialNumber').val();
    $('#itemName').val(color + '-' + length + '-' + serialnumber);
  });

  $('.deleteItem').click(() => {
    let id = event.target.id;
    $.post('/deleteItem', { id: id }, function (data) {
       window.location.replace("/items");
    }).fail(function (e) {
      console.error("function ('.deleteItem') failed");
    });
  });

}());