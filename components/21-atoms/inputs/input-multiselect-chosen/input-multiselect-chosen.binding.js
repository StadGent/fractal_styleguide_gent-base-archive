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
  $(window).on('load', initMultiselectChosen);

  /**
   * Replace the mobile breadcrumb of Gent base by our own.
   */
  function initMultiselectChosen() {
    $('.chosen-select').chosen({disable_search: true});
  }

})(jQuery);
