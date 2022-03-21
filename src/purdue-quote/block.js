/* eslint-disable react/jsx-key */

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
  Placeholder,
  Button,
  FormFileUpload,
  SelectControl,
  IconButton,
  Panel,
  PanelBody,
  PanelRow,
  Toolbar,
  BaseControl,
  TextControl,
  RadioControl,
  TextareaControl,
  CheckboxControl,
} = wp.components;

const { InspectorControls, MediaUploadCheck, MediaUpload } = wp.blockEditor;
const {
  Component,
  Fragment,
} = wp.element;
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
registerBlockType( 'purdue-blocks/purdue-quote', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Quote' ), // Block title.
  icon: (
<svg id="bda0faeb-2e3e-487c-9d9c-42860ab6054c" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.32654 86.91157"><g id="f04fbf08-b922-4b9c-b15b-ad3f74dc03a4" data-name="Quote-left" class="cls-2"><g class="ff897772-7a0c-4402-9977-028c84640f47"><path class="adaadcbe-8236-4ed1-9252-1b75bd4a866b" d="M43.76925,53.08761V77.91948a9.31436,9.31436,0,0,1-9.312,9.312H9.62542a9.31436,9.31436,0,0,1-9.312-9.312V31.35971A31.03129,31.03129,0,0,1,31.35331.31987h1.552a4.64481,4.64481,0,0,1,4.656,4.656v9.312a4.64481,4.64481,0,0,1-4.656,4.656h-1.552A12.42743,12.42743,0,0,0,18.93737,31.35971V43.77565H34.45729A9.31436,9.31436,0,0,1,43.76925,53.08761Zm55.87075,0V77.91948a9.31436,9.31436,0,0,1-9.31195,9.312H65.49714a9.31435,9.31435,0,0,1-9.312-9.312V31.35971A31.03108,31.03108,0,0,1,87.22406.31987h1.552a4.64481,4.64481,0,0,1,4.656,4.656v9.312a4.64481,4.64481,0,0,1-4.656,4.656h-1.552A12.42744,12.42744,0,0,0,74.80812,31.35971V43.77565H90.32805A9.31436,9.31436,0,0,1,99.64,53.08761Z" transform="translate(-0.31346 -0.31987)"/></g></g></svg>
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
    background:{type: 'string', default: 'white'},
    quoteGroup: {
      type: 'array',
      default: []
    },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add one or more quotes (<=5) to display on the page.'
  ),

  edit: ( props ) => {
    if(props.attributes.quoteGroup.length===0){
      props.setAttributes( {quoteGroup: [{
        quoteContent: '',
        name:'',
        nameTitle:'',
        hasLink:false,
        ctaText:'',
        ctaLink: '',
        external: false,
      }]} )
    }

    const handleAddQuote = () => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      quoteGroup.push( {
        quoteContent: '',
        name:'',
        nameTitle:'',
        hasLink:false,
        ctaText:'',
        ctaLink: '',
        external: false,
      } );
      props.setAttributes( { quoteGroup } );
    }; 
    const handleRemoveQuote = ( index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      quoteGroup.splice( index, 1 );
      props.setAttributes( { quoteGroup } );
    }; 
    // const handleRemoveImage = ( index ) => {
    //   let quoteGroup = [ ...props.attributes.quoteGroup ];
    //   quoteGroup[ index ].imgUrl = "";
    //   props.setAttributes( { quoteGroup } );
    // }; 
    // const handleChangeAlt = ( altText, index ) => {
    //   let quoteGroup = [ ...props.attributes.quoteGroup ];
    //   quoteGroup[ index ].altText = altText;
    //   props.setAttributes( { quoteGroup } );
    // }; 
    const handleChangeHasLink = ( index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      quoteGroup[ index ].hasLink = !quoteGroup[ index ].hasLink;
      props.setAttributes( { quoteGroup } );
    }; 
    const handleChangeCtaText = ( ctaText, index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      quoteGroup[ index ].ctaText = ctaText;
      props.setAttributes( { quoteGroup } );
    }; 
    const handleChangeCtaLink = ( ctaLink, index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      quoteGroup[ index ].ctaLink = ctaLink;
      props.setAttributes( { quoteGroup } );
    }; 
    const handleChangeExternal= ( index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      quoteGroup[ index ].external = !quoteGroup[ index ].external;
      props.setAttributes( { quoteGroup } );
    }; 
    // const handleChangeImage = ( img, index ) => {
    //   let quoteGroup = [ ...props.attributes.quoteGroup ];
    //   quoteGroup[ index ].imgUrl = img.url;
    //   quoteGroup[ index ].altText = quoteGroup[ index ].altText!==''?quoteGroup[ index ].altText:img.alt;
    //   props.setAttributes( { quoteGroup } );
    // }; 
    const handleChangeContent = ( content, index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      quoteGroup[ index ].quoteContent = content.target.value;
      props.setAttributes( { quoteGroup } );
    }; 
    const handleChangeName = ( name, index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      quoteGroup[ index ].name = name.target.value;
      props.setAttributes( { quoteGroup } );
    }; 
    const handleChangeTitle = ( title, index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      quoteGroup[ index ].nameTitle = title.target.value;
      props.setAttributes( { quoteGroup } );
    }; 
    const handleMoveUp = ( index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      let tmp = quoteGroup[ index ];
      quoteGroup[ index ] = quoteGroup[ index+1 ]
      quoteGroup[ index+1 ] = tmp;
      props.setAttributes( { quoteGroup } );
    }; 
    const handleMoveDown = ( index ) => {
      let quoteGroup = [ ...props.attributes.quoteGroup ];
      let tmp = quoteGroup[ index ];
      quoteGroup[ index ] = quoteGroup[ index-1 ]
      quoteGroup[ index-1 ] = tmp;
      props.setAttributes( { quoteGroup } );
    }; 

    let sidebarFields,
        editorFields;

    if ( props.attributes.quoteGroup.length>0 ) {
      let num = props.attributes.quoteGroup.length-1
      sidebarFields = props.attributes.quoteGroup.map( ( quote, index ) => {
        return  <PanelBody key={index} 
                  className="quote-block-details"
                  title={`Quote ${index+1} Details`}
                  initialOpen={true}
                >
                  <PanelRow>
                    <CheckboxControl
                      label="Add a CTA link to this quote?"
                      checked={ quote.hasLink }
                      onChange={ () =>handleChangeHasLink ( index ) }
                    />
                  </PanelRow>
                  { quote.hasLink ?
                    ( <PanelRow>
                      <TextControl
                        label="Call to action text"
                        value={ quote.ctaText }
                        onChange={ ( ctaText ) => handleChangeCtaText ( ctaText, index ) }
                      />
                    </PanelRow> ) : '' }
                  { quote.hasLink ? (
                    <PanelRow>
                      <TextControl
                        label="Link address"
                        value={ quote.ctaLink }
                        onChange={ ( ctaLink ) => handleChangeCtaLink ( ctaLink, index ) }
                      />
                    </PanelRow> ) : '' }

                  { quote.hasLink ?
                    <PanelRow>
                      <CheckboxControl
                        label="Open link in new tab?"
                        checked={ quote.external }
                        onChange={ () =>handleChangeExternal ( index )}
                      />
                    </PanelRow> : '' }
                    {props.attributes.quoteGroup.length>1?
                      <hr></hr>:""
                    }
                    {props.attributes.quoteGroup.length>1?(
                    <div>
                      <h3><b>Reorder this quote:</b></h3>
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
                    {props.attributes.quoteGroup.length>1?
                    <hr></hr>:""}
                    {props.attributes.quoteGroup.length>1?
                    <PanelRow>
                      <Button
                        className={ 'remove-image-button remove-quote' }
                        onClick={ () => handleRemoveQuote( index ) }
                      >
                        Remove this Quote
                      </Button>
                    </PanelRow>:""}
                </PanelBody>
      } );

      editorFields = props.attributes.quoteGroup.map( ( quote, index ) => {
        return  <div key={ index }  className={ 'purdue-block-editor-quote'}>
                  <div className="purdue-block-quote__content">
                      <textarea
                        value={
                          quote.quoteContent !== '' ?
                          quote.quoteContent :
                            ''
                        }
                        className="textarea"
                        placeholder="Add quote content here..."
                        onChange={ ( content ) => handleChangeContent ( content, index )  }
                      ></textarea>              
                  </div>
                  <div className="purdue-block-quote__name">
                      <input
                        value={ quote.name }
                        className="input"
                        type="text"
                        placeholder="Quote Name..."
                        onChange={ ( name ) => handleChangeName ( name, index )}
                      ></input>
                  </div>
                  <div className="purdue-block-quote__title">
                      <input
                        value={ quote.nameTitle }
                        className="input"
                        type="text"
                        placeholder="Quote Name Title..."
                        onChange={ ( title ) => handleChangeTitle ( title, index )}
                      ></input>
                  </div>
                </div>;
      } );
    }

    return [
      <InspectorControls key="1">
        <PanelBody>
        <PanelRow>
            <RadioControl
              label="Background Color"
              help="Choose the background color of the quote."
              selected={ props.attributes.background }
              options={ [
                { label: 'White', value: 'white' },
                { label: 'Black', value: 'black' },
                { label: 'Gray', value: 'gray' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { background: option } )
              } }
            />
          </PanelRow>
          </PanelBody>
          { sidebarFields }
          <PanelBody>
            {props.attributes.quoteGroup.length<5?
              <Button
                className="remove-image-button add-quote"
                onClick={ handleAddQuote.bind( this ) }
              >
                { __( 'Add Another Quote' ) }
              </Button>:""
            }

        </PanelBody>
      </InspectorControls>,
      <div key="2" className={ props.className } className={`purdue-block-quote-group-editor purdue-block-quote-group section${props.attributes.background==="black"?" background-black":""}${props.attributes.background==="gray"?" background-black-ter":""}`}>
        { editorFields }
      </div>,
    ];
  },

  save: ( props ) => {
    const quotes = props.attributes.quoteGroup.map( ( quote, index ) => {
      return  <div key={ index } className={`purdue-block-quote`}>
                <div className="container">
                  <div className={`columns is-centered`}>
                    <div className="column is-two-thirds-desktop is-full-tablet is-full-mobile">
                      <p className="purdue-block-quote__content">{quote.quoteContent}</p>
                      <div className="purdue-block-quote__bottom">
                        <div className="purdue-block-quote__info">
                          {quote.name!==""?
                          <p className="purdue-block-quote__name">{quote.name}</p>:""}
                          {quote.nameTitle!==""?
                          <p className="purdue-block-quote__title">{quote.nameTitle}</p>:""}
                        </div>
                        {quote.ctaLink!==""?
                        <a className="purdue-block-quote__cta" href={quote.ctaLink} target={`${quote.external?"_blank":"_self"}`} rel="noopener noreferrer">{quote.ctaText}</a>:""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>;
    } );
    const dots = props.attributes.quoteGroup.map((quote,index)=>{
        return <span key={ index } className={`purdue-block-quote-group__dot${index===0?" active":""}`} data-target={index}></span>;
      });

    return (
      <div className={`purdue-block-quote-group ${props.attributes.background==="black"?" has-background-black":""}${props.attributes.background==="gray"?" has-background-black-ter":""}`}>
        <div className="purdue-block-quote-wrapper">
            {quotes}
        </div>
        {props.attributes.quoteGroup.length>1?
        <div className="purdue-block-quote-group__arrow-wrapper">
          <div className="container">
              <div className="purdue-block-quote-group__arrow purdue-block-quote-group__arrow-left">
                <i class="fas fa-chevron-left"></i>
              </div>
              <div className="purdue-block-quote-group__arrow purdue-block-quote-group__arrow-right">
                <i class="fas fa-chevron-right"></i>
              </div>
          </div> 
          </div>:""} 
          {props.attributes.quoteGroup.length>1?
            <div className="purdue-block-quote-group__dots">
              {dots}
            </div>:""}   
      </div>
    );
  },
} );
