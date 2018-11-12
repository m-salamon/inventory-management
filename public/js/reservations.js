(function () {

   if(document.getElementById('date'))
     document.getElementById('date').valueAsDate = new Date();
 
   $('body').on('click', '.removeItemInput', (e) => {
     if($('.itemLookupWrapper').length <= 1)
       return
 
      $(event.target).closest(".itemLookupWrapper").wrap('<p/>').parent().html();
     $(event.target).closest(".itemLookupWrapper").remove('.itemLookupWrapper')
   });
 
 
   $('body').on('click', '.addItemInput', (e) => {
     let itemLookupWrapper = $(event.target).closest(".itemLookupWrapper").wrap('<p/>').parent().html();
     $(itemLookupWrapper).insertAfter($(event.target).closest(".itemLookupWrapper"))
   });
 
 
   $('#addReservation').click((e) => {
     e.preventDefault()
 
     var customerLookup = $('#customers option').map(function () {
       if ($(this).val() == $('.customerLookup').val()) {
         return $(this).attr('data-id')
       }
     }).get()[0]

     if (_.isEmpty(customerLookup)) return
     
     let itemLookup = $('.itemLookup').map(function (i, obj) {
       if ($(this).val() != '') {
         var g = $(this).val();
         return $('#items option[value=' + g + ']').attr('data-id');
       }
     }).get()
 
     if (_.isEmpty(itemLookup)) return
 
     var date = $('#date').val()
     if (_.isEmpty(date)) return
 
     itemLookup.map((id) => {
       $.post('/addReservation', { itemId: id, customerId: customerLookup, reserveddate: date }, (data) => {
         window.location.replace("/reservations");
       }).fail(function (e) {
         console.error("function ('.addConsigment') failed");
       });
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