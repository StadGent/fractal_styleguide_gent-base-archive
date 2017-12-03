var gent_styleguide = gent_styleguide || {};

/**
 * Generates a tabTrap object.
 *
 * @param {object} container DOM-element.
 * @constructor
 */
gent_styleguide.TabTrap = function (container) {
  'use strict';

  var focusPosition = -1;
  var focusables = getFocusables(container);

  /**
   * Returns all focusable elements within a given container.
   *
   * @param {object} container hamburger DOM-element
   * @return {array} focusable elements
   */
  function getFocusables(container) {
    var focusables = container
      .querySelectorAll('a[href], ' +
        'area[href], ' +
        'input:not([disabled]):not([hidden]), ' +
        'select:not([disabled]), ' +
        'textarea:not([disabled]), ' +
        'button:not([disabled]), ' +
        '[tabindex="0"]');
    return Array.prototype.slice.call(focusables);
  }

  var next = function () {
    if (++focusPosition > focusables.length - 1) {
      focusPosition = 0;
    }
    focusables[focusPosition].focus();
  };

  var back = function () {
    if (--focusPosition < 0) {
      focusPosition = focusables.length - 1;
    }
    focusables[focusPosition].focus();
  };

  var home = function () {
    focusPosition = 0;
    focusables[focusPosition].focus();
  };

  var end = function () {
    focusPosition = focusables.length - 1;
    focusables[focusPosition].focus();
  };

  var reset = function () {
    focusPosition = -1;
  };

  var hasFocusables = focusables && focusables.length > 0;

  return {
    next: next,
    back: back,
    home: home,
    end: end,
    reset: reset,
    hasFocusables: hasFocusables
  };
};

gent_styleguide.helper = (function () {
  'use strict';

  /**
   * Removes a class from a DOM-element.
   *
   * @param {object} element DOM-element.
   * @param {string} className A class name.
   */
  var removeClass = function (element, className) {
    if (element.classList) {
      element.classList.remove(className);
    }
  };

  /**
   * Adds a class from a DOM-element.
   *
   * @param {object} element DOM-element.
   * @param {string} className A class name.
   */
  var addClass = function (element, className) {
    if (element.classList) {
      element.classList.add(className);
    }
    else {
      element.classList += ' ' + className;
    }
  };

  return {
    removeClass: removeClass,
    addClass: addClass
  };

})();
