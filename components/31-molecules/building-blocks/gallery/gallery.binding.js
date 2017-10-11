(function ($) {
  'use strict';

  $(document).ready(function () {
    $('.gallery').lightGallery({
      download: false,
      getCaptionFromTitleOrAlt: false,
      counter: false
    });
  });

})(jQuery);
