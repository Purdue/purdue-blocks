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
const { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps,InnerBlocks } = wp.blockEditor;
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
const v1 = {
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
  save: ( props ) => {
    console.log('run')
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
                { props.attributes.subText?
                  <p>{ props.attributes.subText }</p>:""}
                <InnerBlocks.Content />
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
                              >{
                                faSlug==="twitter"?
                                  <i class="fa-brands fa-x-twitter"></i>:<i className={ `fab fa-lg fa-${ faSlug }` }></i>
                              }
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
                { props.attributes.subText?
                  <p>{ props.attributes.subText }</p>:""}
                <InnerBlocks.Content />
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
                                {
                                  faSlug==="twitter"?
                                    <i class="fa-brands fa-x-twitter"></i>:<i className={ `fab fa-lg fa-${ faSlug }` }></i>
                                }
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
};

export default [v1];
