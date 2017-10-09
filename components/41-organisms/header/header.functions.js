/**
 * @file
 * Implements a responsive search element in
 * the header of a website.
 *
 * @author
 * Wim Vantomme
 *
 */
(function ($) {
  'use strict';

  $.fn.extend({

    /**
     * Implements a jQuery extension function.
     *
     * @fires event:click
     */
    loadMobileHeader: function () {
      var mobileHeader = $(this);
      var searchForm = mobileHeader.find('.form-search');
      var searchInput = mobileHeader.find('input[type="search"]');
      var searchButton = searchForm.find('button');
      var closeButton = mobileHeader.find('.close');

      /**
       * Opens, submits or closes the mobile form.
       *
       * @event click
       */
      searchButton.on('click', function (e) {
        // Prevent button submission when form is closed.
        if (!searchButton.hasClass('js-form-search-opened')) {
          e.preventDefault();
        }

        mobileHeader.addClass('js-form-search-opened');
        searchInput.addClass('js-form-search-opened');
        closeButton.addClass('js-form-search-opened');
      });

      // Close the mobile form.
      closeButton.on('click', function (e) {
        mobileHeader.removeClass('js-form-search-opened');
        searchInput.removeClass('js-form-search-opened');
        closeButton.removeClass('js-form-search-opened');
      });
    }
  });
})(jQuery);
