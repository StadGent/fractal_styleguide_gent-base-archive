var gent_styleguide = gent_styleguide || {};

var base = gent_styleguide.base = (function () { // eslint-disable-line no-unused-vars
  'use strict';

  /**
   * Generates a tabTrap object.
   *
   * @param {object} container DOM-element.
   * @constructor
   */
  function TabTrap(container) {
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

    this.next = function () {
      if (++focusPosition > focusables.length - 1) {
        focusPosition = 0;
      }
      focusables[focusPosition].focus();
    };

    this.back = function () {
      if (--focusPosition < 0) {
        focusPosition = focusables.length - 1;
      }
      focusables[focusPosition].focus();
    };

    this.home = function () {
      focusPosition = 0;
      focusables[focusPosition].focus();
    };

    this.end = function () {
      focusPosition = focusables.length - 1;
      focusables[focusPosition].focus();
    };

    this.reset = function () {
      focusPosition = -1;
    };

    this.hasFocusables = focusables && focusables.length > 0;
  }

  /**
   * Generates a Helper object.
   *
   * @constructor
   */
  function Helper() {

    /**
     * Removes a class from a DOM-element.
     *
     * @param {object} element DOM-element.
     * @param [string] className A class name.
     */
    this.removeClass = function (element, className) {
      if (element.classList) {
        element.classList.remove(className);
      }
    };

    /**
     * Adds a class from a DOM-element.
     *
     * @param {object} element DOM-element.
     * @param [string] className A class name.
     */
    this.addClass = function (element, className) {
      if (element.classList) {
        element.classList.add(className);
      }
      else {
        element.classList += ' ' + className;
      }
    };
  }

  return {
    TabTrap: TabTrap,
    Helper: Helper
  };

})(base);
