(function () {

  var length = '';
  var color = '';
  var serialnumber = '';
  $('#itemColor').keyup(() => {
    color = $('#itemColor').val();
    $('#itemName').val(color + '-' + length + '-' + serialnumber);
  });
  $('#itemLength').keyup(() => {
    length = $('#itemLength').val();
    $('#itemName').val(color + '-' + length + '-' + serialnumber);
  });
  $('#serialNumber').keyup(() => {
    serialnumber = $('#serialNumber').val();
    $('#itemName').val(color + '-' + length + '-' + serialnumber);
  });



  $('.editItem').click(() => {
    let id = event.target.id;

    $.get('/editItem', { id: id }, function (data) {
      let { id, colorcode, length, serialnumber, status, stockamount, brand } = R.head(data)

      $('#main').append(`
        <div class="modal fade" id="itemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit Item</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <form method="post" action="/updateItem" autocomplete="off">
            
            <div class="form-group">
                <input class="form-control" type="text" name="id" placeholder="Item name"   value="${id}" rrequired readonly/>
            </div>
            <div class="form-group">
                <input id="itemName" class="form-control itemName" type="text" name="name" placeholder="Item name" readonly="readonly" required/>
            </div>
            <div class="form-group">
                <input id="itemColor" class="form-control itemColor" type="text" name="colorcode" placeholder="Color" list="colors" value="${colorcode}" required>
            </div>
            <div class="form-group">
                <input id="itemLength" class="form-control itemLength" type="text" name="length" placeholder="Length" list="lengths" value="${length}" required>
            </div>
            <div class="form-group">
                <input id="serialNumber" class="form-control serialNumber" type="text" name="serialnumber" placeholder="Serial number" value="${serialnumber}" required />
            </div>
            <div class="form-group">
                <input class="form-control" type="text" name="brand" placeholder="Brand" value="Beverly" value="${brand}" required />
            </div>
                        
            <div class="form-group float-right">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" type="submit">Close</button>
                <button class="btn btn-success " type="submit">Save</button>
            </div>
            
              </form>
            </div>
          </div>
        </div>
        </div>
        `)

      $('#itemModal').modal('show')

      color = $('.itemColor').val();
      length = $('.itemLength').val();
      serialnumber = $('.serialNumber').val();
      $('.itemName').val(color + '-' + length + '-' + serialnumber);
      
      $('.itemColor').on('keyup' , () => {
        color = $('.itemColor').val();
        $('.itemName').val(color + '-' + length + '-' + serialnumber);
      });
      $('.itemLength').on('keyup' , () => {
        length = $('.itemLength').val();
        $('.itemName').val(color + '-' + length + '-' + serialnumber);
      });
      $('.serialNumber').on('keyup' , () => {
        serialnumber = $('.serialNumber').val();
        $('.itemName').val(color + '-' + length + '-' + serialnumber);
      });


    }).fail(function (e) {
      console.error("function ('.editItem') failed");
    });

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