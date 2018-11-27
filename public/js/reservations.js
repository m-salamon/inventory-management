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

    if (R.isEmpty(customerLookup) || customerLookup == undefined) return

    let itemLookup = $('.itemLookup').map(function (i, obj) {
      if ($(this).val() != '') {
        var g = $(this).val()
        return $(`#items option[value='${g}']`).attr('data-id')
      }

    }).get()

    if (R.isEmpty(itemLookup) || itemLookup == undefined) return

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


  $(document).on('click', '.uniq-customer-btn', (e) => {
    $('#search').val($(e.target).attr("value"))
    $( ".btn-search" ).trigger( "click" );
  });


  $.get('/getReservations', function (data) {

    var getReservations = R.uniqBy(R.prop('customer'), data)
    getReservations.map(i => {
      $('.uniq-reservation-customers').append(`<div class="uniq-customer-btn btn btn-outline-secondary mr-3 mb-3" value="${i.customer}">${i.customer}</div>`)
    })

  }).fail(function (e) {
    console.error("function ('.getReservations') failed");
  });



}());
