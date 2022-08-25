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

const { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
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
registerBlockType( 'purdue-blocks/sidebar-box', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Sidebar Box' ), // Block title.
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
    title: { type: 'string', source: 'html', selector: '.sidebar-box__title' },
    titleLevel: { type: 'string', default: 'p' },
    addMargin: { type: 'string', default: '' },
    linkGroup: {
      type: 'array',
      default: []
    },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    'Add a box with optional header and CTA buttons.'
  ),

  edit: ( props ) => {
    const handleAddLink = () => {
      let linkGroup = [ ...props.attributes.linkGroup ];
      linkGroup.push( {
        ctaText:'',
        ctaLink: '',
        external: false,
      } );
      props.setAttributes( { linkGroup } );
    }; 
    const handleRemoveLink = ( index ) => {
      let linkGroup = [ ...props.attributes.linkGroup ];
      linkGroup.splice( index, 1 );
      props.setAttributes( { linkGroup } );
    }; 
    const handleChangeCtaText = ( ctaText, index ) => {
      let linkGroup = [ ...props.attributes.linkGroup ];
      linkGroup[ index ].ctaText = ctaText;
      props.setAttributes( { linkGroup } );
    }; 
    const handleChangeCtaLink = ( ctaLink, index ) => {
      let linkGroup = [ ...props.attributes.linkGroup ];
      linkGroup[ index ].ctaLink = ctaLink;
      props.setAttributes( { linkGroup } );
    }; 
    const handleChangeExternal= ( index ) => {
      let linkGroup = [ ...props.attributes.linkGroup ];
      linkGroup[ index ].external = !linkGroup[ index ].external;
      props.setAttributes( { linkGroup } );
    };  
    const handleMoveUp = ( index ) => {
      let linkGroup = [ ...props.attributes.linkGroup ];
      let tmp = linkGroup[ index ];
      linkGroup[ index ] = linkGroup[ index+1 ]
      linkGroup[ index+1 ] = tmp;
      props.setAttributes( { linkGroup } );
    }; 
    const handleMoveDown = ( index ) => {
      let linkGroup = [ ...props.attributes.linkGroup ];
      let tmp = linkGroup[ index ];
      linkGroup[ index ] = linkGroup[ index-1 ]
      linkGroup[ index-1 ] = tmp;
      props.setAttributes( { linkGroup } );
    }; 

    let sidebarFields;

    if ( props.attributes.linkGroup.length>0 ) {
      let num = props.attributes.linkGroup.length-1
      sidebarFields = props.attributes.linkGroup.map( ( link, index ) => {
        return  <PanelBody key={index} 
                  className="quote-block-details"
                  title={`Link ${index+1} Details`}
                  initialOpen={true}
                >
                  <PanelRow>
                    <TextControl
                      label="Call to action text"
                      value={ link.ctaText }
                      onChange={ ( ctaText ) => handleChangeCtaText ( ctaText, index ) }
                    />
                  </PanelRow>               
                  <PanelRow>
                    <TextControl
                      label="Link address"
                      value={ link.ctaLink }
                      onChange={ ( ctaLink ) => handleChangeCtaLink ( ctaLink, index ) }
                    />
                  </PanelRow>                 
                  <PanelRow>
                    <CheckboxControl
                      label="Open link in new tab?"
                      checked={ link.external }
                      onChange={ () =>handleChangeExternal ( index )}
                    />
                  </PanelRow>
                  {props.attributes.linkGroup.length>1?
                    <hr></hr>:""
                  }
                  {props.attributes.linkGroup.length>1?(
                  <div>
                    <h3><b>Reorder this Link:</b></h3>
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
                  {props.attributes.linkGroup.length>0?
                  <hr></hr>:""}
                  {props.attributes.linkGroup.length>0?
                  <PanelRow>
                    <Button
                      className={ 'remove-image-button remove-quote' }
                      onClick={ () => handleRemoveLink( index ) }
                    >
                      Remove this Link
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
          {props.attributes.linkGroup.length===0?
              <Button
                className="remove-image-button add-quote"
                onClick={ handleAddLink.bind( this ) }
              >
                { __( 'Add A CTA Link' ) }
              </Button>:""
            }
            {props.attributes.linkGroup.length>0 && props.attributes.linkGroup.length<5?
              <Button
                className="remove-image-button add-quote"
                onClick={ handleAddLink.bind( this ) }
              >
                { __( 'Add Another CTA Link' ) }
              </Button>:""
            }

        </PanelBody>
      </InspectorControls>,
      <div key="2" className={`purdue-block-sidebar-box-editor purdue-block-sidebar-box${props.attributes.addMargin?" purdue-block-sidebar-box--margin":""}`}>
        <RichText
          tagname={ props.setAttributes.titleLevel }
          value={ props.attributes.title }
          className={ 'sidebar-box__title' }
          onChange={ ( text ) => {
            props.setAttributes( { title: text } )
          } }
          placeholder="Add Title"
          keepPlaceholderOnFocus={ true }
        >
        </RichText>
        <div className={`sidebar-box__content`}>
          <InnerBlocks
            template={ BLOCKS_TEMPLATE }
            templateLock={ false }
          />
        </div>
        {props.attributes.linkGroup.length>0?
        props.attributes.linkGroup.map( ( link, index ) => {
          return link.ctaLink!==""||link.ctaText!==""?
          <a key={ index } className="sidebar-box__link components-disabled" href={link.ctaLink} target={`${link.external?"_blank":"_self"}`} rel="noopener noreferrer">{link.ctaText}</a>:""        
        }):""}  
      </div>,
    ];
  },

  save: ( props ) => {
    const blockProps = useBlockProps.save();
    return (
      <div className={`purdue-block-sidebar-box${props.attributes.addMargin?" purdue-block-sidebar-box--margin":""}`} {...blockProps}>
        {props.attributes.title?
        <RichText.Content
          className={ 'sidebar-box__title' }
          tagName={ props.attributes.titleLevel }
          value={ props.attributes.title }
        />:""}
        <div className={ 'sidebar-box__content' }>
          <InnerBlocks.Content />
        </div>
        {props.attributes.linkGroup.length>0?
        props.attributes.linkGroup.map( ( link, index ) => {
          return link.ctaLink!==""||link.ctaText!==""?
          <a key={ index } className="sidebar-box__link" href={link.ctaLink} target={`${link.external?"_blank":"_self"}`} rel="noopener noreferrer">{link.ctaText}</a>:""        
        }):""}  
      </div>
    );
  },
} );
