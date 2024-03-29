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
  CheckboxControl,
  TextareaControl,
  TextControl,
  RadioControl,
  SelectControl,
  Button,
} = wp.components;
const { RichText, InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;

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
registerBlockType( 'purdue-blocks/anchor-link-navigation', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Right Column - Anchor Link Navigation' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs></defs><rect width="100" height="100" rx="8.55"/><g id="Arrow-right" class="cls-1"><g class="cls-1"><path class="color-fff" d="M47.85,9.91a4.54,4.54,0,0,1,6.43,0L91.16,46.77a4.53,4.53,0,0,1,0,6.44L54.28,90.09a4.54,4.54,0,0,1-6.43,0l-4.21-4.22a4.55,4.55,0,0,1,.08-6.5L66.58,57.59H12.05A4.54,4.54,0,0,1,7.5,53V47a4.54,4.54,0,0,1,4.55-4.55H66.58L43.72,20.63a4.52,4.52,0,0,1-.08-6.5Z"/></g></g></svg>
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
    accordion: { type: 'boolean', default: false },
    includeH2: { type: 'boolean', default: true },
    includeH3: { type: 'boolean', default: false },
    includeH4: { type: 'boolean', default: false },
    includeH5: { type: 'boolean', default: false },
    includeH6: { type: 'boolean', default: false },
    range: { type: 'string', default: "page" },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    'Create a single level menu from the headers that have an HTML anchor.'
  ),

  edit: ( props ) => {
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
          <CheckboxControl
            label="Include Headings on accordion block?"
            checked={ props.attributes.accordion }
            onChange={ () =>
              props.setAttributes( { accordion: ! props.attributes.accordion } )
            }
          />
          </PanelRow>
          <PanelRow>
          <CheckboxControl
            label="Pull H2 heading level only?"
            checked={ props.attributes.includeH2 }
            onChange={ () =>
              props.setAttributes( { includeH2: ! props.attributes.includeH2 } )
            }
          />
          </PanelRow>
          <PanelRow>
          <CheckboxControl
            label="Pull H3 heading level only?"
            checked={ props.attributes.includeH3 }
            onChange={ () =>
              props.setAttributes( { includeH3: ! props.attributes.includeH3 } )
            }
          />
          </PanelRow>
          <PanelRow>
          <CheckboxControl
            label="Pull H4 heading level only?"
            checked={ props.attributes.includeH4 }
            onChange={ () =>
              props.setAttributes( { includeH4: ! props.attributes.includeH4 } )
            }
          />
          </PanelRow>
          <PanelRow>
          <CheckboxControl
            label="Pull H5 heading level only?"
            checked={ props.attributes.includeH5 }
            onChange={ () =>
              props.setAttributes( { includeH5: ! props.attributes.includeH5 } )
            }
          />
          </PanelRow>
          <PanelRow>
          <CheckboxControl
            label="Pull H6 heading level only?"
            checked={ props.attributes.includeH6 }
            onChange={ () =>
              props.setAttributes( { includeH6: ! props.attributes.includeH6 } )
            }
          />
        </PanelRow>
        <PanelRow>
          <RadioControl
            label="Where to pull the headings?"
            help="The block needs to be placed in a columns block or content page layout block in order to use 'This Section' option."
            selected={ props.attributes.range }
            options={ [
              { label: 'This Section', value: 'section' },
              { label: 'Whole Page', value: 'page' },
            ] }
            onChange={ ( option ) => {
              props.setAttributes( { range: option } )
            } }
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>,    
      <div className="anchor-link-block-editor">
            Preview/Publish the page to see the anchor link navigation menu.
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
  save: ( props ) => {
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className="anchor-link-block">
        <div class={`anchor-link-block-links
        ${props.attributes.accordion?" has-accordion":""}
        ${props.attributes.includeH2?"":" no-H2"}
        ${props.attributes.includeH3?" has-H3":""}
        ${props.attributes.includeH4?" has-H4":""}
        ${props.attributes.includeH5?" has-H5":""}
        ${props.attributes.includeH6?" has-H6":""}
        ${props.attributes.range==="page"?"":" pull-from-section"}
        `}></div>
        <button id="to-top-sidebar" class="to-top-sidebar"><span>Back To Top</span></button>
      </div>
    );
    return returned;
  },
} );
