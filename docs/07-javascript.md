---
title: Javascript libraries
---

This styleguide offers some Javascript functionality to
be used in various situations or to implement part of
the behaviour of this Styleguide.

## Javascript conventions
Javascript files are organized per component. Each component has at least
to distinct Javascript files namely:

* COMPONENT-functions.js
* COMPONENT.binding.js

Depending on the implementation of the styleguide either the functions.js
file or both are necessary.

Take into consideration that all Javascript included in this styleguide is
dependant on:

* jQuery

### Component-functions.js
This is the main functionalty of a component. This file defines several jQuery
function extensions that can be implemented in your project.

Use this file if you want to write your own bindings or integrate it into
another Javascript framework, eg. integration in a Drupal theme.

### Component.binding.js
This file integrates the Component-functions.js with the Styleguide components
inside Fractal. These bindings can be used inside your own project to implement
the correct Javascript functionality per component.

## Javascript enabled components
Inside this stylguide we have the following Javascript enabled components:

* Hamburger-menu

### Hamburger-menu

[Hamburger-menu molecule](../../components/detail/hamburger-menu)
