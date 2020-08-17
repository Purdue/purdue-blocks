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
const { RichText, InspectorControls, InnerBlocks } = wp.blockEditor;

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Add content'}],
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
registerBlockType( 'purdue-blocks/accrordion', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Accordion' ), // Block title.
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#8e6f3e',
    // Specifying a dashicon for the block
    src: 'excerpt-view',

  }, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
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
    title: { type: 'string', source: 'html',selector:'.accordion-title'},
    titleLevel:{type: 'string', default: 'p'},
    id:{type: 'string', default: ''}
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Create a single accordion.'
  ),

  edit: ( props ) => {
    const id=props.clientId;
    props.setAttributes({id:id});
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
              <SelectControl
                label="Heading level of the title"
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
        </PanelBody>
      </InspectorControls>,

      <div className='accordion-editor'>
          <RichText
            tagname={props.setAttributes.titleLevel }
            value={ props.attributes.title }
            className={ 'accordion-title' }
            onChange={ ( text ) => {
              props.setAttributes( { title: text } )
            } }
            placeholder="Add Title"
            keepPlaceholderOnFocus={ true }
            allowedFormats={ [] }
          >
          </RichText>
        <div className="accordion-content">
          <InnerBlocks
                template={ BLOCKS_TEMPLATE }
                allowedBlocks={ [ 'core/paragraph', 'core/list', 'core/table' ] }
              />
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
  save: ( props ) => {

    const returned = ( 
      <div className='accordion'>
        <RichText.Content
          id={`title-${props.attributes.id}`}
          className={'accordion-title' }
          tagName={ props.attributes.titleLevel }
          value={ props.attributes.title }
          aria-controls={`content-${props.attributes.id}`} 
          aria-expanded={'false'}
        />
        <div id={`content-${props.attributes.id}`} className={'accordion-content' }>
          <InnerBlocks.Content/>
        </div>
      </div>
    );
    return returned;
  },
} );
