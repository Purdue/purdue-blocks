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
  SelectControl
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
    style: { type: 'boolean', default: true },
    header: { type: 'string', default: '' },
    imgUrl: { type: 'string', default: '' },
    linkImg: { type: 'boolean', default: false },
    altText: { type: 'string', default: '' },
    caption: { type: 'string', default: '' },
    contentAlign: { type: 'string', default: 'left' },
    ctaUrl: { type: 'string', default: '' },
    ctaText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
    addCta2: { type: 'boolean', default: false },
    ctaUrl2: { type: 'string', default: '' },
    ctaText2: { type: 'string', default: '' },
    external2: { type: 'boolean', default: false },
    headerLevel: { type: 'string', default: 'h2' },
    headerColor: { type: 'string', default: 'gold' },
    buttonOption: { type: 'string', default: 'black' },
    backgroundColor: { type: 'string', default: 'white' },
    addBorder: { type: 'boolean', default: false },
    borderColor: { type: 'string', default: "gold" },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'This block adds a feature story row on the page.'
  ),

  edit: ( props ) => {
    const setImgLinkChecked = () => {
      if ( props.attributes.linkImg ) {
        props.setAttributes( {
          linkImg: false,
        } );
      } else {
        props.setAttributes( {
          linkImg: true,
        } );
      }
    };
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
              label="Block Styles"
              help="Full Width: Takes up the full width of the screen;
              Aligned: Includes normal page margins."
              selected={ props.attributes.style?"full":"aligned" }
              options={ [
                { label: 'Aligned', value: 'aligned' },
                { label: 'Full width', value: 'full' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { style: option==="full"?true:false } )
              } }
            />
          </PanelRow>
          {props.attributes.style?
            <PanelRow>
              <RadioControl
                label="Background Color"
                help="Choose the background color of the content area."
                selected={ props.attributes.backgroundColor }
                options={ [
                  { label: 'White', value: 'white' },
                  { label: 'Black', value: 'black' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { backgroundColor: option } )
                  props.setAttributes( { headerColor: "gold" } )
                  props.setAttributes( { borderColor: "gold" } )
                } }
              />
            </PanelRow>:""
          }
          {props.attributes.style&&!props.attributes.caption?
            <PanelRow>
              <CheckboxControl
                label="Add a Border?"
                checked={ props.attributes.addBorder }
                onChange={ () =>
                  props.setAttributes( { addBorder: ! props.attributes.addBorder } ) }
              />
            </PanelRow>:""
          }
            {props.attributes.style&&!props.attributes.caption&&props.attributes.addBorder?
            <PanelRow>
              <SelectControl
                label="Color of the Border"
                value={ props.attributes.borderColor }
                options={ props.attributes.backgroundColor==="white"?[
                  { label: 'Black', value: 'black' },
                  { label: 'Rush Gold', value: 'gold' },
                ]:[
                { label: 'Boiler Gold', value: 'gold' },
                { label: 'White', value: 'white' },
              ] }
                onChange={ ( borderColor ) => {
                  props.setAttributes( { borderColor } )
                } }
              />
            </PanelRow>:""
            }
          <PanelRow>
            <RadioControl
              label="Image Alignment"
              help="Choose to place the image to the left or right."
              selected={ props.attributes.contentAlign }
              options={ [
                { label: 'Left', value: 'right' },
                { label: 'Right', value: 'left' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { contentAlign: option } )
              } }
            />
          </PanelRow>
          </PanelBody>
          <PanelBody>
          <PanelRow>
            <SelectControl
              label="Heading Level of the Header"
              value={ props.attributes.headerLevel }
              options={ [
                { label: 'H1', value: 'h1' },
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
          <PanelRow>
            <SelectControl
              label="Color of the Header"
              value={ props.attributes.headerColor }
              options={ props.attributes.backgroundColor==="white"?[
                { label: 'Black', value: 'black' },
                { label: 'Digital Gold', value: 'gold' },
                { label: 'Steel', value: 'steel' },
              ]:[
              { label: 'Boiler Gold', value: 'gold' },
              { label: 'White', value: 'white' },
            ] }
              onChange={ ( headerColor ) => {
                props.setAttributes( { headerColor } )
              } }
            />
          </PanelRow>
        </PanelBody>
        {props.attributes.ctaUrl?
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
            <PanelRow>
            <CheckboxControl
              label="Link image?"
              help="Would you like to add the same link to image?"
              checked={ props.attributes.linkImg }
              onChange={ setImgLinkChecked }
            />
          </PanelRow>
          {props.attributes.style&&props.attributes.backgroundColor==="white"?
            <PanelRow>
              <SelectControl
                label="Button Color"
                help="Choose the color of this button."
                selected={ props.attributes.buttonOption }
                options={ [
                  { label: 'Black', value: 'black' },
                  { label: 'Gold', value: 'gold' },
                ]}
                onChange={ ( option ) => {
                  props.setAttributes( { buttonOption: option } )
                } }
              />
            </PanelRow>:""
          }
          {props.attributes.style&&!props.attributes.linkImg?
            <PanelRow>
            <CheckboxControl
              label="Add a Secondary CTA Button?"
              help="Would you like to add a secondary CTA button below the primary one?"
              checked={ props.attributes.addCta2 }
              onChange={ () =>
                props.setAttributes( { addCta2: ! props.attributes.addCta2 } ) }
            />
          </PanelRow>:""
          }
          { props.attributes.style&&!props.attributes.linkImg&&props.attributes.addCta2 ? (
            <PanelRow>
              <TextControl
                label="Secondary CTA Button Link Text"
                value={ props.attributes.ctaText2 }
                onChange={ ( ctaText2 ) => props.setAttributes( { ctaText2 } ) }
              />
            </PanelRow> ) : '' }

          { props.attributes.style&&!props.attributes.linkImg&&props.attributes.addCta2 ?
            <PanelRow>
              <TextControl
                label="Secondary CTA Button Link URL"
                value={ props.attributes.ctaUrl2 }
                onChange={ ( ctaUrl2 ) => props.setAttributes( { ctaUrl2 } ) }
              />
            </PanelRow> : '' }
          {props.attributes.style&&!props.attributes.linkImg&&props.attributes.addCta2?
            <PanelRow>
            <CheckboxControl
              label="Open the link of Secondary CTA Button in a new tab?"
              checked={ props.attributes.external2 }
              onChange={ () =>
                props.setAttributes( { external2: ! props.attributes.external2 } ) }
            />
          </PanelRow>:""
          }
          </PanelBody>:""}
        <PanelBody>
          <PanelRow>
            <TextareaControl
              label="Featured Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Image Caption"
              value={ props.attributes.caption }
              onChange={ ( caption ) => props.setAttributes( { caption } ) }
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
                      className={ 'bulma-blocks-editor-site-hero__button' }
                      onClick={ open }
                    >
                      Select a New Image
                    </Button>
                    <Button className={ 'bulma-blocks-editor-site-hero__button' } onClick={removeMedia}>
                        Remove image
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
    const returned = props.attributes.style ? ( <div className={`pu-feature-story${props.attributes.backgroundColor==="black"?" pu-feature-story__black":""}`}>
      <div className="hero is-medium">
        {props.attributes.linkImg&&props.attributes.ctaUrl?
        <a className={ `${
          props.attributes.contentAlign === 'left' ? 'hero-image' : 'hero-image-reversed'
        }` } href={ props.attributes.ctaUrl }
        target={ props.attributes.external ? '_blank' : '_self' }
        rel="noopener noreferrer">
          <span
            className="background-image"
            role="img"
            style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
            aria-label={ props.attributes.altText }
          />
          {props.attributes.caption?
            <span
            className="feature-story-caption">{props.attributes.caption}</span>
          :""}
        </a>:        
        <div className={ `${
          props.attributes.contentAlign === 'left' ? 'hero-image' : 'hero-image-reversed'
        }` }>
          <span
            className="background-image"
            role="img"
            style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
            aria-label={ props.attributes.altText }
          />
          {props.attributes.caption?
            <span
            className="feature-story-caption">{props.attributes.caption}</span>
          :""}
        </div>}
        {props.attributes.style&&!props.attributes.caption&&props.attributes.addBorder?
        <div className={`pu-feature-story__border${props.attributes.style&&!props.attributes.caption&&props.attributes.addBorder&&props.attributes.borderColor==="gold"?" pu-feature-story__border--gold":""}`}></div>:""
        }
        <div className={ `${
          props.attributes.contentAlign === 'left' ? 'shadow' : 'shadow-reversed'
        }` }></div>
        <div className="hero-body">
          <div className="container">
            <div className={ `content${
              props.attributes.contentAlign === 'left' ? '' : ' content-reversed'
            }${
              props.attributes.backgroundColor==="white"&&props.attributes.headerColor === 'black' ? ' header-color-black' : ''
            }${
              props.attributes.backgroundColor==="white"&&props.attributes.headerColor === 'steel' ? ' header-color-steel' : ''
            }${
              props.attributes.backgroundColor==="black"&&props.attributes.headerColor === 'white' ? ' header-color-white' : ''
            }` }>
              { props.attributes.header&&props.attributes.headerLevel==='h1' ? 
                <h1 class="featured-story-header">
                  { props.attributes.header }
                </h1> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h2' ? 
                <h2>
                  { props.attributes.header }
                </h2> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h3' ? 
                <h3 class="featured-story-header">
                  { props.attributes.header }
                </h3> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h4' ? 
                <h4 class="featured-story-header">
                  { props.attributes.header }
                </h4> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h5' ? 
                <h5 class="featured-story-header">
                  { props.attributes.header }
                </h5> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h6' ? 
                <h6 class="featured-story-header">
                  { props.attributes.header }
                </h6> :'' }
              <InnerBlocks.Content />
              { ( ! props.attributes.ctaUrl || ! props.attributes.ctaText )? '' : (
                props.attributes.addCta2&&props.attributes.ctaText2&&props.attributes.style&&!props.attributes.linkImg?
                <div className="pu-feature-story__button-container">
                <a
                  href={ props.attributes.ctaUrl }
                  className={`pu-feature-story__button${props.attributes.buttonOption==="gold"?" pu-feature-story__button--gold":""}`}
                  target={ props.attributes.external ? '_blank' : '_self' }
                  rel="noopener noreferrer"
                >
                  { props.attributes.ctaText }
                </a>
                <a
                  href={ props.attributes.ctaUrl2 }
                  className="pu-feature-story__button pu-feature-story__button--second"
                  target={ props.attributes.external2 ? '_blank' : '_self' }
                  rel="noopener noreferrer"
                >
                  { props.attributes.ctaText2 }
                </a>  
            </div>:
                <a
                  href={ props.attributes.ctaUrl }
                  className={`pu-feature-story__button${props.attributes.buttonOption==="gold"?" pu-feature-story__button--gold":""}`}
                  target={ props.attributes.external ? '_blank' : '_self' }
                  rel="noopener noreferrer"
                >
                  { props.attributes.ctaText }
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div> ) : (
      <div className="pu-feature-story pu-feature-story__narrow">
        <div className={ `container pu-feature-story__container${
          props.attributes.contentAlign === 'left' ? '' : ' pu-feature-story__container-reversed'
        }` }>
           {props.attributes.linkImg&&props.attributes.ctaUrl?
           <a href={ props.attributes.ctaUrl }
           className="background-image-link"
           target={ props.attributes.external ? '_blank' : '_self' }
           rel="noopener noreferrer">
                <div
                className="background-image"
                role="img"
                style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
                aria-label={ props.attributes.altText }
              ></div>
              {props.attributes.caption?
                <span
                className="feature-story-caption">{props.attributes.caption}</span>
              :""}
              </a>:
          <div
            className="background-image"
            role="img"
            style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
            aria-label={ props.attributes.altText }
          >
            {props.attributes.caption?
            <span
            className="feature-story-caption">{props.attributes.caption}</span>
          :""}
          </div>
          }
          <div className={`story-content${
              props.attributes.headerColor === 'black' ? ' header-color-black' : ''
            }${
              props.attributes.headerColor === 'steel' ? ' header-color-steel' : ''
            }`}>
          { props.attributes.header&&props.attributes.headerLevel==='h1' ? 
                <h1 class="featured-story-header">
                  { props.attributes.header }
                </h1> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h2' ? 
                <h2>
                  { props.attributes.header }
                </h2> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h3' ? 
                <h3 class="featured-story-header">
                  { props.attributes.header }
                </h3> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h4' ? 
                <h4 class="featured-story-header">
                  { props.attributes.header }
                </h4> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h5' ? 
                <h5 class="featured-story-header">
                  { props.attributes.header }
                </h5> :'' }
                { props.attributes.header&&props.attributes.headerLevel==='h6' ? 
                <h6 class="featured-story-header">
                  { props.attributes.header }
                </h6> :'' }
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
    );
    return returned;
  },
} );
