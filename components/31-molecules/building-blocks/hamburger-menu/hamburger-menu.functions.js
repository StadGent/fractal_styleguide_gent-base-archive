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
      var hamburgerMenu = $(this[0]);
      var closeBtn = hamburgerMenu.find('.close');
      var overlay = $('.hamburger-menu-overlay');
      var trigger;

      if(typeof gent === 'undefined') {
        console.error('You need to include base.js.');
        return;
      }

      var tabTrap = new gent.TabTrap(this[0]);

      /**
       * Closes the hamburger menu
       *
       * @param {event} e onclick or keydown:escape
       */
      var close = function (e) {
        if (e) {
          e.preventDefault();
        }
        hamburgerMenu.removeClass('js-opened');
        overlay.removeClass('js-opened');
        document.removeEventListener('keydown', handleKeyboardInput);

        // return focus to the trigger
        if (trigger) {
          trigger.focus();
          trigger.setAttribute('aria-expanded', false);
        }

        // remove the menu from the tabindex
        // jquery .css() doesn't now 'important'
        setTimeout(function () {
          hamburgerMenu.attr('style', 'display: none');
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
        hamburgerMenu.attr('style', 'display: block');

        setTimeout(function () {
          hamburgerMenu.addClass('js-opened');
          overlay.addClass('js-opened');
        });


        // remember the trigger
        trigger = e.target;
        trigger.setAttribute('aria-expanded', true);

        // set focus to the menu
        hamburgerMenu.focus();

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

      // init the menu as closed on startup
      close();
    }
  });
})(jQuery);
