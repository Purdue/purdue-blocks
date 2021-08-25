/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

//  Import CSS.
// import './editor.scss';
// import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  SelectControl,
} = wp.components;

const {
  RichText,
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  InnerBlocks,
} = wp.blockEditor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("purdue-blocks/shape-separator", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Shape Separator"), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 87.5"><defs></defs><g id="Window-maximize" class="cls-1"><g class="cls-1"><path class="cls-2" d="M100,16.62V85.37a9.38,9.38,0,0,1-9.37,9.37H9.37A9.38,9.38,0,0,1,0,85.37V16.62A9.38,9.38,0,0,1,9.37,7.24H90.63A9.38,9.38,0,0,1,100,16.62ZM90.63,38.49H9.37v45.7a1.18,1.18,0,0,0,1.18,1.18h78.9a1.18,1.18,0,0,0,1.18-1.18Z" transform="translate(0 -7.24)"/></g></g></svg>
  ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "purdue-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */

  attributes: {
    topColor: { type: "string", default: "black" },
    bottomColor: { type: "string", default: "boiler" },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    "Add a separator section with a downward pointing arrow shape to be placed between two other sections."
  ),

  edit: (props) => {
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <SelectControl
              label="Top Color"
              help="The color of the arrow shape. This should match the previous section."
              value={props.attributes.topColor}
              options={[
                { value: 'black', label: 'Black' },
                { value: 'white', label: 'White' },
                { value: 'lightest', label: 'Lightest Digital Gray' },
                { value: 'light', label: 'Light Digital Gray' },
                { value: 'medium', label: 'Medium Digital Gray' },
                { value: 'steel', label: 'Steel(Dark) Gray' },
                { value: 'boiler', label: 'Boilermaker Gold' },
              ]}
              onChange={(topColor) => {
                props.setAttributes({ topColor });
              }}
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Bottom Color"
              help="The color behind the arrow shape. This should match the following section."
              value={props.attributes.bottomColor}
              options={[
                { value: 'black', label: 'Black' },
                { value: 'white', label: 'White' },
                { value: 'lightest', label: 'Lightest Digital Gray' },
                { value: 'light', label: 'Light Digital Gray' },
                { value: 'medium', label: 'Medium Digital Gray' },
                { value: 'steel', label: 'Steel(Dark) Gray' },
                { value: 'boiler', label: 'Boilermaker Gold' },
              ]}
              onChange={(bottomColor) => {
                props.setAttributes({ bottomColor });
              }}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={`pu-shape-separator bg-${props.attributes.bottomColor}`}>
        <div className={`pu-shape-separator--top bg-${props.attributes.topColor}`}></div>
      </div>,
    ];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: (props) => {
    const returned = (
      <div className={`pu-shape-separator bg-${props.attributes.bottomColor}`}>
        <div className={`pu-shape-separator--top bg-${props.attributes.topColor}`}></div>
      </div>
    );

    return returned;
  },
});