/**
 * @file
 * Javascript binding of header.functions.js.
 */
(function ($) {
  'use strict';

  $(window).on('load', function (e) {
    $('.header-search-mobile').loadMobileHeader();
    $('header.header .content-container').displaySiteName();
  });

  $(window).on('resize', function (e) {
    $('header.header .content-container').displaySiteName();
  });

})(jQuery);
