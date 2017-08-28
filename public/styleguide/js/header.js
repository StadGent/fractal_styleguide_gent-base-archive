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
  $(window).on('load', loadMobileHeader);

  /**
   * Replace the mobile breadcrumb of Gent base by our own.
   */
  function loadMobileHeader() {
    var mobileHeader = $('.header-search-mobile');
    var searchForm = mobileHeader.find('.form-search');
    var searchInput = mobileHeader.find('input[type="search"]');
    var searchButton = searchForm.find('button');
    var closeButton = mobileHeader.find('.close');

    searchButton.on('click', function (e) {
      if (!searchButton.hasClass('js-form-search-opened')) {
        e.preventDefault();
      }
      mobileHeader.addClass('js-form-search-opened');
      searchInput.addClass('js-form-search-opened');
      closeButton.addClass('js-form-search-opened');
    });

    closeButton.on('click', function (e) {
      mobileHeader.removeClass('js-form-search-opened');
      searchInput.removeClass('js-form-search-opened');
      closeButton.removeClass('js-form-search-opened');
    });
  }

})(jQuery);
