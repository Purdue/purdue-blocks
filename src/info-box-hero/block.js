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
registerBlockType("purdue-blocks/info-box-hero", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Info Box Hero"), // Block title.
  icon: (
    <svg
      id="beee9f3b-cb8c-4d24-a612-41eb8927e111"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <defs></defs>
      <rect width="100" height="100" rx="8.55" />
      <g id="b8e37998-d6c2-43d8-bc0b-0305d6f0a794" data-name="Window-maximize">
        <path
          class="color-fff"
          d="M93.5037,20.09555v59.8176a8.16129,8.16129,0,0,1-8.15259,8.15259H14.64889A8.16128,8.16128,0,0,1,6.4963,79.91315V20.09555a8.16128,8.16128,0,0,1,8.15259-8.16129H85.35111A8.16129,8.16129,0,0,1,93.5037,20.09555ZM85.35111,39.12407H14.64889V78.88646a1.02669,1.02669,0,0,0,1.02669,1.02669H84.32443a1.02669,1.02669,0,0,0,1.02668-1.02669h0Z"
        />
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
    title: { type: "string", source: "html", selector: ".title" },
    subText: { type: "string", source: "html", selector: "p.content" },
    imgUrl: { type: "string", default: "" },
    titleLevel: { type: "string", default: "h1" },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    "Create a Hero row with a 3:1 background image and small info content box."
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
              label="Heading level of the title"
              value={props.attributes.titleLevel}
              options={[
                { label: "H1", value: "h1" },
                { label: "H2", value: "h2" },
                { label: "H3", value: "h3" },
                { label: "H4", value: "h4" },
                { label: "H5", value: "h5" },
                { label: "H6", value: "h6" },
                { label: "P", value: "p" },
              ]}
              onChange={(titleLevel) => {
                props.setAttributes({ titleLevel });
              }}
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Hero Bakcground Image Alt Text"
              value={props.attributes.altText}
              onChange={(altText) => props.setAttributes({ altText })}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={`info-box-hero-editor`}>
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
                  <div className={`info-box-content`}>
                    <div className="title">
                      <RichText
                        tagname={props.setAttributes.titleLevel}
                        value={props.attributes.title}
                        className={"title"}
                        onChange={(text) => {
                          props.setAttributes({ title: text });
                        }}
                        placeholder="Add Title"
                        keepPlaceholderOnFocus={true}
                        allowedFormats={[]}
                      ></RichText>
                    </div>
                    <div className="content">
                      <RichText
                        tagname="p"
                        value={props.attributes.subText}
                        className={"content"}
                        onChange={(text) => {
                          props.setAttributes({ subText: text });
                        }}
                        placeholder="Add Text"
                        allowedFormats={[]}
                      ></RichText>
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
    const returned = (
      <div className="info-box-hero">
        <div
          className={`image`}
          role="img"
          style={{ backgroundImage: `url(${props.attributes.imgUrl})` }}
          aria-label={props.attributes.altText}
        >
          <div className="container">
            <div className="info-box-hero--content">
              <RichText.Content
                className={"title"}
                tagName={props.attributes.titleLevel}
                value={props.attributes.title}
              />
              {props.attributes.subText !== '' &&  props.attributes.subText !== undefined ? 
              <RichText.Content
                className={"content"}
                tagName="p"
                value={props.attributes.subText}
              /> : ''}
              
            </div>
          </div>
        </div>
      </div>
    );

    return returned;
  },
});
