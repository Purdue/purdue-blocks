/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

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
const { RichText, InspectorControls, InnerBlocks, MediaUploadCheck, MediaUpload } = wp.blockEditor;

import * as svgIcons from './icon-assets/_exports'


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
registerBlockType( 'purdue-blocks/image-toggle-card', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Image Toggle Card' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs></defs><rect width="100" height="100" rx="8.55"/><g id="lightbulb" class="cls-1"><g class="cls-1"><path class="color-fff" d="M78.15,37.21a28,28,0,0,1-7,18.51c-2.66,3-6.83,9.41-8.38,14.74H55.12a8.9,8.9,0,0,1,.36-2.29,50.5,50.5,0,0,1,9.93-17.51,20.46,20.46,0,1,0-30.82,0A50.45,50.45,0,0,1,44.54,68.2a7.82,7.82,0,0,1,.34,2.25v0H37.2c-1.55-5.33-5.72-11.7-8.38-14.74A28.14,28.14,0,1,1,78.15,37.21ZM52.56,24.41A2.56,2.56,0,0,1,50,27,10.25,10.25,0,0,0,39.76,37.21a2.56,2.56,0,1,1-5.11,0A15.37,15.37,0,0,1,50,21.85,2.56,2.56,0,0,1,52.56,24.41ZM37.21,75.59H62.79v6.9a2.55,2.55,0,0,1-.43,1.42L58.44,89.8a2.58,2.58,0,0,1-2.14,1.14H43.69a2.58,2.58,0,0,1-2.13-1.14l-3.92-5.89a2.54,2.54,0,0,1-.42-1.42Z"/></g></g></svg>
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
    images: { type: 'array', default: [] },
    cardTitle: {type: 'string', default: ""},
    firstTitle: {type: 'string', default: ""},
    secondTitle: {type: 'string', default: ""},
    linkText: {type: 'string', default: ""},
    linkUrl: {type: 'string', default: ""},
    includeLink: {type: 'boolean', default: false },
    openInNewTab: {type: 'boolean', default: false },
    icon: {type: 'string', default:''}
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add a block with up to two images that can be toggled with an optional link.'
  ),

  edit: ( props ) => {
    return [

      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <CheckboxControl
              label="Add a link to this card?"
              checked={ props.attributes.includeLink }
              onChange={ () =>
                props.setAttributes( { includeLink: ! props.attributes.includeLink } )
              }
            />
          </PanelRow>
          {props.attributes.includeLink ?
          (
            <PanelBody>
              <PanelRow>
                <TextControl
                  label="Link Text"
                  value={ props.attributes.linkText }
                  onChange={ ( linkText ) => props.setAttributes( { linkText } ) }
                />
              </PanelRow>
              <PanelRow>
                <TextControl
                  label="Link URL"
                  value={ props.attributes.linkUrl }
                  onChange={ ( linkUrl ) => props.setAttributes( { linkUrl } ) }
                />
              </PanelRow>
            </PanelBody>
          ) : ''}
          <PanelRow>
            <CheckboxControl
              label="Open link in new tab?"
              checked={ props.attributes.openInNewTab }
              onChange={ () =>
                props.setAttributes( { openInNewTab: ! props.attributes.openInNewTab } )
              }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className="image-toggle-card-block-editor">
        <div className={`image-toggle-card-block-editor__inputs`}>
          <div className="field">
            <label>Card Heading</label>
            <div className="control">
              <input
                value={
                  props.attributes.cardTitle !== '' ?
                    props.attributes.cardTitle :
                    ''
                }
                className="input"
                type="text"
                placeholder="Card Heading..."
                onChange={ ( e ) => {
                  props.setAttributes( { cardTitle: e.target.value } );
                } }
              ></input>
            </div>
            <div className="image-toggle-card-block-editor__icon-selector">
              <button id="iconSelectorButton" onClick={openIconSelector} className="image-toggle-card-block-editor__button">Select Optional Icon</button>
              <div id="iconPopup" className="image-toggle-card-block-editor__icon-selector--popup">
                {/* Map out all the icons here. */}
                {Object.values(svgIcons).map(icon => {
                  return (
                    <button className="image-toggle-card-block-editor__icon-selector--icon" dangerouslySetInnerHTML={{__html: icon}} onClick={(e) => {
                      props.setAttributes( { icon } );
                    }}></button>
                  )
                })}
              </div>
              <div className="image-toggle-card-block-editor__icon-selector--selected-icon" dangerouslySetInnerHTML={{__html: props.attributes.icon}}></div>
            </div>
          </div>
        </div>
        <MediaUploadCheck>
          <MediaUpload
            multiple
            gallery
            onSelect={ ( imgs ) => {
              if(imgs.length > 0 && imgs.length < 3) {
                props.setAttributes( { images: imgs } )
              }
            } }
            render={ ( { open } ) => {
              return (props.attributes.images.length > 0 && props.attributes.images.length < 3) ? (
                <div className={ 'image-toggle-card-block-editor__preview' }>
                  <div className={ 'image-toggle-card-block-editor__imgGroup' }>
                    { props.attributes.images.map( img => {
                      return (
                        <figure className={ 'image' }>
                          <img
                            alt=""
                            src={ img.url }
                          />
                        </figure>
                      )
                    } ) }
                  </div>
                  <Button
                    className={ 'image-toggle-card-block-editor__button' }
                    onClick={ open }
                  >
                    Select New Images
                  </Button>
                </div>
              ) : (
                <div className={ 'image-toggle-card-block-editor__container' }>
                  <span className={ 'image-toggle-card-block-editor__heading' }>
                    <span className="dashicons dashicons-format-image"></span>
                    <span>Image Toggle Card</span>
                  </span>
                  <p className={ 'image-toggle-card-block-editor__description' }>
                    Pick up to two images from the media library.
                  </p>
                  <Button
                    className={ 'image-toggle-card-block-editor__button' }
                    onClick={ open }
                  >
                    Open Media Library
                  </Button>
                </div>
              );
            } }
          />
        </MediaUploadCheck>
        <span style={{color: 'gray', paddingLeft: '0.75rem', paddingBottom: '0.5rem'}}>Note: Toggle buttons will only appear when two images are selected.</span>
        {props.attributes.images.length > 1 ? (
          <div className={`image-toggle-card-block-editor__inputs`}>
            <div className="field">
              <label>First Image Title</label>
              <div className="control">
                <input
                  value={
                    props.attributes.firstTitle !== '' ?
                      props.attributes.firstTitle :
                      ''
                  }
                  className="input"
                  type="text"
                  placeholder="First Image Title..."
                  onChange={ ( e ) => {
                    props.setAttributes( { firstTitle: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
            <div className="field">
              <label>Second Image Title</label>
              <div className="control">
                <input
                  value={
                    props.attributes.secondTitle !== '' ?
                      props.attributes.secondTitle :
                      ''
                  }
                  className="input"
                  type="text"
                  placeholder="Second Image Title..."
                  onChange={ ( e ) => {
                    props.setAttributes( { secondTitle: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
          </div>
        ) : ''}
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
      <div className="pu-image-toggle box">
        <div className="pu-image-toggle__heading">
          <span>{ props.attributes.cardTitle }&nbsp;{props.attributes.icon !== '' ? (
            <span className="pu-image-toggle__heading--icon" dangerouslySetInnerHTML={{__html: props.attributes.icon}}></span>
          ) : ''}</span>

          {props.attributes.includeLink ? (
            <a href={props.attributes.linkUrl} target={props.attributes.openInNewTab ? '_blank': ''} rel="noopener noreferrer">{props.attributes.linkText}</a>
          ) : ''}
        </div>
        <div className={`pu-image-toggle__images`}>
          { props.attributes.images.map( (img, index) => {
              return (
                <img className={`${index === 0 ? 'show' : ''}`} alt={ img.alt } src={ img.url } />
              )
            } ) }
        </div>
        {props.attributes.images.length > 1 ? (
          <div className={`pu-image-toggle__buttons`}>
            <button className={`toggle-button selected`}>{props.attributes.firstTitle}</button>
            <button className={`toggle-button`}>{props.attributes.secondTitle}</button>
          </div>
        ) : ''}
      </div>
    );
    return returned;
  },
} );


const openIconSelector = (e) => {
  const clicked = e.target
  const popup = clicked.nextSibling

  if(popup.classList.contains('open')) {
    popup.classList.remove('open')
  } else {
    popup.classList.add('open')
  }
}
