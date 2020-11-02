# Purdue Blocks Plugin

Adds Purdue University branded Gutenberg blocks to the editor

## Changelog

Relevant changes are documented below.

### [1.13.1] 2020-11-2
#### Updated
- Fixed large CTA-card link issue
- Fixed proofpoint font color issue
- Fix CTA-card and featured story background issues
- Added the link card and latest post icons to the toggle block
- Fixed the size of icons on the front end of the toggle block
- Added check to determine if a certain icon should have a white background depending on a data field on the svg string

### [1.13.0] 2020-10-16
#### Updated
- Fixed issues with some blocks having broken styles in Internet Explorer
- Fixed issues with the Image Toggle Block via 1.11.0 and added some new features in the editor
  - Toggle buttons did not work when there were multiple image toggle cards on the page.
  - Fixed a block crash associated with the save function not outputting the same html due to not adding some attributes to the anchor element that wordpress adds automatically on the front-end.
  - Added an optional icon selector menu to add an icon next to the heading.
  - Updated the media upload check to allow for only a single image to be chosen, and show toggle button options based on whether one or two images were selected.
  - Added checking and blocking for if more than 2 images were selected.

### [1.12.0] 2020-10-06
#### Added
- New Icons for all Purdue Blocks

### [1.11.0] 2020-10-06
#### Added
- Page Layout Block
- Image Toggle Block
- Sidebar CTA Block

### [1.10.0] 2020-09-25
#### Added
- Anchor link navigation block

#### Updated
- Clean up test suites to bring them all up to date and remove unnecessary commeents and references.
- Style updates and fixes for the RSS feed block

### [1.9.0] 2020-09-10
#### Added
- Purdue RSS block
- End-to-end testing suites for Purdue RSS block

### [1.8.0] 2020-09-10
#### Added
- End-to-end testing suites for each block

### [1.7.3] 2020-08-19
#### Added
- Card block
#### Changed
- REconfigured with wp-scripts

### [1.7.2] 2020-08-18
#### Added
- Card block

### [1.7.1] 2020-07-30
#### Added
- Mobile hero image support for title hero and CTA hero blocks in Wordpress
#### Adjusted
- Updated styles to match style guide

### [1.7.0] 2020-07-22
#### Added
- Titled Navigation Block
- Image Showcase Block

### [1.5.0] 2020-06-11
#### Added
- Jump Button
- Testimonial Block
- Drupal support
#### Updated
- IE display bugs
- Site Hero bugs

### [1.4.0] 2020-05-26
#### Added
- Add Proof Point block
- Add List block
- Add Faculty Profile block

### [1.3.1] 2020-05-20
#### Added
- Add CTA banner block

### [1.3.0] 2020-05-20
#### Added
- Add large featured story block

### [1.2.0] - 2020-05-18
#### Added
- Add CTA Hero block
- Add Title Hero block

### [1.1.0] - 2020-05-13
#### Added
- Initial public release


