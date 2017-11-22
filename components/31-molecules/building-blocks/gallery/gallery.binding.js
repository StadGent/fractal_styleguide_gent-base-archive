(function ($) {
  'use strict';

  $(document).ready(function () {
    var $gallery = $('.gallery');

    if ($gallery.length > 0) {
      $gallery.loadLightGallery();
    }
  });

})(jQuery);
