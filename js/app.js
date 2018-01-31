$(() => {

  const $navbarBurger = $('.navbar-burger');
  const $navbarMenu = $('.navbar-menu');
  const $navbarItems = $('.navbar-item');

  $navbarBurger.on('click',() => {
    $navbarBurger.toggleClass('is-active');
    $navbarMenu.toggleClass('is-active');
  });

  $navbarItems.on('click',() => {
    $navbarBurger.removeClass('is-active');
    $navbarMenu.removeClass('is-active');
  });

});
