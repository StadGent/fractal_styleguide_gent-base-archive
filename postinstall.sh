#!/bin/bash

if [ -d "./public" ]; then
  rm -rf ./public/styleguide/vendor;

  mkdir ./public/styleguide/vendor;

  cp -R node_modules/lightgallery ./public/styleguide/vendor/lightgallery;
  cp -R node_modules/jquery ./public/styleguide/vendor/jquery;
  cp -R node_modules/chosen-js ./public/styleguide/vendor/chosen-js;
fi


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
// endinject
" >>  components/main_cli.scss
