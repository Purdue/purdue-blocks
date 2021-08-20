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
  SelectControl,
  TextControl,
  Button,
} = wp.components;
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks } = wp.blockEditor;
const { select } = wp.data;
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
registerBlockType("purdue-blocks/large-text", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Large Text"), // Block title.
  icon: (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 87.5"
    >
      <defs></defs>
      <g id="Window-maximize" class="cls-1">
        <g class="cls-1">
          <path
            class="color-9c9795"
            d="M100,16.62V85.37a9.38,9.38,0,0,1-9.37,9.37H9.37A9.38,9.38,0,0,1,0,85.37V16.62A9.38,9.38,0,0,1,9.37,7.24H90.63A9.38,9.38,0,0,1,100,16.62ZM90.63,38.49H9.37v45.7a1.18,1.18,0,0,0,1.18,1.18h78.9a1.18,1.18,0,0,0,1.18-1.18Z"
            transform="translate(0 -7.24)"
          />
        </g>
      </g>
    </svg>
  ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "purdue-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
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
    largeText: { type: 'string', source: 'html', selector: 'span.large-text' },
    smallText: { type: 'string', source: 'html', selector: 'span.small-text' },
    ctaOptionalSub: { type: "string", default: "" },
    hasLink: { type: 'boolean', default: false },
    ctaUrl: { type: 'string', default: '' },
    ctaText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
    headerLevel: { type: 'string', default: 'h2' },
    imgUrl: { type: "string", default: "" },
    altText: { type: "string", default: "" },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    "Adds a large image featured story."
  ),

  edit: (props) => {
    const removeMedia = () => {
      props.setAttributes({
        imgUrl: ''
      });
    }
    console.log(props.attributes.smallText)
    var CustomTag = props.attributes.headerLevel;
    return [
      <InspectorControls>
        <PanelBody>
        <PanelRow>
            <SelectControl
              label="Heading Level of the Header"
              help="This only changes the HTML tag. The styles will stay the same."
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
              label="Hero Image Alt Text"
              value={props.attributes.altText}
              onChange={(altText) => props.setAttributes({ altText })}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,
      <div className="pu-cta-hero pu-large-image pu-large-image-editor pu-large-text animate">
        <div className="hero is-large">
          <div className="hero-body">
          <MediaUploadCheck>
          <MediaUpload
            onSelect={(img) => {
              props.setAttributes({
                imgUrl: img.url,
                altText:
                  props.attributes.altText !== ""
                    ? props.attributes.altText
                    : img.alt,
              });
            }}
            render={({ open }) => {
              return (
                <div
                  className={"background-image"}
                  role="img"
                  style={{ backgroundImage: `url(${props.attributes.imgUrl})` }}
                  aria-label={props.attributes.altText}
                >
                  <div class="remove-button" class="buttons-container">
                  <button className="remove-image-button" onClick={open}>
                      {props.attributes.imgUrl !== ""
                        ? "Select a new image"
                        : "Select an image"}
                    </button>
                    {props.attributes.imgUrl !== ""?
                      <button className="remove-image-button" onClick={removeMedia}>
                          Remove image
                      </button>:""}
                    </div>
                    </div>
                    );
                  }}
                />
              </MediaUploadCheck>
                    <div className="container">
                      <div className="content">
                        <div className="columns is-centered">
                          <div  className="column is-two-thirds-desktop is-three-quarters-tablet is-full-mobile">
                          <CustomTag>
                            <RichText
                              tagName={ 'span' }
                              value={ props.attributes.largeText }
                              className={ 'large-text' }
                              onChange={ ( largeText ) => {
                                props.setAttributes( { largeText } )
                              } }
                              placeholder="Add Large text"
                              keepPlaceholderOnFocus={ true }
                              allowedFormats={ [] }
                            >
                            </RichText>

                            <RichText
                              tagName={ 'span' }
                              value={ props.attributes.smallText }
                              className={ 'small-text' }
                              onChange={ ( smallText ) => {
                                props.setAttributes( { smallText } )
                              } }
                              placeholder="Add regular text"
                              keepPlaceholderOnFocus={ true }
                              allowedFormats={ [] }
                            >
                            </RichText>
                            </CustomTag>    
                          { props.attributes.hasLink ? <div className="bottom-content"><div className="read-more-button"><span className="read-more-button-text">{ props.attributes.ctaText }</span>
                          </div></div> : '' }
                          </div>
                        </div>
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
  save: (props) => {
    var CustomTag = props.attributes.headerLevel;
    const returned = (
      <div className="pu-cta-hero pu-large-image pu-large-text">
        <div className="hero is-large">
          <div className="hero-body">
            <div
              className="background-image"
              aria-label={props.attributes.altText}
              style={{backgroundImage: `url(${props.attributes.imgUrl})`}}
            >
            </div>
            <div className="container">
              <div className="content">
                 <div className="columns is-centered">
                    <div  className="column is-two-thirds-desktop is-three-quarters-tablet is-full-mobile">
                    <CustomTag>  
                      { props.attributes.largeText ? ( <RichText.Content
                          tagName={ 'span' }
                          value={ props.attributes.largeText }
                          className={ 'large-text' }
                        /> ) : '' }
                         { props.attributes.smallText ? ( <RichText.Content
                          tagName={ 'span' }
                          value={ props.attributes.smallText }
                          className={ 'small-text' }
                        /> ) : '' }
                        </CustomTag>  
                      {props.attributes.hasLink?<div className="bottom-content">
                      <a className="read-more-button" href={props.attributes.ctaUrl}
                        target={ props.attributes.external ? '_blank' : '_self' }
                        rel="noopener noreferrer"
                      ><span className="read-more-button-text">
                        { props.attributes.ctaText }
                        </span>
                        </a></div>:""}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return returned;
  },
});
