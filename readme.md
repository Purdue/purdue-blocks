# Purdue Blocks Plugin

Adds Purdue University branded Gutenberg blocks to the editor

## Changelog

Relevant changes are documented below.

### [1.20.0] 2021-7-20
#### Minor Version Update
  - Added Tbs block
  - Added background image options to Columns Row block

### [1.19.3] 2021-7-6
#### Fix
  - Added missing missing TextControl reference
  - Fixed custom rest api error

### [1.19.2] 2021-6-24
#### Updated
  - Updated Custom side menu block: adjust the height of the gray bar when there is no to top button.

### [1.19.1] 2021-6-22
#### Updated
  - Updated quote block: Remove remove button when there is only one quote.

### [1.19.0] 2021-6-21
#### Minor Version Update
  - Added Columns Row block
  - Added Quote block
  - Added Alert strip block
  - Updated featured story Block to add border and background clor options

### [1.18.2] 2021-6-14
#### Updated
  - Resolve Falcuty Profile Card block overflow issue.

### [1.18.1] 2021-6-3
#### Updated
  - Resolve issues in the Profile Galelry Block with the modal not being scrollable on mobile or if window height was too short.

### [1.18.0] 2021-6-2
#### Minor Version Update
  - Added Mini Hero Block

### [1.17.0] 2021-6-1
#### Minor Version Update
  - Added Profile Gallery Block

### [1.16.0] 2021-4-29
#### Minor Version Update
This version includes many UX improvements and other look & feel updates to Purdue Blocks.
- **Button Block**
  - added the purdue button block
- **Feature Story Block**
  - Updated options panel to be more user friendly
  - Added header color options
- **Site Hero Block**
  - Updated options panel to use radio buttons for hero style selection rather than the toggle switch
  - Removed validation that forced a user to select a 2x1 image even on the 40/60 hero
- **Info Box Hero Block**
  - Removed the hero image on mobile screen size and replaces with flat #555960 color background
- **Title Hero Block**
  - Updated options panel to be more user friendly
  - Forego the use of different images for desktop and mobile, just use one image for both with inline bg
- **CTA Hero Block**
  - Forego the use of different images for desktop and mobile, just use one image for both with inline bg
- **Image Toggle Block**
  - Swap order of the icon and heading text; the icon is now on the left and heading on the right
  - Add the Info Box Hero icon to the selector component
  - Added paragraph field as built-in part of the block
- **Accordion Block**
  - The arrow will now be centered when the text wraps to two more more lines
- **CTA Card Block**
  - Added header color options
  - Added height options
- **Additional**
  - Anchor Link Navigation, List, and Sidebar CTA blocks have had their names updated with added 'Right Column - ' at the beginning of each
  - Blocks that have an image or video selector now include a button to remove that media alongside the button that allows the user to select new media

### [1.15.4] 2021-3-11
#### Updated
- Title Hero Block
 - Add video option to title hero block.
 - Add Hero style options
 - Hide lead-in text when it's empty
- Faculty Profile Block
 - add name, position, bio, and google scholar link
 - updated card styles

### [1.15.3] 2021-3-2
#### Updated
- Added info box hero block
- Removed modernizr code

### [1.15.2] 2021-2-2
#### Updated
- Added image caption to featured story block.

### [1.15.1] 2021-2-2
#### Updated
- Added option to add the link link to image in featured story block
- Hid the subtext when it's empty in Title Hero block

### [1.15.0] 2021-1-29
#### Added
- Added in blocks built in the Content Hub:
  - Icon-group
  - Podcast
  - Video Embed
  - Ad Banner
- Added the lead-in and border options to the Title Hero block

### [1.14.1] 2021-1-12
#### Added
- add optional subtext option to cta hero
- added custom side menu block
- Added heading level select box in featured story block
- Added News block rendered by PHP to make it dynamic

#### Updated
- cta button of cta hero is now optional
- Add "Position" property to accordion container
- Fix Anchor link navigation Js
- Add more description to testimonial block
- Center button text on CTA banner

### [1.13.2] 2020-11-4
#### Updated
- Fixed link font issue

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


