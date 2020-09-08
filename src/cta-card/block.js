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
  SelectControl,
} = wp.components;
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks } = wp.blockEditor;

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Add content' } ],
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
registerBlockType( 'purdue-blocks/cta-card', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'CTA Card' ), // Block title.
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
    cardType: { type: 'string', default: "small" },
    title: { type: 'string', source: 'html', selector: '.title' },
    titleLevel: { type: 'string', default: 'p' },
    subText: { type: 'string', source: 'html', selector: 'p.content' },
    hasLink: { type: 'boolean', default: false },
    link: { type: 'string', default: '' },
    linkText: { type: 'string', default: '' },
    imgLocation:{ type: 'string', default: 'left' },
    imgUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Create a call-to-action card with an image and text. The link to the card is optional.'
  ),

  edit: ( props ) => {
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Card type"
              help="Choose Large if there will be a lot of text or lists on the card. Otherwise choose Small."
              selected={ props.attributes.cardType }
              options={ [
                { label: 'Large', value: 'large' },
                { label: 'Small', value: 'small' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { cardType: option } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Heading level of the title"
              value={ props.attributes.titleLevel }
              options={ [
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
                { label: 'H4', value: 'h4' },
                { label: 'H5', value: 'h5' },
                { label: 'H6', value: 'h6' },
                { label: 'P', value: 'p' },
              ] }
              onChange={ ( titleLevel ) => {
                props.setAttributes( { titleLevel } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <RadioControl
              label="Align image"
              help="Choose to place the image to the left or right."
              selected={ props.attributes.imgLocation }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { imgLocation: option } )
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

      <div className={ `cta-card-horizonal${ props.attributes.cardType === 'small' ? ' cta-card-small' : ' cta-card-large' }${ props.attributes.imgLocation === 'left' ? ' cta-card-left' : ' cta-card-right' }` }
      >
        <div className={'columns is-multiline'}>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-two-fifths-desktop is-two-fifths-tablet is-full-mobile' : ' is-one-third-desktop is-one-third-tablet is-full-mobile' }`}>
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
                    <div className={ 'image is-3by2' }
                      role="img"
                      style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
                      aria-label={ props.attributes.altText }
                    >
                      <button onClick={ open }>{ props.attributes.imgUrl !== '' ? 'Select a new image' : 'Select an image' }</button>
                    </div>
                  );
                } }
              />
            </MediaUploadCheck>
          </div>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-three-fifths-desktop is-three-fifths-tablet is-full-mobile' : ' is-two-third-desktop is-two-third-tablet is-full-mobile' }`}>
            <div className="title">
              <RichText
                tagname={ props.setAttributes.titleLevel }
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
            { props.attributes.cardType === 'small' ? (
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
              </RichText>):(
                  <InnerBlocks
                  template={ BLOCKS_TEMPLATE }
                  allowedBlocks={ [ 'core/paragraph', 'core/list'] }
                  />
              )}
              { props.attributes.hasLink ? <div className="read-more-button"><span>{ props.attributes.linkText }</span></div> : '' }
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
    const returned = ( props.attributes.hasLink === true ?
      <a
        href={ props.attributes.link }
        target={ props.attributes.external ? '_blank' : '_self' }
        className={ `cta-card-horizonal${ props.attributes.cardType === 'small' ? ' cta-card-small' : ' cta-card-large' }${ props.attributes.imgLocation === 'left' ? ' cta-card-left' : ' cta-card-right' }` }        rel="noopener noreferrer"
      >
        <div className={'columns is-multiline'}>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-two-fifths-desktop is-two-fifths-tablet is-full-mobile' : ' is-one-third-desktop is-one-third-tablet is-full-mobile' }`}>
            <figure className="image is-3by2">
              <img src={ props.attributes.imgUrl } alt={ props.attributes.altText }></img>
            </figure>
          </div>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-three-fifths-desktop is-three-fifths-tablet is-full-mobile' : ' is-two-thirds-desktop is-two-thirds-tablet is-full-mobile' }`}>
            { props.attributes.title ? ( <RichText.Content
              className={ 'title' }
              tagName={ props.attributes.titleLevel }
              value={ props.attributes.title }
            /> ) : '' }
            { props.attributes.cardType === 'small' && props.attributes.subText ? ( <RichText.Content
              className={ 'content' }
              tagName="p"
              value={ props.attributes.subText }
            /> ) : '' }
            { props.attributes.cardType === 'large' ? ( <InnerBlocks.Content />) : '' }
            { props.attributes.linkText ? <div className="read-more-button"><span>{ props.attributes.linkText }</span></div> : '' }
          </div>
        </div>
      </a> :
      <div
        className={ ` cta-card-horizonal${ props.attributes.cardType === 'small' ? ' cta-card-small' : ' cta-card-large' }${ props.attributes.imgLocation === 'left' ? ' cta-card-left' : ' cta-card-right' }` }        rel="noopener noreferrer"
      >
        <div className={'columns is-multiline'}>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-two-fifths-desktop is-two-fifths-tablet is-full-mobile' : ' is-one-third-desktop is-one-third-tablet is-full-mobile' }`}>
            <figure className="image is-3by2">
              <img src={ props.attributes.imgUrl } alt={ props.attributes.altText }></img>
            </figure>
          </div>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-three-fifths-desktop is-three-fifths-tablet is-full-mobile' : ' is-two-thirds-desktop is-two-thirds-tablet is-full-mobile' }`}>
            { props.attributes.title ? ( <RichText.Content
              className={ 'title' }
              tagName={ props.attributes.titleLevel }
              value={ props.attributes.title }
            /> ) : '' }
            { props.attributes.cardType === 'small' && props.attributes.subText ? ( <RichText.Content
              className={ 'content' }
              tagName="p"
              value={ props.attributes.subText }
            /> ) : '' }
            { props.attributes.cardType === 'large' ? ( <InnerBlocks.Content />) : '' }
          </div>
        </div>
      </div>
    );
    return returned;
  },
} );
