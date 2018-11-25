(function () {

  $('.editCustomer').click(() => {
    let id = event.target.id;

    $.get('/editCustomer', { id: id }, function (data) {
      const { id, name, phone, mobile, email, address, city, state, zip, country } = R.head(data)

      $('#main').append(`
        <div class="modal fade" id="customerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit Customer</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            <form method="post" action="/updateCustomer" autocomplete="off">
            <div class="form-group">
                <input  class="form-control" type="text" name="id" placeholder="Customer name" value="${id}" required readonly/>
            </div>
            <div class="form-group">
                <input  class="form-control" type="text" name="name" placeholder="Customer name" value="${name}" required />
            </div>
            <div class="form-group">
                <input  class="form-control" type="text" name="phone" placeholder="Phone number" value="${phone}" />
            </div>
            <div class="form-group">
                <input  class="form-control" type="text" name="mobile" placeholder="Mobile number" value="${mobile}" />
            </div>
            <div class="form-group">
                <input class="form-control" type="text" name="email" placeholder="Email" value="${email}"  />
            </div>
            <div class="form-group">
                <input class="form-control" type="text" name="address" placeholder="Address" value="${address}" />
            </div>
            <div class="form-group">
            <input  class="form-control" type="text" name="city" placeholder="City" list="citys" value="${city}" >
            </div>
            <div class="form-group">
            <input class="form-control" type="text" name="state" placeholder="State" list="states" value="${state}" > 
            </div>
            <div class="form-group">
            <input  class="form-control" type="text" name="zip" placeholder="Zip" list="zips" value="${zip}" >
            </div>
            <div class="form-group">
                <input  class="form-control" type="text" name="country" placeholder="Country" value="${country}"  />
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

      $('#customerModal').modal('show')

    }).fail(function (e) {
      console.error("function ('.getCustomer') failed");
    });

  });


  $('.deleteCustomer').click(() => {
    let id = event.target.id;
    $.post('/deleteCustomer', { id: id }, function (data) {
      window.location.replace("/customers");
    }).fail(function (e) {
      console.error("function ('.deleteCustomer') failed");
    });
  });

}());