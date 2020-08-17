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
  Button,
} = wp.components;
const { MediaUploadCheck, MediaUpload } = wp.blockEditor;

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
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="file-image"
      className="svg-inline--fa fa-file-image fa-w-12"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
    >
      <path
        fill="#8E6F3E"
        d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224V288l-23.5-23.5c-4.7-4.7-12.3-4.7-17 0L176 352l-39.5-39.5c-4.7-4.7-12.3-4.7-17 0L80 352v64zm48-240c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
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
    images: { type: 'array', default: [] },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add this block and select three square images to showcase in a row.'
  ),

  edit: ( props ) => {
    return [
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
          { props.attributes.images.map( img => {
            return (
              <div className="column is-2-fullhd is-2-widescreen is-4-desktop is-4-tablet is-4-mobile">
                <figure className="image is-square">
                  <img alt={ img.alt } src={ img.url } />
                </figure>
              </div>
            )
          } ) }
        </div>
      </section>
    )
  },
} );
