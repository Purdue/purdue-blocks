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
const v1= {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Video Hero"), // Block title.
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
    buttonText: { type: 'string', source: 'html', selector: ".cta-button"},
    buttonURL: { type: 'string', default: "" },
    external: { type: 'boolean', default: false },
    videoUrl: { type: "string", default: "" },
    posterUrl: { type: "string", default: "" },
    type: { type: "string", default: "video" },
    imgUrl: { type: "string", default: "" },
    altTexti: { type: "string", default: "" },
    altTextv: { type: "string", default: "" },
    images: { type: 'array', default: [] },
    currentImage: { type: 'number', default: 1},
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    "Create a hero banner that will display a background image, video or carousel."
  ),
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      props.attributes.type==="carousel"?
        <div {...blockProps} className={`video-hero video-hero--carousel`}>
          <div className={`video-hero--carousel__wrapper`}>
            {
              props.attributes.images.length>0?props.attributes.images.map((img)=>{
                return <div className={`video-hero--carousel__image`}
                            style={{backgroundImage: `url(${img.url})`}}
                            aria-label={img.alt}>
                </div>
              }):""
            }
          </div>
          {props.attributes.images.length>1?
            <div class="video-hero--control">
              <button class="video-hero--pause-button">
            <span class="sr-only">Pause
            </span>
                <span>
              <i class="fas fa-pause-circle" aria-hidden="true"></i>
            </span>
              </button>
              <button class="video-hero--play-button hide">
            <span class="sr-only">Play
            </span>
                <span>
              <i class="fas fa-play-circle" aria-hidden="true"></i>
            </span>
              </button>
            </div>:""}
          {props.attributes.images.length>1?
            <div className="video-hero--carousel__arrow-wrapper">
              <span className="video-hero--carousel__arrow video-hero--carousel__arrow-left">
                <i class="fas fa-chevron-left"></i>
              </span>
              <span  className="video-hero--carousel__current">1</span>
              <span  className="video-hero--carousel__total">/{props.attributes.images.length}</span>
              <span className="video-hero--carousel__arrow video-hero--carousel__arrow-right">
                <i class="fas fa-chevron-right"></i>
              </span>
            </div>:""}
          <div className="video-hero--content">
            <RichText.Content
              className={"title"}
              tagName="h1"
              value={props.attributes.title}
            />
            {props.attributes.buttonURL||props.attributes.buttonText?
              <a href={props.attributes.buttonURL} target={ props.attributes.external ? '_blank' : '_self' } rel="noopener noreferrer">
                <RichText.Content
                  className={"cta-button"}
                  tagName="span"
                  value={props.attributes.buttonText}
                />
              </a>:""}
          </div>
        </div>:
        <div {...blockProps} className={`video-hero video-hero--background-image`}
             style={{backgroundImage: `url(${props.attributes.type==="video"?props.attributes.posterUrl:props.attributes.imgUrl})`}}
             aria-label={props.attributes.type==="video"?props.attributes.altTextv:props.attributes.altTexti}>
          {props.attributes.type==="video"?
            <video autobuffer="" autoplay="" className="video-hero--video" loop="" muted="" playsinline="" poster={props.attributes.posterUrl || ''} src={props.attributes.videoUrl}/>:""}
          <div className="video-hero--overlay"></div>
          {props.attributes.type==="video"?
            <div class="video-hero--control">
              <button class="video-hero--pause-button">
            <span class="sr-only">Pause
            </span>
                <span>
              <i class="fas fa-pause-circle" aria-hidden="true"></i>
            </span>
              </button>
              <button class="video-hero--play-button hide">
            <span class="sr-only">Play
            </span>
                <span>
              <i class="fas fa-play-circle" aria-hidden="true"></i>
            </span>
              </button>
            </div>:""}
          <div className="video-hero--content">
            <RichText.Content
              className={"title"}
              tagName="h1"
              value={props.attributes.title}
            />
            {props.attributes.buttonURL||props.attributes.buttonText?
              <a href={props.attributes.buttonURL} target={ props.attributes.external ? '_blank' : '_self' } rel="noopener noreferrer">
                <RichText.Content
                  className={"cta-button"}
                  tagName="span"
                  value={props.attributes.buttonText}
                />
              </a>:""}
          </div>
        </div>
    );

    return returned;
  },
};
const v2= {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Video Hero"), // Block title.
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
    buttonText: { type: 'string', source: 'html', selector: ".cta-button"},
    buttonURL: { type: 'string', default: "" },
    external: { type: 'boolean', default: false },
    videoUrl: { type: "string", default: "" },
    posterUrl: { type: "string", default: "" },
    type: { type: "string", default: "video" },
    imgUrl: { type: "string", default: "" },
    altTexti: { type: "string", default: "" },
    altTextv: { type: "string", default: "" },
    images: { type: 'array', default: [] },
    currentImage: { type: 'number', default: 1},
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    "Create a hero banner that will display a background image, video or carousel."
  ),
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      props.attributes.type==="carousel"?
        <div {...blockProps} className={`video-hero video-hero--carousel`}>
          <div className={`video-hero--carousel__wrapper`}>
            {
              props.attributes.images.length>0?props.attributes.images.map((img)=>{
                return <div className={`video-hero--carousel__image`}
                            style={{backgroundImage: `url(${img.url})`}}
                            aria-label={img.alt}>
                </div>
              }):""
            }
          </div>
          {props.attributes.images.length>1?
            <div class="video-hero--control">
              <button class="video-hero--pause-button">
            <span class="sr-only">Pause
            </span>
                <span>
              <i class="fas fa-pause-circle" aria-hidden="true"></i>
            </span>
              </button>
              <button class="video-hero--play-button hide">
            <span class="sr-only">Play
            </span>
                <span>
              <i class="fas fa-play-circle" aria-hidden="true"></i>
            </span>
              </button>
            </div>:""}
          {props.attributes.images.length>1?
            <div className="video-hero--carousel__arrow-wrapper">
              <span className="video-hero--carousel__arrow video-hero--carousel__arrow-left">
                <i class="fas fa-chevron-left"></i>
              </span>
              <span  className="video-hero--carousel__current" role="status">1</span>
              <span  className="video-hero--carousel__total">/{props.attributes.images.length}</span>
              <span className="video-hero--carousel__arrow video-hero--carousel__arrow-right">
                <i class="fas fa-chevron-right"></i>
              </span>
            </div>:""}
          <div className="video-hero--content">
            <RichText.Content
              className={"title"}
              tagName="h1"
              value={props.attributes.title}
            />
            {props.attributes.buttonURL||props.attributes.buttonText?
              <a href={props.attributes.buttonURL} target={ props.attributes.external ? '_blank' : '_self' } rel="noopener noreferrer">
                <RichText.Content
                  className={"cta-button"}
                  tagName="span"
                  value={props.attributes.buttonText}
                />
              </a>:""}
          </div>
        </div>:
        <div {...blockProps} className={`video-hero video-hero--background-image`}
             style={{backgroundImage: `url(${props.attributes.type==="video"?props.attributes.posterUrl:props.attributes.imgUrl})`}}
             aria-label={props.attributes.type==="video"?props.attributes.altTextv:props.attributes.altTexti}>
          {props.attributes.type==="video"?
            <video autobuffer="" autoplay="" className="video-hero--video" loop="" muted="" playsinline="" poster={props.attributes.posterUrl || ''} src={props.attributes.videoUrl}/>:""}
          <div className="video-hero--overlay"></div>
          {props.attributes.type==="video"?
            <div class="video-hero--control">
              <button class="video-hero--pause-button">
            <span class="sr-only">Pause
            </span>
                <span>
              <i class="fas fa-pause-circle" aria-hidden="true"></i>
            </span>
              </button>
              <button class="video-hero--play-button hide">
            <span class="sr-only">Play
            </span>
                <span>
              <i class="fas fa-play-circle" aria-hidden="true"></i>
            </span>
              </button>
            </div>:""}
          <div className="video-hero--content">
            <RichText.Content
              className={"title"}
              tagName="h1"
              value={props.attributes.title}
            />
            {props.attributes.buttonURL||props.attributes.buttonText?
              <a href={props.attributes.buttonURL} target={ props.attributes.external ? '_blank' : '_self' } rel="noopener noreferrer">
                <RichText.Content
                  className={"cta-button"}
                  tagName="span"
                  value={props.attributes.buttonText}
                />
              </a>:""}
          </div>
        </div>
    );

    return returned;
  },
};

export default [v2, v1];
