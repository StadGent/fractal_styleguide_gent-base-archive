/**
 * @file
 * Javascript binding of breadcrumb.functions.js
 */
(function ($) {
  'use strict';

  $(window).on('load', function (e) {
    gentStyleGuideBreadcrumb.updateMobileBreadcrumb();
  });

})(jQuery);
