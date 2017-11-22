# Styleguide Gent Base
This style guide contains the SASS library and needed assets to be able to style a web application in the corporate identity for the city of Ghent..

## Licenses 

If you are building something for the City of Ghent (Stad Gent) or Digipolis, you can contact the web team at Digipolis or open an issue here to get the necessary licenses thar are required for your project.
For more info on what licenses you need see below.

### License: Expressway font
The Expressway font is a paying font used by the style guide of the City of Ghent. It needs to be included through Typekit 

### License: Light Gallery plugin for jQuery
It is important to note that anyone that wants to use this style guide or fork this repository for commercial purposes, should [pay for a license](http://sachinchoolur.github.io/lightGallery/docs/license.html)!

## Folder structure
When installing this package, you will get a directory structure like this.
```
.
├── CHANGELOG.md
├── LICENSE
├── README.md
├── build
│   └── styleguide
│       └── sass
└── package.json
```
The build directory contains all SASS source files and all asset files needed to be able to style a web application in the corporate identity for the city of Ghent..

## Implementing this style guide in your own project
This style guide aims to be technology independent. This means you should be able to use it inside your project with wathever technology you want.
It utilizes SASS to style its components, so you will have to use that in your project.

After installing the style guide through `npm install gent_styleguide` you''ll get a folder structure like this:

```
.
├── node_modules
│   └── gent_styleguide
│   └── breakpoint-sass
├── package-lock.json
└── package.json
```

Now, to use the style guide SASS partials you just need to import them into your main SASS file at the top so they get loaded before your own code.
```
@import 'node_modules/gent_styleguide/build/sass/00-settings/reset';
@import 'node_modules/gent_styleguide/build/sass/00-settings/vars';
@import 'node_modules/gent_styleguide/build/sass/02-mixins/**/*';
@import 'node_modules/gent_styleguide/build/sass/02-sections/**/*';
@import 'node_modules/gent_styleguide/build/sass/11-base/**/*';
@import 'node_modules/gent_styleguide/build/sass/21-atoms/**/*';
@import 'node_modules/gent_styleguide/build/sass/31-molecules/**/*';
@import 'node_modules/gent_styleguide/build/sass/41-organisms/**/*';
@import 'node_modules/gent_styleguide/build/sass/51-templates/**/*';
```

Note: When using the style guide you will need to add breakpoint-sass as an includePath inside your gulpfile.js
Example:
```
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['node_modules/breakpoint-sass/stylesheets']
    })).on('error', sass.logError)
```
This includePaths path may vary depending on your setup!

