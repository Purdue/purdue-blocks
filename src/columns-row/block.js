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
  RadioControl,
  SelectControl,
  Button,
  CheckboxControl
} = wp.components;
const { InnerBlocks, InspectorControls, MediaUploadCheck, MediaUpload, RichText, useBlockProps } = wp.blockEditor;
import { createBlock } from "@wordpress/blocks";
const { select } = wp.data


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
registerBlockType( 'purdue-blocks/columns-row', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Row of Columns' ), // Block title.
  icon: (
    <svg id="ef9c2100-31be-4639-82c5-0ef6f30faf8a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 71.42857"><g id="e07d924f-208c-4ad5-884f-434897ed4326" data-name="Grip-horizontal" class="cls-1"><g class="cls-1"><path class="cls-2" d="M28.57143,15.17857V29.46429a7.14374,7.14374,0,0,1-7.14286,7.14285H7.14286A7.14374,7.14374,0,0,1,0,29.46429V15.17857A7.14375,7.14375,0,0,1,7.14286,8.03571H21.42857A7.14375,7.14375,0,0,1,28.57143,15.17857Zm0,42.85714V72.32143a7.14375,7.14375,0,0,1-7.14286,7.14286H7.14286A7.14375,7.14375,0,0,1,0,72.32143V58.03571a7.14374,7.14374,0,0,1,7.14286-7.14285H21.42857A7.14374,7.14374,0,0,1,28.57143,58.03571ZM64.28571,15.17857V29.46429a7.14374,7.14374,0,0,1-7.14285,7.14285H42.85714a7.14374,7.14374,0,0,1-7.14285-7.14285V15.17857a7.14375,7.14375,0,0,1,7.14285-7.14286H57.14286A7.14375,7.14375,0,0,1,64.28571,15.17857Zm0,42.85714V72.32143a7.14375,7.14375,0,0,1-7.14285,7.14286H42.85714a7.14375,7.14375,0,0,1-7.14285-7.14286V58.03571a7.14374,7.14374,0,0,1,7.14285-7.14285H57.14286A7.14374,7.14374,0,0,1,64.28571,58.03571ZM100,15.17857V29.46429a7.14374,7.14374,0,0,1-7.14286,7.14285H78.57143a7.14374,7.14374,0,0,1-7.14286-7.14285V15.17857a7.14375,7.14375,0,0,1,7.14286-7.14286H92.85714A7.14375,7.14375,0,0,1,100,15.17857Zm0,42.85714V72.32143a7.14375,7.14375,0,0,1-7.14286,7.14286H78.57143a7.14375,7.14375,0,0,1-7.14286-7.14286V58.03571a7.14374,7.14374,0,0,1,7.14286-7.14285H92.85714A7.14374,7.14374,0,0,1,100,58.03571Z" transform="translate(0 -8.03571)"/></g></g></svg>
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
    sectionPadding: {type: 'string', default: 'small'},
    bgColor: { type: 'string', default: '' },
    title: { type: 'string', default: '' },
    titleLevel: { type: "string", default: "p" },
    headerColor: { type: "string", default: "black" },
    subText: { type: 'string', default: '' },
    subTextColor: { type: "string", default: "black" },
    titleAlign: { type: 'string', default: 'left' },
    subTextAlign: { type: 'string', default: 'left' },
    numColumns: { type: "number", default: 1 },
    dividers: { type: "boolean", default: false },
    centerColumns: { type: "boolean", default: false },
    addBackground: { type: "boolean", default: false },
    backgroundImageType: { type: 'string', default: 'fabric' },
    backgroundImageUrl: { type: 'string', default: file_data.fabric_url },
    backgroundImageAlt: { type: 'string', default: '' },
    backgroundOverlay: { type: 'string', default: 'has-overlay-black' },
    rowType: { type: "string", default: 'regular' },
    addSpace: { type: "boolean", default: true },
    addSpaceMobile: { type: "boolean", default: false },
  },
  supports: {
    className: false,
    anchor: true,
  },
  // Block description in side panel
  description: __(
    'Add a row of columns to the page.'
  ),

  edit: ( props ) => {
    if (props.attributes.numColumns === 1) {
      const id = props.clientId

      const parentBlock = select( 'core/editor' ).getBlocksByClientId( id )[ 0 ];
      const column = parentBlock.innerBlocks[0] || null

      if(column) {
        if(column.innerBlocks.length < 1) {
          updateColumns(props, 1, 1);
        }
      } else {
        updateColumns(props, 1, 1);
      }
    }

    if(props.attributes.backgroundImageType === 'fabric') {
      props.setAttributes( { backgroundImageUrl: file_data.fabric_url } )
      props.setAttributes( { backgroundImageAlt: '' } )
    }else if(props.attributes.backgroundImageType === 'concrete'){
      props.setAttributes( { backgroundImageUrl: file_data.concrete_url } )
      props.setAttributes( { backgroundImageAlt: '' } )
    }

    return [
      <InspectorControls>
          <PanelBody>
          <PanelRow>
            <RadioControl
                label="Add a row"
                selected={ props.attributes.rowType }
                options={
                  [
                    { value: 'regular', label: 'Regular Row with content' },
                    { value: 'empty', label: 'Empty Row' },
                    { value: 'emptyLine', label: 'Empty Row With A Guide Line' },
                  ]
                }
                onChange={ ( rowType ) => {
                  props.setAttributes( { rowType } )
                } }
              />
            </PanelRow>
            {props.attributes.rowType==="regular"?
            <PanelRow>
              <RadioControl
                label="Padding Size"
                help="Select the amount of spacing at the top and bottom of the section."
                selected={ props.attributes.sectionPadding }
                options={ [
                  { label: 'None', value: 'none' },
                  { label: 'Small', value: 'small' },
                  { label: 'Medium', value: 'is-medium' },
                  { label: 'Large', value: 'is-large' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { sectionPadding: option } )
                } }
              />
            </PanelRow>:""}
            <PanelRow>
              <CheckboxControl
                label="Add Background Image"
                checked={props.attributes.addBackground}
                onChange={(addBackground) => {
                  props.setAttributes({addBackground})
                  props.setAttributes( { bgColor: "" } )
                }}
              />
            </PanelRow>
            {
              props.attributes.addBackground ? <PanelRow>
              <RadioControl
                label="Select Background Image"
                selected={ props.attributes.backgroundImageType }
                options={
                  [
                    { value: 'fabric', label: 'Fabric' },
                    { value: 'concrete', label: 'Concrete' },
                    { value: 'own', label: 'Choose Your Own Image' },
                  ]
                }
                onChange={ ( backgroundImageType ) => {
                  props.setAttributes( { backgroundImageType } )
                } }
              />
            </PanelRow>:""
            }
        {props.attributes.addBackground && props.attributes.backgroundImageType==="own"?
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( img ) => {
                  props.setAttributes( {
                    backgroundImageUrl: img.url,
                    backgroundImageAlt:
                        props.attributes.backgroundImageAlt !== '' ?
                          props.attributes.backgroundImageAlt :
                          img.alt,
                  } );
                } }
                render={ ( { open } ) => {
                  return props.attributes.backgroundImageUrl !== '' ? (
                    <div className={ 'purdue-blocks-editor-news__preview' }>
                      <Button
                        className={ 'remove-image-button has-margin-left' }
                        onClick={ open }
                      >
                        Select a New Image
                      </Button>
                      <p className={ 'has-margin-bottom' }>
                        For best results, use an image with no people or text.
                      </p>
                    </div>
                  ) : (
                    <div className={ 'purdue-blocks-editor-news__container' }>

                      <Button
                        className={ 'remove-image-button has-margin-left' }
                        onClick={ open }
                      >
                        Open Media Library
                      </Button>
                      <p className={ 'has-margin-bottom' }>
                        <i>For best results, use an image with no people or text.</i>
                      </p>
                    </div>
                  );
                } }
              />
            </MediaUploadCheck>
          </PanelRow>:""}
            {
              props.attributes.addBackground && props.attributes.backgroundImageType!== "concrete"? <PanelRow>
              <SelectControl
                label="Image Overlay Color"
                value={ props.attributes.backgroundOverlay }
                options={
                  [
                    { value: '', label: 'None' },
                    { value: 'has-overlay-black', label: 'Black' },
                    { value: 'has-overlay-white', label: 'White' },
                    { value: 'has-overlay-steel', label: 'Steel Gray' },
                    { value: 'has-overlay-gold', label: 'Boilermaker Gold' },
                  ]
                }
                onChange={ ( backgroundOverlay ) => {
                  props.setAttributes( { backgroundOverlay } )
                } }
              />
            </PanelRow>:""
            }
            {
              !props.attributes.addBackground ? <PanelRow>
              <SelectControl
                label="Background Color"
                value={ props.attributes.bgColor }
                options={
                  [
                    { value: '', label: 'None' },
                    { value: 'has-background-black', label: 'Black' },
                    { value: 'has-background-light-gray', label: 'Lightest Digital Gray' },
                    { value: 'has-background-grey-lighter', label: 'Medium Digital Gray' },
                    { value: 'has-background-black-ter', label: 'Steel(Dark) Gray' },
                    { value: 'has-background-boiler-gold', label: 'Boilermaker Gold' },
                  ]
                }
                onChange={ ( bgColor ) => {
                  props.setAttributes( { bgColor } )
                } }
              />
            </PanelRow>:""
            }
 
          </PanelBody>
          {props.attributes.rowType==="regular"?
         <PanelBody>
            <PanelRow>
            <SelectControl
                label="Number of Columns"
                value={ props.attributes.numColumns }
                options={
                  [
                    { value: 1, label: 'One Column' },
                    { value: 2, label: 'Two Columns' },
                    { value: 3, label: 'Three Columns' },
                    { value: 4, label: 'Four Columns' },
                  ]
                }
                onChange={ ( val ) => {
                  let numColumns = parseInt(val)
                  updateColumns(props, props.attributes.numColumns, numColumns);
                  props.setAttributes({ numColumns });
                } }
              />
            </PanelRow>
            <PanelRow>
              <CheckboxControl
                label="Include dividers between columns?"
                checked={props.attributes.dividers}
                onChange={(checked) => props.setAttributes({ dividers: checked })}
              />
            </PanelRow>
            <PanelRow>
              <CheckboxControl
                label="Center the columns?"
                checked={props.attributes.centerColumns}
                onChange={(checked) => props.setAttributes({ centerColumns: checked })}
              />
            </PanelRow>
          </PanelBody>:""
          }
          {props.attributes.rowType==="regular"?
          <PanelBody>
            <PanelRow>
              <SelectControl
                label="Heading level of the title"
                value={props.attributes.titleLevel}
                options={[
                  { label: "H1", value: "h1" },
                  { label: "H2", value: "h2" },
                  { label: "H3", value: "h3" },
                  { label: "H4", value: "h4" },
                  { label: "H5", value: "h5" },
                  { label: "H6", value: "h6" },
                  { label: "P", value: "p" },
                ]}
                onChange={(titleLevel) => {
                  props.setAttributes({ titleLevel });
                }}
              />
            </PanelRow>
            <PanelRow>
              <SelectControl
                label="Heading Color"
                value={ props.attributes.headerColor }
                options={ [
                  { label: 'Black', value: 'black' },
                  { label: 'Steel', value: 'steel' },
                  { label: 'Digital Gold', value: 'gold' },
                  { label: 'Aged Gold', value: 'aged' },
                  { label: 'White', value: 'white' },
                ] }
                onChange={ ( headerColor ) => {
                  props.setAttributes( { headerColor } )
                } }
              />
            </PanelRow>
            <PanelRow>
              <SelectControl
                label="Subtext Color"
                value={ props.attributes.subTextColor }
                options={ [
                  { label: 'Black', value: 'black' },
                  { label: 'Steel', value: 'steel' },
                  { label: 'Digital Gold', value: 'gold' },
                  { label: 'Aged Gold', value: 'aged' },
                  { label: 'White', value: 'white' },
                ] }
                onChange={ ( subTextColor ) => {
                  props.setAttributes( { subTextColor } )
                } }
              />
            </PanelRow>
          </PanelBody>:""
          }
          {props.attributes.rowType==="regular"?
          <PanelBody>
            <PanelRow>
              <SelectControl
                label="Heading alignment"
                value={props.attributes.titleAlign}
                options={[
                  { label: "Left Aligned", value: "left" },
                  { label: "Centered", value: "center" },
                ]}
                onChange={(titleAlign) => {
                  props.setAttributes({ titleAlign });
                }}
              />
            </PanelRow>
            <PanelRow>
              <SelectControl
                label="Sub text alignment"
                value={props.attributes.subTextAlign}
                options={[
                  { label: "Left Aligned", value: "left" },
                  { label: "Centered", value: "center" },
                ]}
                onChange={(subTextAlign) => {
                  props.setAttributes({ subTextAlign });
                }}
              />
            </PanelRow>
            <PanelRow>
              <CheckboxControl
                label="Add space below subtext?"
                checked={props.attributes.addSpace}
                onChange={(checked) => props.setAttributes({ addSpace: checked })}
              />
            </PanelRow>
          </PanelBody>:""
          }
          <PanelBody>
            <PanelRow>
              <CheckboxControl
                label="Add space at the bottom on mobile?"
                checked={props.attributes.addSpaceMobile}
                onChange={(checked) => props.setAttributes({ addSpaceMobile: checked })}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>,
        <div className={`pu-columns-row pu-columns-row-editor section
        ${props.attributes.bgColor ? ` ${props.attributes.bgColor}`:''}
        ${props.attributes.sectionPadding === 'none'?"no-padding":""}
        ${props.attributes.sectionPadding !== 'small'&&props.attributes.sectionPadding !== 'none'&&props.attributes.rowType==="regular" ? ` ${props.attributes.sectionPadding}` : ''}
        ${props.attributes.addBackground && props.attributes.backgroundImageType !== 'concrete' ? ` ${props.attributes.backgroundOverlay}` : ''}
        ${props.attributes.addBackground && props.attributes.backgroundImageType === 'concrete' ? ` has-overlay-concrete` : ''}
        ${props.attributes.rowType==="empty" ? ` pu-columns-row--empty`:''}
        ${props.attributes.rowType==="emptyLine" ? ` pu-columns-row--empty-line`:''}
        ${props.attributes.addSpaceMobile ? ` pu-columns-row--space-mobile`:''}
        `}
        style={{backgroundImage: `url(${props.attributes.addBackground?props.attributes.backgroundImageUrl:""})`}}
        aria-label={ props.attributes.backgroundImageAlt }
        >
            {props.attributes.rowType==="regular"?
            <div className={`content${props.attributes.sectionPadding !== 'none'?" container":""}`}>
              <div className={`bulma-blocks-editor-columns`}>
                <div className="title">
                  <RichText
                    tagname={props.setAttributes.titleLevel}
                    value={props.attributes.title}
                    className={`title align--${props.attributes.titleAlign} title--${props.attributes.headerColor}`}
                    onChange={(text) => {
                      props.setAttributes({ title: text });
                    }}
                    placeholder="Add Heading"
                    keepPlaceholderOnFocus={true}
                    allowedFormats={[]}
                  ></RichText>
                </div>
                <div className={`content${props.attributes.addSpace ? '':' content--no-margin'}`}>
                  <RichText
                    tagname="p"
                    value={props.attributes.subText}
                    className={`align--${props.attributes.subTextAlign} content subtext--${props.attributes.subTextColor}`}
                    onChange={(text) => {
                      props.setAttributes({ subText: text });
                    }}
                    placeholder="Add Sub-Text"
                    allowedFormats={[]}
                  ></RichText>
                </div>
                <InnerBlocks templateLock="all" />
              </div>
            </div>:""}
        </div>,
    ]
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
    const url=`url(${props.attributes.backgroundImageUrl})`
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className={`pu-columns-row section
                      ${props.attributes.bgColor ? ` ${props.attributes.bgColor}`:''}
                      ${props.attributes.sectionPadding === 'none'?"no-padding":""}
                      ${props.attributes.sectionPadding !== 'small'&&props.attributes.sectionPadding !== 'none'&&props.attributes.rowType==="regular" ? ` ${props.attributes.sectionPadding}` : ''}
                      ${props.attributes.addBackground && props.attributes.backgroundImageType !== 'concrete' ? ` ${props.attributes.backgroundOverlay}` : ''}
                      ${props.attributes.addBackground && props.attributes.backgroundImageType === 'concrete' ? ` has-overlay-concrete` : ''}
                      ${props.attributes.rowType==="empty" ? ` pu-columns-row--empty`:''}
                      ${props.attributes.rowType==="emptyLine" ? ` pu-columns-row--empty-line`:''}
                      ${props.attributes.addSpaceMobile ? ` pu-columns-row--space-mobile`:''}
                      `}
            style={{backgroundImage: `${props.attributes.addBackground?url:"none"}`}}
            aria-label={ props.attributes.backgroundImageAlt }
            >
            {props.attributes.rowType==="regular"?  
                <div className={`content${props.attributes.sectionPadding !== 'none'?" container":""}`}>
                {(props.attributes.title !== '' && props.attributes.title) || (props.attributes.subText !== '' &&  props.attributes.subText) ? (
                  <div className={`content${props.attributes.addSpace ? '':' content--no-margin'}`}>
                    <div className="columns is-centered">
                      <div className="column is-8">
                        {props.attributes.title !== '' && props.attributes.title !== undefined ?
                        <RichText.Content
                          className={`title align--${props.attributes.titleAlign} title--${props.attributes.headerColor}`}
                          tagName={props.attributes.titleLevel}
                          value={props.attributes.title}
                        /> : ''}
                        {props.attributes.subText !== '' &&  props.attributes.subText !== undefined ? 
                        <RichText.Content
                          className={`align--${props.attributes.subTextAlign} subtext--${props.attributes.subTextColor}`}
                          tagName="p"
                          value={props.attributes.subText}
                        /> : ''}
                      </div>
                    </div>
                  </div>
                ) : ''}
      
                <div className={`columns is-multiline ${props.attributes.dividers ? "has-dividers" : ""}${props.attributes.centerColumns ? " is-centered" : ""}`}>
                  <InnerBlocks.Content />
                </div>
              </div>:""
        }
      </div>
    );
    return returned;
  },
} );



const updateColumns = (props, oldNum, newNum) => {
  const select = wp.data.select("core/block-editor");
  let innerBlocks = select.getBlock(props.clientId).innerBlocks;

  const adding = newNum > oldNum;
  const triedZero = newNum === 0

  if (oldNum === 1 && oldNum === newNum) {
    const firstBlock = createBlock("bulma-blocks/column");
    innerBlocks = [firstBlock];
    wp.data
      .dispatch("core/block-editor")
      .replaceInnerBlocks(props.clientId, innerBlocks, false);
  } else if (adding && !triedZero) {
    const newToAdd = newNum - oldNum

    for(let i = 0; i < newToAdd; i++) {
      const newColumn = createBlock('bulma-blocks/column')
      innerBlocks.push(newColumn)
    }

    wp.data
      .dispatch("core/block-editor")
      .replaceInnerBlocks(props.clientId, innerBlocks, false);
  } else if(!adding && !triedZero) {
    const removingNum = oldNum - newNum

    for(let i = 0; i < removingNum; i++) {
      innerBlocks.pop();
    }
    wp.data
      .dispatch("core/block-editor")
      .replaceInnerBlocks(props.clientId, innerBlocks, false);
  }
};