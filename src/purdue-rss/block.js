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
  TextControl,
  RadioControl,
  SelectControl,
  Button,
  ToolbarGroup,
} = wp.components;
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks } = wp.blockEditor;
const { apiFetch } = wp;
const { useState } = wp.element;
const { pencil, rss } = wp.icons;

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Add content' } ],
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
registerBlockType( 'purdue-blocks/purdue-rss', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Purdue RSS feed' ), // Block title.
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#8e6f3e',
    // Specifying a dashicon for the block
    src: 'excerpt-view',

  }, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
    type: { type: 'string', default: "withImage" },
    feedURL: { type: 'string', default: '' },
    title: { type: 'string', source: 'html', selector: '.feed-header' },
    titleLevel: { type: 'string', default: 'p' },
    hasLink: { type: 'boolean', default: false },
    link: { type: 'string', default: '' },
    linkText: { type: 'string', default: '' },
    imgLocation:{ type: 'string', default: 'left' },
    imgUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
    data:[],
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Create a call-to-action card with an image and text. The link to the card is optional.'
  ),

  edit: ( props ) => {

    const onSubmitURL = (e) => {
      // setState( { error: false, validated: false } );
      e.preventDefault();
      apiFetch( { 
        path: '/purduerssfeed/v2/getFeed/?url=' + props.attributes.feedURL,
        method: 'GET'
      }).then(response => new window.DOMParser().parseFromString(response, "text/xml")) 
      .then(data => {
        props.setAttributes({data:data.querySelectorAll("item")});
      })
    };
    console.log(props.attributes.data);
    const list=props.attributes.data&&props.attributes.data.length>0?[...props.attributes.data].map(el => {
       return (<h2>test</h2>   )
    }):"";
    
    const toolbarControls = [
      {
        icon: pencil,
        title: __( 'Edit RSS URL' ),
        onClick: () => setIsEditing( true ),
      },
    ];
    
    return [
      <BlockControls>
        <ToolbarGroup controls={ toolbarControls } />
      </BlockControls>,
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Layout of the News feed"
              help="Choose Large if there will be a lot of text or lists on the card. Otherwise choose Small."
              selected={ props.attributes.cardType }
              options={ [
                { label: 'Recent news with image', value: 'withImage' },
                { label: 'Recent news without image', value: 'withoutImage' },
                { label: 'All News/Events', value: 'all' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { cardType: option } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Heading level of the title"
              value={ props.attributes.titleLevel }
              options={ [
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
                { label: 'H4', value: 'h4' },
                { label: 'H5', value: 'h5' },
                { label: 'H6', value: 'h6' },
                { label: 'P', value: 'p' },
              ] }
              onChange={ ( titleLevel ) => {
                props.setAttributes( { titleLevel } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Add a link to the news/events page?"
              checked={ props.attributes.hasLink }
              onChange={ () =>
                props.setAttributes( { hasLink: ! props.attributes.hasLink } )
              }
            />
          </PanelRow>
          { props.attributes.hasLink ?
            ( <PanelRow>
              <TextControl
                label="Link text"
                value={ props.attributes.linkText }
                onChange={ ( linkText ) => props.setAttributes( { linkText } ) }
              />
            </PanelRow> ) : '' }
          { props.attributes.hasLink ? (
            <PanelRow>
              <TextControl
                label="Link URL"
                value={ props.attributes.link }
                onChange={ ( link ) => props.setAttributes( { link } ) }
              />
            </PanelRow> ) : '' }

          { props.attributes.hasLink ?
            <PanelRow>
              <CheckboxControl
                label="Open link in new tab?"
                checked={ props.attributes.external }
                onChange={ () =>
                  props.setAttributes( { external: ! props.attributes.external } )
                }
              />
            </PanelRow> : '' }
        </PanelBody>
      </InspectorControls>,

      <div className={ `news-feed-editor${ props.attributes.cardType === 'small' ? ' cta-card-small' : ' cta-card-large' }${ props.attributes.imgLocation === 'left' ? ' cta-card-left' : ' cta-card-right' }` }
      >				
        <form
        onSubmit={ onSubmitURL }
        className="wp-block-rss__placeholder-form"
        >
          <TextControl
            placeholder={ __( 'Enter URL here…' ) }
            value={ props.attributes.feedURL }
            onChange={ ( value ) =>
              props.setAttributes( { feedURL: value } )
            }
            className="wp-block-rss__placeholder-input"
          />
          <Button isPrimary type="submit">
            { __( 'Use URL' ) }
          </Button>
        </form>
        <div className={'news-feed'}>
          <RichText
            tagname={ props.setAttributes.titleLevel }
            value={ props.attributes.title }
            className={ 'feed-header' }
            onChange={ ( text ) => {
              props.setAttributes( { title: text } )
            } }
            placeholder="Add Title (Optional)"
            keepPlaceholderOnFocus={ true }
            allowedFormats={ [] }
          >
          </RichText>
          <div className={'feed-items'}>
            test
            {list}
          </div>
          <div className={'feed-image'}>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( img ) => {
                  props.setAttributes( {
                    imgUrl: img.url,
                    altText:
                        props.attributes.altText !== '' ?
                          props.attributes.altText :
                          img.alt,
                  } );
                } }
                render={ ( { open } ) => {
                  return (
                    <div className={ 'image is-3by2' }
                      role="img"
                      style={ { backgroundImage: `url(${ props.attributes.imgUrl })` } }
                      aria-label={ props.attributes.altText }
                    >
                      <button onClick={ open }>{ props.attributes.imgUrl !== '' ? 'Select a new image' : 'Select an image' }</button>
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
    console.log("test");
    console.log(props.attributes.data);
    const list=props.attributes.data&&props.attributes.data.length>0?[...props.attributes.data].map(el => {
      return (<h2>test</h2>   )
   }):"";
    return (<div>{list}</div>);
  },
} );

