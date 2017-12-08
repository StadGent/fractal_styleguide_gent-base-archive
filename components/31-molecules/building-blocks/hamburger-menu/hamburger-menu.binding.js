/**
 * @file
 * Javascript binding of hamburger-menu.functions.js.
 */

document.addEventListener('DOMContentLoaded', function () {

  var hamburgerMenus = document.querySelectorAll('.hamburger-menu');

  for (var i = hamburgerMenus.length; i--;) {
    console.log('test'); // eslint-disable-line no-console

    new gent_styleguide.components.HamburgerMenu(hamburgerMenus[i]); // eslint-disable-line no-undef
  }


});
