
# Color sections

In the style guide of Ghent there are 5 color sections (or schemes) available. These are named after the content sections.

- **Default:** The default content region (white background, gray text)
- **Inverse:** An inverse region to visualise a different content region (light blue background, gray text)
- **Highlighted:** A content region in need of the attention of the end-user. For example an emergency warning. (orange background, gray text)
- **Accent:** An accent region mostly used for Stad Gent branded services like Ghent info. (blue background, white text)
- **Wrapper:** Used as header and footer. (dark blue background, white text)

## Custom color sections

It's possible to create custom color sections for your subtheme with following mixin: `new-section($bg-color, $text-color)`. A breakdown for all available parameters below:

### Text styles
- `$section-bg-color`: The background color.
- `$section-text-color`: The text color.
- `$section-title-color`: **(optional)** The title color. _Default: `$section-text-color`_
- `$section-caption-color`: **(optional)** The caption or description color _Default: `$section-text-color`_

### Link styles
- `$section-link-color`: **(optional)** The link color _Default: `$section-text-color`_
- `$section-link-color-hover`: **(optional)** The link color when in an hover state _Default: `$section-link-color`_
- `$section-link-color-focus`: **(optional)** The link color when in an focus state _Default: `$section-link-color-hover`_
- `$section-link-color-visited`: **(optional)** The link color when in an visited state _Default: `$section-link-color`_

### Field styles
- `$section-field-text-color`: **(optional)** The input field text color _Default: `$section-text-color`_
- `$section-field-placeholder-color`: **(optional)** The input field placeholder color _Default: `$section-field-text-color`_
- `$section-field-bg-color`: **(optional)** The input field background color _Default: `$section-bg-color`_
- `$section-field-border-color`: **(optional)** The input field border color _Default: `$section-field-bg-color`_
