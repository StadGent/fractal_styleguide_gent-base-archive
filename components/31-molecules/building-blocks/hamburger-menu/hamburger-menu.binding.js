/**
 * @file
 * Javascript binding of hamburger-menu.functions.js.
 */

window.onload = (function () {
  'use strict';

  return function () {
    var hamburgerMenu = document.querySelectorAll('.hamburger-menu');

    for (var i = hamburgerMenu.length; i--;) {
      var menu = new hamburger_component.HamburgerMenu(hamburgerMenu[i]); // eslint-disable-line no-undef
      menu.loadHamburgerMenu();
    }
  };
})();
