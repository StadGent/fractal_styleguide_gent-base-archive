/**
 * @file
 * Javascript binding of hamburger-menu.functions.js.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var hamburgerMenus = document.querySelectorAll('.hamburger-menu');

  for (var i = hamburgerMenus.length; i--;) {
    new gent_styleguide.components.HamburgerMenu(hamburgerMenus[i]); // eslint-disable-line no-undef
  }
});
