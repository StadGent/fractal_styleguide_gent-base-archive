# Styleguide Gent Base
This styleguide contains the SASS library and needed assets that are required for use in a subthemes of the Gent starterkit.

### Folder structure
When installing this package, you will get a directory structure like this.
```
.
├── CHANGELOG.md
├── LICENSE
├── README.md
├── build
│   ├── sass
│   └── styleguide
└── package.json
```
The build directory contains all sass source files and all asset files needed for the styleguide.

### Implementing this styleguide in your own project
This styleguide aims to be technology independent. This means you should be able to use it inside your project with wathever technology you want.
It utilizes SASS to style its components, so you will have to use that in your project.

After installing the styleguide through `npm install gent_styleguide` you''ll get a folder structure like this:

```
.
├── node_modules
│   └── gent_styleguide
├── package-lock.json
└── package.json
```

Now, to use the styleguide SASS partials you just need to import them into your main SASS file at the top so they get loaded before your own code.
```
@import 'node_modules/gent_styleguide/build/sass/00-mixins/**/*';
@import 'node_modules/gent_styleguide/build/sass/01-global-settings/**/*';
@import 'node_modules/gent_styleguide/build/sass/01-global/**/*';
@import 'node_modules/gent_styleguide/build/sass/10-base-settings/**/*';
@import 'node_modules/gent_styleguide/build/sass/11-base/**/*';
@import 'node_modules/gent_styleguide/build/sass/20-atoms-settings/**/*';
@import 'node_modules/gent_styleguide/build/sass/21-atoms/**/*';
@import 'node_modules/gent_styleguide/build/sass/30-molecules-settings/**/*';
@import 'node_modules/gent_styleguide/build/sass/31-molecules/**/*';
@import 'node_modules/gent_styleguide/build/sass/40-organisms-settings/**/*';
@import 'node_modules/gent_styleguide/build/sass/41-organisms/**/*';
@import 'node_modules/gent_styleguide/build/sass/50-templates-settings/**/*';
@import 'node_modules/gent_styleguide/build/sass/51-templates/**/*';
```

