/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
// import './editor.scss';
// import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextareaControl,
  TextControl,
  RadioControl,
  SelectControl,
  Button,
} = wp.components;
const { RichText, InspectorControls, InnerBlocks } = wp.blockEditor;
const BLOCKS_TEMPLATE_1 = [
  [ 'core/paragraph', { placeholder: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' } ],
];
const BLOCKS_TEMPLATE_2 = [
  [ 'core/paragraph', { placeholder: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' } ],
];
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
registerBlockType( 'purdue-blocks/page-layout-with-sidebar', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Page Layout With Sidebar' ), // Block title.
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#8e6f3e',
    // Specifying a dashicon for the block
    src: 'excerpt-view',

  }, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
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
    sidebarLocationDesktop: { type: 'string', default: 'right' },
    sidebarLocationMobile: { type: 'string', default: 'below' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'A layout pattern with a main content area and a sidebar area.'
  ),

  edit: ( props ) => {
    return [
      <InspectorControls>
      <PanelBody>
        <PanelRow>
          <RadioControl
            label="Sidebar location on desktop"
            help="Choose to place sidebar on the left/right side of the main content."
            selected={ props.attributes.sidebarLocationDesktop }
            options={ [
              { label: 'Left', value: 'left' },
              { label: 'Right', value: 'right' },
            ] }
            onChange={ ( option ) => {
              props.setAttributes( { sidebarLocationDesktop: option } )
            } }
          />
        </PanelRow>
        <PanelRow>
          <RadioControl
              label="Sidebar location on mobile"
              help="Choose to place sidebar above/below the main content."
              selected={ props.attributes.sidebarLocationMobile }
              options={ [
                { label: 'Above', value: 'above' },
                { label: 'Below', value: 'below' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { sidebarLocationMobile: option } )
              } }
            />
        </PanelRow>
      </PanelBody>
    </InspectorControls>,

    <div className="section">
      <div className="container">
        <div className={`columns is-multiline${props.attributes.sidebarLocationDesktop === 'left' ? ' column-desktop-reverse' : ''}
        ${props.attributes.sidebarLocationMobile === 'above' ? ' column-mobile-reverse' : ''}`}>
          <div className="column is-8">
            <InnerBlocks
              template={ BLOCKS_TEMPLATE_1 }
            />
          </div>
          <div className="column is-3">
            <InnerBlocks
              template={ BLOCKS_TEMPLATE_2 }
            />
          </div>
        </div>
      </div>
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
  save: ( props ) => {
    const returned = (
      <div className="section">
      <div className="container">
        <div className={`columns is-multiline${props.attributes.sidebarLocationDesktop === 'left' ? ' column-desktop-reverse' : ''}
        ${props.attributes.sidebarLocationMobile === 'above' ? ' column-mobile-reverse' : ''}`}>
          <div className="column is-8">
            <InnerBlocks.Content />
          </div>
          <div className="column is-3">
            <InnerBlocks.Content />
          </div>
      </div>
      </div>
    </div>
    );
    return returned;
  },
} );
