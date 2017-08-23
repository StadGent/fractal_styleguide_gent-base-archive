---
title: Before you start
---

### Important!
**Before you start using this style guide in your project you should read this section!**

### Using sections
As you can see, one of the first SASS files that get loaded are the sections `@import '02-sections/**/*';` right after the settings and mixins. We do this because you are supposed to work within these "containers". They make sure the proper padding, colors and others various settings are correctly applied in relationship to one another.

You can see an example of this on the Sections Overview template under the menu tab `Templates`.

#### Component variables and sections
In the `components/00-settings/_vars.scss` file you will find a section called **Section dependent variables**
This section provides you with variables that can be set to define the styling of atoms, molecules and organisms.

**But it should be noted that these might get overridden when those atoms, molecules or organisms are used within the context of a section!**

So for example:
```
$heading-1-color: #ff0000;
```

```
h1,
.h1,
%h1 {
  ...
  color: $heading-1-color;
  ...
}

```
Headings (h1) get a color based on the variable `$heading-1-color`.
But headings used within a `.section--wrapper` get a color of #ffffff; because the `_section_wrapper.scss` partial defines a link to be white instead of the color defined inside the `_vars.scss` file.

