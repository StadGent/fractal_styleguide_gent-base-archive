---
title: Mixins 
---

This styleguide uses a lot of mixins throughout its code.
We encourage you to use these where necessary.

## Overview of mixins
- **[Breakpoint mixins](#breakpoints)**:
  - tablet();
  - tablet-only();
  - desktop();
  
  
- **[General mixins](#general)**:
  - clearfix();
  - color-element-states($color, $color-hover, $property);
  - triangle($direction, $size-h, $size-v, $color);
  
  
- **[Themify mixins](#themify)**:
   - themify($themes);
   
   
- **[Grid mixins](#grid)**:
  - make-row($gutter);
  - make-mobile-column($columns, $gutter);
  - make-mobile-column-push($columns);
  - make-mobile-column-pull($columns);
  - make-tablet-column($columns, $gutter: $gutter-width);
  - make-tablet-column-offset($columns);
  - make-tablet-column-push($columns);
  - make-tablet-column-pull($columns);
  - make-desktop-column($columns, $gutter: $gutter-width);
  - make-desktop-column-offset($columns);
  - make-desktop-column-push($columns);
  - make-desktop-column-pull($columns);


## <a name="breakpoints"></a>Breakpoint mixins 

### tablet();
**Description:**
Tablet breakpoint (see $bp-tablet defined in _vars.scss).
This asumes a min-width as defined by the variable.

**Implementation:**
```
@mixin tablet {
  @include breakpoint($bp-tablet) {
    @content;
  }
}
```
**Usage:**
```
@include tablet { ... }
```

***

### tablet-only();
**Description:**
Tablet-only breakpoint (see $bp-tablet defined in _vars.scss).
This asumes a min-width as defined by the $bp-tablet variable and a max-width as defined by the $bp-desktop variable.

**Implementation:**
```
@mixin tablet-only {
  @include breakpoint($bp-tablet $bp-desktop) {
    @content;
  }
}
```
**Usage:**
```
@include tablet-only { ... }
```

***

### tablet-only();
**Description:**
Desktop breakpoint (see $bp-tablet defined in _vars.scss).
This asumes a min-width as defined by the variable.

**Implementation:**
```
@mixin desktop {
  @include breakpoint($bp-desktop) {
    @content;
  }
}
```
**Usage:**
```
@include desktop { ... }
```

## <a name="general"></a>General mixins 
## <a name="themify"></a>Themify mixins 
## <a name="grid"></a>Grid mixins 
