/**
 * @file
 * Implements a hamburger-menu button combined with
 * a slide-in panel for easy mobile navigation.
 *
 * @author
 * Wim Vantomme
 *
 */
(function ($) {
  'use strict';

  /**
   * Creates a jQuery extension function.
   *
   * @fires event:click
   */
  $.fn.extend({
    loadHamburgerMenu: function () {
      var hamburgerMenu = $(this);
      var close = hamburgerMenu.find('.close');
      var overlay = $('.hamburger-menu-overlay');

      /**
       * Indicates that a user has clicked on the hamburger toggle.
       *
       * Opens the overlay and hamburgerMenu.
       *
       * @event click
       */
      $('.hamburger-toggle').on('click', function (e) {
        hamburgerMenu.addClass('js-opened');
        overlay.addClass('js-opened');
      });

      /**
       * Indicates that a user has clicked on the close hamburger menu
       * toggle.
       *
       * Closes the overlay and hamburgerMenu.
       *
       * @event click
       */
      close.add(overlay).on('click', function (e) {
        e.preventDefault();
        hamburgerMenu.removeClass('js-opened');
        overlay.removeClass('js-opened');
      });
    }
  });
})(jQuery);
