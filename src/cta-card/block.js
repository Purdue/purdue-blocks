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
  Button
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
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs></defs><g id="clone" class="cls-1"><g class="cls-1"><path class="cls-2" d="M100,9.38V71.87a9.38,9.38,0,0,1-9.37,9.38H81.25v9.37A9.38,9.38,0,0,1,71.87,100H9.37A9.38,9.38,0,0,1,0,90.62V28.13a9.38,9.38,0,0,1,9.37-9.38h9.38V9.38A9.38,9.38,0,0,1,28.12,0H90.63A9.38,9.38,0,0,1,100,9.38ZM71.87,89.45v-8.2H28.12a9.38,9.38,0,0,1-9.37-9.38V28.13h-8.2A1.17,1.17,0,0,0,9.37,29.3V89.45a1.17,1.17,0,0,0,1.18,1.17H70.7A1.17,1.17,0,0,0,71.87,89.45ZM90.63,70.7V10.55a1.17,1.17,0,0,0-1.18-1.17H29.3a1.17,1.17,0,0,0-1.18,1.17V70.7a1.17,1.17,0,0,0,1.18,1.17H89.45A1.17,1.17,0,0,0,90.63,70.7Z" transform="translate(0 0)"/></g></g></svg>
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
    height: { type: "string", default: "100" },
    headerColor: { type: 'string', default: 'black' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Create a call-to-action card with an image and text. The link to the card is optional.'
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
            <RadioControl
              label="Height of the card"
              help="100%: the height of the card will be 100% height of its parent container; Auto: the height of the card will depend upon the height of its children."
              selected={props.attributes.height}
              options={[
                { label: "100%", value: "100" },
                { label: "Auto", value: "auto" },
              ]}
              onChange={(option) => {
                props.setAttributes({ height: option });
              }}
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
            <SelectControl
              label="Color the header"
              value={ props.attributes.headerColor }
              options={ [
                { label: 'Black', value: 'black' },
                { label: 'Digital Gold', value: 'gold' },
                { label: 'Steel', value: 'steel' },
              ] }
              onChange={ ( headerColor ) => {
                props.setAttributes( { headerColor } )
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
          { props.attributes.imgUrl ?
          <PanelRow>
            <Button className={ 'remove-image-button' } onClick={removeMedia}>
                Remove image
            </Button>
          </PanelRow>:""}
          { props.attributes.cardType ==="small" ?
          <PanelRow>
            <CheckboxControl
              label="Add a link to this card?"
              checked={ props.attributes.hasLink }
              onChange={ () =>
                props.setAttributes( { hasLink: ! props.attributes.hasLink } )
              }
            />
          </PanelRow>:''
            }
          { props.attributes.cardType ==="small"&&props.attributes.hasLink ?
            ( <PanelRow>
              <TextControl
                label="Call to action text"
                value={ props.attributes.linkText }
                onChange={ ( linkText ) => props.setAttributes( { linkText } ) }
              />
            </PanelRow> ) : '' }
          { props.attributes.cardType ==="small"&&props.attributes.hasLink ? (
            <PanelRow>
              <TextControl
                label="Link address"
                value={ props.attributes.link }
                onChange={ ( link ) => props.setAttributes( { link } ) }
              />
            </PanelRow> ) : '' }

          { props.attributes.cardType ==="small"&&props.attributes.hasLink ?
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
                className={ `title${
                  props.attributes.headerColor === 'gold' ? ' header-color-gold' : ''
                }${
                  props.attributes.headerColor === 'steel' ? ' header-color-steel' : ''
                }` }
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
              >
              </RichText>):(
                  <InnerBlocks
                  template={ BLOCKS_TEMPLATE }
                  allowedBlocks={ [ 'core/paragraph', 'core/list'] }
                  />
              )}
              { props.attributes.cardType ==="small"&&props.attributes.hasLink ? <div className="read-more-button"><span>{ props.attributes.linkText }</span></div> : '' }
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
    const returned = ( props.attributes.cardType ==="small"&&props.attributes.hasLink === true ?
      <a
        href={ props.attributes.link }
        target={ props.attributes.external ? '_blank' : '_self' }
        className={ `cta-card-horizonal${ props.attributes.cardType === 'small' ? ' cta-card-small' : ' cta-card-large' }${ props.attributes.imgLocation === 'left' ? ' cta-card-left' : ' cta-card-right' }${props.attributes.height==="auto"?" cta-card--height-auto":""}` }        
        rel="noopener noreferrer"
      >
        <div className={'columns is-multiline'}>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-two-fifths-desktop is-two-fifths-tablet is-full-mobile' : ' is-one-third-desktop is-one-third-tablet is-full-mobile' }`}>
            <figure className="image is-3by2">
              <img src={ props.attributes.imgUrl } alt={ props.attributes.altText }></img>
            </figure>
          </div>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-three-fifths-desktop is-three-fifths-tablet is-full-mobile' : ' is-two-thirds-desktop is-two-thirds-tablet is-full-mobile' }`}>
            { props.attributes.title ? ( <RichText.Content
              className={ `title${
                props.attributes.headerColor === 'gold' ? ' header-color-gold' : ''
              }${
                props.attributes.headerColor === 'steel' ? ' header-color-steel' : ''
              }` }
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
        className={ ` cta-card-horizonal${ props.attributes.cardType === 'small' ? ' cta-card-small' : ' cta-card-large' }${ props.attributes.imgLocation === 'left' ? ' cta-card-left' : ' cta-card-right' }${props.attributes.height==="auto"?" cta-card--height-auto":""}` }
      >
        <div className={'columns is-multiline'}>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-two-fifths-desktop is-two-fifths-tablet is-full-mobile' : ' is-one-third-desktop is-one-third-tablet is-full-mobile' }`}>
            <figure className="image is-3by2">
              <img src={ props.attributes.imgUrl } alt={ props.attributes.altText }></img>
            </figure>
          </div>
          <div className={ `column${ props.attributes.cardType === 'small' ? ' is-three-fifths-desktop is-three-fifths-tablet is-full-mobile' : ' is-two-thirds-desktop is-two-thirds-tablet is-full-mobile' }`}>
            { props.attributes.title ? ( <RichText.Content
              className={ `title${
                props.attributes.headerColor === 'gold' ? ' header-color-gold' : ''
              }${
                props.attributes.headerColor === 'steel' ? ' header-color-steel' : ''
              }` }
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
