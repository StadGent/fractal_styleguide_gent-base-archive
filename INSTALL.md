# Functionality
This repository contains an styleguide based on the Fractal build tool. You can compile the styleguide into static HTML/CSS and export the used defined components into an SASS library that can be used into other projects.


## Installation
Run `gulp` or `gulp watch` and go to [localhost:3000](http://localhost:3000).


## Publishing (Digipolis only)
```
$ gulp publish --username=XXX --password=XXX --email=XXX
```
This command is used to publish an extract of the styleguide to the NPM registry.
It is then supposed to be used inside a Drupal 8 theme.
