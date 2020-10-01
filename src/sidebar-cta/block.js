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
  Button,
  CheckboxControl,
  RadioControl,
  ToolbarGroup
} = wp.components;
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks,BlockControls } = wp.blockEditor;

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
registerBlockType("purdue-blocks/sidebar-cta", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Sidebar CTA"), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="object-group"
      className="svg-inline--fa fa-object-group fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#8E6F3E"
        d="M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
      ></path>
    </svg>), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
    backgroundColor: { type: "string", default: "white"  },
    header: { type: 'string', source: 'html', selector: 'p.header' },
    content: { type: 'string', source: 'html', selector: 'p.content' },
    ctaText: { type: 'string', source: 'html', selector: 'a.cta-button' },
    ctaUrl: { type: "string", default: "" },
    external: { type: 'boolean', default: false },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    "Use this block to add a CTA card on the sidebar."
  ),

  edit: (props) => {
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Background Color"
              help="Choose to background color of the proofpoint."
              selected={ props.attributes.backgroundColor }
              options={ [
                { label: 'White', value: 'white' },
                { label: 'Black', value: 'black' },
                { label: 'Gray', value: 'gray' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { backgroundColor: option } )
              } }
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
          <h2>Button Link settings</h2>
            <PanelRow>
              <TextControl
                label="Link URL"
                value={ props.attributes.ctaUrl }
                onChange={ ( ctaUrl ) => props.setAttributes( { ctaUrl } ) }
              />
            </PanelRow> 
            <PanelRow>
              <CheckboxControl
                label="Open link in new tab?"
                checked={ props.attributes.external }
                onChange={ () =>
                  props.setAttributes( { external: ! props.attributes.external } )
                }
              />
            </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={`purdue-blocks-sidebar-cta${props.attributes.backgroundColor==="black" ? ' purdue-blocks-sidebar-cta-black' : ''}
      ${props.attributes.backgroundColor==="gray" ? ' purdue-blocks-sidebar-cta-gray' : ''}`}>
        <RichText
          tagname="p"
          value={ props.attributes.header }
          className={ 'header' }
          onChange={ ( text ) => {
            props.setAttributes( { header: text } )
          } }
          placeholder="Add Header Text"
          keepPlaceholderOnFocus={ true }
          allowedFormats={ [] }
        >
        </RichText>
        <RichText
          tagname="p"
          value={ props.attributes.content }
          className={ 'content' }
          onChange={ ( text ) => {
            props.setAttributes( { content: text } )
          } }
          placeholder="Add Content Text"
          keepPlaceholderOnFocus={ true }
          allowedFormats={ [] }
        ></RichText>
        <RichText
          tagname="a"
          value={ props.attributes.ctaText }
          className={ 'cta-button' }
          onChange={ ( text ) => {
            props.setAttributes( { ctaText: text } )
          } }
          placeholder="Add Button Text"
          keepPlaceholderOnFocus={ true }
          allowedFormats={ [] }
        ></RichText>
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
      <div className={`purdue-blocks-sidebar-cta${props.attributes.backgroundColor==="black" ? ' purdue-blocks-sidebar-cta-black' : ''}
      ${props.attributes.backgroundColor==="gray" ? ' purdue-blocks-sidebar-cta-gray' : ''}`}>    
        { props.attributes.header ? ( <RichText.Content
          className={ 'header' }
          tagName="p"
          value={ props.attributes.header }
        /> ) : '' }
        { props.attributes.content ? ( <RichText.Content
          className={ 'content' }
          tagName="p"
          value={ props.attributes.content }
        /> ) : '' }
        <a
          href={props.attributes.ctaUrl}
          className="cta-button"
          target={ props.attributes.external ? '_blank' : '_self' }
          rel="noopener noreferrer"
        >
          {props.attributes.ctaText}
        </a>
      </div>
    );
    return returned;
  },
});