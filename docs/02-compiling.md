---
title: Compiling
---

There are 2 build operations available for this style guide.
One for compiling an web version of the style guide, another to compile a
SASS library that you can include in any other project.

- To compile a web version of the style guide you can run `grunt styleguide`.
  This command will build a website in the `build` folder of this project, 
  after the build you can copy this directory to your web root of your hosting.
- To compile the sass library you can run the `grunt sasslib` command.
  This command will create a `scss` folder in the root of this project. 
  After compiling you can copy this folder to your own project to include or 
  adapt these SASS files.