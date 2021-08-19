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
  TextControl,
  Button,
  RadioControl,
  CheckboxControl,
  SelectControl
} = wp.components;
const {  RichText,InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks } = wp.blockEditor;

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
registerBlockType( 'purdue-blocks/story-line', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Storyline' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.75 100"><defs></defs><g id="lightbulb" class="cls-1"><g class="cls-1"><path class="cls-2" d="M84.38,34.38A34.21,34.21,0,0,1,75.87,57c-3.25,3.71-8.35,11.49-10.24,18H56.26v0a11,11,0,0,1,.43-2.79A61.73,61.73,0,0,1,68.82,50.81a25,25,0,1,0-37.64,0A61.7,61.7,0,0,1,43.33,72.23,9.49,9.49,0,0,1,43.74,75v0H34.37c-1.89-6.51-7-14.29-10.24-18A34.37,34.37,0,1,1,84.38,34.38ZM53.12,18.75A3.12,3.12,0,0,1,50,21.88a12.51,12.51,0,0,0-12.5,12.5,3.13,3.13,0,0,1-6.25,0A18.77,18.77,0,0,1,50,15.63,3.11,3.11,0,0,1,53.12,18.75ZM34.38,81.25H65.62v8.43a3.11,3.11,0,0,1-.52,1.73L60.3,98.6a3.1,3.1,0,0,1-2.6,1.4H42.3a3.1,3.1,0,0,1-2.6-1.4l-4.79-7.19a3.11,3.11,0,0,1-.52-1.73Z" transform="translate(-15.62)"/></g></g></svg>
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
    title: { type: 'string', source: 'html', selector: '.story-title' },
    backgroundColor: { type: 'string', default: 'white' },
    imgUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    imageAlign: { type: 'string', default: 'left' },
    contentAlign:{type: 'string', default: 'bottom'},
    hasLink: { type: 'boolean', default: false },
    ctaUrl: { type: 'string', default: '' },
    ctaText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
    headerLevel: { type: 'string', default: 'h2' },
    addPaddingTop:{ type: 'boolean', default: false },
    addPaddingBottom:{ type: 'boolean', default: false },
    backgroundImageUrl: { type: 'string', default: '' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'This block adds a storyline row on the page.'
  ),

  edit: ( props ) => {
    const removeMedia = () => {
      props.setAttributes({
        imgUrl: ''
      });
    }
    if(props.attributes.backgroundColor === 'dark') {
      props.setAttributes( { backgroundImageUrl: file_data.concreteDark_url } )
    }else{
      props.setAttributes( { backgroundImageUrl: '' } )
    }
    console.log(props.attributes.headerLevel)
    return [
      <InspectorControls>
        <PanelBody>
            <PanelRow>
              <RadioControl
                label="Background Color"
                help="Choose the background color."
                selected={ props.attributes.backgroundColor }
                options={ [
                  { label: 'White', value: 'white' },
                  { label: 'Light Gray', value: 'gray' },
                  { label: 'Dark', value: 'dark' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { backgroundColor: option } )
                } }
              />
            </PanelRow>

          <PanelRow>
            <RadioControl
              label="Image Alignment"
              help="Choose to place the image to the left or right."
              selected={ props.attributes.imageAlign }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { imageAlign: option } )
              } }
            />
          </PanelRow>

          <PanelRow>
            <RadioControl
              label="Content Alignment"
              help="Choose to align the content to the bottom of the image when it's short or the center of the image when it's tall."
              selected={ props.attributes.contentAlign }
              options={ [
                { label: 'Bottom', value: 'bottom' },
                { label: 'Center', value: 'center' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { contentAlign: option } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Heading Level of the Header"
              help="This only changes the HTML tag. The styles will stay the same."
              value={ props.attributes.headerLevel }
              options={ [
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
                { label: 'H4', value: 'h4' },
                { label: 'H5', value: 'h5' },
                { label: 'H6', value: 'h6' },
              ] }
              onChange={ ( headerLevel ) => {
                props.setAttributes( { headerLevel } )
              } }
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
        <PanelRow>
            <CheckboxControl
              label="Add a CTA link?"
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
                value={ props.attributes.ctaText }
                onChange={ ( ctaText ) => props.setAttributes( { ctaText } ) }
              />
            </PanelRow> ) : '' }
          { props.attributes.hasLink ? (
            <PanelRow>
              <TextControl
                label="Link address"
                value={ props.attributes.ctaUrl }
                onChange={ ( ctaUrl ) => props.setAttributes( { ctaUrl } ) }
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
          <PanelRow>
            <TextareaControl
              label="Featured Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>
          <PanelRow>
              <CheckboxControl
                label="Add padding above top guide line?"
                checked={props.attributes.addPaddingTop}
                onChange={(checked) => props.setAttributes({ addPaddingTop: checked })}
              />
          </PanelRow>
          <PanelRow>
              <CheckboxControl
                label="Add padding below top guide line?"
                checked={props.attributes.addPaddingBottom}
                onChange={(checked) => props.setAttributes({ addPaddingBottom: checked })}
              />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={ `purdue-blocks-storyline purdue-blocks-editor-storyline
        ${props.attributes.addPaddingTop ? ` purdue-blocks-storyline-top-space`:''}
        ${props.attributes.addPaddingBottom ? ` purdue-blocks-storyline-bottom-space`:''}
        ${props.attributes.backgroundColor==="gray" ? ` purdue-blocks-storyline-gray`:''}
        ${props.attributes.backgroundColor==="dark" ? ` purdue-blocks-storyline-dark`:''}
        `}
         style={{backgroundImage: `url(${props.attributes.backgroundColor==="dark"?props.attributes.backgroundImageUrl:""})`}}
         aria-label=''
         >
        <div className={`container`}>
          <div className={`columns is-multiline${props.attributes.imageAlign === 'left' ? '' : 'columns-reversed'}`}>
            <div className={`column is-half-desktop is-full-tablet is-full-mobile`}>              
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
                      <div className={`image-container`}>
                        <img className={ 'image' }
                          src={ props.attributes.imgUrl }
                          alt={ props.attributes.altText }
                        />
                        <div className="image-buttons">
                        <Button className={ 'remove-image-button' } onClick={ open }>{ props.attributes.imgUrl !== '' ? 'Select a new image' : 'Select an image (optional)' }</Button>
                        { props.attributes.imgUrl ?
                        <Button className={ 'remove-image-button' } onClick={removeMedia}>
                            Remove image
                        </Button>:""}  
                        </div>                    
                      </div>
                    );
                  } }
                />
              </MediaUploadCheck>
              
              </div>
              <div className={`column is-half-desktop is-full-tablet is-full-mobile${props.attributes.contentAlign === 'bottom' ? '' : ' column-align-bottom'}${props.attributes.contentAlign === 'center' ? '' : ' column-align-center'}`}>
                <div className="content-container">
                    <RichText
                      tagname={ props.attributes.headerLevel }
                      value={ props.attributes.title }
                      className={ 'story-title' }
                      onChange={ ( text ) => {
                        props.setAttributes( { title: text } )
                      } }
                      placeholder="Add header"
                      keepPlaceholderOnFocus={ true }
                      allowedFormats={ [] }
                    >
                    </RichText>
                    <InnerBlocks
                      template={ BLOCKS_TEMPLATE }
                      templateLock={ false }
                    />
                  { props.attributes.hasLink ? <div className="read-more-button"><span>{ props.attributes.ctaText }</span>
                  <span className="read-more-button-icon"></span></div> : '' }
                </div>
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
    const returned = <div className={ `purdue-blocks-storyline
        ${props.attributes.addPaddingTop ? ` purdue-blocks-storyline-top-space`:''}
        ${props.attributes.addPaddingBottom ? ` purdue-blocks-storyline-bottom-space`:''}
        ${props.attributes.backgroundColor==="gray" ? ` purdue-blocks-storyline-gray`:''}
        ${props.attributes.backgroundColor==="dark" ? ` purdue-blocks-storyline-dark`:''}
        `}
        style={{backgroundImage: `url(${props.attributes.backgroundColor==="dark"?props.attributes.backgroundImageUrl:""})`}}
        aria-label=''
      >
      <div className={`container`}>
          <div className={`columns is-multiline${props.attributes.imageAlign === 'left' ? '' : 'columns-reversed'}`}>
            <div className={`column is-half-desktop is-full-tablet is-full-mobile`}>
              <div className={`image-container`}>
              { props.attributes.imgUrl ?
                <img className={ 'image' } src={ props.attributes.imgUrl } alt={ props.attributes.altText } />
                :""}
              </div>
            </div>
            <div className={`column is-half-desktop is-full-tablet is-full-mobile${props.attributes.contentAlign === 'bottom' ? '' : ' column-align-bottom'}${props.attributes.contentAlign === 'center' ? '' : ' column-align-center'}`}>
              <div className={`content-container`}>
                { props.attributes.title ? ( <RichText.Content
                  className={ 'story-title' }
                  tagname={ props.attributes.headerLevel }
                  value={ props.attributes.title }
                /> ) : '' }
                <InnerBlocks.Content />
                {props.attributes.hasLink?
                <a className="read-more-button" href={props.attributes.ctaUrl}
                  target={ props.attributes.external ? '_blank' : '_self' }
                  rel="noopener noreferrer"
                >
                  { props.attributes.ctaText }
                  <span className="read-more-button-icon">
                  </span>
                  </a>:""}
              </div> 
            </div>
          </div>
      </div>
    </div> ;
    return returned;
  },
} );
