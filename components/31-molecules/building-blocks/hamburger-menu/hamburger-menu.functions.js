var gent_styleguide = gent_styleguide || {};

var hamburger_component = gent_styleguide.components = (function (context) {
  'use strict';

  /**
   * Creates a hamburger menu object.
   *
   * @param {object} element DOM-element.
   * @constructor
   */
  function HamburgerMenu(element) {
    this.loadHamburgerMenu = function () {

      var drawer = element.querySelector('.hamburger-menu__drawer');
      var closeBtn = drawer.querySelector('.close');
      var overlay = element.querySelector('.hamburger-menu__overlay');
      var trigger;

      if (typeof gent_styleguide === 'undefined') {
        console.error('You need to include base.js.'); // eslint-disable-line no-console
        return;
      }

      var helper = new base.Helper();
      var tabTrap = new base.TabTrap(drawer); // eslint-disable-line no-undef

      /**
       * Closes the hamburger menu
       *
       * @param {event} e onclick or keydown:escape
       */
      var close = function (e) {
        if (e) {
          e.preventDefault();
        }
        helper.removeClass(drawer, 'js-opened');
        helper.removeClass(overlay, 'js-opened');

        document.removeEventListener('keydown', handleKeyboardInput);
        tabTrap.reset();

        // return focus to the trigger
        if (trigger) {
          trigger.focus();
          trigger.setAttribute('aria-expanded', false);
        }

        // remove the menu from the tabindex
        // jquery .css() doesn't now 'important'
        setTimeout(function () {
          drawer.setAttribute('style', 'display: none');
        }, 500);
      };

      /**
       * Opens the hamburger menu
       *
       * @param {event} e onclick
       */
      var open = function (e) {
        if (e) {
          e.preventDefault();
        }

        // add the menu to the tabindex
        // jquery .css() doesn't now 'important'
        drawer.setAttribute('style', 'display: block');

        setTimeout(function () {
          helper.addClass(drawer, 'js-opened');
          helper.addClass(overlay, 'js-opened');
        });


        // remember the trigger
        trigger = e.target;
        trigger.setAttribute('aria-expanded', true);

        // set focus to the menu
        drawer.focus();

        // handle keyboard input
        document.addEventListener('keydown', handleKeyboardInput);
      };

      /**
       * Handle keyboard input
       *
       * @param {object} e event
       */
      var handleKeyboardInput = function (e) {

        if (!tabTrap || !tabTrap.hasFocusables || !e) {
          return;
        }

        var keyCode = e.keyCode || e.which;

        switch (keyCode) {
          case 9: // tab
            e.preventDefault();
            if (e.shiftKey) {
              tabTrap.back();
            }
            else {
              tabTrap.next();
            }
            break;
          case 40: // arrow down
          case 39: // arrow right
            e.preventDefault();
            tabTrap.next();
            break;
          case 38: // arrow up
          case 37: // arrow left
            e.preventDefault();
            tabTrap.back();
            break;
          case 36: // home
            e.preventDefault();
            tabTrap.home();
            break;
          case 35: // end
            e.preventDefault();
            tabTrap.end();
            break;
          case 27: // esc
            close(e);
            break;
        }
      };

      /**
       * Indicates that a user has clicked on the hamburger toggle.
       *
       * Opens the overlay and hamburgerMenu.
       *
       * @event click
       */
      var toggle = element.querySelector('.hamburger-menu__toggle');
      if (toggle) {
        toggle.addEventListener('click', open);
      }

      /**
       * Indicates that a user has clicked on the closeBtn hamburger menu
       * toggle.
       *
       * Closes the overlay and hamburgerMenu.
       *
       * @event click
       */
      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', close);

      // init the menu as closed on startup
      close();

    };
  }

  return {
    HamburgerMenu: HamburgerMenu
  };

})(hamburger_component);
