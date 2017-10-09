/**
 * @file
 * Javascript binding of hamburger-menu.functions.js.
 */
(function ($) {
  'use strict';

  $(window).on('load', function (e) {
    $('.hamburger-menu').loadHamburgerMenu();
  });

})(jQuery);
