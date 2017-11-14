/**
 * @file
 * Implements a hamburger-menu button combined with
 * a slide-in panel for easy mobile navigation.
 *
 * @author
 * Wim Vantomme
 *
 */
(function ($) {
  'use strict';

  $.fn.extend({

    /**
     * Creates a jQuery extension function.
     *
     * @fires event:click
     */
    loadHamburgerMenu: function () {
      var hamburgerMenu = $(this);
      var closeBtn = hamburgerMenu.find('.closeBtn');
      var overlay = $('.hamburger-menu-overlay');
      var focusPosition = -1;
      var trigger;

      /**
       * Returns all focusable elements within a given container.
       *
       * @param {object} container hamburger DOM-element
       * @return {array} focusable elements
       */
      var getFocusables = function (container) {
        var focusables = container
          .querySelectorAll('a[href], ' +
            'area[href], ' +
            'input:not([disabled]):not([hidden]), ' +
            'select:not([disabled]), ' +
            'textarea:not([disabled]), ' +
            'button:not([disabled]), ' +
            '[tabindex="0"]');
        return Array.prototype.slice.call(focusables);
      };
      // todo what if there are two hamburger menu's?
      var focusables = getFocusables(this[0]);

      /**
       * Closes the hamburger menu
       *
       * @param {event} e onclick or keydown:escape
       */
      var close = function (e) {
        e.preventDefault();
        hamburgerMenu.removeClass('js-opened');
        overlay.removeClass('js-opened');
        document.removeEventListener('keydown', handleKeyboardInput);

        // return focus to the trigger
        if (trigger) {
          trigger.focus();
        }
      };

      /**
       * Opens the hamburger menu
       *
       * @param {event} e onclick
       */
      var open = function (e) {
        e.preventDefault();
        hamburgerMenu.addClass('js-opened');
        overlay.addClass('js-opened');

        // remember the trigger
        trigger = e.target;

        // set focus to the first element
        focusables[0].focus();

        // handle keyboard input
        document.addEventListener('keydown', handleKeyboardInput);
      };

      /**
       *
       * @param {object} e event
       */
      var handleKeyboardInput = function (e) {

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

        if (focusables && e) {
          var keyCode = e.keyCode || e.which;

          // tab trap
          if (keyCode === 9) {
            e.preventDefault();

            if (e.shiftKey) {
              back();
            }
            else {
              next();
            }
          }
          // arrow down, arrow left
          else if (keyCode === 40 || keyCode === 39) {
            e.preventDefault();
            next();
          }
          // arrow up, arrow right
          else if (keyCode === 38 || keyCode === 37) {
            e.preventDefault();
            back();
          }
          // escape
          else if (keyCode === 27) {
            e.preventDefault();
            close(e);
          }


        }
      };

      /**
       * Indicates that a user has clicked on the hamburger toggle.
       *
       * Opens the overlay and hamburgerMenu.
       *
       * @event click
       */
      $('.hamburger-toggle').on('click', open);

      /**
       * Indicates that a user has clicked on the closeBtn hamburger menu
       * toggle.
       *
       * Closes the overlay and hamburgerMenu.
       *
       * @event click
       */
      closeBtn.add(overlay).on('click', close);
    }
  });
})(jQuery);
