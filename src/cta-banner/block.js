/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  TextareaControl,
  Button,
  RadioControl,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload } = wp.blockEditor;
const { select } = wp.data;

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
registerBlockType( 'purdue-blocks/cta-banner', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'CTA Banner' ), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="object-group"
      className="svg-inline--fa fa-object-group fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#8E6F3E"
        d="M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
      ></path>
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
    type: { type: 'string', default: 'gold' },
    imgUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    ctaDesc: { type: 'string', default: '' },
    ctaUrl: { type: 'string', default: '' },
    ctaText: { type: 'string', default: '' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'This block is for adding a CTA banner on the page.'
  ),

  edit: ( props ) => {
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="CTA Banner Type"
              help="Choose the type of Banner."
              selected={ props.attributes.type }
              options={ [
                { label: 'Black', value: 'black' },
                { label: 'Gold', value: 'gold' },
                { label: 'Gray', value: 'gray' },
                { label: 'Image', value: 'image' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { type: option } )
              } }
            />
          </PanelRow>
        </PanelBody>
        { props.attributes.type === 'image' ? (
          <PanelBody>
            <PanelRow>
              <TextareaControl
                label="Hero Image Alt Text"
                value={ props.attributes.altText }
                onChange={ ( altText ) => props.setAttributes( { altText } ) }
              />
            </PanelRow>
          </PanelBody> ) : '' }
      </InspectorControls>,

      <div className={ 'pu-blocks-editor-cta-banner' }>
        <div className="content">
          { props.attributes.type !== 'image' ? (
            <div className="field">
              <label className="label">CTA Description Text</label>
              <div className="control">
                <input
                  value={
                    props.attributes.ctaDesc !== '' ?
                      props.attributes.ctaDesc :
                      ''
                  }
                  className="input"
                  type="text"
                  placeholder="CTA Description Text..."
                  onChange={ ( e ) => {
                    props.setAttributes( { ctaDesc: e.target.value } );
                  } }
                ></input>
              </div>
            </div> ) : '' }
          { props.attributes.type !== 'gray' ? (
            <div className="field">
              <label className="label">CTA Button Text</label>
              <div className="control">
                <input
                  value={
                    props.attributes.ctaText !== '' ?
                      props.attributes.ctaText :
                      ''
                  }
                  className="input"
                  type="text"
                  placeholder="CTA Button Text..."
                  onChange={ ( e ) => {
                    props.setAttributes( { ctaText: e.target.value } );
                  } }
                ></input>
              </div>
            </div> ) : '' }
          <div className="field">
            <label className="label">CTA Link URL</label>
            <div className="control">
              <input
                value={
                  props.attributes.ctaUrl !== '' ? props.attributes.ctaUrl : ''
                }
                className="input"
                type="text"
                placeholder="CTA URL..."
                onChange={ ( e ) => {
                  props.setAttributes( { ctaUrl: e.target.value } );
                } }
              ></input>
            </div>
          </div>
        </div>
        { props.attributes.type === 'image' ? (
          <div className="content">
            <span>Choose a Background Image</span>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( img ) => {
                  props.setAttributes( {
                    imgUrl: img.url,
                    altText:
                      props.attributes.altText !== '' ?
                        props.attributes.altText :
                        img.alt,
                  } );
                } }
                render={ ( { open } ) => {
                  return props.attributes.imgUrl !== '' ? (
                    <div className={ 'pu-blocks-editor-cta-banner__preview' }>
                      <figure className={ 'image' }>
                        <img
                          alt={ props.attributes.altText }
                          src={ props.attributes.imgUrl }
                        />
                      </figure>
                      <Button
                        className={ 'pu-blocks-editor-cta-banner__button' }
                        onClick={ open }
                      >
                        Select a New Image
                      </Button>
                    </div>
                  ) : (
                    <div className={ 'pu-blocks-editor-cta-banner__container' }>
                      <p className={ 'purdue-blocks-editor-cta-banner__description' }>
                        Pick an image from the media library. The recommended aspect ratio is 3:2.
                      </p>
                      <Button
                        className={ 'pu-blocks-editor-cta-banner__button' }
                        onClick={ open }
                      >
                        Open Media Library
                      </Button>
                    </div>
                  );
                } }
              />
            </MediaUploadCheck>
          </div> ) : '' }
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
      <div className={ `pu-cta-banner${ props.attributes.type === 'gold' ? ' pu-cta-banner-gold' : '' }${ props.attributes.type === 'black' ? ' pu-cta-banner-black' : '' }
      ${ props.attributes.type === 'gray' ? ' pu-cta-banner-gray' : '' }${ props.attributes.type === 'image' ? ' pu-cta-banner-image' : '' }` }
        style={ props.attributes.type === 'image' && props.attributes.imgUrl ? { backgroundImage: `url(${ props.attributes.imgUrl })` } : '' }
        aria-label={ props.attributes.type === 'image' && props.attributes.altText ? props.attributes.altText : '' }>
        <div className="container">
          { props.attributes.type === 'gray' ? (
            <a
              href={ props.attributes.ctaUrl }
              className="pu-cta-banner-gray__desc"
            >
              { props.attributes.ctaDesc }
            </a> ) : '' }
          { props.attributes.type === 'image' ? (
            <a
              href={ props.attributes.ctaUrl }
              className="pu-cta-banner-image__button"
            >
              { props.attributes.ctaText }
            </a> ) : '' }
          { props.attributes.type === 'gold' ? (
            <p className="pu-cta-banner-gold__desc">{ props.attributes.ctaDesc }</p>
          ) : '' }
          { props.attributes.type === 'gold' ? (
            <a
              href={ props.attributes.ctaUrl }
              className="pu-cta-banner-gold__button"
            >
              { props.attributes.ctaText }
            </a> ) : '' }
          { props.attributes.type === 'black' ? (
            <p className="pu-cta-banner-black__desc">{ props.attributes.ctaDesc }</p>
          ) : '' }
          { props.attributes.type === 'black' ? (
            <a
              href={ props.attributes.ctaUrl }
              className="pu-cta-banner-black__button"
            >
              { props.attributes.ctaText }
            </a> ) : '' }
        </div>
      </div>
    );
    return returned;
  },
} );
