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

const { InnerBlocks } = wp.blockEditor;

const BLOCKS_TEMPLATE = [
  [ 'core/list', { } ],
];
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
registerBlockType("purdue-blocks/list", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Right Column - List"), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 97.47"><defs></defs><g id="Arrow-right" class="cls-1"><g class="cls-1"><path class="color-d9ab28" d="M47.47,2.84a5.34,5.34,0,0,1,7.57,0L98.43,46.21a5.34,5.34,0,0,1,0,7.56L55,97.16a5.34,5.34,0,0,1-7.57,0l-4.95-5a5.35,5.35,0,0,1,.09-7.65L69.5,58.93H5.36A5.35,5.35,0,0,1,0,53.57V46.43a5.35,5.35,0,0,1,5.36-5.36H69.5L42.61,15.45a5.31,5.31,0,0,1-.09-7.65Z" transform="translate(0 -1.27)"/></g></g></svg>
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
    header: { type: "string", default: "" },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    "This block adds a styled list with a header."
  ),

  edit: (props) => {

    return [
      <div className={"purdue-blocks-editor-list"}>
        <div className="content">
          <span>Add List Header</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.header !== ""
                    ? props.attributes.header
                    : ""
                }
                className="input"
                type="text"
                placeholder="Content Header..."
                onChange={(e) => {
                  props.setAttributes({ header: e.target.value });
                }}
              ></input>
            </div>
          </div>
          <span>Add List Body</span>
          <div className="field">
            <div className="control">
              <InnerBlocks
                template={ BLOCKS_TEMPLATE }
                templateLock="all" 
              />
            </div>
          </div>
          </div>
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
      <div  className="pu-list">
            {!props.attributes.header ?'':(
          <h2>
            {props.attributes.header}
          </h2>)}
          <InnerBlocks.Content/>
      </div>
    );
    return returned;
  },
});