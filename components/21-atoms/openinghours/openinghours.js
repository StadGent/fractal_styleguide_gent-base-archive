window.openingHours = (function () {
  'use strict';

  var defaults = {
    endpoint: 'https://openingsuren.gentgrp.gent.be'
  };

  function OpeningHours(items, options) {
    this.s = Object.assign({}, defaults, options);
    this.items = items;

    for (var i = 0; i < items.length; i++) {
      this._current = items[i];
      this.init(items[i]);
    }

    return this;
  }

  OpeningHours.prototype.init = function () {
    if (isNaN(this._current.dataset.service) || isNaN(this._current.dataset.channel)) {
      this._current.innerHTML = 'Error: Please provide a service and channel.';
      return false;
    }

    if (typeof this._current.dataset.date === 'string' && this._current.dataset.type === 'open-now') {
      this._current.innerHTML = 'Error: Date is not supported in the "open now" widget.';
      return false;
    }

    if (typeof this._current.dataset.date === 'undefined') {
      this._current.dataset.date = new Date().toUTCString();
    }

    var url = this.constructRequest();
    this.request(url, this.print);
  };

  OpeningHours.prototype.formattedDate = function (d) {
    var date;
    if (!d) {
      date = new Date();
    }
    else {
      date = new Date(d);
    }

    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  };

  OpeningHours.prototype.constructRequest = function () {
    switch (this._current.dataset.type) {
      case 'open-now':
        return this.s.endpoint + '/api/v1/services/' + this._current.dataset.service + '/channels/' + this._current.dataset.channel + '/open-now';
      case 'month':
        return this.s.endpoint + '/api/v1/services/' + this._current.dataset.service + '/channels/' + this._current.dataset.channel + '/openinghours/month?date=' + this.formattedDate(this._current.dataset.date);
      default:
        var until = new Date(this._current.dataset.date);
        until.setDate(until.getDate() + 6);
        return this.s.endpoint + '/api/v1/services/' + this._current.dataset.service + '/channels/' + this._current.dataset.channel + '/openinghours?from=' + this.formattedDate(this._current.dataset.date) + '&until=' + this.formattedDate(until);
    }
  };

  OpeningHours.prototype.request = function (url, callback) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.element = this._current;
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.element, xmlhttp.responseText);
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.setRequestHeader('Accept', 'text/html');
    xmlhttp.send();
  };

  OpeningHours.prototype.print = function (element, data) {
    element.innerHTML = data;
  };

  var openinghours = {
    load: function (options) {
      var items = document.querySelectorAll('.openinghours');
      new OpeningHours(items, options);
    }
  };

  return openinghours;
}());

document.onreadystatechange = function () {
  'use strict';

  if (document.readyState === 'interactive') {
    window.openingHours.load();
  }
};
