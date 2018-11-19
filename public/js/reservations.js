(function () {

  if (document.getElementById('date'))
    document.getElementById('date').valueAsDate = new Date();

  /* Duplicate code - We have this in Consigments */
  //  $('body').on('click', '.removeItemInput', (e) => {
  //    if($('.itemLookupWrapper').length <= 1)
  //      return

  //     $(event.target).closest(".itemLookupWrapper").wrap('<p/>').parent().html();
  //    $(event.target).closest(".itemLookupWrapper").remove('.itemLookupWrapper')
  //  });


  //  $('body').on('click', '.addItemInput', (e) => {
  //    let itemLookupWrapper = $(event.target).closest(".itemLookupWrapper").wrap('<p/>').parent().html();
  //    $(itemLookupWrapper).insertAfter($(event.target).closest(".itemLookupWrapper"))
  //  });


  $('#addReservation').click((e) => {
    e.preventDefault()
    var customerLookup = $('#customers option').map(function () {
      if ($(this).val() == $('.customerLookup').val()) {
        return $(this).attr('data-id')
      }
    }).get()[0]
    
    if (R.isEmpty(customerLookup)) return

    let itemLookup = $('.itemLookup').map(function (i, obj) {
      if ($(this).val() != '') {
        var g = $(this).val()
        return $('#items option[value=' + g + ']').attr('data-id')
      }
      
    }).get()
    
    if (R.isEmpty(itemLookup)) return

    var date = $('#date').val()
    if (R.isEmpty(date)) return

    itemLookup.map((id) => {
      $.post('/addReservation', { itemId: id, customerId: customerLookup, reserveddate: date }, (data) => {
        window.location.replace("/reservations");
      }).fail(function (e) {
        console.error("function ('.addConsigment') failed");
      });
    })


  });

  $('.deleteReservation').click(() => {
    let id = event.target.id;
    $.post('/deleteReservation', { id: id }, function (data) {
      window.location.replace("/reservations");
    }).fail(function (e) {
      console.error("function ('.deleteReservation') failed");
    });
  });

}());