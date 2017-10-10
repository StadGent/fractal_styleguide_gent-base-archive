---
title: Before you start
---

## Important!
**Before you start using this style guide in your project you should read this section!**

## Using sections
As you can see, one of the first SASS files that get loaded are the sections `@import '02-sections/**/*';` right after the settings and mixins. We do this because you are supposed to work within these "containers". They make sure the proper padding, colors and others various settings are correctly applied in relationship to one another.

You can see an example of this on the Sections Overview template under the menu tab `Templates`.

## Component variables and sections
In the `components/00-settings/_vars.scss` file you will find a SASS map `$themes` that defines all section types.
Atoms then base their styling on the section they are in.

