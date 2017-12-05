# Changelog

## Roadmap
Refer to upcoming changes in our README.md under "Roadmap"

## Changes
All notable changes to `digipolisgent/fractal_styleguide_gent-base`.

### 2.7.1
* STIJ-193: Added figcaption atom and figure molecule.

### 2.7.0
**IMPORTANT: Class .text-center has been removed**

* STIJ-1: Fixed whitespace issue for the gallery component.
* STIJ-30: Fixed styling for select and multi select fields on iPad.
* STIJ-39: Fixed component colors inside of sections, based on guidelines fron the City of Ghent.
* STIJ-45: Changed jQuery UI datepicker format to a Dutch format.
* STIJ-87: Added description field documentation.
* STIJ-87: Refactored description field atom to use Themify mixin.
* STIJ-89: Changed the documentation of an icon to English and update it a bit.
* STIJ-96: Added paragraph atom documentation.
* STIJ-96: Removed the paragraph variant that contains centered text, **it is not allowed by the City of Ghent**!
* STIJ-100: Added variant for CTA links.
* STIJ-100: Added CTA link documentation.
* STIJ-106: Added search molecule documentation.
* STIJ-170: Fixed search molecule bug where it was using the old button submit atom instead of the input type submit atom.
* STIJ-170: Added a label to the search molecule.
* STIJ-170: Hide the label of the search molecule in the header organism.
* STIJ-170: Add placeholder to search molecule inside the header organism.
* STIJ-175: Added page wide image component.
* STIJ-177: Added newsletter block component.
* STIJ-178: Added styling for inline form-items.
* STIJ-178: Added address organism.
* STIJ-182: Fixed whitespace when previewing footer component in the style guide.
* STIJ-186: Added header variant with breadcrumb and with a banner image.
* STIJ-186: Added small fix to the buttons in the header.
* STIJ-188: Fixed issue in gulp command js:dist.
* STIJ-189: Fixed some style guide specific issues.


### 2.6.19
* STIJ-158: Changed datepicker date format to an English format.
* STIJ-159: Removed button submit atom.
* STIJ-159: Moved the submit button documentation to the input submit atom.
* STIJ-160: Changed the form actions - editor molecule variant to include a normal button instead of a dropbutton.
* STIJ-161: Fixed broken links in documentation files.
* STIJ-162: Changed all Dutch text to English.
* STIJ-168: Changed style guide title to a versioned version.
* STIJ-169: Integrate link in style guide to the GitHub CHANGELOG.

### 2.6.18
* STIJ-50: Fixed label for attributes and changed a lot of the form examples in the style guide.
* STIJ-86: Added documentation to some components.
* STIJ-156: Updated the CONTRIBUTING and README files.
* STIJ-156: Updated the README file of the gallery component with important licensing information.
* STIJ-157: Changed the loaded JS files in the _preview.twig file to the minified versions. This fixes issues when automatically deploying.
* STIJ-157: Changed the gulp file to also locally minify the JS files. This fixes local JS issues.

### 2.6.17
**IMPORTANT: Updating this style guide through composer is DEPRECATED! The next release will remove composer.json!**

* STIJ-154: Changed preview layout of style guide to be more user friendly.
* STIJ-156: Added LICENSING, SECURITY, CONTRIBUTING and README changes.
* STIJ-156: Added license information for the gallery component that uses Light Gallery (jQuery plugin).
   **Important: Check the bit about the commercial license!**

### 2.6.16
* STIJ-155: Added small fixes to various form elements.

### 2.6.15
* STIJ-45: Added custom styling to the jQuery UI datepicker component.
* STIJ-148: Refactored hamburger-menu into a single component.

### 2.6.14
* STIJ-148: Made hamburger-menu WCAG compliant.
* STIJ-148: Created a global TabTrap object.

### 2.6.13
* STIJ-112: Added footer documentation.
* STIJ-149: The footer organism now has a different grid implementation. Through the use of a data-columns attribute
we made the grid styling flexible between 2, 3 or 4 columns.
* STIJ-150: Changed social media links block. This now displays the social media links of Stad Ghent correctly.

### 2.6.12
* STIJ-147: Added changes to Chosen for multiselect fields. Chosen will now be disabled on iPad.

### 2.6.11
* STIJ-146: Added at and code icons.
* Optimised following icons: caret, pinned, paper, idea, smartphone, data, data-new.

### 2.6.10
* STIJ-145: Added pinned icon.

### 2.6.9
* STIJ-63: Made Fractal variants of paragraphs.
* STIJ-63: Remove underlined text from paragraph examples,
it is discouraged to use underlined text.
* STIJ-131: Remove placeholders from all input type fields except search fields.
* STIJ-25: Fixed status messages preview pages.
* STIJ-140: Fixed themify issue on select input fields.


### 2.6.8
* STIJ-25: Added themify to the status messages component.

### 2.6.7
* Fixed select box appearance in IE.
* STIJ-139: Added no-optional class to hide optional from field labels.
* STIJ-139: Changed the styling of checkbox and radio field labels.
* STIJ-139: Added fieldset styling.
* STIJ-139: Changed class of messages.

### 2.6.6
* Fixed a bug in the postinstall.sh script.

### 2.6.5
* STIJ-126: Removed CDN imports of external libraries and added them through yarn.

### 2.6.4
* STIJ-125: Fixed close button for items inside multiselect.
* STIJ-137: Changed preview template for Mijn Gent block.

### 2.6.3
* STIJ-40: Fixed ugly styling on buttons and input fields for iOS.

### 2.6.2
* STIJ-35: Added bindings and functions for the Gallery component.

### 2.6.1
* STIJ-2:
    * Added default no-style styling to lists in the hamburger menu.
    * Fixed preview hamburger menu.
* STIJ-34: Changed Gent info block title to h3.

### 2.6.0
* STIJ-32: Refactored heading.
* STIJ-95: Added more documentation.
* STIJ-122: Minor validation fixes.
* STIJ-123: Added form errors.

### 2.5.1
* STIJ-116: Minor change to the styling of the Form Steps molecule.

### 2.5.0
* STIJ-76:
    * Added bindings and functions layer to all Javascript files.
    * Added documentation for Javascript use and component Javascript.
    * Refactored some Javascript code.
* STIJ-116:
    * Changed markup for the Form Steps molecule.
    * Changed styling for the Form Steps molecule.
    * Added themify for the Form Steps molecule.

