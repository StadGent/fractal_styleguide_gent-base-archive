#!/bin/bash

# Get latest changes in git.
echo "Checking out latest development changes...";
git checkout develop;
git pull;

# Do a gulp build to build latest version of the style guide.
#echo "Building latest style guide version...";
#gulp build;

# Check if type argument is not empty.
if [ $# -eq 0 ]
  then
    echo "No arguments supplied. Please provide a type parameter like -t=patch."
    exit 1
fi

# Checking for type argument.
for i in "$@"
  do
    case $i in
      -t=*|--type=*)
      TYPE="${i#*=}"
      shift # past argument=value
      ;;
    esac
done

# Update the version based on the argument given (patch, minor, major) using our gulp bump command.
echo "Updating version...";
gulp bump --type=$TYPE

# Get the new package version.
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $PACKAGE_VERSION

# Add everything to git.
echo "Adding changes to git and tagging "$PACKAGE_VERSION
git add .
git commit -m "Updated to version "$PACKAGE_VERSION
git tag $PACKAGE_VERSION

# Deploy to git.
git push && git push --tags

