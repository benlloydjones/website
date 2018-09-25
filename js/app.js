window.onload = function() {

  const navbarBurger = document.querySelector('.navbar-burger');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navbarItems = document.querySelectorAll('.navbar-items');

  navbarBurger.onclick = function() {

    navbarBurger.classList.toggle('is-active');
    navbarMenu.classList.toggle('is-active');
  }

  navbarItems.forEach(function(navbarItem) {
    navbarItem.onclick = function() {
      navbarBurger.classList.remove('is-active');
      navbarMenu.classList.remove('is-active');
    }    
  })
}
