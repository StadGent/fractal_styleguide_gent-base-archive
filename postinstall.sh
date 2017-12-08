#!/bin/bash

#
# Create the necessary directories and move files to them after npm install or yarn install is run.
#
if [ -d "./public" ]; then
  rm -rf ./public/styleguide/vendor;

  mkdir ./public/styleguide/vendor;

  cp -R node_modules/lightgallery ./public/styleguide/vendor/lightgallery;
  cp -R node_modules/jquery ./public/styleguide/vendor/jquery;
  cp -R node_modules/chosen-js ./public/styleguide/vendor/chosen-js;
fi

#
# This step is only used by Digipolis while building the style guide
# When downloading the NPM package and running npm install or yarn install the "components" directory
# does not exist, so we don' have to create this file here.
#
if [ -d "./components" ]; then
  if [ -f components/main_cli.scss ]; then
    rm -f components/main_cli.scss
  fi

  touch components/main_cli.scss

  echo "// inject:settings
// endinject

// inject:mixins
// endinject

// inject:base
// endinject

// inject:atoms
// endinject

// inject:molecules
// endinject

// inject:organisms
// endinject" >>  components/main_cli.scss
fi

