/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
// import "./editor.scss";
// import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  TextControl,
  TextareaControl,
  Button,
  CheckboxControl,
  RadioControl,
  Popover,
  ToolbarButton,
  KeyboardShortcuts,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, RichText,BlockControls, useBlockProps } = wp.blockEditor;

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
registerBlockType("purdue-blocks/purdue-button", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Purdue Button"), // Block title.
  icon: (
    <svg id="e39343d6-a9a0-44c7-9f48-599e26c08610" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g id="clone" class="cls-2"><g class="cls-2"><path class="a5e7d352-d338-4ff0-9c2b-3bce1de664a1" d="M100,89.28571A10.718,10.718,0,0,1,89.28571,100H10.71429A10.718,10.718,0,0,1,0,89.28571V10.71429A10.718,10.718,0,0,1,10.71429,0H89.28571A10.718,10.718,0,0,1,100,10.71429ZM89.28571,12.0529a1.34289,1.34289,0,0,0-1.33861-1.33861H12.0529a1.34289,1.34289,0,0,0-1.33861,1.33861V87.9471a1.34289,1.34289,0,0,0,1.33861,1.33861H87.9471a1.34289,1.34289,0,0,0,1.33861-1.33861ZM21.42857,53.57143V46.42857a2.68655,2.68655,0,0,1,2.679-2.679H75.89241a2.68655,2.68655,0,0,1,2.679,2.679v7.14286a2.68655,2.68655,0,0,1-2.679,2.679H24.10759A2.68655,2.68655,0,0,1,21.42857,53.57143Z" transform="translate(0)"/></g></g></svg>   ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "purdue-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
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
    buttonStyle: { type: "string", default: "fill"  },
    backgroundColor: { type: "string", default: "black"  },
    fontStyle: { type: "string", default: "primary" },
    width: { type: "string", default: "auto" },
    buttonText: { type: 'string', source: 'html',  selector: 'span.purdue-blocks__button__text' },
    hasLink: { type: 'boolean', default: false },
    buttonURL: { type: 'string', default: "" },
    external: { type: 'boolean', default: false },
    fancyColor: { type: "string", default: "black"  },
    height: { type: "string", default: "auto" },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    "This block adds a button styled in line with Purdue brand."
  ),

  edit: (props) => {

    return [
      <InspectorControls>
        <PanelBody>
        <PanelRow>
            <RadioControl
                label="Font style"
                selected={ props.attributes.fontStyle }
                options={ [
                  { label: 'Primary (Regular and uppercase)', value: 'primary' },
                  { label: 'Narrow (Condesed and capitalized', value: 'narrow' },
                  { label: 'Fancy', value: 'fancy' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { fontStyle: option } )
                } }
              />
            </PanelRow>
            {props.attributes.fontStyle==="fancy"?"":
          <PanelRow>
            <RadioControl
                label="Button Style"
                selected={ props.attributes.buttonStyle }
                options={ [
                  { label: 'Fill', value: 'fill' },
                  { label: 'Outline', value: 'outline' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { buttonStyle: option } )
                  props.setAttributes( { backgroundColor: "black" } )
                } }
              />
            </PanelRow>}
            {props.attributes.fontStyle==="fancy"?
              <PanelRow>
              <RadioControl
                  label="Button Background Color"
                  selected={ props.attributes.fancyColor }
                  options={ [
                    { label: 'Black', value: 'black' },
                    { label: 'White', value: 'white' },
                  ] }
                  onChange={ ( option ) => {
                    props.setAttributes( { fancyColor: option } )
                  } }
                />
              </PanelRow>:
          <PanelRow>
            <RadioControl
                label="Button Background Color"
                selected={ props.attributes.backgroundColor }
                options={ props.attributes.buttonStyle==="fill"?[
                  { label: 'Black', value: 'black' },
                  { label: 'Gold (use on light background)', value: 'goldLignt' },
                  { label: 'Gold (use on dark background)', value: 'goldDark' },
                  { label: 'Opaque', value: 'opaque' },
                ]:[
                  { label: 'Black', value: 'black' },
                  { label: 'Gold (use on light background)', value: 'goldLignt' },
                  { label: 'Gold (use on dark background)', value: 'goldDark' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { backgroundColor: option } )
                } }
              />
            </PanelRow>
            }
          <PanelRow>
            <RadioControl
                label="Button Width"
                selected={ props.attributes.width }
                options={ [
                  { label: 'Full width', value: 'full' },
                  { label: 'Full width on mobile only', value: 'fullMobile' },
                  { label: 'Auto', value: 'auto' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { width: option } )
                  wp.hooks.addFilter(
                    'editor.BlockListBlock',
                    'purdue-blocks/purdue-button-modify-element',
                    modifyBlockListBlockButton
                  )
                } }
              />
            </PanelRow>
            <PanelRow>
            <RadioControl
                label="Height"
                help="Choose to the height of the button."
                selected={ props.attributes.height }
                options={ [
                  { label: 'Auto', value: 'auto' },
                  { label: '100%', value: 'full' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { height: option } )
                } }
              />
            </PanelRow>
          </PanelBody> 
        <PanelBody>  
        <PanelRow>
            <CheckboxControl
              label="Add a link to this button?"
              checked={ props.attributes.hasLink }
              onChange={ () =>
                props.setAttributes( { hasLink: ! props.attributes.hasLink } )
              }
            />
          </PanelRow>
          { props.attributes.hasLink ? (
            <PanelRow>
              <TextControl
                label="Link URL"
                value={ props.attributes.buttonURL }
                onChange={ ( buttonURL ) => props.setAttributes( { buttonURL } ) }
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
      props.attributes.fontStyle==="fancy"?
      <div className={`purdue-blocks-editor-button purdue-blocks__button purdue-blocks__button--fancy
      ${props.attributes.fancyColor==='black'?' purdue-blocks__button--fancy-black':''}
      ${props.attributes.fancyColor==='white'?' purdue-blocks__button--fancy-white':''}
      ${props.attributes.width==='full'?' purdue-blocks__button--full':''}
      ${props.attributes.width==='fullMobile'?' purdue-blocks__button--full-mobile':''}
      ${props.attributes.fontStyle==='narrow'?' purdue-blocks__button--narrow':''}
      ${props.attributes.height==='full'?' purdue-blocks__button--height':''}
      `}>          
      <RichText
        tagname="span"
        value={ props.attributes.buttonText }
        className={ 'purdue-blocks__button__text' }
        onChange={ ( text ) => {
          props.setAttributes( { buttonText: text } )
        } }
        placeholder="Button Text"
        keepPlaceholderOnFocus={ true }
        allowedFormats={ [] }
      >
      </RichText>  
      <span className={ 'purdue-blocks__button__icon' }><i class="fas fa-angle-right"></i></span>    
    </div>:
      <div className={`purdue-blocks-editor-button purdue-blocks__button
        ${props.attributes.backgroundColor==='goldLignt'?' purdue-blocks__button--gold-light':''}
        ${props.attributes.backgroundColor==='goldDark'?' purdue-blocks__button--gold-dark':''}
        ${props.attributes.backgroundColor==='opaque'?' purdue-blocks__button--opaque':''}
        ${props.attributes.buttonStyle==='fill'?'':' purdue-blocks__button--outline'}
        ${props.attributes.width==='full'?' purdue-blocks__button--full':''}
        ${props.attributes.width==='fullMobile'?' purdue-blocks__button--full-mobile':''}
        ${props.attributes.fontStyle==='narrow'?' purdue-blocks__button--narrow':''}
        ${props.attributes.height==='full'?' purdue-blocks__button--height':''}
        `}>
        <span class="shrink-padding"></span>             
        <RichText
          tagname="span"
          value={ props.attributes.buttonText }
          className={ 'purdue-blocks__button__text' }
          onChange={ ( text ) => {
            props.setAttributes( { buttonText: text } )
          } }
          placeholder="Button Text"
          keepPlaceholderOnFocus={ true }
          allowedFormats={ [] }
        >
        </RichText>    
        <span class="shrink-padding"></span>   
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
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      props.attributes.hasLink&&props.attributes.buttonURL?
      props.attributes.fontStyle==="fancy"?
      <a {...blockProps} className={`purdue-blocks__button purdue-blocks__button--fancy
      ${props.attributes.fancyColor==='black'?' purdue-blocks__button--fancy-black':''}
      ${props.attributes.fancyColor==='white'?' purdue-blocks__button--fancy-white':''}
      ${props.attributes.width==='full'?' purdue-blocks__button--full':''}
      ${props.attributes.width==='fullMobile'?' purdue-blocks__button--full-mobile':''}
      ${props.attributes.fontStyle==='narrow'?' purdue-blocks__button--narrow':''}
      ${props.attributes.height==='full'?' purdue-blocks__button--height':''}
      `}        
      href={props.attributes.buttonURL}
      target={ props.attributes.external ? '_blank' : '_self' }
      rel="noopener noreferrer">          
      <RichText.Content
          className={ 'purdue-blocks__button__text' }
          tagName="span"
          value={ props.attributes.buttonText }
      />
      <span className={ 'purdue-blocks__button__icon' }><i class="fas fa-angle-right"></i></span>  
    </a>:
        <a {...blockProps}role="link" className={`purdue-blocks__button${props.attributes.height==='full'?' purdue-blocks__button--height':''}${props.attributes.backgroundColor==='goldLignt'?' purdue-blocks__button--gold-light':''}${props.attributes.backgroundColor==='goldDark'?' purdue-blocks__button--gold-dark':''}${props.attributes.backgroundColor==='opaque'?' purdue-blocks__button--opaque':''}${props.attributes.buttonStyle==='fill'?'':' purdue-blocks__button--outline'}${props.attributes.width==='full'?' purdue-blocks__button--full':''}${props.attributes.width==='fullMobile'?' purdue-blocks__button--full-mobile':''}${props.attributes.fontStyle==='narrow'?' purdue-blocks__button--narrow':''}`}
        href={props.attributes.buttonURL}
        target={ props.attributes.external ? '_blank' : '_self' }
        rel="noopener noreferrer">
          <span class="shrink-padding"></span>
          <RichText.Content
          className={ 'purdue-blocks__button__text' }
          tagName="span"
          value={ props.attributes.buttonText }
          />
          <span class="shrink-padding"></span>
        </a>:
        <div role="button" className={`purdue-blocks__button${props.attributes.height==='full'?' purdue-blocks__button--height':''}${props.attributes.backgroundColor==='goldLignt'?' purdue-blocks__button--gold-light':''}${props.attributes.backgroundColor==='goldDark'?' purdue-blocks__button--gold-dark':''}${props.attributes.backgroundColor==='opaque'?' purdue-blocks__button--opaque':''}${props.attributes.buttonStyle==='fill'?'':' purdue-blocks__button--outline'}${props.attributes.width==='full'?' purdue-blocks__button--full':''}${props.attributes.width==='fullMobile'?' purdue-blocks__button--full-mobile':''}${props.attributes.fontStyle==='narrow'?' purdue-blocks__button--narrow':''}`} {...blockProps}>      
          <span class="shrink-padding"></span>
          <RichText.Content
            className={ 'purdue-blocks__button__text' }
            tagName="span"
            value={ props.attributes.buttonText }
          />
          <span class="shrink-padding"></span>
        </div>
    );
    return returned;
  },
});

const { createHigherOrderComponent } = wp.compose;

const modifyBlockListBlockButton = createHigherOrderComponent(
  ( BlockListBlock ) => {
    return ( props ) => {
      let classnames;
      if ( props.block.name === 'purdue-blocks/purdue-button' ) {
        classnames = [
          `${
            props.attributes.width==='fullMobile' ?
              " purdue-button-block-editor-width--full-mobile":
              ""
          }`,
          `${
            props.attributes.width==='auto' ?
              " purdue-button-block-editor-width--auto":
              ""
          }`,
        ].join( '' );
      }
      return <BlockListBlock { ...props } className={ classnames} />;
    };
  },
  'modifyBlockListBlockButton'
);
wp.hooks.addFilter(
  'editor.BlockListBlock',
  'purdue-blocks/purdue-button-modify-element',
  modifyBlockListBlockButton
)