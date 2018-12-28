(function () {

  var urlParams = new URLSearchParams(window.location.search)

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  var type = ''
  if (urlParams.has('success')) {
    type = urlParams.get('success') == 'true' ? 'success' : 'error'
    //show toaster 
    toastr[type]("", type)
    //clear url
    window.history.pushState({}, document.title, window.location.origin + window.location.pathname);
  }

  $('.logout').click(() => {
    localStorage.clear();
    window.history.pushState({}, document.title, '/');
  })

  if (localStorage.getItem('firstname')) {
    $('.userfirstname').append(localStorage.getItem('firstname'))
  }

}());