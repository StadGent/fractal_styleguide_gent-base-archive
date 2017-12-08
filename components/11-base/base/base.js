var gent_styleguide = gent_styleguide || {};

/**
 * Generates a tabTrap object.
 *
 * @param {object} container DOM-element.
 * @constructor
 */
export class TabTrap {
  constructor(container) {
    this.focusPosition = -1;
    this.focusables = this.getFocusables(container);
    this.hasFocusables = this.focusables && this.focusables.length > 0;
  }

  /**
   * Returns all focusable elements within a given container.
   *
   * @param {object} container hamburger DOM-element
   * @return {array} focusable elements
   */
  getFocusables(container) {
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

  next() {
    if (++this.focusPosition > this.focusables.length - 1) {
      this.focusPosition = 0;
    }
    this.focusables[this.focusPosition].focus();
  }

  back() {
    if (--this.focusPosition < 0) {
      this.focusPosition = this.focusables.length - 1;
    }
    this.focusables[this.focusPosition].focus();
  }

  home() {
    this.focusPosition = 0;
    this.focusables[this.focusPosition].focus();
  }

  end() {
    this.focusPosition = this.focusables.length - 1;
    this.focusables[this.focusPosition].focus();
  }

  reset() {
    this.focusPosition = -1;
  }
}

gent_styleguide.helper = (function () {

  // @todo document functions
  // @todo refactor or remove addClass, removeClass
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

  /**
   * Adds an animation event to a DOM-element for
   * mozilla, IE, chrome and opera
   *
   * @param {object} element DOM-element.
   * @param {string} type geneneric name of the event.
   * @param {function} next callback function for the event.
   */
  var prefixedAnimationEvent = function (element, type, next) {
    var prefixes = ['webkit', 'moz', 'MS', 'o', ''];

    for (var i = prefixes.length; i--;) {
      element.addEventListener(prefixes[i] + type, next);
    }
  };

  return {
    removeClass: removeClass,
    addClass: addClass,
    prefixedAnimationEvent: prefixedAnimationEvent
  };

})();
