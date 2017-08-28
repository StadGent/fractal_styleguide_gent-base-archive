(function ($) {
  'use strict';

  /**
   * Invoked after after loading the initial page and after each AJAX request.
   *
   * @param context
   *   The DOM context.
   * @param settings
   *   Object of additional settings.
   */
  $(window).on('load', loadHamburgerMenu);

  /**
   * Replace the hamburger menu.
   */
  function loadHamburgerMenu() {
    var hamburgerMenu = $('.hamburger-menu');
    var toggle = $('.hamburger-toggle');
    var close = hamburgerMenu.find('.close');
    var overlay = $('.hamburger-menu-overlay');

    toggle.on('click', function (e) {
      hamburgerMenu.addClass('js-opened');
      overlay.addClass('js-opened');
    });

    close.on('click', function (e) {
      e.preventDefault();
      hamburgerMenu.removeClass('js-opened');
      overlay.removeClass('js-opened');
    });
  }

})(jQuery);
