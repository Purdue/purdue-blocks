/* eslint-disable react/jsx-key */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
// import './editor.scss';
// import './style.scss';
import { createBlock } from '@wordpress/blocks';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  RangeControl,
  CheckboxControl,
  SelectControl,
  TextControl,
} = wp.components;
const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;

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
registerBlockType( 'purdue-blocks/webform', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Webform' ), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="wpforms"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className="svg-inline--fa fa-wpforms fa-w-14 fa-7x"
    >
      <path fill="#8E6F3E" d="M448 75.2v361.7c0 24.3-19 43.2-43.2 43.2H43.2C19.3 480 0 461.4 0 436.8V75.2C0 51.1 18.8 32 43.2 32h361.7c24 0 43.1 18.8 43.1 43.2zm-37.3 361.6V75.2c0-3-2.6-5.8-5.8-5.8h-9.3L285.3 144 224 94.1 162.8 144 52.5 69.3h-9.3c-3.2 0-5.8 2.8-5.8 5.8v361.7c0 3 2.6 5.8 5.8 5.8h361.7c3.2.1 5.8-2.7 5.8-5.8zM150.2 186v37H76.7v-37h73.5zm0 74.4v37.3H76.7v-37.3h73.5zm11.1-147.3l54-43.7H96.8l64.5 43.7zm210 72.9v37h-196v-37h196zm0 74.4v37.3h-196v-37.3h196zm-84.6-147.3l64.5-43.7H232.8l53.9 43.7zM371.3 335v37.3h-99.4V335h99.4z" class=""></path>
    </svg>
  ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
    formId: { type: 'string', default: '' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add a webform from Drupal Core.'
  ),

  edit: ( props ) => {
    const handleFormSelection = ( formId ) => {
      this.formId = formId;
      props.setAttributes( { formId } );
    };
    const formId = props.attributes.formId;
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
          <SelectControl
            label={ __( 'Select a Webform:' ) }
            value={ formId } // e.g: value = [ 'a', 'c' ]
            onChange={ ( formId ) => handleFormSelection( formId ) }
            options={ [
              { value: null, label: 'Select a Webform', disabled: true },
              { value: 'newsletter', label: 'Newsletter' },
            ] }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className='purdue_newsletter'>
        <i class="fas fa-envelope"></i> Subscribe for daily news
        <input type="text" placeholder="Your email" className="side-newsletter-input" />
        <input type="submit" value="Subscribe" className="side-newsletter-submit" />
      </div>
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

    return  <div className='purdue_newsletter'>
              <p><i class="fas fa-envelope"></i> Subscribe for daily news</p>
              <input type="text" placeholder="Your email" className="side-newsletter-input" />
              <input type="submit" value="Subscribe" className="side-newsletter-submit" />
            </div>
  },
} );
