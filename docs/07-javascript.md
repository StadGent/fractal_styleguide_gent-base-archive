---
title: Javascript libraries
---

This styleguide offers some Javascript functionality to
be used in various situations or to implement part of
the behaviour of this Styleguide.

## Javascript conventions
Javascript files are organized per component. Each component consists of
the following files namely:

* COMPONENT.functions.js (optional if an external library is implemented)
* COMPONENT.binding.js

Depending on the implementation of the styleguide either the functions.js
file or both are necessary.

Take into consideration that all Javascript included in this styleguide is
dependent on:

* [base.js](/docs/base.js)
* jQuery

### Component.functions.js
This is the main functionalty of a component. This file defines several jQuery
function extensions that can be implemented in your project.

Use this file if you want to write your own bindings or integrate it into
another Javascript framework, eg. integration in a Drupal theme.

### Component.binding.js
This file integrates the Component.functions.js with the Styleguide components
inside Fractal. These bindings can be used inside your own project to implement
the correct Javascript functionality per component.

## Javascript enabled components
Inside this stylguide we have the following Javascript enabled components:

** Atoms **
* Button-drop
* Input-multiselect-chosen

** Molecules **
* Breadcrumbs
* Hamburger-menu
* Gallery

** Organisms **
* Header

### Button-drop
#### Button-drop.functions.js
Implements a drop-down button based on a list element.

* dropButtonLoad(): jQuery extension to bind the drop-down functionality to a
DOM element.

#### Button-drop.binding.js
Binds the functionality to a DOM element and the window.onload event
inside this styleguide.

#### Styleguide implementation
[Button-drop atom](../../components/detail/button-drop)

### Input multi-select chosen
We omitted to create a functions.js file, since all functions are provided
by the Chosen jQuery plugin.

**Dependencies**
[Chosen jQuery plugin](https://github.com/harvesthq/chosen)

#### Input-multiselect-chosen.binding.js
Implements chosen jQuery plugin in this Styleguide.

#### Styleguide implementation
[Button-drop atom](../../components/detail/input-multiselect-chosen)

### Breadcrumbs
#### Breadcrumbs.functions.js
Implements the default Breadcrumb behavior of the Styleguide. A new global
namespace: gentStyleGuideBreadcrum has been created to give access to the
public functionality of this script. As such the following public functions are
available

* gentStyleGuideBreadcrumb.updateMobileBreadcrumb(): Replace the default Breadcrumb
with a mobile optimized one.

#### Breadcrumbs.binding.js
Integration of the breadcrumb functionality with this Styleguide. Calls the
gentStyleGuideBreadcrumb.updateMobileBreadcrumb() method on the window.load
event.

#### Styleguide implementation
[Breadcrumbs molecule](../../components/detail/breadcrumbs)

### Hamburger-menu
#### Hamburger-menu.functions.js
Implements a hamburger-menu button combined with a slide-in panel for easy navigation.

* loadHamburgerMenu(): jQuery extension to bind the slide functionality to a
DOM element.

#### Hamburger-menu.binding.js
Binds the functionality to a DOM element and the window.onload event
 inside the styleguide.

#### Styleguide implementation
[Hamburger-menu molecule](../../components/detail/hamburger-menu)

### Gallery
We omitted to create a functions.js file, since all functions are provided
by the swipebox jQuery plugin.

**Dependencies**
[Swipebox jQuery plugin](http://brutaldesign.github.io/swipebox/)

#### Gallery.binding.js
Implements swipebox jQuery plugin in this Styleguide.

### Header
#### Header.functions.js
Implements a minimized search botton combined with a slide-in form for easy searching on obile devices.

* loadMobileHeader(): jQuery extension to bind the search functionality to a
DOM element.

#### Header.bindings.js
Binds the functionality to a DOM element and the window.onload event
 inside this styleguide.

#### Styleguide implementation
[Header organism](../../components/detail/hamburger-menu)
