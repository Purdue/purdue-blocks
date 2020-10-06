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
  title: __( 'Image Toggle Card Block' ), // Block title.
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
    images: { type: 'array', default: [] },
    cardTitle: {type: 'string', default: ""},
    firstTitle: {type: 'string', default: ""},
    secondTitle: {type: 'string', default: ""},
    linkText: {type: 'string', default: ""},
    linkUrl: {type: 'string', default: ""},
    includeLink: {type: 'boolean', default: false },
    openInNewTab: {type: 'boolean', default: false }
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add a block with two images that can be toggled with an optional link.'
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
          </div>
        </div>
        <MediaUploadCheck>
          <MediaUpload
            multiple
            gallery
            onSelect={ ( imgs ) => {
              props.setAttributes( { images: imgs } )
            } }
            render={ ( { open } ) => {
              return props.attributes.images.length === 2 ? (
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
                    Pick two image from the media library.
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
          <span>{ props.attributes.cardTitle }</span>

          {props.attributes.includeLink ? (
            <a href={props.attributes.linkUrl} target={props.attributes.openInNewTab ? '_blank': ''}>{props.attributes.linkText}</a>
          ) : ''}
        </div>
        <div className={`pu-image-toggle__images`}>
          { props.attributes.images.map( (img, index) => {
              return (
                <img className={`${index === 0 ? 'show' : ''}`} id={`toggleImage${index}`} alt={ img.alt } src={ img.url } />
              )
            } ) }
        </div>
        <div className={`pu-image-toggle__buttons`}>
          <button id={`toggleButton0`} className={`toggle-button selected`}>{props.attributes.firstTitle}</button>
          <button id={`toggleButton1`} className={`toggle-button`}>{props.attributes.secondTitle}</button>
        </div>
      </div>
    );
    return returned;
  },
} );
