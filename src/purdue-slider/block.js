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
  Disabled
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps } = wp.blockEditor;
const { apiFetch } = wp;
const { useState } = wp.element;

import { arrowUp,arrowDown } from '@wordpress/icons';
import ServerSideRender from '@wordpress/server-side-render';


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

registerBlockType( 'purdue-blocks/purdue-slider', {
	title: __( 'Purdue Slider' ),
	description: __( 'Create a slider.' ),
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="ellipsis-h"
      className="svg-inline--fa fa-ellipsis-h fa-w-12"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#8E6F3E"
        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
      ></path>
    </svg>  ),
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
	edit:( props )=>{

    if(props.attributes.cards.length===0){
        props.setAttributes( {cards: [{
          header: '',
          storyType:'',
          ctaText:'',
          ctaLink: '',
          external: false,
          imageURL: '',
          imageAlt: '',
          tag: '',
        }]} )
    }
    if(props.attributes.tabs.length===0){
        props.setAttributes( {tabs: [{
          header: '',
          subtext: '',
          ctaText:'',
          ctaLink: '',
          external: false,
          imageURL: '',
          imageAlt: '',
        }]} )
    }
    if(props.attributes.rtb.length===0){
      props.setAttributes( {rtb: [{
        leadText: '',
        largeText: '',
        smallText: '',
        source: "",
        ctaText:'',
        ctaLink: '',
        external: false,
      }]} )
  }
    const handleAddslide = () => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards.push( {
          header: '',
          storyType:'',
          ctaText:'',
          ctaLink: '',
          external: false,
          imageURL: '',
          imageAlt: '',
          tag: '',
        } );
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        tabs.push( {
          header: '',
          subtext: '',
          ctaText:'',
          ctaLink: '',
          external: false,
          imageURL: '',
          imageAlt: '',
        } );
        props.setAttributes( { tabs } );
      }else if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        rtb.push( {
          leadText: '',
          largeText: '',
          smallText: '',
          source: "",
          ctaText:'',
          ctaLink: '',
          external: false,
        } );
        props.setAttributes( { rtb } );
      }
    }; 
    const handleRemoveSlide = ( index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards.splice( index, 1 );
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        tabs.splice( index, 1 );
        props.setAttributes( { tabs } );
      }else if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        rtb.splice( index, 1 );
        props.setAttributes( { rtb } );
      }
    };
    
    const handleRemoveImage = ( index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards[ index ].imageURL = "";
        cards[ index ].imageAlt = "";
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        tabs[ index ].imageURL = "";
        tabs[ index ].imageAlt = "";
        props.setAttributes( { tabs } );
      }
    }; 
 
    const handleChangeCtaText = ( ctaText, index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards[ index ].ctaText = ctaText;
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        tabs[ index ].ctaText = ctaText;
        props.setAttributes( { tabs } );
      }else if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].ctaText = ctaText;
        props.setAttributes( { rtb } );
      }
    }; 
    const handleChangeCtaLink = ( ctaLink, index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards[ index ].ctaLink = ctaLink;
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        tabs[ index ].ctaLink = ctaLink;
        props.setAttributes( { tabs } );
      }else if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].ctaLink = ctaLink;
        props.setAttributes( { rtb } );
      }
    }; 
    const handleChangeExternal= ( index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards[ index ].external = !cards[ index ].external;
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        tabs[ index ].external = !tabs[ index ].external;
        props.setAttributes( { tabs } );
      }else if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].external = !rtb[ index ].external;
        props.setAttributes( { rtb } );
      }
    }; 
    const handleChangeImage = ( img, index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards[ index ].imageURL = img.url;
        cards[ index ].imageAlt = img.alt;
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        tabs[ index ].imageURL = img.url;
        tabs[ index ].imageAlt = img.alt;
        props.setAttributes( { tabs } );
      }
    }; 
    const handleChangeHeader = ( header, index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards[ index ].header = header;
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        tabs[ index ].header = header;
        props.setAttributes( { tabs } );
      }
    }; 
    const handleChangeSubtext = ( subtext, index ) => {
      if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        tabs[ index ].subtext = subtext;
        props.setAttributes( { tabs } );
      }
    }; 
    const handleChangeStoryType = ( storyType, index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards[ index ].storyType = storyType;
        props.setAttributes( { cards } );
      }
    }; 
    const handleChangeTag = ( tag, index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        cards[ index ].tag = tag;
        props.setAttributes( { cards } );
      }
    }; 
    const handleChangeLeadText= ( leadText, index ) => {
      if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].leadText = leadText;
        props.setAttributes( { rtb } );
      }
    }; 
    const handleChangeLargeText= ( largeText, index ) => {
      if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].largeText = largeText;
        props.setAttributes( { rtb } );
      }
    }; 
    const handleChangeSmallText= ( smallText, index ) => {
      if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].smallText = smallText;
        props.setAttributes( { rtb } );
      }
    }; 
    const handleChangeSource= ( source, index ) => {
      if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].source = source;
        props.setAttributes( { rtb } );
      }
    }; 
    const handleMoveUp = ( index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        let tmp = cards[ index ];
        cards[ index ] = cards[ index+1 ]
        cards[ index+1 ] = tmp;
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        let tmp = tabs[ index ];
        tabs[ index ] = tabs[ index+1 ]
        tabs[ index+1 ] = tmp;
        props.setAttributes( { tabs } );
      }else if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        let tmp = rtb[ index ];
        rtb[ index ] = rtb[ index+1 ]
        rtb[ index+1 ] = tmp;
        props.setAttributes( { rtb } );
      }
    }; 
    const handleMoveDown = ( index ) => {
      if(props.attributes.type === "slider"){
        let cards = [ ...props.attributes.cards ];
        let tmp = cards[ index ];
        cards[ index ] = cards[ index-1 ]
        cards[ index-1 ] = tmp;
        props.setAttributes( { cards } );
      }else if(props.attributes.type === "tabs"){
        let tabs = [ ...props.attributes.tabs ];
        let tmp = tabs[ index ];
        tabs[ index ] = tabs[ index-1 ]
        tabs[ index-1 ] = tmp;
        props.setAttributes( { tabs } );
      }else if(props.attributes.type === "rtb"){
        let rtb = [ ...props.attributes.rtb ];
        let tmp = rtb[ index ];
        rtb[ index ] = rtb[ index-1 ]
        rtb[ index-1 ] = tmp;
        props.setAttributes( { rtb } );
      }
    }; 

    let sidebarFields;
    if ( props.attributes.type === "slider" && props.attributes.cards.length>0 ) {
      let num = props.attributes.cards.length-1
      sidebarFields = props.attributes.cards.map( ( card, index ) => {
        return  <PanelBody key={index} 
                  className="quote-block-details"
                  title={`Slides ${index+1} Details`}
                  initialOpen={true}
                >
                  <PanelRow>
                      <TextControl
                        label="Media Type"
                        value={ card.storyType }
                        onChange={ ( storyType ) => handleChangeStoryType ( storyType, index ) }
                      />
                  </PanelRow>
                  <PanelRow>
                      <TextControl
                        label="Title"
                        value={ card.header }
                        onChange={ ( header ) => handleChangeHeader( header, index ) }
                      />
                  </PanelRow>                 
                  <PanelRow>
                      <TextControl
                        label="Button Text"
                        value={ card.ctaText }
                        onChange={ ( ctaText ) => handleChangeCtaText ( ctaText, index ) }
                      />
                    </PanelRow>
                
                    <PanelRow>
                      <TextControl
                        label="Button Link address"
                        value={ card.ctaLink }
                        onChange={ ( ctaLink ) => handleChangeCtaLink ( ctaLink, index ) }
                      />
                    </PanelRow>
                    <PanelRow>
                      <CheckboxControl
                        label="Open link in new tab?"
                        checked={ card.external }
                        onChange={ () =>handleChangeExternal ( index )}
                      />
                    </PanelRow>
                    <PanelRow>
                      <TextControl
                        label="Story Tag"
                        value={ card.tag }
                        onChange={ ( tag ) => handleChangeTag ( tag, index ) }
                      />
                    </PanelRow>
                    <PanelRow>
                    <MediaUploadCheck>
                        <MediaUpload
                          onSelect={ ( img ) => handleChangeImage (img, index)}
                          render={ ( { open } ) => {
                            return card.imageURL !== '' ? (
                              <div className={ 'purdue-blocks-editor-news__preview' }>
                                <figure className={ 'image' }>
                                  <img
                                    alt={ card.imageAlt }
                                    src={ card.imageURL }
                                  />
                                </figure>
                                <Button
                                  className={ 'purdue-blocks-editor-feature-story__button' }
                                  onClick={ open }
                                >
                                  Select a New Image
                                </Button>
                                <Button className={ 'bulma-blocks-editor-site-hero__button purdue-news__remove-image-button' } onClick={() => handleRemoveImage(index)}>
                                  Remove image
                                </Button>
                              </div>
                            ) : (
                              <div className={ 'purdue-blocks-editor-news__container' }>
                                <p className={ 'purdue-blocks-editor-news__description' }>
                                  Pick an image from the media library.
                                </p>
                                <Button
                                  className={ 'purdue-blocks-editor-feature-story__button' }
                                  onClick={ open }
                                >
                                  Open Media Library
                                </Button>
                              </div>
                            );
                          } }
                        />
                      </MediaUploadCheck>
                    </PanelRow>
                    {props.attributes.cards.length>1?
                      <hr></hr>:""
                    }
                    {props.attributes.cards.length>1?(
                    <div>
                      <h3><b>Reorder this slide:</b></h3>
                      { index<num?
                      <Button
                        className={ 'remove-image-button move-quote' }
                        onClick={ () => handleMoveUp( index ) }
                        icon={ arrowUp }
                      ></Button>:"" }                                    
                       { index>0?
                      <Button
                        className={ 'remove-image-button move-quote' }
                        onClick={ () => handleMoveDown( index ) }
                        icon={ arrowDown }
                      >                                     
                      </Button>:""}
                    </div>):""}
                    {props.attributes.cards.length>1?
                    <hr></hr>:""}
                    {props.attributes.cards.length>1?
                    <PanelRow>
                      <Button
                        className={ 'remove-image-button remove-quote' }
                        onClick={ () => handleRemoveSlide( index ) }
                      >
                        Remove this slide
                      </Button>
                    </PanelRow>:""}
                </PanelBody>
      } );

    }else if ( props.attributes.type === "tabs" && props.attributes.tabs.length>0 ) {
      let num = props.attributes.tabs.length-1
      sidebarFields = props.attributes.tabs.map( ( card, index ) => {
        return  <PanelBody key={index} 
                  className="quote-block-details"
                  title={`Slides ${index+1} Details`}
                  initialOpen={true}
                >
                  <PanelRow>
                      <TextControl
                        label="Header"
                        value={ card.header }
                        onChange={ ( header ) => handleChangeHeader( header, index ) }
                      />
                  </PanelRow>  
                  <PanelRow>
                      <TextareaControl
                        label="Content"
                        value={ card.subtext }
                        onChange={ ( subtext ) => handleChangeSubtext ( subtext, index ) }
                      />
                  </PanelRow>               
                  <PanelRow>
                      <TextControl
                        label="Button Text"
                        value={ card.ctaText }
                        onChange={ ( ctaText ) => handleChangeCtaText ( ctaText, index ) }
                      />
                    </PanelRow>
                
                    <PanelRow>
                      <TextControl
                        label="Button Link address"
                        value={ card.ctaLink }
                        onChange={ ( ctaLink ) => handleChangeCtaLink ( ctaLink, index ) }
                      />
                    </PanelRow>
                    <PanelRow>
                      <CheckboxControl
                        label="Open link in new tab?"
                        checked={ card.external }
                        onChange={ () =>handleChangeExternal ( index )}
                      />
                    </PanelRow>
                    <PanelRow>
                    <MediaUploadCheck>
                        <MediaUpload
                          onSelect={ ( img ) => handleChangeImage (img, index)}
                          render={ ( { open } ) => {
                            return card.imageURL !== '' ? (
                              <div className={ 'purdue-blocks-editor-news__preview' }>
                                <figure className={ 'image' }>
                                  <img
                                    alt={ card.imageAlt }
                                    src={ card.imageURL }
                                  />
                                </figure>
                                <Button
                                  className={ 'purdue-blocks-editor-feature-story__button' }
                                  onClick={ open }
                                >
                                  Select a New Image
                                </Button>
                                <Button className={ 'bulma-blocks-editor-site-hero__button purdue-news__remove-image-button' } onClick={() => handleRemoveImage(index)}>
                                  Remove image
                                </Button>
                              </div>
                            ) : (
                              <div className={ 'purdue-blocks-editor-news__container' }>
                                <p className={ 'purdue-blocks-editor-news__description' }>
                                  Pick an image from the media library.
                                </p>
                                <Button
                                  className={ 'purdue-blocks-editor-feature-story__button' }
                                  onClick={ open }
                                >
                                  Open Media Library
                                </Button>
                              </div>
                            );
                          } }
                        />
                      </MediaUploadCheck>
                    </PanelRow>
                    {props.attributes.tabs.length>1?
                      <hr></hr>:""
                    }
                    {props.attributes.tabs.length>1?(
                    <div>
                      <h3><b>Reorder this slide:</b></h3>
                      { index<num?
                      <Button
                        className={ 'remove-image-button move-quote' }
                        onClick={ () => handleMoveUp( index ) }
                        icon={ arrowUp }
                      ></Button>:"" }                                    
                       { index>0?
                      <Button
                        className={ 'remove-image-button move-quote' }
                        onClick={ () => handleMoveDown( index ) }
                        icon={ arrowDown }
                      >                                     
                      </Button>:""}
                    </div>):""}
                    {props.attributes.tabs.length>1?
                    <hr></hr>:""}
                    {props.attributes.tabs.length>1?
                    <PanelRow>
                      <Button
                        className={ 'remove-image-button remove-quote' }
                        onClick={ () => handleRemoveSlide( index ) }
                      >
                        Remove this slide
                      </Button>
                    </PanelRow>:""}
                </PanelBody>
      } );

    }else if ( props.attributes.type === "rtb" && props.attributes.rtb.length>0 ) {
      let num = props.attributes.rtb.length-1
      sidebarFields = props.attributes.rtb.map( ( card, index ) => {
        return  <PanelBody key={index} 
                  className="quote-block-details"
                  title={`Slides ${index+1} Details`}
                  initialOpen={true}
                >
                  <PanelRow>
                      <TextareaControl
                        label="Lead Text"
                        value={ card.leadText }
                        onChange={ ( leadText ) => handleChangeLeadText( leadText, index ) }
                      />
                  </PanelRow> 
                  <PanelRow>
                      <TextareaControl
                        label="Highlighted Text"
                        value={ card.largeText }
                        onChange={ ( largeText ) => handleChangeLargeText( largeText, index ) }
                      />
                  </PanelRow>  
                  <PanelRow>
                      <TextareaControl
                        label="Small Text"
                        value={ card.smallText }
                        onChange={ ( smallText ) => handleChangeSmallText ( smallText, index ) }
                      />
                  </PanelRow>  
                  <PanelRow>
                      <TextareaControl
                        label="Source"
                        value={ card.source }
                        onChange={ ( source ) => handleChangeSource ( source, index ) }
                      />
                  </PanelRow>              
                  <PanelRow>
                      <TextControl
                        label="Button Text"
                        value={ card.ctaText }
                        onChange={ ( ctaText ) => handleChangeCtaText ( ctaText, index ) }
                      />
                    </PanelRow>
                
                    <PanelRow>
                      <TextControl
                        label="Button Link address"
                        value={ card.ctaLink }
                        onChange={ ( ctaLink ) => handleChangeCtaLink ( ctaLink, index ) }
                      />
                    </PanelRow>
                    <PanelRow>
                      <CheckboxControl
                        label="Open link in new tab?"
                        checked={ card.external }
                        onChange={ () =>handleChangeExternal ( index )}
                      />
                    </PanelRow>
                    {props.attributes.rtb.length>1?
                      <hr></hr>:""
                    }
                    {props.attributes.rtb.length>1?(
                    <div>
                      <h3><b>Reorder this slide:</b></h3>
                      { index<num?
                      <Button
                        className={ 'remove-image-button move-quote' }
                        onClick={ () => handleMoveUp( index ) }
                        icon={ arrowUp }
                      ></Button>:"" }                                    
                       { index>0?
                      <Button
                        className={ 'remove-image-button move-quote' }
                        onClick={ () => handleMoveDown( index ) }
                        icon={ arrowDown }
                      >                                     
                      </Button>:""}
                    </div>):""}
                    {props.attributes.rtb.length>1?
                    <hr></hr>:""}
                    {props.attributes.rtb.length>1?
                    <PanelRow>
                      <Button
                        className={ 'remove-image-button remove-quote' }
                        onClick={ () => handleRemoveSlide( index ) }
                      >
                        Remove this slide
                      </Button>
                    </PanelRow>:""}
                </PanelBody>
      } );

    }

    return [
      <InspectorControls key="1">
        <PanelBody>
        <PanelRow>
            <RadioControl
              label="Slider Type"
              selected={ props.attributes.type }
              options={ [
                { label: 'Slider with cards link to stories', value: 'slider' },
                { label: 'Slider with full width cards', value: 'tabs' },
                { label: 'Slider with RTB cards', value: 'rtb' },
              ] }
              onChange={ ( type ) => {
                props.setAttributes( { type } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Choose a background"
              value={ props.attributes.background }
              options={ [
                { label: 'White', value: 'white' },
                { label: 'Black', value: 'black' },
                { label: 'Gray', value: 'gray' },
              ] }
              onChange={ ( background ) => {
                props.setAttributes( { background } )
              } }
            />
          </PanelRow>
          <PanelRow>
              <TextControl
                label="Add a header to this region?"
                value={ props.attributes.header }
                onChange={ ( header ) => props.setAttributes( { header } ) }
              />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="HTML Anchor"
              help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
              value={ props.attributes.id }
              onChange={ ( id ) => props.setAttributes( { id } ) }
            />
          </PanelRow>
          {props.attributes.header?
          <PanelRow>
            <SelectControl
              label="Heading level of the Header"
              value={ props.attributes.headerLevel }
              options={ [
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
                { label: 'H4', value: 'h4' },
                { label: 'H5', value: 'h5' },
                { label: 'H6', value: 'h6' },
                { label: 'P', value: 'p' },
              ] }
              onChange={ ( headerLevel ) => {
                props.setAttributes( { headerLevel } )
              } }
            />
          </PanelRow>:''}
          <PanelRow>
            <RadioControl
              label="Choose how to align the header."
              selected={ props.attributes.headerLocation }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
              ] }
              onChange={ ( headerLocation ) => {
                props.setAttributes( { headerLocation } )
              } }
            />
          </PanelRow>
          {props.attributes.type === "rtb"?
          <PanelRow>
            <SelectControl
              label="Choose the number of cards to display on desktop."
              value={ props.attributes.displayNumber }
              options={ [
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
              ] }
              onChange={ ( displayNumber ) => {
                props.setAttributes( { displayNumber } )
              } }
            />
          </PanelRow>:""}
          <PanelRow>
            <CheckboxControl
              label="Add a link to the story page?"
              checked={ props.attributes.hasLink }
              onChange={ () =>
                props.setAttributes( { hasLink: ! props.attributes.hasLink } )
              }
            />
          </PanelRow>
          {props.attributes.type === "rtb"?
          <PanelRow>
            <CheckboxControl
              label="Include dividers between cards?"
              checked={ props.attributes.divider }
              onChange={ () =>
                props.setAttributes( { divider: ! props.attributes.divider } )}
            />
          </PanelRow>:""}
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
                value={ props.attributes.linkUrl }
                onChange={ ( linkUrl ) => props.setAttributes( { linkUrl } ) }
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
          { sidebarFields }
          <PanelBody>

          <Button
            className="remove-image-button add-quote"
            onClick={ handleAddslide.bind( this ) }
          >
            { __( 'Add Another Slide' ) }
          </Button>


        </PanelBody>
      </InspectorControls>,
      <div key="2" className={`purdue-block-slider-editor`}>
          <Disabled>
            <ServerSideRender
              block="purdue-blocks/purdue-slider"
              attributes={ props.attributes }
            />
          </Disabled>
      </div>,
    ];
  },

} );