/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  localStorage.setItem('sidenav', 'true');

  $("#mySidenav").css("width", "250px")
  $("#main").css("marginLeft", "250px")
  
  $('#sidenavToggle').html('<button class="btn btn-default" onclick="closeNav()"><i class="fas fa-angle-left fa-lg"></i></button></li>')
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  localStorage.setItem('sidenav', 'false');

  $("#mySidenav").css("width", "0px")
  $("#main").css("marginLeft", "0px")
  
  $('#sidenavToggle').html('<button class="btn btn-default" onclick="openNav()"><i class="fas fa-angle-right fa-lg"></i></button></li>')
}

if (localStorage.getItem('sidenav') == 'true') {
  openNav()
}

if (localStorage.getItem('sidenav') == 'false') {
  closeNav()
}