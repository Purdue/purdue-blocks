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
  CheckboxControl,
  TextareaControl,
  TextControl,
  RadioControl,
  Button,
} = wp.components;
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload } = wp.blockEditor;

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
registerBlockType( 'purdue-blocks/card', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Card' ), // Block title.
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
    hasLink: { type: 'boolean', default: false },
    title: { type: 'string', source: 'html', selector: 'p' },
    subText: { type: 'string', source: 'html', selector: 'p' },
    link: { type: 'string', default: '' },
    linkText: { type: 'string', default: '' },
    imgUrl: { type: 'string', default: 'http://placehold.it/100' },
    altText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
    backgroundColor: { type: 'string', default: 'white' },
    borderColor: { type: 'string', default: 'gold' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Create a card with an image and text. You can choose to add a link and a call to action button to the card.'
  ),

  edit: ( props ) => {
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Background Color"
              help="Choose the background color of the card."
              selected={ props.attributes.backgroundColor }
              options={ [
                { label: 'Gold', value: 'gold' },
                { label: 'White', value: 'white' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { backgroundColor: option } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <RadioControl
              label="Border Color"
              help="Choose the border color of the card."
              selected={ props.attributes.borderColor }
              options={ [
                { label: 'Gold', value: 'gold' },
                { label: 'Black', value: 'black' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { borderColor: option } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Add a link to this card?"
              checked={ props.attributes.hasLink }
              onChange={ () =>
                props.setAttributes( { hasLink: ! props.attributes.hasLink } )
              }
            />
          </PanelRow>
          { props.attributes.hasLink ?
            ( <PanelRow>
              <TextControl
                label="Call to action text"
                value={ props.attributes.linkText }
                onChange={ ( linkText ) => props.setAttributes( { linkText } ) }
              />
            </PanelRow> ) : '' }
          { props.attributes.hasLink ? (
            <PanelRow>
              <TextControl
                label="Link address"
                value={ props.attributes.link }
                onChange={ ( link ) => props.setAttributes( { link } ) }
              />
            </PanelRow> ) : '' }

          { props.attributes.hasLink ?
            <PanelRow>
              <CheckboxControl
                label="Open link in new tab?"
                checked={ props.attributes.external }
                onChange={ () =>
                  props.setAttributes( { external: ! props.attributes.external } )
                }
              />
            </PanelRow> : '' }
        </PanelBody>
      </InspectorControls>,

      <div className={ `box square-card${ props.attributes.backgroundColor === 'gold' ? ' background-gold' : '' }${ props.attributes.borderColor === 'black' ? ' border-black' : '' }` }

      >
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
                  <button onClick={ open }>{ props.attributes.imgUrl !== 'http://placehold.it/100' ? 'Select a new image' : 'Select an image (optional)' }</button>
                </div>
              );
            } }
          />
        </MediaUploadCheck>
        <div className="title">
          <RichText
            tagname="p"
            value={ props.attributes.title }
            className={ 'title is-3' }
            onChange={ ( text ) => {
              props.setAttributes( { title: text } )
            } }
            placeholder="Add Title (Optional)"
            keepPlaceholderOnFocus={ true }
          >
          </RichText>
        </div>
        <div className="content">
          <RichText
            tagname="p"
            value={ props.attributes.subText }
            className={ 'content' }
            onChange={ ( text ) => {
              props.setAttributes( { subText: text } )
            } }
            placeholder="Add Text (Optional)"
          >
          </RichText>
          { props.attributes.hasLink ? <div className="read-more-button"><span>{ props.attributes.linkText }</span></div> : '' }
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
    const returned = ( props.attributes.hasLink === true ?
      <a
        href={ props.attributes.link }
        target={ props.attributes.external ? '_blank' : '_self' }
        className={ `square-card${ props.attributes.backgroundColor === 'gold' ? ' background-gold' : '' }${ props.attributes.borderColor === 'black' ? ' border-black' : '' }` }
        rel="noopener noreferrer"
      >
        { props.attributes.imgUrl ?
          <figure className="image">
            <img src={ props.attributes.imgUrl } alt={ props.attributes.altText }></img>
          </figure> : '' }
        { props.attributes.title ? <p className={ 'title is-3' }>{ props.attributes.title }</p> : '' }
        { props.attributes.subText ? <p className={ 'content' }>{ props.attributes.subText }</p> : '' }
        { props.attributes.linkText ? <div className="read-more-button"><span>{ props.attributes.linkText }</span></div> : '' }
      </a> :
      <div
        className={ `square-card${ props.attributes.backgroundColor === 'gold' ? ' background-gold' : '' }${ props.attributes.borderColor === 'black' ? ' border-black' : '' }` }
      >
        { props.attributes.imgUrl ?
          <figure className="image">
            <img src={ props.attributes.imgUrl } alt={ props.attributes.altText }></img>
          </figure> : '' }
        { props.attributes.title ? <p className={ 'title is-3' }>{ props.attributes.title }</p> : '' }
        { props.attributes.subText ? <p className={ 'content' }>{ props.attributes.subText }</p> : '' }
      </div>
    );
    return returned;
  },
} );
