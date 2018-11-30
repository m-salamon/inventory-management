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
 
 
   $('#addInvoice').click((e) => {
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
       $.post('/addInvoice', { itemId: id, customerId: customerLookup, solddate: date }, (data) => {
         window.location.replace("/invoices");
       }).fail(function (e) {
         console.error("function ('.addInvoice') failed");
       });
     })
 
 
   });
 
   $('.deleteInvoice').click(() => {
     let id = event.target.id;
     $.post('/deleteInvoice', { id: id }, function (data) {
       window.location.replace("/invoices");
     }).fail(function (e) {
       console.error("function ('.deleteInvoice') failed");
     });
   });
 
 
 
 }());
 