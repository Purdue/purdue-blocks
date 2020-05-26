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
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload } = wp.blockEditor;
const { select } = wp.data;

// Array of social media share options.
const socials = [
  {
    faSlug: "facebook-square",
    name: "Facebook",
    share: "https://www.facebook.com/",
  },
  {
    faSlug: "twitter-square",
    name: "Twitter",
    share: "https://twitter.com/",
  },
  {
    faSlug: "linkedin",
    name: "LinkedIn",
    share: "https://www.linkedin.com/in/",
  },
  {
    faSlug: "instagram",
    name: "Instagram",
    share: "https://www.instagram.com/",
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
registerBlockType("purdue-blocks/faculty-profile-card", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Faculty Profile Card"), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="object-group"
      className="svg-inline--fa fa-object-group fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path
        fill="#8E6F3E"
        d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-352 96c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H86.4C74 384 64 375.4 64 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2zM512 312c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
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
    profilePhoto: { type: "string", default: "" },
    altText: { type: "string", default: "" },
    phone: { type: "string", default: "" },
    email: { type: "string", default: "" },
    personalLink: { type: "string", default: "" },
    includeSocial: { type: "boolean", default: false },
    checkedSocials: { type: "object", default: {} },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    "This block renders a card that can contain a photo, the contact information, and the social media links for a faculty member."
  ),

  edit: (props) => {
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

    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <TextareaControl
              label="Profile Picture Alt Text"
              value={props.attributes.altText}
              onChange={(altText) => props.setAttributes({ altText })}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <CheckboxControl
              label="Include Social Media Links"
              help="Would you like to include this faculty member's social media account links?"
              checked={props.attributes.includeSocial}
              onChange={setChecked}
            />
          </PanelRow>
          {props.attributes.includeSocial ? (
            <PanelRow className="social-check-list">
              {socials.map(({ faSlug, name }) => {
                return (
                  <PanelRow>
                    <CheckboxControl
                      className="social-check-list__item"
                      label={name}
                      checked={
                        checkedSocials[name]
                          ? checkedSocials[name].checked
                          : false
                      }
                      onChange={(check) => {
                        if (check) {
                          checkedSocials[name] = {};
                          checkedSocials[name].slug = faSlug;
                          checkedSocials[name].checked = true;
                          console.log(checkedSocials);
                        } else {
                          delete checkedSocials[name];
                        }
                        props.setAttributes({
                          includeSocial: true,
                          checkedSocials: { ...checkedSocials },
                        });
                      }}
                    />
                    {checkedSocials[name] !== undefined &&
                    checkedSocials[name].checked === true ? (
                      <TextControl
                        label={`${name} Profile Link`}
                        type="text"
                        value={checkedSocials[name].link}
                        onChange={(link) => {
                          checkedSocials[name].link = link;
                          props.setAttributes({
                            checkedSocials: { ...checkedSocials },
                          });
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </PanelRow>
                );
              })}
            </PanelRow>
          ) : (
            ""
          )}
        </PanelBody>
      </InspectorControls>,

      <div className={"pu-blocks-editor-faculty-profile"}>
        <div className="content">
          <span>Choose a Profile Picture</span>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={(img) => {
                props.setAttributes({
                  profilePhoto: img.sizes.full.url,
                  altText:
                    props.attributes.altText !== ""
                      ? props.attributes.altText
                      : img.alt,
                });
              }}
              render={({ open }) => {
                return props.attributes.profilePhoto !== "" ? (
                  <div className={"bulma-blocks-editor-site-hero__preview"}>
                    <figure className={"image"}>
                      <img
                        alt={props.attributes.altText}
                        src={props.attributes.profilePhoto}
                      />
                    </figure>
                    <Button
                      className={"bulma-blocks-editor-site-hero__button"}
                      onClick={open}
                    >
                      Select a New Image
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
        <div className="content">
          <span>Add Phone Number</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.phone !== "" ? props.attributes.phone : ""
                }
                className="input"
                type="text"
                placeholder="Phone Number..."
                onChange={(e) => {
                  props.setAttributes({ phone: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <span>Add Email Address</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.email !== "" ? props.attributes.email : ""
                }
                className="input"
                type="text"
                placeholder="Email..."
                onChange={(e) => {
                  props.setAttributes({ email: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <span>Add Optional Personal Website</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.personalLink !== ""
                    ? props.attributes.personalLink
                    : ""
                }
                className="input"
                type="text"
                placeholder="Personal Site..."
                onChange={(e) => {
                  props.setAttributes({ personalLink: e.target.value });
                }}
              ></input>
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
    const returned = (
      <div className="faculty-profile-card box">
        <div className="media">
          <div className="media-left">
            <div className="image">
              <img src={props.attributes.profilePhoto}></img>
            </div>
          </div>
          <div className="media-content">
            <div className="content">
              <ul>
                {props.attributes.phone !== "" ? (
                  <li>
                    <i className="fas fa-phone" aria-hidden="true" />
                    <div className="profile-info-item">
                      <p>{props.attributes.phone}</p>
                      <span>Phone</span>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                {props.attributes.email !== "" ? (
                  <li>
                    <i className="fas fa-envelope" aria-hidden="true" />
                    <div className="profile-info-item">
                      <a
                        target="_blank"
                        href={`mailto:${props.attributes.email}`}
                      >
                        {props.attributes.email}
                      </a>
                      <span>Email</span>
                    </div>
                  </li>
                ) : (
                  ""
                )}
                {props.attributes.personalLink !== "" ? (
                  <li>
                    <i className="fas fa-desktop" aria-hidden="true" />
                    <div className="profile-info-item">
                      <a
                        target="_blank"
                        href={
                          props.attributes.personalLink.includes("https://")
                            ? props.attributes.personalLink
                            : `https://${props.attributes.personalLink}`
                        }
                      >
                        {props.attributes.personalLink}
                      </a>
                      <span>Personal Website</span>
                    </div>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>

        {props.attributes.includeSocial ? (
          <div className="level is-mobile">
            <div className="level-right content">
              <p className="level-item">Follow Me: </p>
              {Object.keys(props.attributes.checkedSocials).map((social) => {
                return (
                  <a
                    target="_blank"
                    className="level-item"
                    href={`${props.attributes.checkedSocials[social].link}`}
                  >
                    <i
                      className={`fab fa-${props.attributes.checkedSocials[social].slug}`}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
    return returned;
  },
});
