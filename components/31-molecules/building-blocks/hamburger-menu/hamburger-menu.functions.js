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

        if (focusables && e) {
          var keyCode = e.keyCode || e.which;
          console.log(keyCode);

          // tab trap
          if (keyCode === 9) {
            e.preventDefault();

            var next;
            if (e.shiftKey) {
              if (--focusPosition < 0) {
                focusPosition = focusables.length - 1;
              }
              next = focusables[focusPosition];
            }
            else {
              if (++focusPosition > focusables.length - 1) {
                focusPosition = 0;
              }
              next = focusables[focusPosition];
            }

            next.focus();
          }
          // escape
          else if (keyCode === 27) {
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
