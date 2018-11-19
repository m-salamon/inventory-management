/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  localStorage.setItem('sidenav', 'true');

  $("#mySidenav").css("width", "250px")
  $("#main").css("marginLeft", "250px")
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  localStorage.setItem('sidenav', 'false');

  $("#mySidenav").css("width", "0px")
  $("#main").css("marginLeft", "0px")
}

if (localStorage.getItem('sidenav') == 'true') {
  openNav()
}

if (localStorage.getItem('sidenav') == 'false') {
  closeNav()
}