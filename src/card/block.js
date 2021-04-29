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
  title: __( 'Custom Card' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs></defs><g id="clone" class="cls-1"><g class="cls-1"><path class="color-d9ab28" d="M100,9.38V71.87a9.38,9.38,0,0,1-9.37,9.38H81.25v9.37A9.38,9.38,0,0,1,71.87,100H9.37A9.38,9.38,0,0,1,0,90.62V28.13a9.38,9.38,0,0,1,9.37-9.38h9.38V9.38A9.38,9.38,0,0,1,28.12,0H90.63A9.38,9.38,0,0,1,100,9.38ZM71.87,89.45v-8.2H28.12a9.38,9.38,0,0,1-9.37-9.38V28.13h-8.2A1.17,1.17,0,0,0,9.37,29.3V89.45a1.17,1.17,0,0,0,1.18,1.17H70.7A1.17,1.17,0,0,0,71.87,89.45ZM90.63,70.7V10.55a1.17,1.17,0,0,0-1.18-1.17H29.3a1.17,1.17,0,0,0-1.18,1.17V70.7a1.17,1.17,0,0,0,1.18,1.17H89.45A1.17,1.17,0,0,0,90.63,70.7Z" transform="translate(0 0)"/></g></g></svg>
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
    hasLink: { type: 'boolean', default: false },
    title: { type: 'string', source: 'html', selector: 'p.title' },
    subText: { type: 'string', source: 'html', selector: 'p.content' },
    link: { type: 'string', default: '' },
    linkText: { type: 'string', default: '' },
    imgUrl: { type: 'string', default: '' },
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
    const removeMedia = () => {
      props.setAttributes({
        imgUrl: ''
      });
    }
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
          { props.attributes.imgUrl ?
          <PanelRow>
            <TextareaControl
              label="Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>:""}
          { props.attributes.imgUrl ?
          <PanelRow>
            <Button className={ 'remove-image-button' } onClick={removeMedia}>
                Remove image
            </Button>
          </PanelRow>:""}
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
                  <Button onClick={ open }>{ props.attributes.imgUrl !== '' ? 'Select a new image' : 'Select an image (optional)' }</Button>
                </div>
              );
            } }
          />
        </MediaUploadCheck>
        <div className="title">
          <RichText
            tagname="p"
            value={ props.attributes.title }
            className={ 'title' }
            onChange={ ( text ) => {
              props.setAttributes( { title: text } )
            } }
            placeholder="Add Title (Optional)"
            keepPlaceholderOnFocus={ true }
            allowedFormats={ [] }
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
            allowedFormats={ [] }
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
        { props.attributes.title ? ( <RichText.Content
          className={ 'title' }
          tagName="p"
          value={ props.attributes.title }
        /> ) : '' }
        { props.attributes.subText ? ( <RichText.Content
          className={ 'content' }
          tagName="p"
          value={ props.attributes.subText }
        /> ) : '' }
        { props.attributes.linkText ? <div className="read-more-button"><span>{ props.attributes.linkText }</span></div> : '' }
      </a> :
      <div
        className={ `square-card${ props.attributes.backgroundColor === 'gold' ? ' background-gold' : '' }${ props.attributes.borderColor === 'black' ? ' border-black' : '' }` }
      >
        { props.attributes.imgUrl ?
          <figure className="image">
            <img src={ props.attributes.imgUrl } alt={ props.attributes.altText }></img>
          </figure> : '' }
        { props.attributes.title ? ( <RichText.Content
          className={ 'title' }
          tagName="p"
          value={ props.attributes.title }
        /> ) : '' }
        { props.attributes.subText ? ( <RichText.Content
          className={ 'content' }
          tagName="p"
          value={ props.attributes.subText }
        /> ) : '' }
      </div>
    );
    return returned;
  },
} );
