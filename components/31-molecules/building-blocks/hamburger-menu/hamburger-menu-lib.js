/*
 *
 */

(function ($) {
  'use strict';

  $.fn.extend({
    loadHamburgerMenu: function () {
      var hamburgerMenu = $(this);
      var close = hamburgerMenu.find('.close');
      var overlay = $('.hamburger-menu-overlay');

      $('.hamburger-toggle').on('click', function (e) {
        hamburgerMenu.addClass('js-opened');
        overlay.addClass('js-opened');
      });

      close.add(overlay).on('click', function (e) {
        e.preventDefault();
        hamburgerMenu.removeClass('js-opened');
        overlay.removeClass('js-opened');
      });
    }
  });
})(jQuery);
