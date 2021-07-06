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
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks,BlockControls } = wp.blockEditor;
const { apiFetch } = wp;
const { useState } = wp.element;

import { pencil, rss } from '@wordpress/icons';
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
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 66.67"><defs></defs><g id="newspaper" class="cls-1"><g class="cls-1"><path class="cls-2" d="M100,21.83V80.16a4.17,4.17,0,0,1-4.17,4.17H9.72A9.73,9.73,0,0,1,0,74.6V27.38a4.17,4.17,0,0,1,4.17-4.17h7.42a8.34,8.34,0,0,1,7.85-5.55H95.83A4.17,4.17,0,0,1,100,21.83ZM9.72,76a1.39,1.39,0,0,0,1.39-1.39v-43H8.33V74.6A1.39,1.39,0,0,0,9.72,76Zm82-50H19.44V74.6a9.1,9.1,0,0,1-.1,1.39H91.67ZM27.78,53.08V36.41a2.08,2.08,0,0,1,2.08-2.08H53.47a2.08,2.08,0,0,1,2.08,2.08V53.08a2.08,2.08,0,0,1-2.08,2.08H29.86A2.08,2.08,0,0,1,27.78,53.08Zm0,8.33a2.08,2.08,0,0,1,2.08-2.08H53.47a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H29.86a2.08,2.08,0,0,1-2.08-2.08Zm6.94-13.2H48.61V41.27H34.72Zm26.39-11.8a2.08,2.08,0,0,1,2.08-2.08H81.25a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H63.19a2.08,2.08,0,0,1-2.08-2.08Zm0,12.5a2.08,2.08,0,0,1,2.08-2.08H81.25a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H63.19a2.08,2.08,0,0,1-2.08-2.08Zm0,12.5a2.08,2.08,0,0,1,2.08-2.08H81.25a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H63.19a2.08,2.08,0,0,1-2.08-2.08Z" transform="translate(0 -17.66)"/></g></g></svg>
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
    error:{ type: 'string', default: 'Loading...' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Display entries from RSS feed. Entries will not update automatically. Please use "Purdue News" block instead.' 
  ),

  edit: ( props ) => {
    const onSubmitURL = (e) => {
      e.preventDefault();
      if ( props.attributes.feedURL ) {
        setIsEditing( false );
      }
      apiFetch( { 
        path: '/purduerssfeed/v2/getFeed/?url=' + props.attributes.feedURL,
        method: 'GET'
      }).then(response => {
        if(response){
          if(JSON.parse(response).error){
            props.setAttributes({error:JSON.parse(response).error});
            props.setAttributes({data:null});
          }else{
            props.setAttributes({data:JSON.parse(response)});
            props.setAttributes({error:""});
          }
        }
      })
    };

    const itemListImage=props.attributes.data&&props.attributes.data.length>0?props.attributes.data.slice(0, 3).map(data => {
      return (    
      <div key={data.id} className={"column is-one-third-desktop is-one-third-tablet is-full-mobile"}>
          {itemImage(data)}
      </div>)
      }):"";
  
    const itemListWithoutImage=props.attributes.data&&props.attributes.data.length>0?[...props.attributes.data].slice(0, 4).map(data => {
      return (
        <div key={data.id} class="feed-item-noimage">
          {itemNoImage(data)}
        </div>
        )
      }):"";

    const itemListAll=props.attributes.data&&props.attributes.data.length>0?[...props.attributes.data].map(data => {
      return (
        <div key={data.id} className={"column is-one-third-desktop is-half-tablet is-full-mobile"}>
          {itemAll(data)}
        </div>
      )
      }):"";

    const [ isEditing, setIsEditing ] = useState( ! props.attributes.feedURL );

    const toolbarControls = [
      {
        icon: pencil,
        title: __( 'Edit RSS URL' ),
        onClick: () => setIsEditing( true ),
      },
    ];
    const removeMedia = () => {
      props.setAttributes({
        imgUrl: ''
      });
    }
    return [
      <BlockControls>
        <ToolbarGroup controls={ toolbarControls } />
      </BlockControls>,
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Layout of the RSS feed"
              selected={ props.attributes.type }
              options={ [
                { label: 'Recent news with image', value: 'withImage' },
                { label: 'Recent news without image', value: 'withoutImage' },
                { label: 'All News/Events', value: 'all' },
              ] }
              onChange={ ( type ) => {
                props.setAttributes( { type } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Heading level of the Header"
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
          {
            props.attributes.imgUrl?<PanelRow>
            <TextareaControl
              label="Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />          
          </PanelRow>:""
          }
          {
            props.attributes.imgUrl?<PanelRow>        
            <Button className={ 'remove-image-button' } onClick={removeMedia}>
                Remove image
            </Button>
          </PanelRow>:""
          }
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
      <div>
      {isEditing?
        <div className={ 'news-feed-editor'}>		
          <p>Enter feed URL in the box and then click "Use URL" to retrive the feed</p>		
            <form onSubmit={ onSubmitURL }
            className="rss-form"
            >
              <TextControl
                placeholder={ __( 'Enter URL here…' ) }
                value={ props.attributes.feedURL }
                onChange={ ( value ) =>
                  props.setAttributes( { feedURL: value } )
                }
                className="rss-input"
              />
              <Button isPrimary type="submit">
                { __( 'Use URL' ) }
              </Button>
            </form>
          </div>: 
          <div className={'news-feed'}>
            <RichText
              className={ 'feed-header' }
              tagname={ props.setAttributes.titleLevel }
              value={ props.attributes.title }
              onChange={ ( text ) => {
                props.setAttributes( { title: text } )
              } }
              placeholder="Add A Header (Optional)"
              keepPlaceholderOnFocus={ true }
              allowedFormats={ [] }
            >
            </RichText>
            {props.attributes.error!==""? <p className="error">{props.attributes.error}</p>:""}
            {props.attributes.data&&(props.attributes.type==="withImage"||props.attributes.type==="all")?(
            <div className={'columns is-multiline feed-items components-disabled'}>
              {props.attributes.type==="withImage"?itemListImage:itemListAll}
            </div>):""}
            {props.attributes.data&&props.attributes.type==="withImage"&&props.attributes.hasLink ? (
            <div className="read-more-button components-disabled">
              <a href={props.attributes.link}
                target={ props.attributes.external ? '_blank' : '_self' }
                rel="noopener noreferrer"
              >
                { props.attributes.linkText }
                </a>
              </div>) : '' }
            {props.attributes.data&&props.attributes.type==="withoutImage"?(
            <div className={'feed-grid'}>
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
                          <Button onClick={ open }>{ props.attributes.imgUrl !== '' ? 'Select a new image' : 'Select an image' }</Button>
                        </div>
                      );
                    } }
                  />
                </MediaUploadCheck>
              </div>
              <div className={'feed-items components-disabled'}>
                {itemListWithoutImage}
              </div>
              {props.attributes.hasLink?
                <a className="button components-disabled" href={props.attributes.link}
                  target={ props.attributes.external ? '_blank' : '_self' }
                  rel="noopener noreferrer"
                >
                  { props.attributes.linkText }
                  </a>:""}
            </div>):""}
          </div>}
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
    const itemListImage=props.attributes.data&&props.attributes.data.length>0?props.attributes.data.slice(0, 3).map(data => {
      return (    
      <div key={data.id} className={"column is-one-third-desktop is-one-third-tablet is-full-mobile"}>
          {itemImage(data)}
      </div>)
      }):"";
  
    const itemListWithoutImage=props.attributes.data&&props.attributes.data.length>0?[...props.attributes.data].slice(0, 4).map(data => {
      return (
        <div key={data.id} class="feed-item-noimage">
          {itemNoImage(data)}
        </div>
        )
      }):"";

    const itemListAll=props.attributes.data&&props.attributes.data.length>0?[...props.attributes.data].map(data => {
      return (
        <div key={data.id} className={"column is-one-third-desktop is-half-tablet is-full-mobile"}>
          {itemAll(data)}
        </div>
      )
      }):"";
    return (
      <div className={'news-feed'}>
         <div className={'container'}>
          { props.attributes.title ? ( 
          <RichText.Content
            className={ 'feed-header' }
            tagName={ props.attributes.titleLevel }
            value={ props.attributes.title }
          /> ) : '' }
          {props.attributes.error!==""? <p className="error">{props.attributes.error}</p>:""}
          {props.attributes.data&&(props.attributes.type==="withImage"||props.attributes.type==="all")?(
          <div className={'columns is-multiline feed-items'}>
            {props.attributes.type==="withImage"?itemListImage:itemListAll}
          </div>):''}
          {props.attributes.data&&props.attributes.type==="withImage"&&props.attributes.hasLink ? (
          <div className="read-more-button">
            <a href={props.attributes.link}
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              { props.attributes.linkText }
              </a>
            </div>) : '' }
          {props.attributes.data&&props.attributes.type==="withoutImage"?(
          <div className={'feed-grid'}>
            { props.attributes.imgUrl ?
            <figure className="feed-image is-3by2">
              <img src={ props.attributes.imgUrl } alt={ props.attributes.altText }></img>
            </figure> : '' }
            <div className={'feed-items'}>
              {itemListWithoutImage}
            </div>
            {props.attributes.hasLink?
              <a className="button" href={props.attributes.link}
                target={ props.attributes.external ? '_blank' : '_self' }
                rel="noopener noreferrer"
              >
                { props.attributes.linkText }
                </a>:""}
          </div>):''}
        </div>
    </div>
    );
  },
} );

function itemImage(data){
  return (
    <div className={"card feed-item"}>
      <a href={data.link}>
        {data.imgURL&&data.imgURL!==""?
          <div className={"card-bg-image image is-2by1"} 
          role="img"
          style={{backgroundImage:`url(${ data.imgURL })`}}
          aria-label={ data.imgALT }
          >
          </div>:""}                   
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">
                {data.title}									
              </p>
            </div>
          </div>
        <div className="read-more-button">
          <span>Read More</span>
        </div>
      </div>
      </a>
    </div>
  );
}
function itemNoImage(data){
  return (
    <a className={"meida feed-item-noimage"} href={data.link}>                 
      <div className="media-left">
            <p className="month">
              {data.month}									
            </p>
            <p className="day">
              {data.day}									
            </p>
        </div>
      <div className="media-content">
        <div className="content">
          <p className="title">
            {data.title}	
          </p>
          <p className="desc">
            {data.text}	
          </p>
        </div>											
      </div>
    </a>
  );
}
function itemAll(data){
  return (
    <div className={"card feed-item"}>
      <a href={data.link}>
        {data.imgURL&&data.imgURL!==""?
          <div className={"card-bg-image image is-2by1"} 
          role="img"
          style={{backgroundImage:`url(${ data.imgURL })`}}
          aria-label={ data.imgALT }
          >
          </div>:""}                   
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="subtitle">
                {data.date}									
              </p>
              <p className="title is-4">
                {data.title}									
              </p>
            </div>
          </div>
        <div className="content-text">
          {data.text}												
        </div>
        <div className="read-more-button">
          <span>Read More</span>
        </div>
      </div>
      </a>
    </div>
  );
}
