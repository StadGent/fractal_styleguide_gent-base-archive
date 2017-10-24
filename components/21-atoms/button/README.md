# Buttons
There are 3 types of buttons defined:
* Small
* Medium (default)
* Large

By default buttons are always inline!
That means when you want to create a full width button you will need to use the `btn-block` mixin we provide.

We provide the some classes to add to elements that need to be styled like buttons:
We also provide a SASS placeholder.

## Small buttons
* `%btn--small`
* `.small.btn`
* `.btn--small`

## Medium buttons
* `%btn--medium`
* `.medium.btn`
* `.btn--medium`

## Large buttons
* `%btn--large`
* `.large.btn`
* `.btn--large`

Furthermore to improve semantic HTML we provide SASS mixins to create these buttons.
* `@mixin btn-s;` for small buttons.
* `@mixin btn-m;` for medium buttons (default).
* `@mixin btn-l;` for large buttons.
