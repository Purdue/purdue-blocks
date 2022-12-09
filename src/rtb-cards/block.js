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

registerBlockType( 'purdue-blocks/rtb-cards', {
	title: __( 'Reason to believe cards' ),
	description: __( 'Create one or more Reason to believe cards.' ),
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 100"><defs></defs><g id="Bookmark" class="cls-1"><g class="cls-1"><path class="color-9c9795" d="M87.5,9.37V100L50,78.12,12.5,100V9.37A9.38,9.38,0,0,1,21.87,0H78.13A9.38,9.38,0,0,1,87.5,9.37Zm-9.37,1.18A1.18,1.18,0,0,0,77,9.37H23.05a1.18,1.18,0,0,0-1.18,1.18V83.68L50,67.27,78.13,83.68Z" transform="translate(-12.5 0)"/></g></g></svg>
    ),
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


    if(props.attributes.rtb.length===0){
      props.setAttributes( {rtb: [{
        hasLead: false,
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
        let rtb = [ ...props.attributes.rtb ];
        rtb.push( {
          hasLead: false,
          leadText: '',
          largeText: '',
          smallText: '',
          source: "",
          ctaText:'',
          ctaLink: '',
          external: false,
        } );
        props.setAttributes( { rtb } );
    }; 
    const handleRemoveSlide = ( index ) => {
        let rtb = [ ...props.attributes.rtb ];
        rtb.splice( index, 1 );
        props.setAttributes( { rtb } );
    };

 
    const handleChangeCtaText = ( ctaText, index ) => {

        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].ctaText = ctaText;
        props.setAttributes( { rtb } );

    }; 
    const handleChangeCtaLink = ( ctaLink, index ) => {

        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].ctaLink = ctaLink;
        props.setAttributes( { rtb } );
 
    }; 
    const handleChangeExternal= ( index ) => {
 
        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].external = !rtb[ index ].external;
        props.setAttributes( { rtb } );
    
    }; 
    const handleChangeHasLead= ( index ) => {
 
      let rtb = [ ...props.attributes.rtb ];
      rtb[ index ].hasLead = !rtb[ index ].hasLead;
      props.setAttributes( { rtb } );
  
  }; 
  
    const handleChangeLeadText= ( leadText, index ) => {

        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].leadText = leadText;
        props.setAttributes( { rtb } );
   
    }; 
    const handleChangeLargeText= ( largeText, index ) => {

        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].largeText = largeText;
        props.setAttributes( { rtb } );
 
    }; 
    const handleChangeSmallText= ( smallText, index ) => {

        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].smallText = smallText;
        props.setAttributes( { rtb } );
     
    }; 
    const handleChangeSource= ( source, index ) => {

        let rtb = [ ...props.attributes.rtb ];
        rtb[ index ].source = source;
        props.setAttributes( { rtb } );
      
    }; 
    const handleMoveUp = ( index ) => {

        let rtb = [ ...props.attributes.rtb ];
        let tmp = rtb[ index ];
        rtb[ index ] = rtb[ index+1 ]
        rtb[ index+1 ] = tmp;
        props.setAttributes( { rtb } );
    
    }; 
    const handleMoveDown = ( index ) => {
 
        let rtb = [ ...props.attributes.rtb ];
        let tmp = rtb[ index ];
        rtb[ index ] = rtb[ index-1 ]
        rtb[ index-1 ] = tmp;
        props.setAttributes( { rtb } );
      
    }; 

    let sidebarFields;
if ( props.attributes.rtb.length>0 ) {
      let num = props.attributes.rtb.length-1
      sidebarFields = props.attributes.rtb.map( ( card, index ) => {
        return  <PanelBody key={index} 
                  className="quote-block-details"
                  title={`Card ${index+1} Details`}
                  initialOpen={true}
                >
                  <PanelRow>
                      <CheckboxControl
                        label="Add a lead text at the top?"
                        checked={ card.hasLead }
                        onChange={ () =>handleChangeHasLead ( index )}
                      />
                    </PanelRow>
                  {card.hasLead?
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
                      <h3><b>Reorder this card:</b></h3>
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
                        Remove this card
                      </Button>
                    </PanelRow>:""}
                </PanelBody>
      } );

    }
    return [
      <InspectorControls key="1">
        <PanelBody>
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
              label="Add a header"
              help="Add a header to this region."
              value={ props.attributes.header }
              onChange={ ( header ) => props.setAttributes( { header } ) }
            />
          </PanelRow>
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
          <PanelRow>
            <TextControl
              label="HTML Anchor"
              help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
              value={ props.attributes.id }
              onChange={ ( id ) => props.setAttributes( { id } ) }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Choose the number of clumns to display on desktop."
              value={ props.attributes.columns }
              options={ [
                { label: 'Auto', value: 'auto' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
              ] }
              onChange={ ( columns ) => {
                props.setAttributes( { columns } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Add divider between columns?"
              checked={ props.attributes.divider }
              onChange={ () =>{
                props.setAttributes ( {divider:!props.attributes.divider})
              }
              }
            />
          </PanelRow>
           </PanelBody>
          { sidebarFields }
          <PanelBody>

          <Button
            className="remove-image-button add-quote"
            onClick={ handleAddslide.bind( this ) }
          >
            { __( 'Add Another Card' ) }
          </Button>


        </PanelBody>
      </InspectorControls>,
      <div key="2" className={`purdue-block-rtb-cards-editor`}>
        {props.attributes.rtb.length === 1 && props.attributes.rtb[0].largeText===""? <p style={{textAlign: 'center'}}>Add items using sidebar.</p>:""}
          <Disabled>
            <div class={`purdue-rtb-card-container
            has-${props.attributes.background}-background section is-medium`}>
              <div class="container">
              {props.attributes.header ?
              <h2>{props.attributes.header}</h2>:"" }
                {props.attributes.rtb.length >0 ? 
                  <div class={`columns${props.attributes.divider?' has-divider':''}`}>           
                        {props.attributes.rtb.map((card)=>{
                          return <div class={`column${props.attributes.columns === "2"?" is-half-desktop is-half-tablet is-full-mobile":""}
                          ${props.attributes.columns === "3"?" is-one-third-desktop is-half-tablet is-full-mobile":""}
                          ${props.attributes.columns === "4"?" is-one-quarter-desktop is-half-tablet is-full-mobile":""}
                          ${props.attributes.columns === "5"?" is-one-fifth-desktop is-half-tablet is-full-mobile":""}
                          ${props.attributes.columns === "6"?" is-one-sixth-desktop is-half-tablet is-full-mobile":""}
                          `}>
                            <div class={`pu-proofpoint${card.hasLead?" pu-proofpoint__has-lead":""}`}>
                              <div class="container">
                            {card.leadText && card.hasLead?
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
                      </div>:""                
              }
              </div>
            </div>
          </Disabled>
      </div>,
    ];
  },

} );