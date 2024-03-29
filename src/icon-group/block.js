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
  Placeholder,
  Button,
  FormFileUpload,
  SelectControl,
  IconButton,
  PanelBody,
  PanelRow,
  Toolbar,
  BaseControl,
  TextControl,
} = wp.components;
const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
const {
  Component,
  Fragment,
} = wp.element;

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
registerBlockType( 'purdue-blocks/icon-group', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Icon Group' ), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="photo-video"
      className="svg-inline--fa fa-photo-video fa-w-20 fa-7x"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path fill="#8E6F3E" d="M144 343.78a48 48 0 1 0 48 48 48 48 0 0 0-48-48zM101.74 213a37 37 0 0 0 52.36 0l78.56-78.44A79.06 79.06 0 0 0 227 17.49c-28.08-23.13-69.54-22.82-99-.86-29.45-22-71-22.3-99.05.89a79.11 79.11 0 0 0-5.77 117.08zM59.42 54.53A29.54 29.54 0 0 1 78.35 48 35.08 35.08 0 0 1 103 58.32l25 24.89 24.93-24.89c12.25-12.15 31.43-13.83 43.58-3.82a31.09 31.09 0 0 1 2.31 46.15l-70.85 70.71-70.87-70.69a31.13 31.13 0 0 1 2.32-46.14zm337.93 305.24l32.27-69.89a24 24 0 1 0-43.54-20.12l-63.7 138h109.27l-36.92 68.58A24 24 0 1 0 437 499.05l75-139.28zm-141.44-72h-27.42l-7.09-14.17a27.36 27.36 0 0 0-25.64-17.76H92.08a27.39 27.39 0 0 0-25.65 17.76l-7 14.21H32a32 32 0 0 0-32 32V480a32 32 0 0 0 32 32h223.91a32 32 0 0 0 32-32V319.79a32 32 0 0 0-32-31.98zm-16 176.23H48V335.79h41.22l13.21-26.73 2.57-5.26h77.83l2.69 5.4 13.24 26.59h41.13zm112-256V68.24L463.83 51v78.58a84 84 0 0 0-16-1.69c-35.34 0-64 21.47-64 48s28.64 48 64 48 64-21.48 64-48V32c0-17.9-13.54-32-29.64-32a28.08 28.08 0 0 0-4.26.33L329.39 23.17c-14.63 2.25-25.5 15.74-25.5 31.66V161.6a83.25 83.25 0 0 0-16-1.7c-35.33 0-64 21.55-64 48.13s28.64 48.13 64 48.13 63.98-21.55 63.98-48.16z" class=""></path>
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
    iconGroup: {
      type: 'array',
      default: []
    },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    'Add a group of icons to be displayed inline.'
  ),

  edit: ( props ) => {

    if(props.attributes.iconGroup.length===0){
      props.setAttributes( {iconGroup: [{
        icon: '',
        iconUrl: '',
      }]} )
    }

    const handleAddIcon = () => {
      const iconGroup = [ ...props.attributes.iconGroup ];
      iconGroup.push( {
        icon: '',
        iconUrl: '',
      } );
      props.setAttributes( { iconGroup } );
    }; //End handleAddIcon
    const handleRemoveIcon = ( index ) => {
      const iconGroup = [ ...props.attributes.iconGroup ];
      iconGroup.splice( index, 1 );
      props.setAttributes( { iconGroup } );
    }; //End handleRemoveIcon
    const handleChangeiconGroupIcon = ( icon, index ) => {
      const iconGroup = [ ...props.attributes.iconGroup ];
      iconGroup[ index ].icon = icon;
      props.setAttributes( { iconGroup } );
    }; // End handleChangeiconGroupIcon
    const handleChangeiconGroupUrl = ( iconUrl, index ) => {
      const iconGroup = [ ...props.attributes.iconGroup ];
      iconGroup[ index ].iconUrl = iconUrl;
      props.setAttributes( { iconGroup } );

    }; // End handleChangeiconGroupUrl

    let iconFields,
        iconDisplay;

    if ( props.attributes.iconGroup.length ) {
      iconFields = props.attributes.iconGroup.map( ( card, index ) => {
        return  <Fragment key={index}>
                  <TextControl
                    className="icon-text"
                    placeholder="Paste Fontawesome HTML code"
                    value={ card.icon }
                    onChange={ ( icon ) =>  handleChangeiconGroupIcon( icon, index ) }
                  />
                  <TextControl
                    className="icon-url"
                    placeholder="Link"
                    value={ card.iconUrl }
                    onChange={ ( iconUrl ) => handleChangeiconGroupUrl( iconUrl, index ) }
                  />
                  <Button
                    className={ 'bulma-blocks-editor-site-hero__button is-danger' }
                    onClick={ () => handleRemoveIcon( index ) }
                  >
                    Remove Icon
                  </Button>
                  <hr />
                </Fragment>
      } );

      iconDisplay = props.attributes.iconGroup.map( ( card, index ) => {
        return  <div key={ index } className='icon-item'>
                  <div className='icon-item-icon-placeholder'>
                    <div dangerouslySetInnerHTML={{ __html: card.icon }} />
                  </div>
                </div>;
      } );
    }

    return [
      <InspectorControls key="1">
        <PanelBody title={ __( 'Icons' ) }>
          { iconFields }
          <Button
            isDefault
            onClick={ handleAddIcon.bind( this ) }
          >
            { __( 'Add Icon' ) }
          </Button>
          <hr />
        </PanelBody>
      </InspectorControls>,
      <div key="2" className='icon-group'>
        { iconDisplay }
      </div>,
    ];
  },

  save: ( props ) => {
    const blockProps = useBlockProps.save();
    const iconFields = props.attributes.iconGroup.map( ( card, index ) => {
      return  <div key={ index } className='icon-item'>
                <a href={ card.iconUrl } target="_blank" rel="noopener noreferrer">
                  <div className='icon-item-icon-placeholder'>
                    <div dangerouslySetInnerHTML={{ __html: card.icon }} />
                  </div>
                </a>
              </div>;
    } );
    return (
      <div {...blockProps} className='icon-group'>
        { iconFields }
      </div>
    );
  },
} );
