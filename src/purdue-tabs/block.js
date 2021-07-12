/* eslint-disable react/jsx-key */

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
  RangeControl,
  CheckboxControl,
  SelectControl,
  Button,
} = wp.components;
const { RichText,InnerBlocks, InspectorControls } = wp.blockEditor;
import { createBlock } from "@wordpress/blocks";

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
registerBlockType("purdue-blocks/tabs", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Tabs"), // Block title.
  icon: (
    <svg id="ef9c2100-31be-4639-82c5-0ef6f30faf8a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 71.42857"><g id="e07d924f-208c-4ad5-884f-434897ed4326" data-name="Grip-horizontal" class="cls-1"><g class="cls-1"><path class="cls-2" d="M28.57143,15.17857V29.46429a7.14374,7.14374,0,0,1-7.14286,7.14285H7.14286A7.14374,7.14374,0,0,1,0,29.46429V15.17857A7.14375,7.14375,0,0,1,7.14286,8.03571H21.42857A7.14375,7.14375,0,0,1,28.57143,15.17857Zm0,42.85714V72.32143a7.14375,7.14375,0,0,1-7.14286,7.14286H7.14286A7.14375,7.14375,0,0,1,0,72.32143V58.03571a7.14374,7.14374,0,0,1,7.14286-7.14285H21.42857A7.14374,7.14374,0,0,1,28.57143,58.03571ZM64.28571,15.17857V29.46429a7.14374,7.14374,0,0,1-7.14285,7.14285H42.85714a7.14374,7.14374,0,0,1-7.14285-7.14285V15.17857a7.14375,7.14375,0,0,1,7.14285-7.14286H57.14286A7.14375,7.14375,0,0,1,64.28571,15.17857Zm0,42.85714V72.32143a7.14375,7.14375,0,0,1-7.14285,7.14286H42.85714a7.14375,7.14375,0,0,1-7.14285-7.14286V58.03571a7.14374,7.14374,0,0,1,7.14285-7.14285H57.14286A7.14374,7.14374,0,0,1,64.28571,58.03571ZM100,15.17857V29.46429a7.14374,7.14374,0,0,1-7.14286,7.14285H78.57143a7.14374,7.14374,0,0,1-7.14286-7.14285V15.17857a7.14375,7.14375,0,0,1,7.14286-7.14286H92.85714A7.14375,7.14375,0,0,1,100,15.17857Zm0,42.85714V72.32143a7.14375,7.14375,0,0,1-7.14286,7.14286H78.57143a7.14375,7.14375,0,0,1-7.14286-7.14286V58.03571a7.14374,7.14374,0,0,1,7.14286-7.14285H92.85714A7.14374,7.14374,0,0,1,100,58.03571Z" transform="translate(0 -8.03571)"/></g></g></svg>
  ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
    numTabs: { type: "number", default: 0 },
    headers: { type: "array", default: [] },
    headerSize: { type: 'string', default: 'large' },
    headerSize: { type: 'string', default: 'large' },
    addPadding: { type: 'boolean', default: true}
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    "Add tabs."
  ),

  edit: (props) => {
    if (props.attributes.numTabs === 0) {
      props.setAttributes({ numTabs:1 });
      updateTabs(props, 1, 1);
    }
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RangeControl
              className={"bulma-columns-range-control"}
              label="Number of Tabs"
              value={props.attributes.numTabs || 1}
              min={1}
              max={6}
              onChange={(numTabs) => {
                updateTabs(props, props.attributes.numTabs, numTabs);
                props.setAttributes({ numTabs });
              }}
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Font size of the tabs' header"
              value={ props.attributes.headerSize }
              options={ [
                { label: 'Large', value: 'large' },
                { label: 'Medium', value: 'medium' },
                { label: 'Small', value: 'small' },
              ] }
              onChange={ ( headerSize ) => {
                props.setAttributes( { headerSize } )
              } }
            />
          </PanelRow>
          <PanelRow>
              <CheckboxControl
                label="Add paddings to the panels?"
                checked={ props.attributes.addPadding }
                onChange={ () =>
                  props.setAttributes( { addPadding: ! props.attributes.addPadding } )
                }
              />
            </PanelRow>  
        </PanelBody>
      </InspectorControls>,

      <div
        className={`pu-blocks-editor-tabs pu-blocks-tabs${props.attributes.addPadding?" has-padding":""}`}
      >
        <div className={`pu-blocks-tabs__headers`}>
        {props.attributes.headers.map((header, index) => {
           return  <Button 
           onClick={(e) => {
            const select = wp.data.select("core/block-editor");
            let innerBlocks = select.getBlock(props.clientId).innerBlocks;
            innerBlocks.forEach((block)=>{
              block.attributes.aria===header.id?wp.data
              .dispatch('core/block-editor').updateBlockAttributes(block.clientId, {editorSelected: true}):
              wp.data
              .dispatch('core/block-editor').updateBlockAttributes(block.clientId, {editorSelected: false})
            })
            let headers = [ ...props.attributes.headers ];
            headers.forEach((h)=>{
              header.id===h.id?h.active=true:h.active=false
            })
            props.setAttributes( { headers } );
            }}
            role="tab"
           ><RichText
            tagname={"p"}
            value={header.text}
            className={`pu-blocks-tabs__header
                        ${props.attributes.headerSize==="medium"?" pu-blocks-tabs__header-medium":""}
                        ${props.attributes.headerSize==="small"?" pu-blocks-tabs__header-small":""}${header.active?" active":""}
                        `} 
            onChange={(text) => {
              let headers = [ ...props.attributes.headers ];
              headers[ index ].text = text;
              props.setAttributes( { headers } );
            }}
            placeholder="Add tab header text"
          ></RichText>
          </Button>
          })
        }
        </div>
        <InnerBlocks 
        templateLock="all" 
        />
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
    return (
      <div
        className={`pu-blocks-tabs${props.attributes.addPadding?" has-padding":""}`}
      >
        <div className={`pu-blocks-tabs__headers`}>
          {props.attributes.headers.map((header, index)=>{
            return  <RichText.Content
            id={  `header-${header.id}` }
            className={`pu-blocks-tabs__header
                        ${props.attributes.headerSize==="medium"?" pu-blocks-tabs__header-medium":""}
                        ${props.attributes.headerSize==="small"?" pu-blocks-tabs__header-small":""}
                        ${index===0?" active":""}
                      `}
            tagName={ Button }
            role="tab"
            value={ header.text }
            aria-control={  `panel-${header.id}` }
            aria-selected={ `${index===0?"true":"false"}` }
          />
          })}
        </div> 
        <InnerBlocks.Content />
      </div>
    );
  },
});

const updateTabs = (props, oldNum, newNum) => {
  const select = wp.data.select("core/block-editor");
  let innerBlocks = select.getBlock(props.clientId).innerBlocks;

  const adding = newNum > oldNum;
  const triedZero = newNum === 0
  let headers=[...props.attributes.headers]

  if (oldNum === 1 && oldNum === newNum) {
    const firstBlock = createBlock("purdue-blocks/tab");
    const id=props.clientId+"-0"
    const firstHeader = {id:id, text:"", active: true}
    innerBlocks = [firstBlock];
    headers.push(firstHeader)
    props.setAttributes({headers})

    wp.data
      .dispatch("core/block-editor")
      .replaceInnerBlocks(props.clientId, innerBlocks, false);
    wp.data
      .dispatch('core/block-editor')
      .updateBlockAttributes(select.getBlock(props.clientId).innerBlocks[0].clientId, {editorSelected:true,selected: true})      

  } else if (adding && !triedZero) {
    const newToAdd = newNum - oldNum

    for(let i = 0; i < newToAdd; i++) {
      const newColumn = createBlock('purdue-blocks/tab')
      let id=headers[headers.length-1].id
      let newN=parseInt(id.substring(id.lastIndexOf("-")+1))+1
      let newId=id.substring(0,id.lastIndexOf("-")+1)+newN
      const header = {id:newId, text:"", active: false}
      innerBlocks.push(newColumn)
      headers.push(header)
    }
    props.setAttributes({headers})
    wp.data
      .dispatch("core/block-editor")
      .replaceInnerBlocks(props.clientId, innerBlocks, false);

  } else if(!adding && !triedZero) {
    const removingNum = oldNum - newNum

    for(let i = 0; i < removingNum; i++) {
      innerBlocks.pop();
      headers.pop();
    }
    props.setAttributes({headers})
    wp.data
      .dispatch("core/block-editor")
      .replaceInnerBlocks(props.clientId, innerBlocks, false);

  }
  for(let i=0; i<innerBlocks.length; i++){
    wp.data
    .dispatch('core/block-editor').updateBlockAttributes(select.getBlock(props.clientId).innerBlocks[i].clientId, {aria: headers[i].id})
    
  }

};
