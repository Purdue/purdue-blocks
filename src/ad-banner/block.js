/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextareaControl,
  TextControl,
  Button,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps } = wp.blockEditor;

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
registerBlockType( 'purdue-blocks/ad-banner', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Banner' ), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="ad"
      className="svg-inline--fa fa-ad fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#8E6F3E"
        d="M157.52 272h36.96L176 218.78 157.52 272zM352 256c-13.23 0-24 10.77-24 24s10.77 24 24 24 24-10.77 24-24-10.77-24-24-24zM464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM250.58 352h-16.94c-6.81 0-12.88-4.32-15.12-10.75L211.15 320h-70.29l-7.38 21.25A16 16 0 0 1 118.36 352h-16.94c-11.01 0-18.73-10.85-15.12-21.25L140 176.12A23.995 23.995 0 0 1 162.67 160h26.66A23.99 23.99 0 0 1 212 176.13l53.69 154.62c3.61 10.4-4.11 21.25-15.11 21.25zM424 336c0 8.84-7.16 16-16 16h-16c-4.85 0-9.04-2.27-11.98-5.68-8.62 3.66-18.09 5.68-28.02 5.68-39.7 0-72-32.3-72-72s32.3-72 72-72c8.46 0 16.46 1.73 24 4.42V176c0-8.84 7.16-16 16-16h16c8.84 0 16 7.16 16 16v160z"
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
    heading: { type: 'string', default: '' },
    link: { type: 'string', default: '' },
    imgUrl: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    'Create an ad banner.'
  ),

  edit: ( props ) => {
    const removeMedia = () => {
      props.setAttributes({
        imgUrl: ''
      });
    }
    return [
      <InspectorControls>
      </InspectorControls>,

      <div className={ 'blocks-editor-banner' }>
        <div className="content">
          <TextControl
            label="Block Heading"
            value={ props.attributes.heading }
            onChange={ ( heading ) => props.setAttributes( { heading } ) }
          />
          <span>Choose an image.</span>
          <MediaUploadCheck>
            <MediaUpload
              allowedTypes={['image']}
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
                  <div className={ 'bulma-blocks-editor-link-card__preview' }>
                    <figure className={ 'image' }>
                      <img
                        alt={ props.attributes.altText }
                        src={ props.attributes.imgUrl }
                      />
                    </figure>
                    <Button
                      className={ 'bulma-blocks-editor-link-card__button' }
                      onClick={ open }
                    >
                      Select a New Image
                    </Button>
                    <Button className={ 'bulma-blocks-editor-link-card__button' } onClick={removeMedia}>
                        Remove image
                    </Button>
                  </div>
                ) : (
                  <div className={ 'bulma-blocks-editor-link-card__container' }>
                    <p className={ 'bulma-blocks-editor-link-card__description' }>
                      Pick an image from the media library.
                    </p>
                    <Button
                      className={ 'bulma-blocks-editor-link-card__button' }
                      onClick={ open }
                    >
                      Open Media Library
                    </Button>
                  </div>
                );
              } }
            />
          </MediaUploadCheck>
          <hr />
          <CheckboxControl
            label="Open link in new tab?"
            checked={ props.attributes.external }
            onChange={ () =>
              props.setAttributes( { external: ! props.attributes.external } )
            }
          />
        </div>
        <div className="content">
          <span>Add the link.</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.link !== '' ? props.attributes.link : ''
                }
                className="input"
                type="text"
                placeholder="Paste permalink or url..."
                onChange={ ( e ) => {
                  props.setAttributes( { link: e.target.value } );
                } }
              ></input>
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
    const blockProps = useBlockProps.save();

    const returned = (
      <div
      {...blockProps}
        className={ 'banner ad-banner' }
      >
        <h2><span>{ props.attributes.heading }</span></h2>
        <a href={ props.attributes.link } className={ 'banner__ad' } target={ props.attributes.external ? '_blank' : '_self' } rel="noopener noreferrer">
          <figure className="image">
            <img src={ props.attributes.imgUrl } alt={ props.attributes.altText } />
          </figure>
        </a>
      </div>
    );
    return returned;
  },
} );
