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

const { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, RichText } = wp.blockEditor;
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
 const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Add content' } ],
];
registerBlockType( 'purdue-blocks/contact-card', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Contact Card' ), // Block title.
  icon: (
    <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 87.5"
  >
    <defs></defs>
    <g id="Window-maximize" class="cls-1">
      <g class="cls-1">
        <path
          class="color-9c9795"
          d="M100,16.62V85.37a9.38,9.38,0,0,1-9.37,9.37H9.37A9.38,9.38,0,0,1,0,85.37V16.62A9.38,9.38,0,0,1,9.37,7.24H90.63A9.38,9.38,0,0,1,100,16.62ZM90.63,38.49H9.37v45.7a1.18,1.18,0,0,0,1.18,1.18h78.9a1.18,1.18,0,0,0,1.18-1.18Z"
          transform="translate(0 -7.24)"
        />
      </g>
    </g>
  </svg>
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
    title: { type: 'string', source: 'html', selector: '.contact-card__title' },
    titleLevel: { type: 'string', default: 'p' },
    addMargin: { type: 'string', default: '' },
    contactGroup: {
      type: 'array',
      default: []
    },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add a contact card.'
  ),

  edit: ( props ) => {
    if(props.attributes.contactGroup.length===0){
      props.setAttributes( {contactGroup: [{
        icon: '',
        text:{ type: 'string', source: 'html', selector: '.contact-card__text' },
      }]} )
    }
    const handleAddContact = () => {
      let contactGroup = [ ...props.attributes.contactGroup ];
      contactGroup.push( {
        icon: '',
        text:{ type: 'string', source: 'html', selector: '.contact-card__text' },
      } );
      props.setAttributes( { contactGroup } );
    }; 
    const handleRemoveContact = ( index ) => {
      let contactGroup = [ ...props.attributes.contactGroup ];
      contactGroup.splice( index, 1 );
      props.setAttributes( { contactGroup } );
    }; 
    const handleChangeIcon = ( icon, index ) => {
      let contactGroup = [ ...props.attributes.contactGroup ];
      contactGroup[ index ].icon = icon;
      props.setAttributes( { contactGroup } );
    }; 
    const handleChangeText = ( text, index ) => {
      let contactGroup = [ ...props.attributes.contactGroup ];
      contactGroup[ index ].text = text;
      props.setAttributes( { contactGroup } );
    };  
    const handleMoveUp = ( index ) => {
      let contactGroup = [ ...props.attributes.contactGroup ];
      let tmp = contactGroup[ index ];
      contactGroup[ index ] = contactGroup[ index+1 ]
      contactGroup[ index+1 ] = tmp;
      props.setAttributes( { contactGroup } );
    }; 
    const handleMoveDown = ( index ) => {
      let contactGroup = [ ...props.attributes.contactGroup ];
      let tmp = contactGroup[ index ];
      contactGroup[ index ] = contactGroup[ index-1 ]
      contactGroup[ index-1 ] = tmp;
      props.setAttributes( { contactGroup } );
    }; 

    let sidebarFields,editorFields;

    if ( props.attributes.contactGroup.length>0 ) {
      let num = props.attributes.contactGroup.length-1
      sidebarFields = props.attributes.contactGroup.map( ( contact, index ) => {
        return  <PanelBody key={index} 
                  className="quote-block-details"
                  title={`Contact ${index+1} Details`}
                  initialOpen={true}
                >
                  <PanelRow>
                    <TextControl
                      label="Icon"
                      help="Add a fontawesome icon in front of this piiece of contact info."
                      value={ contact.icon }
                      onChange={ ( icon ) => handleChangeIcon ( icon, index ) }
                    />
                  </PanelRow>               
                  {props.attributes.contactGroup.length>1?
                    <hr></hr>:""
                  }
                  {props.attributes.contactGroup.length>1?(
                  <div>
                    <h3><b>Reorder this piece of contact info:</b></h3>
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
                  {props.attributes.contactGroup.length>0?
                  <hr></hr>:""}
                  {props.attributes.contactGroup.length>0?
                  <PanelRow>
                    <Button
                      className={ 'remove-image-button remove-quote' }
                      onClick={ () => handleRemoveContact( index ) }
                    >
                      Remove This Contact Info
                    </Button>
                  </PanelRow>:""}
              </PanelBody>
      } );
      editorFields = props.attributes.contactGroup.map( ( contact, index ) => {
        return  <div key={ index }  className={ 'columns'}>
                  <div className="column">
                    <div dangerouslySetInnerHTML={{ __html: contact.icon }} />         
                  </div>
                  <div className="column">
                  <RichText
                    tagname={ "p" }
                    value={ contact.text }
                    className={ 'contact-card__text' }
                    onChange={ ( text ) => handleChangeText(text,index) }
                    placeholder="Add Contact Info"
                    keepPlaceholderOnFocus={ true }
                  ></RichText>
                  </div>
                </div>;
      } );
    }
    return [
      <InspectorControls key="1">
        <PanelBody>
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
          <PanelRow>
            <CheckboxControl
              label="Add margin below?"
              checked={ props.attributes.addMargin }
              onChange={ () =>
                props.setAttributes( { addMargin: ! props.attributes.addMargin } )
              }
            />
          </PanelRow>
          </PanelBody>
          { sidebarFields }
          <PanelBody>
            <Button
              className="remove-image-button add-quote"
              onClick={ handleAddContact.bind( this ) }
            >
              { __( 'Add Another Contact Info' ) }
            </Button>
        </PanelBody>
      </InspectorControls>,
      <div key="2" className={`pu-contact-card-editor pu-contact-card${props.attributes.addMargin?" pu-contact-card--margin":""}`}>
        <RichText
          tagname={ props.setAttributes.titleLevel }
          value={ props.attributes.title }
          className={ 'contact-card__title' }
          onChange={ ( text ) => {
            props.setAttributes( { title: text } )
          } }
          placeholder="Add Title"
          keepPlaceholderOnFocus={ true }
        >
        </RichText>
        <div className={`contact-card__content`}>
          {editorFields}
        </div> 
      </div>,
    ];
  },

  save: ( props ) => {
    return (
      <div className={`pu-contact-card${props.attributes.addMargin?" pu-contact-card--margin":""}`}>
        {props.attributes.title?
        <RichText.Content
          className={ 'contact-card__title' }
          tagName={ props.attributes.titleLevel }
          value={ props.attributes.title }
        />:""}
        <div className={ 'contact-card__content' }>
          {props.attributes.contactGroup.length>0?
          props.attributes.contactGroup.map( ( contact, index ) => {
            return <div key={ index } className="columns">
              <div className="column">
                <div dangerouslySetInnerHTML={{ __html: contact.icon }} />  
              </div>
              <div className="column">
                <RichText.Content
                  className={ 'contact-card__text' }
                  tagName={ 'p' }
                  value={ contact.text }
                />
              </div>
            </div>       
          }):""}  
        </div> 
      </div>
    );
  },
} );
