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
  CheckboxControl,
  TextareaControl,
  TextControl,
  Button,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, RichText, useBlockProps } = wp.blockEditor;

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
registerBlockType( 'purdue-blocks/cta-button', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'CTA Button' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs></defs><g id="clone" class="cls-1"><g class="cls-1"><path class="color-9c9795" d="M100,9.38V71.87a9.38,9.38,0,0,1-9.37,9.38H81.25v9.37A9.38,9.38,0,0,1,71.87,100H9.37A9.38,9.38,0,0,1,0,90.62V28.13a9.38,9.38,0,0,1,9.37-9.38h9.38V9.38A9.38,9.38,0,0,1,28.12,0H90.63A9.38,9.38,0,0,1,100,9.38ZM71.87,89.45v-8.2H28.12a9.38,9.38,0,0,1-9.37-9.38V28.13h-8.2A1.17,1.17,0,0,0,9.37,29.3V89.45a1.17,1.17,0,0,0,1.18,1.17H70.7A1.17,1.17,0,0,0,71.87,89.45ZM90.63,70.7V10.55a1.17,1.17,0,0,0-1.18-1.17H29.3a1.17,1.17,0,0,0-1.18,1.17V70.7a1.17,1.17,0,0,0,1.18,1.17H89.45A1.17,1.17,0,0,0,90.63,70.7Z" transform="translate(0 0)"/></g></g></svg>
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
    subText: { type: 'string', default: '' },
    link: { type: 'string', default: '' },
    ctaText: { type: 'string', default: '' },
    imgUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    'Create a card with an image, some text, and a call to action button.'
  ),

  edit: ( props ) => {
    const removeMedia = () => {
      props.setAttributes({
        imgUrl: ''
      });
    }
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <TextareaControl
              label="Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>
          <PanelRow>
              <TextControl
                label="Call to action text"
                value={ props.attributes.ctaText }
                onChange={ ( ctaText ) => props.setAttributes( { ctaText } ) }
              />
            </PanelRow>
         
            <PanelRow>
              <TextControl
                label="Link address"
                value={ props.attributes.link }
                onChange={ ( link ) => props.setAttributes( { link } ) }
              />
            </PanelRow>
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

      <div className={ 'card cta-card cta-button-admin' }>
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
                return (
                  <div className={ 'image' }
                    role="img"
                    style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
                    aria-label={ props.attributes.altText }
                  >
                    <Button onClick={ open }>{ props.attributes.imgUrl !== '' ? 'Select a new image' : 'Select an image (optional)' }</Button>
                  </div>
                );
              } }
            />
          </MediaUploadCheck>
        <div className="card-content">
        <RichText
            tagName="p"
            value={ props.attributes.subText }
            className={ 'content' }
            onChange={ ( text ) => {
              props.setAttributes( { subText: text } )
            } }
            placeholder="Add Card Text"
          >
          </RichText>
          { props.attributes.ctaText ? <div className="cta-card__button"><span>{ props.attributes.ctaText }</span></div> : '' }

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
      
      <a
      {...blockProps}
        className={ 'card cta-card' }
        href={ props.attributes.link }
        target={ props.attributes.external ? '_blank' : '_self' } rel="noopener"
      >{
        props.attributes.imgUrl?
        <div className={ 'card-image' }>
        <figure className="image is-3by2">
          <img src={ props.attributes.imgUrl } alt={ props.attributes.altText } />
        </figure>
      </div>:""
      }
        <div className={ 'card-content' }>
        <RichText.Content
          className={ '' }
          tagName="p"
          value={ props.attributes.subText }
        /> 
          <div className={ 'cta-card__button' }>
            { props.attributes.ctaText }
          </div>
        </div>
      </a>
    );
    return returned;
  },
} );
