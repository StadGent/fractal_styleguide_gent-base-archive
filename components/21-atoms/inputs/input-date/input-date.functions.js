/**
 * @file
 * Implements the jQuery UI datepicker plugin.
 *
 * @author
 * Gert-Jan Meire
 *
 */
(function ($) {
  'use strict';

  $.fn.extend({

    /**
     * Creates a jQuery extension function.
     *
     */
    loadDatepicker: function () {
      $(this).datepicker({
        showWeek: true,
        altFormat: 'dd-mm-yy'
      });
    }
  });
})(jQuery);
