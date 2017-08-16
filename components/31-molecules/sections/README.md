
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
- `$bg-color`: The background color.
- `$text-color`: The text color.
- `$title-color`: **(optional)** The title color. _Default: `$text-color`_
- `$caption-color`: **(optional)** The caption or description color _Default: `$text-color`_

### Link styles
- `$link-color`: **(optional)** The link color _Default: `$text-color`_
- `$link-color-hover`: **(optional)** The link color when in an hover state _Default: `$link-color`_
- `$link-color-focus`: **(optional)** The link color when in an focus state _Default: `$link-color-hover`_
- `$link-color-visited`: **(optional)** The link color when in an visited state _Default: `$link-color`_

### Field styles
- `$field-text-color`: **(optional)** The input field text color _Default: `$text-color`_
- `$field-placeholder-color`: **(optional)** The input field placeholder color _Default: `$field-text-color`_
- `$field-bg-color`: **(optional)** The input field background color _Default: `$bg-color`_
- `$field-border-color`: **(optional)** The input field border color _Default: `$field-bg-color`_
