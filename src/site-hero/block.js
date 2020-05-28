/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextareaControl,
  TextControl,
  Button,
  ToggleControl,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload } = wp.blockEditor;
const { select } = wp.data;

// Array of social media share options.
const socials = [
  {
    faSlug: "facebook-f",
    name: "Facebook",
    share: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    faSlug: "twitter",
    name: "Twitter",
    share: "https://twitter.com/intent/tweet?url=",
  },
  {
    faSlug: "linkedin-in",
    name: "LinkedIn",
    share: "https://www.linkedin.com/shareArticle?mini=true&url=",
  },
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
registerBlockType("purdue-blocks/site-hero", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Site Hero"), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="object-group"
      className="svg-inline--fa fa-object-group fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#8E6F3E"
        d="M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
      ></path>
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
    subText: { type: "string" },
    imgUrl: { type: "string", default: "" },
    altText: { type: "string", default: "" },
    imgError: { type: "boolean" },
    includeSocial: { type: "boolean" },
    includeButton: { type: "boolean" },
    anchor: { type: "string", default: "" },
    styleToggle: { type: "boolean", default: false },
    checkedSocials: { type: "object", default: {} },
    currUrl: { type: "string", default: "" },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    "This block should be used at the top of the page. Choose a page title, intro copy, an image, and whether to include social media share buttons."
  ),

  edit: (props) => {
    const titleField = document.querySelector("#siteHeroTitleInput");
    const titleFieldIsFocused = document.activeElement === titleField;

    if (props.attributes.currUrl === "") {
      props.setAttributes({ currUrl: select("core/editor").getPermalink() });
    }
    if (props.attributes.pageTitle === "" && !titleFieldIsFocused) {
      props.setAttributes({
        pageTitle: select("core/editor").getCurrentPost().title,
      });
    }
    const checkedSocials = props.attributes.checkedSocials;

    const setChecked = () => {
      if (props.attributes.includeSocial) {
        props.setAttributes({
          includeSocial: false,
        });
      } else {
        props.setAttributes({
          includeSocial: true,
        });
      }
    };
    const setButtonChecked = () => {
      if (props.attributes.includeButton) {
        props.setAttributes({
          includeButton: false,
        });
      } else {
        props.setAttributes({
          includeButton: true,
        });
      }
    };
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <ToggleControl
              label="Hero Style Toggle"
              help={props.attributes.styleToggle ? "40/60 Hero" : "50/50 Hero"}
              checked={props.attributes.styleToggle}
              onChange={() =>
                props.setAttributes({
                  styleToggle: !props.attributes.styleToggle,
                })
              }
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <TextareaControl
              label="Hero Image Alt Text"
              value={props.attributes.altText}
              onChange={(altText) => props.setAttributes({ altText })}
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Include Social Share Links"
              help="Would you like to include links to share this site on social media?"
              checked={props.attributes.includeSocial}
              onChange={setChecked}
            />
          </PanelRow>
          {props.attributes.includeSocial
            ? socials.map(({ faSlug, name }) => {
                return (
                  <CheckboxControl
                    label={name}
                    checked={checkedSocials[faSlug]}
                    onChange={(check) => {
                      if (check) {
                        checkedSocials[faSlug] = true;
                      } else {
                        delete checkedSocials[faSlug];
                      }
                      props.setAttributes({
                        includeSocial: true,
                        checkedSocials: { ...checkedSocials },
                      });
                    }}
                  />
                );
              })
            : ""}
        </PanelBody>
        <PanelBody>
          <PanelRow>
              <CheckboxControl
                label="Include a Jump to Article button"
                help="Would you like to include a Jump to Article button?"
                checked={props.attributes.includeButton}
                onChange={setButtonChecked}
              />
            </PanelRow>
            {props.attributes.includeButton
            ?(<PanelRow>
              <TextControl
                label="ID of the element the button will jump to"
                value={props.attributes.anchor}
                onChange={(anchor) => props.setAttributes({ anchor })}
              />
            </PanelRow>):""}
          </PanelBody>
      </InspectorControls>,

      <div className={"bulma-blocks-editor-site-hero"}>
        <div className="content">
          <span>Add Page Title</span>
          <div className="field">
            <div className="control">
              <input
                value={props.attributes.pageTitle}
                className="input"
                id="siteHeroTitleInput"
                type="text"
                placeholder="Page Title..."
                onChange={(e) => {
                  props.setAttributes({ pageTitle: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <span>Add Intro Copy</span>
          <div className="field">
            <div className="control">
              <textarea
                value={
                  props.attributes.subText !== ""
                    ? props.attributes.subText
                    : ""
                }
                className="textarea"
                placeholder="Add intro copy here..."
                onChange={(e) => {
                  props.setAttributes({ subText: e.target.value });
                }}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="content">
          <span>Choose a Hero Image</span>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(img) => {
                const aspectRatio = img.width / img.height;
                if (aspectRatio !== 2) {
                  props.setAttributes({
                    imgError: true,
                  });
                } else {
                  props.setAttributes({
                    imgUrl: img.sizes.full.url,
                    altText:
                      props.attributes.altText !== ""
                        ? props.attributes.altText
                        : img.alt,
                    imgError: false,
                  });
                }
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
                  </div>
                ) : props.attributes.imgError ? (
                  <div className={"bulma-blocks-editor-site-hero__container"}>
                    <p
                      className={
                        "bulma-blocks-editor-site-hero__description bulma-blocks-editor-site-hero__description--error"
                      }
                    >
                      The image you selected had the wrong aspect ratio. Please
                      make sure your image has a 2:1 aspect ratio.
                    </p>
                    <Button
                      className={"bulma-blocks-editor-site-hero__button"}
                      onClick={open}
                    >
                      Open Media Library
                    </Button>
                  </div>
                ) : (
                  <div className={"bulma-blocks-editor-site-hero__container"}>
                    <p className={"bulma-blocks-editor-site-hero__description"}>
                      Pick an image from the media library. The image should be
                      2:1 aspect ratio and will be resized automatically.
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
    const returned = !props.attributes.styleToggle ? (
      // 50/50 Hero
      <div className="bulma-blocks-50-50-hero">
        <div className="hero is-medium">
          <div className="hero-body">
            <div className="container">
              <div className="content">
                <h1>
                  {props.attributes.pageTitle ||
                    select("core/editor").getCurrentPost().title}
                </h1>
                <p>{props.attributes.subText}</p>
                {props.attributes.includeSocial ? (
                  <div className="level is-mobile">
                    <div className="level-left">
                      {Object.keys(props.attributes.checkedSocials).map(
                        (faSlug) => {
                          return (
                            <div className="level-item">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${
                                  socials.find((item) => item.faSlug === faSlug)
                                    .share
                                }${
                                  props.attributes.currUrl ||
                                  select("core/editor").getPermalink()
                                }`}
                                className="icon"
                              >
                                <i className={`fab fa-lg fa-${faSlug}`}></i>
                              </a>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {props.attributes.includeButton && props.attributes.anchor? (
                  <a href={`#${props.attributes.anchor}`} class="jump-button">jump to articles <i class="fas fa-arrow-down" aria-hidden="true"></i></a>
                ) : ""
                }
              </div>
            </div>
          </div>
          <div className="hero-image">
            <span
              className="background-image"
              role="img"
              style={{ backgroundImage: `url(${props.attributes.imgUrl})` }}
              aria-label={props.attributes.altText}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="bulma-blocks-40-60-hero">
        <div className="hero is-medium">
          <div className="hero-body">
            <div className="container">
              <div className="content">
                <h1>
                  {props.attributes.pageTitle ||
                    select("core/editor").getCurrentPost().title}
                </h1>
                <p>{props.attributes.subText}</p>
                {props.attributes.includeSocial ? (
                  <div className="level is-mobile">
                    <div className="level-left">
                      {Object.keys(props.attributes.checkedSocials).map(
                        (faSlug) => {
                          return (
                            <div className="level-item">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${
                                  socials.find((item) => item.faSlug === faSlug)
                                    .share
                                }${
                                  props.attributes.currUrl ||
                                  select("core/editor").getPermalink()
                                }`}
                                className="icon"
                              >
                                <i className={`fab fa-lg fa-${faSlug}`}></i>
                              </a>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                 {props.attributes.includeButton && props.attributes.anchor? (
                  <a href={`#${props.attributes.anchor}`} class="jump-button">jump to articles <i class="fas fa-arrow-down" aria-hidden="true"></i></a>
                ) : ""
                }
              </div>
            </div>
          </div>
          <div className="hero-image">
            <span
              className="background-image"
              role="img"
              style={{ backgroundImage: `url(${props.attributes.imgUrl})` }}
              aria-label={props.attributes.altText}
            />
          </div>
        </div>
      </div>
    );
    return returned;
  },
});
