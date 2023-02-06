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
const { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps, RichText } = wp.blockEditor;
const { apiFetch } = wp;
const { useState } = wp.element;

import { arrowUp,arrowDown, alignCenter } from '@wordpress/icons';

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
                      <TextareaControl
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
                  {props.attributes.hasLead?
                  <PanelRow>
                      <TextareaControl
                        label="Lead Text"
                        value={ card.leadText }
                        onChange={ ( leadText ) => handleChangeLeadText( leadText, index ) }
                      />
                  </PanelRow>:""}
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
    let CustomTag = props.attributes.headerLevel;
    return [
      <InspectorControls key="1">
        <PanelBody>
        <PanelRow>
            <RadioControl
              label="Slider Type"
              help="Use the rich text on the page editor to edit the full width cards option"
              selected={ props.attributes.type }
              options={ [
                { label: 'Cards link to stories', value: 'slider' },
                { label: 'Full width image and text', value: 'tabs' },
                { label: 'RTB cards', value: 'rtb' },
                { label: 'Images', value: 'img' },
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
            <CheckboxControl
              label="Add Lead Text above Highlighted Text?"
              checked={ props.attributes.hasLead }
              onChange={ () =>
                props.setAttributes( { hasLead: ! props.attributes.hasLead } )}
            />
          </PanelRow>:""}
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
          {props.attributes.type === "img"?
          <PanelRow>
            <SelectControl
              label="Choose the type of the image."
              value={ props.attributes.imgType }
              options={ [
                { label: 'Horizontal', value: 'horizontal' },
                { label: 'Vertical', value: 'vertical' },
              ] }
              onChange={ ( imgType ) => {
                props.setAttributes( { imgType } )
              } }
            />
          </PanelRow>:""}
          {props.attributes.type === "img"?
          <PanelRow>
            <CheckboxControl
              label="Loop the slides?"
              checked={ props.attributes.loop }
              onChange={ () =>
                props.setAttributes( { loop: ! props.attributes.loop } )}
            />
          </PanelRow>:""}
          {props.attributes.type === "img"?
          <PanelRow>
            <CheckboxControl
              label="Link the image to the image file?"
              checked={ props.attributes.linkImg }
              onChange={ () =>
                props.setAttributes( { linkImg: ! props.attributes.linkImg } )}
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
          {props.attributes.type !== "img"?
          <PanelBody>
          <Button
            className="remove-image-button add-quote"
            onClick={ handleAddslide.bind( this ) }
          >
            { __( 'Add Another Slide' ) }
          </Button>
        </PanelBody>
          :""}
      </InspectorControls>,
      <div key="2" className={`purdue-block-slider-editor`}>
        {
          (props.attributes.cards.length ===1 && props.attributes.cards[0].header ==="") &&
          (props.attributes.rtb.length ===1 && props.attributes.rtb[0].largeText ==="") &&
          (props.attributes.tabs.length ===1 && props.attributes.tabs[0].header ==="")&&
          props.attributes.imgs.length ===0?<p style={{textAlign: 'center'}}>Add items using sidebar.</p>:""
        }
            <div class={`purdue-slider
            has-${props.attributes.background}-background section is-medium`}>
              <div class="container">
                <CustomTag class={`purdue-slider__header align-${props.attributes.headerLocation}`}> {props.attributes.header}</CustomTag>
              {
                props.attributes.type === "slider" && props.attributes.cards.length >0 ? 
                <Disabled>
                  <div class="glide purdue-slider--default">           
                    <div class="glide__track" data-glide-el="track">
                      <div class="glide__slides">
                        {props.attributes.cards.map((card)=>{
                          return <div class="glide__slide card">
                            {card.imageURL?
                              <div class="image is-2by1 background-image" role="img" style={{backgroundImage:`url(${card.imageURL})`}} aria-label={`card.imageAlt`}></div>:""
                            }                            
                            <div class="content">
                            {card.storyType?
                              <p class="story-type">{card.storyType}</p>:""}
                              <p class="story-title">{card.header}</p>
                              {card.ctaLink?
                                <div class="read-more purdue-blocks__button purdue-blocks__button--gold-light purdue-blocks__button--outline"><span>{card.ctaText}</span></div>
                                :""}
                            {card.tag?
                            <p class="story-tag">{card.tag}</p>:""}
                              </div>
                            </div>
                        })}
                      </div></div>
                      <div class="glide__bullets" data-glide-el="controls[nav]">
                      {props.attributes.cards.map((card, index)=>{
                        return <button class="glide__bullet" data-glide-dir={index}></button>
                        })
                      }
                      </div>
                      <div class="glide__arrows" data-glide-el="controls">
                        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                        <button class="glide__arrow glide__arrow--right" data-glide-dir="&#62;">next</button>
                      </div>
                </div>
                </Disabled>:""                
              }
              {
                props.attributes.type === "tabs" && props.attributes.tabs.length >0 ? 
                  <div class="glide purdue-slider--tabs">           
                    <div class="glide__track" data-glide-el="track">
                      <div class="glide__slides">
                        {props.attributes.tabs.map((card, index)=>{
                          return <div class="glide__slide columns">
                              <div class="column image-column">
                                <MediaUploadCheck>
                                    <MediaUpload
                                      onSelect={ ( img ) => handleChangeImage (img, index)}
                                      render={ ( { open } ) => {
                                        return card.imageURL !== '' ? (
                                          <div class="image background-image" role="img" style={{backgroundImage:`url(${card.imageURL})`}}>
                                          
                                            <Button
                                              className={ 'remove-image-button' }
                                              onClick={ open }
                                            >
                                              Select a New Image
                                            </Button>
                                            <Button className={ 'remove-image-button' } onClick={() => handleRemoveImage(index)}>
                                              Remove image
                                            </Button>
                                          </div>
                                        ) : (
                                            <Button
                                              className={ 'remove-image-button' }
                                              onClick={ open }
                                            >
                                              Open Media Library
                                            </Button>
                                        );
                                      } }
                                    />
                                  </MediaUploadCheck>
                                </div>
                            <div class="content column">
                              <RichText
                              tagname="p"
                              value={ card.header }
                              className={ 'story-title' }
                              onChange={ ( header ) => handleChangeHeader ( header, index ) }
                              placeholder="Header..."
                              keepPlaceholderOnFocus={ true }
                            >
                            </RichText>
                            <RichText
                              tagname="p"
                              value={ card.subtext }
                              className={ 'story-subtext' }
                              onChange={ ( subtext ) => handleChangeSubtext ( subtext, index ) }
                              placeholder="Subtext..."
                              keepPlaceholderOnFocus={ true }
                            >
                            </RichText>
                              {card.ctaLink?
                                <div class="purdue-blocks__button purdue-blocks__button--gold-light"><span>{card.ctaText}</span></div>
                                :""}
                            </div>
                            </div>
                        })}
                      </div></div>
                      </div>:""                
              }
              {
                props.attributes.type === "rtb" && props.attributes.rtb.length >0 ? 
                <Disabled>
                  <div class={`glide purdue-slider--rtb${props.attributes.divider?' has-divider':''}`} data-number={props.attributes.displayNumber}>           
                    <div class="glide__track" data-glide-el="track">
                      <div class="glide__slides">
                        {props.attributes.rtb.map((card)=>{
                          return <div class="glide__slide">
                            <div class={`pu-proofpoint ${props.attributes.hasLead?" pu-proofpoint__has-lead":""}`}>
                              <div class="container">
                            {card.leadText && props.attributes.hasLead?
                              <span class="lead-text pu-proofpoint__lead">{card.leadText}</span>:""}
                             {card.largeText?
                              <span class="large-text pu-proofpoint__highlighted">{card.largeText}</span>:""}
                             {card.smallText?
                              <span class="small-text pu-proofpoint__content">{card.smallText}</span>:""}
                               {card.source?
                              <span class="source pu-proofpoint__source">{card.source}</span>:""}
                              {card.ctaLink?
                                <div class="pu-proofpoint__button purdue-blocks__button purdue-blocks__button--gold-light"><span>{card.ctaText}</span></div>
                                :""}
                            </div>
                            </div>
                            </div>
                        })}
                      </div></div>
                      <div class="glide__bullets" data-glide-el="controls[nav]">
                      {props.attributes.rtb.map((card, index)=>{
                        return <button class="glide__bullet" data-glide-dir={index}></button>
                        })
                      }
                      </div>
                      <div class="glide__arrows" data-glide-el="controls">
                        <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                        <button class="glide__arrow glide__arrow--right" data-glide-dir="&#62;">next</button>
                      </div>
                  </div>
                </Disabled>:""                
              }
              {props.attributes.type === "img"?
                <MediaUploadCheck>
                  <MediaUpload
                    addToGallery={true}
                    multiple={true}
                    gallery={true}
                    onSelect={(imgs) => {
                      props.setAttributes( { imgs } )
                      console.log(props.attributes.imgs)
                    }}
                    render={ ( { open } ) => {
                      return <div class="image-slider-editor">
                        <div class="buttons-container">
                              <button onClick={open}>
                                {
                                  props.attributes.imgs.length === 0
                                  ? "Select images"
                                  : "Select new images"
                                }
                              </button>
                        </div>
                        {props.attributes.imgs.length>0?
                        <Disabled>
                          <div className={`glide purdue-slider--img${props.attributes.loop?" purdue-slider--img-loop":""}${props.attributes.imgType==="vertical" ?"purdue-slider--img-vertical":""}`}>
                            <div class="glide__track" data-glide-el="track">
                              <div class="glide__slides">
                                {props.attributes.imgs.map((img, index)=>{
                                  return props.attributes.linkImg?
                                    <a className='glide__slide' href={img.url} target="_blank">
                                      <figure>
                                        <img src={img.url} alt={img.alt} />
                                        <figcaption>{img.caption}</figcaption>
                                      </figure>
                                    </a>:
                                    <figure className='glide__slide'>
                                      <img src={img.url} alt={img.alt} />
                                      <figcaption>{img.caption}</figcaption>
                                    </figure>
                                  
                                })}
                              </div>                            
                            </div>
                            <div class="glide__bullets" data-glide-el="controls[nav]">
                              {props.attributes.imgs.map((card, index)=>{
                                return <button class="glide__bullet" data-glide-dir={index}></button>
                                })
                              }
                              </div>
                              <div class="glide__arrows" data-glide-el="controls">
                                <button class="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                                <button class="glide__arrow glide__arrow--right" data-glide-dir="&#62;">next</button>
                              </div>
                            </div>
                        </Disabled>:""}                       
                      </div>
                    } }
                  />
                </MediaUploadCheck>:""}
              {props.attributes.hasLink&&props.attributes.linkUrl?
                <div class={`purdue-slider__button purdue-blocks__button ${props.attributes.background==="black"?'purdue-blocks__button--gold-dark':'purdue-blocks__button--gold-light'}`}><span>{props.attributes.linkText}</span></div>
              :""}
              </div>
            </div>
      </div>,
    ];
  },

} );
