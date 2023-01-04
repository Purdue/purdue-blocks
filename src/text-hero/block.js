/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */


const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextareaControl,
  SelectControl,
  TextControl,
  RadioControl,
  Button,
  Disabled,
} = wp.components;
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { select } = wp.data;
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Optional subtext' } ],
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
 const ALLOWED_MEDIA_TYPES_2 = [ 'video' ];
registerBlockType("purdue-blocks/text-hero", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Text Block Hero"), // Block title.
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
    storyTitle: { type: 'string', source: 'html', selector: '.story-title' },
    ctaOptionalSub: { type: "string", default: "" },
    hasLink: { type: 'boolean', default: false },
    ctaUrl: { type: 'string', default: '' },
    ctaText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
    headerLevel: { type: 'string', default: 'h1' },
    imgUrl: { type: "string", default: "" },
    altText: { type: "string", default: "" },
    position: { type: "string", default: "left" },
  },

  supports: {
    className: false,
    anchor: true,
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
    return [
      <InspectorControls>
        <PanelBody>
        < PanelRow>
            <RadioControl
              label="Text Box Position"
              selected={ props.attributes.position }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ] }
              onChange={ ( position ) => {
                props.setAttributes( { position } )
              } }
            />
          </PanelRow>
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
      <div className={`pu-cta-hero pu-text-hero pu-text-hero-editor${props.attributes.position==="right"?" pu-text-hero--right":""}`}>
        <div className="hero is-medium">
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
                  <div class="buttons-container">
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
                  <RichText
                    tagName={ props.attributes.headerLevel }
                    value={ props.attributes.storyTitle }
                    className={ 'story-title' }
                    onChange={ ( storyTitle ) => {
                      props.setAttributes( { storyTitle } )
                    } }
                    placeholder="Add header"
                    keepPlaceholderOnFocus={ true }                  >
                  </RichText>
                  <InnerBlocks
                    template={ BLOCKS_TEMPLATE }
                    templateLock={ false }
                  />
                { props.attributes.hasLink ? <div className="read-more-button">
                  <span className="read-more-button-text">{ props.attributes.ctaText }</span>
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
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className={`pu-cta-hero pu-text-hero${props.attributes.position==="right"?" pu-text-hero--right":""}`}>
        <div className="hero is-medium">
          <div className="hero-body">
            <div
            role={`${props.attributes.altText?"img":""}`}
              className="background-image"
              aria-label={props.attributes.altText}
              style={{backgroundImage: `url(${props.attributes.imgUrl})`}}
            >
            </div>
            <div className="container">
              <div className="content">
              { props.attributes.storyTitle ? ( <RichText.Content
                  tagName={ props.attributes.headerLevel }
                  value={ props.attributes.storyTitle }
                  className={ 'story-title' }
                /> ) : '' }
                <InnerBlocks.Content />
                {props.attributes.hasLink?
                <a className="read-more-button" href={props.attributes.ctaUrl}
                  target={ props.attributes.external ? '_blank' : '_self' }
                  rel="noopener noreferrer"
                >
                  <span className="read-more-button-text">{ props.attributes.ctaText }</span>
                  <span className="read-more-button-icon">
                  </span>
                  </a>:""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return returned;
  },
});


  
