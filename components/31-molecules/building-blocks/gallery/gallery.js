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
  $(window).on('load', loadSwipeboxGalleries);

  /**
   * Initialise swipebox galleries.
   */
  function loadSwipeboxGalleries() {
    $('.swipebox').swipebox();
  }

})(jQuery);
