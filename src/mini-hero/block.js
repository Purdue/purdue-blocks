/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

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
const {
  RichText,
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  InnerBlocks,
  useBlockProps
} = wp.blockEditor;

const BLOCKS_TEMPLATE = [["core/paragraph", { placeholder: "Add content" }]];

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
registerBlockType("purdue-blocks/mini-hero", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Mini Hero"), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 87.5"><defs></defs><g id="Window-maximize" class="cls-1"><g class="cls-1"><path class="cls-2" d="M100,16.62V85.37a9.38,9.38,0,0,1-9.37,9.37H9.37A9.38,9.38,0,0,1,0,85.37V16.62A9.38,9.38,0,0,1,9.37,7.24H90.63A9.38,9.38,0,0,1,100,16.62ZM90.63,38.49H9.37v45.7a1.18,1.18,0,0,0,1.18,1.18h78.9a1.18,1.18,0,0,0,1.18-1.18Z" transform="translate(0 -7.24)"/></g></g></svg>
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
    title: { type: "string", source: "html", selector: ".title" },
    subText: { type: "string", source: "html", selector: "p.content" },
    imgUrl: { type: "string", default: "" },
    altText: { type: "string", default: "" },
    includeLink: { type: 'boolean', default: false },
    linkExternal: { type: 'boolean', default: false },
    linkUrl: { type: "string", default: "" },
    linkText: { type: "string", default: "" },
    background: { type: "string", default: "dark" },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    "Create a mini Hero row with a 7:1 background image."
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
          <PanelRow>
            <SelectControl
              label="Background Color"
              help="The color that is overlaid on the background image"
              value={props.attributes.background}
              options={[
                { label: "Dark", value: "dark" },
                { label: "Light", value: "light" },
              ]}
              onChange={(background) => {
                props.setAttributes({ background });
              }}
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Hero Background Image Alt Text"
              value={props.attributes.altText}
              onChange={(altText) => props.setAttributes({ altText })}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <CheckboxControl
                label="Include a Link?"
                checked={ props.attributes.includeLink }
                onChange={ () =>
                  props.setAttributes( { includeLink: ! props.attributes.includeLink } ) }
              />
          </PanelRow>
          { props.attributes.includeLink ?
            ( <PanelRow>
              <TextControl
                label="Call to action text"
                value={ props.attributes.linkText }
                onChange={ ( linkText ) => props.setAttributes( { linkText } ) }
              />
            </PanelRow> ) : '' }
          { props.attributes.includeLink ? (
            <PanelRow>
              <TextControl
                label="Link address"
                value={ props.attributes.linkUrl }
                onChange={ ( linkUrl ) => props.setAttributes( { linkUrl } ) }
              />
            </PanelRow> ) : '' }

          { props.attributes.includeLink ?
            <PanelRow>
              <CheckboxControl
                label="Open link in new tab?"
                checked={ props.attributes.external }
                onChange={ () =>
                  props.setAttributes( { linkExternal: ! props.attributes.linkExternal } )
                }
              />
            </PanelRow> : '' }
            
        </PanelBody>
      </InspectorControls>,

      <div className={`mini-hero mini-hero-editor${props.attributes.background==="light"?" mini-hero-light":""}`}>
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
                  className={"image"}
                  role="img"
                  style={{ backgroundImage: `url(${props.attributes.imgUrl})` }}
                  aria-label={props.attributes.altText}
                >
                  <div class="buttons-container">
                    <button onClick={open}>
                      {props.attributes.imgUrl !== ""
                        ? "Select a new image"
                        : "Select an image"}
                    </button>
                    {props.attributes.imgUrl !== ""?
                      <button class="remove-button" onClick={removeMedia}>
                          Remove image
                      </button>:""}
                    </div>
                    <div className="container">
                      <div class="columns is-centered">
                        <div class="column is-two-thirds-desktop is-full-tablet is-full-mobile">  
                          <div className={`mini-hero--content`}>
                              <RichText
                                tagname="h1"
                                value={props.attributes.title}
                                className={"title"}
                                onChange={(text) => {
                                  props.setAttributes({ title: text });
                                }}
                                placeholder="Add Title"
                                keepPlaceholderOnFocus={true}
                              ></RichText>
                              <RichText
                                tagname="p"
                                value={props.attributes.subText}
                                className={"content"}
                                onChange={(text) => {
                                  props.setAttributes({ subText: text });
                                }}
                                placeholder="Add Text"
                              ></RichText>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              );
            }}
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
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className={`mini-hero${props.attributes.background==="light"?" mini-hero-light":""}`}>
        <div
          className={`image`}
          role="img"
          style={{ backgroundImage: `url(${props.attributes.imgUrl})` }}
          aria-label={props.attributes.altText}
        >
          <div className="container">
            <div class="columns is-centered">
              <div class="column is-two-thirds-desktop is-full-tablet is-full-mobile">
                <div className="mini-hero--content">
                  <RichText.Content
                    className={"title"}
                    tagName="h1"
                    value={props.attributes.title}
                  />
                  {props.attributes.subText !== '' &&  props.attributes.subText !== undefined ? 
                  <RichText.Content
                    className={"content"}
                    tagName="p"
                    value={props.attributes.subText}
                  /> : ''}

                  {props.attributes.includeLink && props.attributes.linkText !== '' && props.attributes.linkUrl !== '' ? (
                    <a href={props.attributes.linkUrl} className={`link${props.attributes.background === "light" ? " has-bg-light" : " has-bg-dark"}`} target={props.attributes.linkExternal ? '_blank' : '_self'} rel="noopener">
                      {props.attributes.linkText}
                    </a>
                  ) : ''}
                  
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
