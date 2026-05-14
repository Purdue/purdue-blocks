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
const ALLOWED_MEDIA_TYPES_2 = [ 'video' ];
const v1 = {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Large Image Featured Story"), // Block title.
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
    layout: { type: "string", default: "gradient" },
    storyTitle: { type: 'string', source: 'html', selector: '.story-title' },
    ctaOptionalSub: { type: "string", default: "" },
    hasLink: { type: 'boolean', default: false },
    ctaUrl: { type: 'string', default: '' },
    ctaText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
    headerLevel: { type: 'string', default: 'h2' },
    imgUrl: { type: "string", default: "" },
    altText: { type: "string", default: "" },
    addLightBox: { type: 'boolean', default: false },
    buttonText: { type: 'string', default: '' },
    videoPlatform: { type: 'string', default: 'youtube' },
    videoUrlYoutube: { type: 'string', default: '' },
    videoUrlUpload: { type: 'string', default: '' },
    videoTitle: { type: 'string', default: '' },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    "Adds a large image featured story."
  ),
  save: (props) => {
    const blockProps = useBlockProps.save();
    const videoId = getVideoId(props.attributes.videoUrlYoutube);
    const iframeMarkup = <iframe id={videoId} class="pu-lightbox-youtube" title={props.attributes.videoTitle } src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allowfullscreen></iframe>;
    const returned = (
      <div {...blockProps} className={`pu-cta-hero pu-large-image${props.attributes.layout === "box" ? " pu-large-image--box animate" : ""}`}>
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
                { props.attributes.storyTitle ? ( <RichText.Content
                  tagName={ props.attributes.headerLevel }
                  value={ props.attributes.storyTitle }
                  className={ 'story-title' }
                /> ) : '' }
                <InnerBlocks.Content />
                {props.attributes.hasLink&&!props.attributes.addLightBox?
                  <a className="read-more-button" href={props.attributes.ctaUrl}
                     target={ props.attributes.external ? '_blank' : '_self' }
                     rel="noopener noreferrer"
                  >
                    { props.attributes.ctaText }
                    <span className="read-more-button-icon">
                  </span>
                  </a>:""}
                {props.attributes.addLightBox?
                  <div className="button-container">
                    {props.attributes.hasLink?
                      <a className="read-more-button" href={props.attributes.ctaUrl}
                         target={ props.attributes.external ? '_blank' : '_self' }
                         rel="noopener noreferrer"
                      >
                        { props.attributes.ctaText }
                        <span className="read-more-button-icon">
                    </span>
                      </a>:""}
                    <button className="pu-lightbox-button">
                      { props.attributes.buttonText }
                    </button>
                  </div>:""}
              </div>
            </div>
          </div>
        </div>
        {props.attributes.addLightBox?
          <div className="pu-lightbox">
            <div className={`modal--close-button`}>
              <i class="fas fa-times" aria-hidden="true"></i>
            </div>
            <div className="container">
              <div className="video-container">
                <div className="video">
                  {props.attributes.videoPlatform==="youtube"?
                    iframeMarkup:""}
                  {props.attributes.videoPlatform==="upload"?
                    <video controls playsinline="" src={props.attributes.videoUrlUpload} title={props.attributes.videoTitle}/>:""}
                </div>
              </div>
            </div>
          </div>:""}
      </div>
    );
    return returned;
  },
};

function getVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

export default [v1];

