/**
 * WordPress dependencies
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
  TextControl,
  RadioControl,
  Button,
  ToggleControl,
  Disabled,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps } = wp.blockEditor;
const { dispatch, select } = wp.data;
const category = {
  slug: 'purdue-blocks',
  title: __( 'Purdue Blocks' ),
};
const currentCategories = select( 'core/blocks' ).getCategories().filter( item => item.slug !== category.slug );
dispatch( 'core/blocks' ).setCategories( [ category, ...currentCategories ] );

// Array of social media share options.
const socials = [
  {
    faSlug: 'facebook-f',
    name: 'Facebook',
    share: 'https://www.facebook.com/sharer/sharer.php?u=',
  },
  {
    faSlug: 'twitter',
    name: 'Twitter',
    share: 'https://twitter.com/intent/tweet?url=',
  },
  {
    faSlug: 'linkedin-in',
    name: 'LinkedIn',
    share: 'https://www.linkedin.com/shareArticle?mini=true&url=',
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
registerBlockType( 'purdue-blocks/site-hero', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Site Hero' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 87.5"><defs></defs><g id="Window-maximize" class="cls-1"><g class="cls-1"><path class="color-d9ab28" d="M100,16.62V85.37a9.38,9.38,0,0,1-9.37,9.37H9.37A9.38,9.38,0,0,1,0,85.37V16.62A9.38,9.38,0,0,1,9.37,7.24H90.63A9.38,9.38,0,0,1,100,16.62ZM90.63,38.49H9.37v45.7a1.18,1.18,0,0,0,1.18,1.18h78.9a1.18,1.18,0,0,0,1.18-1.18Z" transform="translate(0 -7.24)"/></g></g></svg>
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
    subText: { type: 'string' },
    imgUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    includeSocial: { type: 'boolean' },
    includeButton: { type: 'boolean' },
    anchor: { type: 'string', default: '' },
    styleToggle: { type: 'boolean', default: false },
    checkedSocials: { type: 'object', default: {} },
    currUrl: { type: 'string', default: '' },
    align :{type: 'string', default: 'left' },
    hasLink: { type: 'boolean', default: false },
    ctaText1: { type: 'string', default: '' },
    ctaUrl1: { type: 'string', default: '' },
    external1: { type: 'boolean', default: false },
    ctaText2: { type: 'string', default: '' },
    ctaUrl2: { type: 'string', default: '' },
    external2: { type: 'boolean', default: false },
    mediaType: { type: 'string', default: 'image' },
    mediaTitle: { type: 'string', default: '' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'This block should be used at the top of the page. Choose a page title, intro copy, an image, and whether to include social media share buttons.'
  ),

  edit: ( props ) => {
    const titleField = document.querySelector( '#siteHeroTitleInput' );
    const titleFieldIsFocused = document.activeElement === titleField;

    if ( props.attributes.currUrl === '' ) {
      props.setAttributes( { currUrl: select( 'core/editor' ).getPermalink() } );
    }
    if ( props.attributes.pageTitle === '' && ! titleFieldIsFocused ) {
      props.setAttributes( {
        pageTitle: select( 'core/editor' ).getCurrentPost().title,
      } );
    }
    const checkedSocials = props.attributes.checkedSocials;

    const setChecked = () => {
      if ( props.attributes.includeSocial ) {
        props.setAttributes( {
          includeSocial: false,
        } );
      } else {
        props.setAttributes( {
          includeSocial: true,
        } );
      }
    };
    const setButtonChecked = () => {
      if ( props.attributes.includeButton ) {
        props.setAttributes( {
          includeButton: false,
        } );
      } else {
        props.setAttributes( {
          includeButton: true,
        } );
      }
    };
    const removeMedia = () => {
      props.setAttributes({
        imgUrl: ''
      });
    }
  
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Hero Style"
              selected={ props.attributes.styleToggle ? '4060' : '5050' }
              options={ [
                { label: '50/50', value: '5050' },
                { label: '40/60', value: '4060' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { styleToggle: option === '4060'} )
              } }
            />
          </PanelRow>
          < PanelRow>
            <RadioControl
              label="Text Position"
              selected={ props.attributes.align }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ] }
              onChange={ ( align ) => {
                props.setAttributes( { align } )
              } }
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <TextareaControl
              label="Hero Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Add CTA links?"
              checked={ props.attributes.hasLink }
              onChange={ () =>
                props.setAttributes( { hasLink: ! props.attributes.hasLink } )
              }
            />
          </PanelRow>
          { props.attributes.hasLink ?
            ( <PanelRow>
              <TextControl
                label="Call to action text for first button"
                value={ props.attributes.ctaText1 }
                onChange={ ( ctaText1 ) => props.setAttributes( { ctaText1 } ) }
              />
            </PanelRow> ) : '' }
          { props.attributes.hasLink ? (
            <PanelRow>
              <TextControl
                label="First button link address"
                value={ props.attributes.ctaUrl1 }
                onChange={ ( ctaUrl1 ) => props.setAttributes( { ctaUrl1 } ) }
              />
            </PanelRow> ) : '' }

          { props.attributes.hasLink ?
            <PanelRow>
              <CheckboxControl
                label="Open link of the first button in new tab?"
                checked={ props.attributes.external1 }
                onChange={ () =>
                  props.setAttributes( { external1: ! props.attributes.external1 } )
                }
              />
            </PanelRow> : '' }
            { props.attributes.hasLink ?
            ( <PanelRow>
              <TextControl
                label="Call to action text for second button"
                value={ props.attributes.ctaText2 }
                onChange={ ( ctaText2 ) => props.setAttributes( { ctaText2 } ) }
              />
            </PanelRow> ) : '' }
          { props.attributes.hasLink ? (
            <PanelRow>
              <TextControl
                label="Second button link address"
                value={ props.attributes.ctaUrl2 }
                onChange={ ( ctaUrl2 ) => props.setAttributes( { ctaUrl2 } ) }
              />
            </PanelRow> ) : '' }

          { props.attributes.hasLink ?
            <PanelRow>
              <CheckboxControl
                label="Open link of the second button in new tab?"
                checked={ props.attributes.external2 }
                onChange={ () =>
                  props.setAttributes( { external2: ! props.attributes.external2 } )
                }
              />
            </PanelRow> : '' }
          <PanelRow>
            <CheckboxControl
              label="Include Social Share Links"
              help="Would you like to include links to share this site on social media?"
              checked={ props.attributes.includeSocial }
              onChange={ setChecked }
            />
          </PanelRow>
          { props.attributes.includeSocial ?
            socials.map( ( { faSlug, name } ) => {
              return (
                <CheckboxControl
                  label={ name }
                  checked={ checkedSocials[ faSlug ] }
                  onChange={ ( check ) => {
                    if ( check ) {
                      checkedSocials[ faSlug ] = true;
                    } else {
                      delete checkedSocials[ faSlug ];
                    }
                    props.setAttributes( {
                      includeSocial: true,
                      checkedSocials: { ...checkedSocials },
                    } );
                  } }
                />
              );
            } ) :
            '' }
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <CheckboxControl
              label="Include a Jump to Article button"
              help="Would you like to include a Jump to Article button?"
              checked={ props.attributes.includeButton }
              onChange={ setButtonChecked }
            />
          </PanelRow>
          { props.attributes.includeButton ?
            ( <PanelRow>
              <TextControl
                label="ID of the element the button will jump to"
                value={ props.attributes.anchor }
                onChange={ ( anchor ) => props.setAttributes( { anchor } ) }
              />
            </PanelRow> ) : '' }
        </PanelBody>
      </InspectorControls>,

      <div className={ 'bulma-blocks-editor-site-hero' }>
        <div className="content">
          <span>Add Page Title</span>
          <div className="field">
            <div className="control">
              <input
                value={ props.attributes.pageTitle }
                className="input"
                id="siteHeroTitleInput"
                type="text"
                placeholder="Page Title..."
                onChange={ ( e ) => {
                  props.setAttributes( { pageTitle: e.target.value } );
                } }
              ></input>
            </div>
          </div>
          <span>Add Intro Copy</span>
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
          </div>
        </div>
        <div className="content">
          <span>Choose a Hero Image or Video</span>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={ ( img ) => {
                console.log(img)
                props.setAttributes( {
                  imgUrl: img.url,
                  altText:
                    props.attributes.altText !== '' ?
                      props.attributes.altText :
                      img.alt,
                   mediaType: img.type,
                   mediaTitle: img.title
                } );
                
              } }
              render={ ( { open } ) => {
                return props.attributes.imgUrl !== '' ? (
                  props.attributes.mediaType=== "image" ?
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
                        Select a New image
                      </Button>
                      <Button className={ 'bulma-blocks-editor-site-hero__button' } onClick={removeMedia}>
                        Remove image
                      </Button>
                    </div>:(
                            props.attributes.mediaType=== "video" ?
                            <div className={ 'bulma-blocks-editor-site-hero__preview' }>
                              <figure className={ 'image' }>
                                <Disabled>
                                  <video muted playsinline="" src={props.attributes.imgUrl}>
                                  </video>
                                </Disabled>
                              </figure>
                              <Button
                                className={ 'bulma-blocks-editor-site-hero__button' }
                                onClick={ open }
                              >
                                Select a New Video
                              </Button>
                              <Button className={ 'bulma-blocks-editor-site-hero__button' } onClick={removeMedia}>
                                Remove Video
                              </Button>
                            </div>:"")
                  ) : (
                    <div className={ 'bulma-blocks-editor-site-hero__container' }>
                      <p className={ 'bulma-blocks-editor-site-hero__description' }>
                        Pick an image or video from the media library.
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
    const returned = ! props.attributes.styleToggle ? (
      // 50/50 Hero
      <div className={`bulma-blocks-50-50-hero${props.attributes.align === "right" ? " reversed-alignment":""}`}>
        <div className="hero is-medium">
          <div className="hero-body">
            <div className="container">
              <div className="content">
                <h1>
                  { props.attributes.pageTitle ||
                    select( 'core/editor' ).getCurrentPost().title }
                </h1>
                <p>{ props.attributes.subText }</p>
                { props.attributes.hasLink && (props.attributes.ctaText1 || props.attributes.ctaText2) ? (
                  <div className="cta-button-container">
                      { props.attributes.ctaText1 ? 
                      <a className="purdue-blocks__button purdue-blocks__button--gold-dark" href={props.attributes.ctaUrl1}
                        target={ props.attributes.external1 ? '_blank' : '_self' }
                        rel="noopener noreferrer"
                      >
                        {props.attributes.ctaText1}
                        </a>:""}
                        { props.attributes.ctaText2 ? 
                      <a className="purdue-blocks__button purdue-blocks__button--gold-dark purdue-blocks__button--outline" href={props.attributes.ctaUrl2}
                        target={ props.attributes.external2 ? '_blank' : '_self' }
                        rel="noopener noreferrer"
                      >
                        {props.attributes.ctaText2}
                        </a>:""}
                  </div>
                ):""}
                { props.attributes.includeSocial ? (
                  <div className="level is-mobile">
                    <div className="level-left">
                      { Object.keys( props.attributes.checkedSocials ).map(
                        ( faSlug ) => {
                          return (
                            <div className="level-item">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={ `${
                                  socials.find( ( item ) => item.faSlug === faSlug )
                                    .share
                                }${
                                  props.attributes.currUrl ||
                                  select( 'core/editor' ).getPermalink()
                                }` }
                                className="icon"
                              >
                                <i className={ `fab fa-lg fa-${ faSlug }` }></i>
                              </a>
                            </div>
                          );
                        }
                      ) }
                    </div>
                  </div>
                ) : (
                  ''
                ) }
                { props.attributes.includeButton && props.attributes.anchor ? (
                  <a href={ `#${ props.attributes.anchor }` } className="jump-button">jump to articles <i className="fas fa-arrow-down" aria-hidden="true"></i></a>
                ) : ''
                }
              </div>
            </div>
          </div>
          <div className="hero-image">
            {props.attributes.mediaType === "image"?
            <span
              className="background-image"
              role={`${props.attributes.altText?"img":""}`}
              style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
              aria-label={ props.attributes.altText }
            />:""}
            {props.attributes.mediaType === "video"?
            <video muted="" title={props.attributes.mediaTitle} loop="" autoplay="" playsinline="" src={props.attributes.imgUrl}/>:""}
          </div>
        </div>
      </div>
    ) : (
      <div className={`bulma-blocks-40-60-hero${props.attributes.align === "right" ? " reversed-alignment":""}`}>
        <div className="hero is-medium">
          <div className="hero-body">
            <div className="container">
              <div className="content">
                <h1>
                  { props.attributes.pageTitle ||
                    select( 'core/editor' ).getCurrentPost().title }
                </h1>
                <p>{ props.attributes.subText }</p>
                { props.attributes.hasLink && (props.attributes.ctaText1 || props.attributes.ctaText2) ? (
                  <div className="cta-button-container">
                      { props.attributes.ctaText1 ? 
                      <a className="purdue-blocks__button purdue-blocks__button--gold-light" href={props.attributes.ctaUrl1}
                        target={ props.attributes.external1 ? '_blank' : '_self' }
                        rel="noopener noreferrer"
                      >
                        {props.attributes.ctaText1}
                        </a>:""}
                        { props.attributes.ctaText2 ? 
                      <a className="purdue-blocks__button purdue-blocks__button--gold-light purdue-blocks__button--outline" href={props.attributes.ctaUrl2}
                        target={ props.attributes.external2 ? '_blank' : '_self' }
                        rel="noopener noreferrer"
                      >
                        {props.attributes.ctaText2}
                        </a>:""}
                  </div>
                ):""}
                { props.attributes.includeSocial ? (
                  <div className="level is-mobile">
                    <div className="level-left">
                      { Object.keys( props.attributes.checkedSocials ).map(
                        ( faSlug ) => {
                          return (
                            <div className="level-item">
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={ `${
                                  socials.find( ( item ) => item.faSlug === faSlug )
                                    .share
                                }${
                                  props.attributes.currUrl ||
                                  select( 'core/editor' ).getPermalink()
                                }` }
                                className="icon"
                              >
                                <i className={ `fab fa-lg fa-${ faSlug }` }></i>
                              </a>
                            </div>
                          );
                        }
                      ) }
                    </div>
                  </div>
                ) : (
                  ''
                ) }
                { props.attributes.includeButton && props.attributes.anchor ? (
                  <a href={ `#${ props.attributes.anchor }` } className="jump-button">jump to articles <i className="fas fa-arrow-down" aria-hidden="true"></i></a>
                ) : ''
                }
              </div>
            </div>
          </div>
          <div className="shadow"></div>
          <div className="hero-image">
            <span
              className="background-image"
              role={`${props.attributes.altText?"img":""}`}
              style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
              aria-label={ props.attributes.altText }
            />
          </div>
        </div>
      </div>
    );
    return returned;
  },
} );
