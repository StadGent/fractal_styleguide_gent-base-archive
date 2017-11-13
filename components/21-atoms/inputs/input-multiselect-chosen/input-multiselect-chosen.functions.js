/**
 * @file
 * Implements the jQuery Chosen plugin.
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
    loadChosenSelect: function () {
      $(this).chosen({disable_search: true});
    }

  });
})(jQuery);
