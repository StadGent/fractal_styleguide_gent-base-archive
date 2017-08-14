# Contributing guidelines.
Something of note when contributing to the repository.
When applying changes to the styleguide keep in mind that many proejcts may rely on a specific version of the code.
To make sure you are backwards compatible you will need to follow some guidelines:

### Patch changes
When your changes don't affect the structure of the styleguide you can publish a patch:
```
1.0.1 --> 1.0.2
```

### Minor changes
When your changes might affect the structure, like adding / refactoring / removing an atom or molecule in the styleguide:
```
1.0.0 --> 1.1.0
```

### Major changes
When your changes are sure to change the structure and critical parts of the styleguide and when these changes are not backwards compatible:
```
1.0.1 --> 2.0.0
```

## Applying changes and publishing to NPM
To apply changes some steps need to be taken:
* Apply your changes in the code.
* When ready with coding / testing:
  * Bump the version number in the `package.json` file
  * Build your production code with
    `gulp build`
  * Add your changes to git:
    `git add *`
    `git commit -m 'Commit message here'`
    `git push`
  * Publish the package to NPM with
    `gulp publish --username=XXX --password=XXX --email=XXX`
