(function () {

  if (document.getElementById('date'))
    document.getElementById('date').valueAsDate = new Date();

  $('body').on('click', '.removeItemInput', (e) => {
    if ($('.itemLookupWrapper').length <= 1)
      return

    $(event.target).closest(".itemLookupWrapper").wrap('<p/>').parent().html();
    $(event.target).closest(".itemLookupWrapper").remove('.itemLookupWrapper')
  });


  $('body').on('click', '.addItemInput', (e) => {
    let itemLookupWrapper = $(event.target).closest(".itemLookupWrapper").wrap('<p/>').parent().html();
    $(itemLookupWrapper).insertAfter($(event.target).closest(".itemLookupWrapper"))
  });


  $('#addConsigment').click((e) => {
    e.preventDefault()

    var customerLookup = $('#customers option').map(function () {
      if ($(this).val() == $('.customerLookup').val()) {
        return $(this).attr('data-id')
      }
    }).get()[0]

    if (R.isEmpty(customerLookup) || customerLookup == undefined) return

    let itemLookup = $('.itemLookup').map(function (i, obj) {
      if ($(this).val() != '') {
        var g = $(this).val();
        return $(`#items option[value='${g}']`).attr('data-id')
      }
    }).get()

    if (R.isEmpty(itemLookup) || itemLookup == undefined) return

    var date = $('#date').val()
    if (R.isEmpty(date)) return



    var checkConsigment = itemLookup.map(async (id) => {
      var data = await $.post('/checkConsigment', { itemId: id, customerId: customerLookup })

      if (!R.isEmpty(data))
        toastr["error"](`${R.head(data).customerName} has a reservation for item ${R.head(data).itemName}`, "Error").css("width", "600px")

      return data
    })

    Promise.all(checkConsigment).then(function (data) {
      if (!R.isEmpty(R.flatten(data)))
        return

      itemLookup.map((id) => {

        $.post('/addConsigment', { itemId: id, customerId: customerLookup, shippeddate: date }, (data) => {
          window.location.replace("/consigments");
        }).fail(function (e) {
          console.error("function ('.addConsigment') failed");
        });
        window.location.replace("/consigments");
      })

    })

  });

  $('.deleteConsigment').click(() => {
    let id = event.target.id;
    $.post('/deleteConsigment', { id: id }, function (data) {
      window.location.replace("/consigments");
    }).fail(function (e) {
      console.error("function ('.deleteConsigment') failed");
    });
  });

}());