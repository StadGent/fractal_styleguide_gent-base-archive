#!/bin/bash

if [ -d "./public" ]; then
  rm -rf ./public/styleguide/vendor;

  mkdir ./public/styleguide/vendor;

  cp -R node_modules/lightgallery ./public/styleguide/vendor/lightgallery;
  cp -R node_modules/jquery ./public/styleguide/vendor/jquery;
  cp -R node_modules/chosen-js ./public/styleguide/vendor/chosen-js;
fi
