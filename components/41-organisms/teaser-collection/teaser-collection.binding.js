/**
 * @file
 */
(function ($) {
  'use strict'
    $(window).on('load', function (e) {
        $('.js-masonry-layout').masonry({
          itemSelector: 'li',
          columnWidth: 'li',
          percentPosition: true
        });
    });
})(jQuery);
