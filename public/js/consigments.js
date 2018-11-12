(function () {

  $('#customer').keypress(function (e) {
    e.preventDefault();
  });

  $('#item').keypress(function (e) {
    e.preventDefault();
  });


  $('body').on('click', '.removeItemInput', (e) => {
    let itemLookupWrapper = $(event.target).closest(".itemLookupWrapper").wrap('<p/>').parent().html();
    $(event.target).closest(".itemLookupWrapper").remove('.itemLookupWrapper')
  });


  $('body').on('click', '.addItemInput', (e) => {
    let itemLookupWrapper = $(event.target).closest(".itemLookupWrapper").wrap('<p/>').parent().html();
    $(itemLookupWrapper).insertAfter($(event.target).closest(".itemLookupWrapper"))
  });





  $('#addConsigment').click((e) => {
    e.preventDefault()

    var customerLookup = null;
    $('#customers option').each(function () {
      if ($(this).val() == $('.customerLookup').val()) {
        customerLookup = $(this).attr('id')
      }
    })
    console.log(customerLookup)

    
    $('.itemLookup').each(function (i, obj) {
      if ($(this).val() != '') {
        console.log($(this).val())
      }
    });


    return

    $.post('/addConsigment', { id: id }, function (data) {
      window.location.replace("/consigments");
    }).fail(function (e) {
      console.error("function ('.addConsigment') failed");
    });
  });






}());