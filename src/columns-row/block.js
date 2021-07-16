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
  CheckboxControl
} = wp.components;
const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
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
    titleAlign: { type: 'string', default: 'left' },
    subTextAlign: { type: 'string', default: 'left' },
    numColumns: { type: "number", default: 1 },
    dividers: { type: "boolean", default: false },
    addBackground: { type: "boolean", default: false },
    backgroundImageUrl: { type: 'string', default: '' },
    backgroundOverlay: { type: 'string', default: '' },
  },
  supports: {
    className: false,
  },
  // Block description in side panel
  description: __(
    'A content page layout with a main content area with/without a sidebar area.'
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

    return [
      <InspectorControls>
          <PanelBody>
            <PanelRow>
              <RadioControl
                label="Padding Size"
                help="Select the amount of spacing at the top and bottom of the section."
                selected={ props.attributes.sectionPadding }
                options={ [
                  { label: 'Small', value: 'small' },
                  { label: 'Medium', value: 'is-medium' },
                  { label: 'Large', value: 'is-large' },
                ] }
                onChange={ ( option ) => {
                  props.setAttributes( { sectionPadding: option } )
                } }
              />
            </PanelRow>
            <PanelRow>
              <CheckboxControl
                label="Add Background Image"
                checked={props.attributes.addBackground}
                onChange={(addBackground) => props.setAttributes({addBackground})}
              />
            </PanelRow>
            {
              !props.attributes.addBackground ? <PanelRow>
              <SelectControl
                label="Background Color"
                value={ props.attributes.bgColor }
                options={
                  [
                    { value: '', label: 'None' },
                    { value: 'has-background-black', label: 'Black' },
                    { value: 'has-background-light-gray', label: 'Light Digital Gray' },
                    { value: 'has-background-grey-lighter', label: 'Medium Digital Gray' },
                    { value: 'has-background-black-ter', label: 'Steel Gray' },
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
          <PanelBody>
            <PanelRow>
            <SelectControl
                label="Number of Columns"
                value={ props.attributes.columnsNumber }
                options={
                  [
                    { value: 1, label: 'One Column' },
                    { value: 2, label: 'Two Columns' },
                    { value: 3, label: 'Three Columns' },
                    { value: 4, label: 'Four Columns' },
                  ]
                }
                onChange={ ( numColumns ) => {
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
          </PanelBody>
          <PanelBody>
            <PanelRow>
              <SelectControl
                label="Heading level of the title"
                value={props.attributes.titleLevel}
                options={[
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
          </PanelBody>
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
          </PanelBody>
        </InspectorControls>,

        <div className={`bulma-blocks-editor-columns`}>
          <div className="title">
            <RichText
              tagname={props.setAttributes.titleLevel}
              value={props.attributes.title}
              className={`title title--${props.attributes.headerColor}`}
              onChange={(text) => {
                props.setAttributes({ title: text });
              }}
              placeholder="Add Heading"
              keepPlaceholderOnFocus={true}
              allowedFormats={[]}
            ></RichText>
          </div>
          <div className="content">
            <RichText
              tagname="p"
              value={props.attributes.subText}
              className={"content"}
              onChange={(text) => {
                props.setAttributes({ subText: text });
              }}
              placeholder="Add Sub-Text"
              allowedFormats={[]}
            ></RichText>
          </div>
          <InnerBlocks templateLock="all" />
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
    const returned = (
      <div className={`pu-columns-row section${props.attributes.bgColor ? ` ${props.attributes.bgColor}`:''}${props.attributes.sectionPadding !== 'small' ? ` ${props.attributes.sectionPadding}` : ''}`}>
        <div className={'container'}>

          {(props.attributes.title !== '' && props.attributes.title) && (props.attributes.subText !== '' &&  props.attributes.subText) ? (
            <div className={'content'}>
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
                    className={`align--${props.attributes.subTextAlign}`}
                    tagName="p"
                    value={props.attributes.subText}
                  /> : ''}
                </div>
              </div>
            </div>
          ) : ''}

          <div className={`columns is-multiline ${props.attributes.dividers ? "has-dividers" : ""}`}>
            <InnerBlocks.Content />
          </div>
        </div>
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