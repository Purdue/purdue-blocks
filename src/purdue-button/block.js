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
const { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, RichText,BlockControls } = wp.blockEditor;

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
  <svg class="svg-inline--fa fa-square fa-w-14" aria-hidden="true" focusable="false" data-prefix="far" data-icon="square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"></path></svg>    ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
    buttonURl: { type: 'string', default: "" },
    external: { type: 'boolean', default: false },
  },

  supports: {
    className: false,
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
                label="Button Style"
                selected={ props.attributes.buttonStyle }
                options={ [
                  { label: 'Fill', value: 'fill' },
                  { label: 'Outline', value: 'outline' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { buttonStyle: option } )
                } }
              />
            </PanelRow>
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
          <PanelRow>
            <RadioControl
                label="Font style"
                selected={ props.attributes.fontStyle }
                options={ [
                  { label: 'Primary (Regular and uppercase)', value: 'primary' },
                  { label: 'Narrow (Condesed and capitalized', value: 'narrow' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { fontStyle: option } )
                } }
              />
            </PanelRow>
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
      <div className={`purdue-blocks-editor-button purdue-blocks__button
        ${props.attributes.backgroundColor==='goldLignt'?' purdue-blocks__button--gold-light':''}
        ${props.attributes.backgroundColor==='goldDark'?' purdue-blocks__button--gold-dark':''}
        ${props.attributes.backgroundColor==='opaque'?' purdue-blocks__button--opaque':''}
        ${props.attributes.buttonStyle==='fill'?'':' purdue-blocks__button--outline'}
        ${props.attributes.width==='full'?' purdue-blocks__button--full':''}
        ${props.attributes.width==='fullMobile'?' purdue-blocks__button--full-mobile':''}
        ${props.attributes.fontStyle==='narrow'?' purdue-blocks__button--narrow':''}
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
    const returned = (
      props.attributes.hasLink&&props.attributes.buttonURL?
        <a  className={`purdue-blocks__button${props.attributes.backgroundColor==='goldLignt'?' purdue-blocks__button--gold-light':''}${props.attributes.backgroundColor==='goldDark'?' purdue-blocks__button--gold-dark':''}${props.attributes.backgroundColor==='opaque'?' purdue-blocks__button--opaque':''}${props.attributes.buttonStyle==='fill'?'':' purdue-blocks__button--outline'}${props.attributes.width==='full'?' purdue-blocks__button--full':''}${props.attributes.width==='fullMobile'?' purdue-blocks__button--full-mobile':''}${props.attributes.fontStyle==='narrow'?' purdue-blocks__button--narrow':''}`}
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
        <div className={`purdue-blocks__button${props.attributes.backgroundColor==='goldLignt'?' purdue-blocks__button--gold-light':''}${props.attributes.backgroundColor==='goldDark'?' purdue-blocks__button--gold-dark':''}${props.attributes.backgroundColor==='opaque'?' purdue-blocks__button--opaque':''}${props.attributes.buttonStyle==='fill'?'':' purdue-blocks__button--outline'}${props.attributes.width==='full'?' purdue-blocks__button--full':''}${props.attributes.width==='fullMobile'?' purdue-blocks__button--full-mobile':''}${props.attributes.fontStyle==='narrow'?' purdue-blocks__button--narrow':''}`}>      
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
      console.log(classnames)
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