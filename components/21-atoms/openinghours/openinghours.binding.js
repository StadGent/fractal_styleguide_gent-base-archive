/**
 * @file
 * Javascript binding of header.functions.js.
 */
(function ($) {
  'use strict';

  $(window).on('load', function (e) {
    $('.openinghours').openingHours();
  });

})(jQuery);
