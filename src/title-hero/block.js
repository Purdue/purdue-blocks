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

const { PanelBody, PanelRow, TextControl, TextareaControl, Button, CheckboxControl,RadioControl,Disabled } = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload } = wp.blockEditor;
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

const ALLOWED_MEDIA_TYPES_1 = [ 'image' ];
const ALLOWED_MEDIA_TYPES_2 = [ 'video' ];

registerBlockType( 'purdue-blocks/title-hero', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Title Hero' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 87.5"><defs></defs><g id="Window-maximize" class="cls-1"><g class="cls-1"><path class="cls-2" d="M100,16.62V85.37a9.38,9.38,0,0,1-9.37,9.37H9.37A9.38,9.38,0,0,1,0,85.37V16.62A9.38,9.38,0,0,1,9.37,7.24H90.63A9.38,9.38,0,0,1,100,16.62ZM90.63,38.49H9.37v45.7a1.18,1.18,0,0,0,1.18,1.18h78.9a1.18,1.18,0,0,0,1.18-1.18Z" transform="translate(0 -7.24)"/></g></g></svg>
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
    pageTitle: { type: 'string', default: '' },
    blockStyle: { type: 'string', default: 'united' },
    addSubtitle: { type: 'boolean', default: false },
    subTitle: { type: 'string', default: '' },
    subText: { type: 'string', default: '' },
    addBorder: { type: 'boolean', default: false },
    backgroundType: { type: 'string', default: 'image' },
    imgUrl: { type: 'string', default: '' },
    imgMoUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    videoUrl: { type: 'string', default: '' },
    videoId: { type: 'string', default: '' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'This block should be used at the top of the page.'
  ),

  edit: ( props ) => {
    if ( props.attributes.pageTitle === '' ) {
      props.setAttributes( {
        pageTitle: select( 'core/editor' ).getCurrentPost().title,
      } );
    }

    if (props.attributes.addSubtitle) {
      props.setAttributes({
        blockStyle: "acumin",
      });
    } else {
      props.setAttributes({
        blockStyle: "united",
      });
    }

    const setBorderChecked = () => {
      if (props.attributes.addBorder) {
        props.setAttributes({
          addBorder: false,
        });
      } else {
        props.setAttributes({
          addBorder: true,
        });
      }
    };
    return [
      <InspectorControls>
        <PanelBody>
        <PanelRow>
          <RadioControl
              label="Hero Style"
              help="Choose between two design styles using different font families."  
              selected={ props.attributes.blockStyle }
              options={ [
                { label: 'Acumin Pro', value: "acumin" },
                { label: 'United Sans', value: "united" },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { blockStyle: option } )
                option==="united"? props.setAttributes( { addSubtitle: false } ): props.setAttributes( { addSubtitle: true } )
              } }
            />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Add A border?"
            help="Would you like to add a gold border around the hero image?"
            checked={props.attributes.addBorder}
            onChange={setBorderChecked}
          />
        </PanelRow>
        </PanelBody>
        <PanelBody>
        <PanelRow>
          <RadioControl
            label="Hero Media Type"
            help="Choose to use a video or an image as the hero background. Note on mobile devices an image you select on the editor will be displayed for the 'Video' option."  
            selected={ props.attributes.backgroundType }
            options={ [
              { label: 'Image', value: 'image' },
              { label: 'Video', value: 'video' },
            ] }
            onChange={ ( option ) => {
              props.setAttributes( { backgroundType: option } )
            } }
          />
        </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Hero Image Alt Text"
              help="When video is selected as hero media type, this is the Alt text of the image displaying on mobile devices."
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={ 'purdue-blocks-editor-title-hero' }>
         {props.attributes.addSubtitle?
          <span>Add lead-in text</span>:""}
           {props.attributes.addSubtitle?
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.subTitle
                }
                className="input"
                type="text"
                placeholder="Lead-in text..."
                onChange={ ( e ) => {
                  props.setAttributes( { subTitle: e.target.value } );
                } }
              ></input>
            </div>
        </div>:""}
        <div className="content">
          <span>Add Page Title</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.pageTitle !== '' ?
                    props.attributes.pageTitle :
                    ''
                }
                className="input"
                type="text"
                placeholder="Page Title..."
                onChange={ ( e ) => {
                  props.setAttributes( { pageTitle: e.target.value } );
                } }
              ></input>
            </div>
          </div>
          {props.attributes.addSubtitle?"":
          <span>Add the intro copy here.</span>}
           {props.attributes.addSubtitle?"":
          <div className="field">
            <div className="control">
              <textarea
                value={
                  props.attributes.subText !== '' ?
                    props.attributes.subText :
                    ''
                }
                className="textarea"
                placeholder="Add intro copy here..."
                onChange={ ( e ) => {
                  props.setAttributes( { subText: e.target.value } );
                } }
              ></textarea>
            </div>
          </div>}
        </div>
        <div className="media-container">
        {props.attributes.backgroundType==="video"?
          <div className="media-content">
            <span>Choose a Hero Video (Recommand size: less than 10 MB)</span>
            <MediaUploadCheck>
              <MediaUpload
                accept="video"
                allowedTypes={ALLOWED_MEDIA_TYPES_2}
                onSelect={ ( video ) => {
                  props.setAttributes( {
                    videoUrl: video.url,
                    videoId: video.id,
                  } );
                } }
                render={ ( { open } ) => {
                  return props.attributes.videoUrl !== '' ? (
                    <div className={ 'bulma-blocks-editor-site-hero__preview' }>
                      <Disabled>
                        <video muted playsinline="" src={props.attributes.videoUrl}>
                        </video>
                      </Disabled>
                      <Button
                        className={ 'bulma-blocks-editor-site-hero__button' }
                        onClick={ open }
                      >
                        Select a New Video
                      </Button>
                    </div>
                  ) : (
                    <div className={ 'bulma-blocks-editor-site-hero__container' }>
                      <p className={ 'bulma-blocks-editor-site-hero__description' }>
                        Pick a video from the media library.
                      </p>
                      <Button
                        className={ 'bulma-blocks-editor-site-hero__button' }
                        onClick={ open }
                      >
                        Open Media Library
                      </Button>
                    </div>
                  );
                } }
              />
            </MediaUploadCheck>
          </div>:""}
          <div className="media-content">
            <span>Choose a Hero Image</span>{props.attributes.backgroundType==="video"?<span> (To display on mobile devices)</span>:""}
            <MediaUploadCheck>
              <MediaUpload
                allowedTypes={ALLOWED_MEDIA_TYPES_1}
                onSelect={ ( img ) => {
                  props.setAttributes( {
                    imgUrl: img.url,
                    imgMoUrl: img.sizes ? ( img.sizes.hero_mobile ? img.sizes.hero_mobile.url : img.url ) : img.url,
                    altText:
                      props.attributes.altText !== '' ?
                        props.attributes.altText :
                        img.alt,
                  } );
                } }
                render={ ( { open } ) => {
                  return props.attributes.imgUrl !== '' ? (
                    <div className={ 'bulma-blocks-editor-site-hero__preview' }>
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
                    </div>
                  ) : (
                    <div className={ 'bulma-blocks-editor-site-hero__container' }>
                      <p className={ 'bulma-blocks-editor-site-hero__description' }>
                        Pick a hero image from the media library.
                      </p>
                      <Button
                        className={ 'bulma-blocks-editor-site-hero__button' }
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
    const returned = (
      <div className="pu-title-hero">
        <div className="hero is-large">
          <div className={`hero-body${props.attributes.addSubtitle?" with-lead-in":""}`}>
            <div
              className={`background-image${props.attributes.addBorder?" has-border":""}`}
              aria-label={ props.attributes.altText }
            >
              <style dangerouslySetInnerHTML={ { __html: `
              .background-image {background-image: url(${ props.attributes.imgUrl });}
              @media (max-width: 767px) {
                .background-image {background-image: url(${ props.attributes.imgMoUrl });}
              }
            ` } }></style>
              {props.attributes.backgroundType==="video"?
              <div class="hero-video-container">
                <video muted="" loop="" autoplay="" playsinline="" src={props.attributes.videoUrl}/>
              </div>:""}
              {props.attributes.backgroundType==="video"?
              <div class="hero-video-control">
                <button class="video-pause-button">
                  <span class="sr-only">Pause
                  </span>
                  <span>
                    <i class="fas fa-pause-circle" aria-hidden="true"></i>
                  </span>
                </button>
                <button class="video-play-button hide">
                  <span class="sr-only">Play
                  </span>
                  <span>
                    <i class="fas fa-play-circle" aria-hidden="true"></i>
                  </span>
                </button>

              </div>:""}
            </div>
            <div className="container">
              <div className="content">
                {props.attributes.addSubtitle?
                <h1 className="has-lead-in">
                  {props.attributes.subTitle?<span className="lead-in">{ props.attributes.subTitle }</span>:""}                  
                  <span className="main-title">
                { props.attributes.pageTitle ||
                  select( 'core/editor' ).getCurrentPost().title }
                  </span>                  
                </h1>:
                <h1>
                  { props.attributes.pageTitle ||
                    select( 'core/editor' ).getCurrentPost().title }
                </h1>}  
                {props.attributes.addSubtitle?
                "":                           
                <p>{ props.attributes.subText }</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return returned;
  },
} );
