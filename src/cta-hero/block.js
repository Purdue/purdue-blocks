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
  Button,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps } = wp.blockEditor;
const { select } = wp.data;

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
registerBlockType("purdue-blocks/cta-hero", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("CTA Hero"), // Block title.
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
    pageTitle: { type: "string", default: "" },
    ctaOptionalSub: { type: "string", default: "" },
    ctaUrl: { type: "string", default: "" },
    ctaText: { type: "string", default: "" },
    imgUrl: { type: "string", default: "" },
    imgMoUrl: { type: "string", default: "" },
    altText: { type: "string", default: "" },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    "This block should be used at the top of the page. Choose a page title, an image, and the settings for the cta button."
  ),

  edit: (props) => {
    if (props.attributes.pageTitle === "") {
      props.setAttributes({
        pageTitle: select("core/editor").getCurrentPost().title,
      });
    }
    const removeMedia = () => {
      props.setAttributes({
        imgUrl: ''
      });
    }
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <TextareaControl
              label="Hero Image Alt Text"
              value={props.attributes.altText}
              onChange={(altText) => props.setAttributes({ altText })}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={"bulma-blocks-editor-cta-hero"}>
        <div className="content">
          <span>Add Page Title</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.pageTitle !== ""
                    ? props.attributes.pageTitle
                    : ""
                }
                className="input"
                type="text"
                placeholder="Page Title..."
                onChange={(e) => {
                  props.setAttributes({ pageTitle: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <span>Add Optional Subtext</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.ctaOptionalSub !== ""
                    ? props.attributes.ctaOptionalSub
                    : ""
                }
                className="input"
                type="textarea"
                placeholder="Optional Subtext..."
                onChange={(e) => {
                  props.setAttributes({ ctaOptionalSub: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <span>Add CTA Button Text and URL</span>
          <div className="field">
            <label className="label">CTA Text</label>
            <div className="control">
              <input
                value={
                  props.attributes.ctaText !== ""
                    ? props.attributes.ctaText
                    : ""
                }
                className="input"
                type="text"
                placeholder="CTA Text..."
                onChange={(e) => {
                  props.setAttributes({ ctaText: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <div className="field">
            <label className="label">CTA URL</label>
            <div className="control">
              <input
                value={
                  props.attributes.ctaUrl !== "" ? props.attributes.ctaUrl : ""
                }
                className="input"
                type="text"
                placeholder="CTA URL..."
                onChange={(e) => {
                  props.setAttributes({ ctaUrl: e.target.value });
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="content">
          <span>Choose a Hero Image</span>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(img) => {
                props.setAttributes({
                  imgUrl: img.url,
                  imgMoUrl: img.sizes
                    ? img.sizes.hero_mobile
                      ? img.sizes.hero_mobile.url
                      : img.url
                    : img.url,
                  altText:
                    props.attributes.altText !== ""
                      ? props.attributes.altText
                      : img.alt,
                });
              }}
              render={({ open }) => {
                return props.attributes.imgUrl !== "" &&
                  !props.attributes.imgError ? (
                  <div className={"bulma-blocks-editor-site-hero__preview"}>
                    <figure className={"image"}>
                      <img
                        alt={props.attributes.altText}
                        src={props.attributes.imgUrl}
                      />
                    </figure>
                    <Button
                      className={"bulma-blocks-editor-site-hero__button"}
                      onClick={open}
                    >
                      Select a New Image
                    </Button>
                    <Button className={ 'bulma-blocks-editor-site-hero__button' } onClick={removeMedia}>
                        Remove image
                    </Button>
                  </div>
                ) : (
                  <div className={"bulma-blocks-editor-site-hero__container"}>
                    <p className={"bulma-blocks-editor-site-hero__description"}>
                      Pick a hero image from the media library.
                    </p>
                    <Button
                      className={"bulma-blocks-editor-site-hero__button"}
                      onClick={open}
                    >
                      Open Media Library
                    </Button>
                  </div>
                );
              }}
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
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className="pu-cta-hero">
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
                <h1>
                  {props.attributes.pageTitle ||
                    select("core/editor").getCurrentPost().title}
                </h1>
                {props.attributes.ctaOptionalSub !== "" ? (
                  <p>{props.attributes.ctaOptionalSub}</p>
                ) : (
                  ""
                )}
                {props.attributes.ctaText !== "" ? (
                  <a
                    href={props.attributes.ctaUrl}
                    className="pu-cta-hero__button"
                  >
                    {props.attributes.ctaText}
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return returned;
  },
});
