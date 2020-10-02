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
  TextareaControl,
  Button,
  RadioControl,
  CheckboxControl,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks } = wp.blockEditor;

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
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
registerBlockType( 'purdue-blocks/feature-story', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Featured Story' ), // Block title.
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
    </svg> ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
    style: { type: 'boolean', default: true },
    header: { type: 'string', default: '' },
    imgUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    contentAlign: { type: 'string', default: 'left' },
    ctaUrl: { type: 'string', default: '' },
    ctaText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'This block adds a feature story row on the page.'
  ),

  edit: ( props ) => {
    const setChecked = () => {
      if ( props.attributes.style ) {
        props.setAttributes( {
          style: false,
        } );
      } else {
        props.setAttributes( {
          style: true,
        } );
      }
    };
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <CheckboxControl
              label="Full width"
              help="Would you like this featured story row to take up the full screen width?"
              checked={ props.attributes.style }
              onChange={ setChecked }
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Align content"
              help="Choose to place the content to the left or right."
              selected={ props.attributes.contentAlign }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { contentAlign: option } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Featured Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
          <h2>CTA Button Link setting</h2>
            <PanelRow>
              <CheckboxControl
                label="Open link in new tab?"
                checked={ props.attributes.external }
                onChange={ () =>
                  props.setAttributes( { external: ! props.attributes.external } )
                }
              />
            </PanelRow>
          </PanelBody>
      </InspectorControls>,

      <div className={ 'purdue-blocks-editor-feature-story' }>
        <div className="content">
          <span>Add A Header</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.header !== '' ?
                    props.attributes.header :
                    ''
                }
                className="input"
                type="text"
                placeholder="Content Header..."
                onChange={ ( e ) => {
                  props.setAttributes( { header: e.target.value } );
                } }
              ></input>
            </div>
          </div>
          <span>Add Content Body</span>

          <div className="field">
            <div className="control">
              <InnerBlocks
                template={ BLOCKS_TEMPLATE }
                allowedBlocks={ [ 'core/paragraph', 'core/list' ] }
              />
            </div>
          </div>
          <span>Add CTA Button Text and URL</span>
          <div className="field">
            <label className="label">CTA Text</label>
            <div className="control">
              <input
                value={
                  props.attributes.ctaText !== '' ?
                    props.attributes.ctaText :
                    ''
                }
                className="input"
                type="text"
                placeholder="CTA Text..."
                onChange={ ( e ) => {
                  props.setAttributes( { ctaText: e.target.value } );
                } }
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">CTA URL</label>
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
        <div className="content">
          <span>Choose a Hero Image</span>
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
                  <div className={ 'purdue-blocks-editor-feature-story__preview' }>
                    <figure className={ 'image' }>
                      <img
                        alt={ props.attributes.altText }
                        src={ props.attributes.imgUrl }
                      />
                    </figure>
                    <Button
                      className={ 'purdue-blocks-editor-feature-story__button' }
                      onClick={ open }
                    >
                      Select a New Image
                    </Button>
                  </div>
                ) : (
                  <div className={ 'purdue-blocks-editor-feature-story__container' }>
                    <p className={ 'purdue-blocks-editor-feature-story__description' }>
                      Pick an image from the media library. The recommended aspect ratio is 3:2.
                    </p>
                    <Button
                      className={ 'purdue-blocks-editor-feature-story__button' }
                      onClick={ open }
                    >
                      Open Media Library
                    </Button>
                  </div>
                );
              } }
            />
          </MediaUploadCheck>
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
    const returned = props.attributes.style ? ( <div className="pu-feature-story">
      <div className="hero is-medium">
        <div className={ `${
          props.attributes.contentAlign === 'left' ? 'hero-image' : 'hero-image-reversed'
        }` }>
          <span
            className="background-image"
            role="img"
            style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
            aria-label={ props.attributes.altText }
          />
        </div>
        <div className={ `${
          props.attributes.contentAlign === 'left' ? 'shadow' : 'shadow-reversed'
        }` }></div>
        <div className="hero-body">
          <div className="container">
            <div className={ `content${
              props.attributes.contentAlign === 'left' ? '' : ' content-reversed'
            }` }>
              { ! props.attributes.header ? '' : (
                <h2>
                  { props.attributes.header }
                </h2> ) }
              <InnerBlocks.Content />
              { ( ! props.attributes.ctaUrl || ! props.attributes.ctaText ) ? '' : (
                <a
                  href={ props.attributes.ctaUrl }
                  className="pu-feature-story__button"
                  target={ props.attributes.external ? '_blank' : '_self' }
                  rel="noopener noreferrer"
                >
                  { props.attributes.ctaText }
                </a> ) }
            </div>
          </div>
        </div>
      </div>
    </div> ) : (
      <div className="pu-feature-story pu-feature-story__narrow">
        <div className={ `container pu-feature-story__container${
          props.attributes.contentAlign === 'left' ? '' : ' pu-feature-story__container-reversed'
        }` }>
          <div
            className="background-image"
            role="img"
            style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
            aria-label={ props.attributes.altText }
          ></div>
          <div className="story-content">
            { ! props.attributes.header ? '' : (
              <h2>
                { props.attributes.header }
              </h2> ) }
            <InnerBlocks.Content />
            { ( ! props.attributes.ctaUrl || ! props.attributes.ctaText ) ? '' : (
              <a
                href={ props.attributes.ctaUrl }
                className="pu-feature-story__button"
              >
                { props.attributes.ctaText }
              </a> ) }
          </div>
        </div>
      </div>
    );
    return returned;
  },
} );
