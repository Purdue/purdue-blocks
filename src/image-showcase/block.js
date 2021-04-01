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

const {
  PanelBody,
  PanelRow,
  CheckboxControl,
  Button,
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
registerBlockType( 'purdue-blocks/image-showcase', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Image Showcase' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.75 100"><defs></defs><g id="lightbulb" class="cls-1"><g class="cls-1"><path class="color-9c9795" d="M84.38,34.38A34.21,34.21,0,0,1,75.87,57c-3.25,3.71-8.35,11.49-10.24,18H56.26v0a11,11,0,0,1,.43-2.79A61.73,61.73,0,0,1,68.82,50.81a25,25,0,1,0-37.64,0A61.7,61.7,0,0,1,43.33,72.23,9.49,9.49,0,0,1,43.74,75v0H34.37c-1.89-6.51-7-14.29-10.24-18A34.37,34.37,0,1,1,84.38,34.38ZM53.12,18.75A3.12,3.12,0,0,1,50,21.88a12.51,12.51,0,0,0-12.5,12.5,3.13,3.13,0,0,1-6.25,0A18.77,18.77,0,0,1,50,15.63,3.11,3.11,0,0,1,53.12,18.75ZM34.38,81.25H65.62v8.43a3.11,3.11,0,0,1-.52,1.73L60.3,98.6a3.1,3.1,0,0,1-2.6,1.4H42.3a3.1,3.1,0,0,1-2.6-1.4l-4.79-7.19a3.11,3.11,0,0,1-.52-1.73Z" transform="translate(-15.62)"/></g></g></svg>
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
    includeCopy: {type: 'boolean', default: false}
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add this block and select three square images to showcase in a row.'
  ),

  edit: ( props ) => {
    const removeMedia = () => {
      props.setAttributes({
        images: ''
      });
    }
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <CheckboxControl
              label="Include Body Content?"
              checked={ props.attributes.includeCopy }
              onChange={ () =>
                props.setAttributes( { includeCopy: ! props.attributes.includeCopy } )
              }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,
      <div className={ 'editor-image-showcase' }>
        <MediaUploadCheck>
          <MediaUpload
            multiple
            gallery
            onSelect={ ( imgs ) => {
              props.setAttributes( { images: imgs } )
            } }
            render={ ( { open } ) => {
              return props.attributes.images.length === 3 ? (
                <div className={ 'editor-image-showcase__preview' }>
                  <div className={ 'editor-image-showcase__imgGroup' }>
                    { props.attributes.images.map( img => {
                      return (
                        <figure className={ 'image is-128x128' }>
                          <img
                            alt=""
                            src={ img.url }
                          />
                        </figure>
                      )
                    } ) }
                  </div>
                  <Button
                    className={ 'editor-image-showcase__button' }
                    onClick={ open }
                  >
                    Select New Images
                  </Button>
                  <Button className={ 'bulma-blocks-editor-site-hero__button' } onClick={removeMedia}>
                        Remove images
                  </Button>
                </div>
              ) : (
                <div className={ 'editor-image-showcase__container' }>
                  <span className={ 'editor-image-showcase__heading' }>
                    <span className="dashicons dashicons-format-image"></span>
                    <span>Image Showcase</span>
                  </span>
                  <p className={ 'editor-image-showcase__description' }>
                    Pick three image from the media library.
                  </p>
                  <Button
                    className={ 'editor-image-showcase__button' }
                    onClick={ open }
                  >
                    Open Media Library
                  </Button>
                </div>
              );
            } }
          />
        </MediaUploadCheck>
        
        {props.attributes.includeCopy ? (
          <div className="field">
            <div className="control">
              <InnerBlocks
                template={ BLOCKS_TEMPLATE }
                allowedBlocks={ [ 'core/paragraph', 'core/list' ] }
              />
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
    return (
      <section className={ 'section pu-image-showcase' } >
        <div className={ 'columns is-centered has-decoration is-mobile' }>
          { props.attributes.images?props.attributes.images.map( img => {
            return (
              <div className="column is-2-fullhd is-2-widescreen is-4-desktop is-4-tablet is-4-mobile">
                <figure className="image is-square">
                  <img alt={ img.alt } src={ img.url } />
                </figure>
              </div>
            )
          } ):"" }
        </div>
        {props.attributes.includeCopy ? (
          <div className="container">
            <div className="columns is-centered is-mobile">
              <div className="column is-8">
                <InnerBlocks.Content />
              </div>
            </div>
          </div>
        ) : ''}
      </section>
    )
  },
} );
