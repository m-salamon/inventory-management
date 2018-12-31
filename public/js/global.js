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
    var searchParam = (location.search.split('success' + '=')[1] || '').split('&')[0];
    var finalurl = location.href.replace("success=" + searchParam, "");

    window.history.pushState({}, document.title, finalurl);
  }

  //logout will clear localstorage and redirect to index
  $('.logout').click(() => {
    localStorage.clear();
    window.history.pushState({}, document.title, '/');
  })

  //get the firstname from local storage and set it on the top navbar
  if (localStorage.getItem('firstname')) {
    $('.userfirstname').append(localStorage.getItem('firstname'))
  }

  //get the perPage from local storage and set it on the perPage selector
  if (localStorage.getItem('perPage')) {
    $("#perPage option[value=" + localStorage.getItem('perPage') + "]").attr("selected", "selected");
  }

  //search for all pages
  $('.searchButton').click(() => {
    var search = $('#search').val()
    var perPage = $('#perPage').val()
    var fromDate = $('#fromDate').val()
    var toDate = $('#toDate').val()

    //set perPage localstorage
    localStorage.setItem('perPage', perPage)

    //add search params to url
    var url = ''
    R.map((i) => {
      url = UpdateQueryString(i.param, i.value, url)
    })([{ param: 'search', value: search }, { param: 'toDate', value: toDate }, { param: 'fromDate', value: fromDate }, { param: 'perPage', value: perPage }])
    window.location = url

    //window.location.href = location.href.replace("", "&search=" + search);

  })


  $('.searchAll').click(() => {
    var searchParam = (location.search.split('search' + '=')[1] || '').split('&')[0];
    window.location.href = location.href.replace("search=" + searchParam, "");
  })



}());




const UpdateQueryString = (key, value, url) => {
  if (!url) url = window.location.href;

  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"), hash;

  if (re.test(url)) {
    if (typeof value !== 'undefined' && value !== null)
      return url.replace(re, '$1' + key + "=" + value + '$2$3');
    else {
      hash = url.split('#');
      url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
      if (typeof hash[1] !== 'undefined' && hash[1] !== null)
        url += '#' + hash[1];
      return url;
    }
  }
  else {
    if (typeof value !== 'undefined' && value !== null) {
      var separator = url.indexOf('?') !== -1 ? '&' : '?';
      hash = url.split('#');
      url = hash[0] + separator + key + '=' + value;
      if (typeof hash[1] !== 'undefined' && hash[1] !== null)
        url += '#' + hash[1];
      return url;
    }
    else
      return url;
  }

}
