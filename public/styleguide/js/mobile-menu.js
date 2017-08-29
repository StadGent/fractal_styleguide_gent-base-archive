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
  $(window).on('load', loadMobileMenu);

  /**
   * Replace the mobile breadcrumb of Gent base by our own.
   */
  function loadMobileMenu() {
    var mobileMenu = $('.mobile-menu');
    var toggle = $('.mobile-toggle');
    var close = mobileMenu.find('.close');
    var overlay = $('.mobile-menu-overlay');

    toggle.on('click', function (e) {
      mobileMenu.addClass('js-opened');
      overlay.addClass('js-opened');
    });

    close.on('click', function (e) {
      e.preventDefault();
      mobileMenu.removeClass('js-opened');
      overlay.removeClass('js-opened');
    });
  }

})(jQuery);
