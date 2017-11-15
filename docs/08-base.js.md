---
title: base.js
---

base.js contains all global variables and must be included before all other javascript files.  
Global variables are prefixed with **gent_styleguide** to avoid contamination.

## Objects

### TabTrap

TabTrap enables looping over the focusable elements within the given DOM-element.  
**Use this only when the DOM-element blocks others from view, e.g.**

* a modal window
* mobile navigation

#### Properties:

* hasfocusables (boolean): does the DOM-element contain focusable elements?
* next(): place focus on the next focusable element.
* back(): place focus on the previous focusable element.
* home(): place focus on the first focusable element.
* end(): place focus on the last focusable element.

#### Attention:

Detecting and handling keyboard input remains the responsibility of the invoking function!

#### Usage: 
```
var tabTrap = new gent_styleguide.TabTrap(container);

// handle keyboard input
// e.g. keyCode === 9
e.preventDefault();
tabTrap.next();


```