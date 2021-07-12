/* eslint-disable react/jsx-key */

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

const { PanelBody, PanelRow, SelectControl, CheckboxControl } = wp.components;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Add tab content' } ],
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
registerBlockType( 'purdue-blocks/tab', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Tab' ), // Block title.
  icon: 'welcome-add-page', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],
  parent: [ 'purdue-blocks/tabs' ],

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
    aria: { type: 'string', default: '' },
    editorSelected: {type: 'boolean', default: false},
    selected: { type: 'boolean', default: false },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __( 'Edit an tab content.' ),

  edit: ( props ) => {
    return [
      <div className={ `pu-blocks-tabs__panel${props.attributes.editorSelected?" active":""}` }
      >
        <InnerBlocks
          template={ BLOCKS_TEMPLATE }
          templateLock={ false }
          templateInsertUpdatesSelection={ false }
        />
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
    return (
      <div className={ `pu-blocks-tabs__panel${props.attributes.selected?" active":""}` }
      aria-labelledby={`header-${props.attributes.aria}`}
      id={`panel-${props.attributes.aria}`}
      >
        <InnerBlocks.Content />
      </div>
    );
  },
} );
