/**
 * @file
 * Implements Ghent's opening hours widgets.
 *
 * @author
 * Jeroen Goossens
 *
 */
(function ($) {
  'use strict';

  $.fn.openingHours = function (options) {
    function _getDate(date) {
      return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    }

    var now = new Date();
    var defaults = {
      endpoint: '//openingsuren.stad.gent'
    };
    options = $.extend(defaults, options);

    $(this).each(function (i) {
      function _getOpeningHours(element) {
        if (typeof element.data('service') !== 'number' || typeof element.data('channel') !== 'number') {
          element.html('Error: Please provide a service and channel.');
          return null;
        }

        if (typeof element.data('date') === 'string' && element.data('type') === 'open-now') {
          element.html('Error: Date is not supported in the "open now" widget.');
          return null;
        }

        var date;
        if (typeof element.data('date') !== 'string') {
          date = new Date();
        }
        else {
          date = new Date(element.data('date'));
        }
        date = _getDate(date);

        switch (element.data('type')) {
          case 'open-now':
            _request(options.endpoint + '/api/v1/services/' + element.data('service') + '/channels/' + element.data('channel') + '/open-now');
            break;
          case 'month':
            _request(options.endpoint + '/api/v1/services/' + element.data('service') + '/channels/' + element.data('channel') + '/openinghours/month?date=' + date);
            break;
          default:
            var until = new Date();
            until.setDate(now.getDate() + 6);
            _request(options.endpoint + '/api/v1/services/' + element.data('service') + '/channels/' + element.data('channel') + '/openinghours?from=' + date + '&until=' + _getDate(until));
            break;
        }
      }
      function _request(request) {
        $.ajax({
          url: request,
          dataType: 'html',
          success: function (html) {
            element.html(html);
          }
        });
      }

      var element = $(this);
      _getOpeningHours(element);
    });
  };
}(jQuery));
