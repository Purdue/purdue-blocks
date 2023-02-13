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
  [ 'core/paragraph', { placeholder: 'Add content' } ],
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
registerBlockType( 'purdue-blocks/accordion', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Accordion' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.01 100"><defs></defs><g id="Arrows-alt-v" class="cls-1"><g class="cls-1"><path class="cls-2" d="M70.12,81.82,53.31,98.63a4.68,4.68,0,0,1-6.62,0L29.88,81.82a4.68,4.68,0,0,1,3.31-8h9V26.18h-9a4.68,4.68,0,0,1-3.31-8L46.69,1.37a4.68,4.68,0,0,1,6.62,0L70.12,18.18a4.68,4.68,0,0,1-3.31,8h-9V73.82h9A4.68,4.68,0,0,1,70.12,81.82Z" transform="translate(-28.49)"/></g></g></svg>
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
    title: { type: 'string', source: 'html', selector: '.accordion-title' },
    titleLevel: { type: 'string', default: 'p' },
    id: { type: 'string', default: '' },
    inputId: { type: 'string', default: '' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Create a single accordion.'
  ),

  edit: ( props ) => {
    const id = props.clientId;
    props.setAttributes( { id: id } );
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
          <PanelRow>
              <TextControl
                label="HTML Anchor"
                help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
                value={ props.attributes.inputId }
                onChange={ ( inputId ) => props.setAttributes( { inputId } ) }
              />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className="accordion-editor">
        <RichText
          tagName={ props.setAttributes.titleLevel }
          value={ props.attributes.title }
          className={ 'accordion-title' }
          onChange={ ( text ) => {
            props.setAttributes( { title: text } )
          } }
          placeholder="Add Title"
          keepPlaceholderOnFocus={ true }
        >
        </RichText>
        <div className="accordion-content">
          <InnerBlocks
            template={ BLOCKS_TEMPLATE }
            templateLock={ false }
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
    const returned = (props.attributes.inputId?
      <div className="accordion" id={ props.attributes.inputId }>
        <RichText.Content
          id={ `title-${ props.attributes.id }` }
          className={ 'accordion-title' }
          tagName={ props.attributes.titleLevel }
          value={ props.attributes.title }
          aria-controls={ `content-${ props.attributes.id }` }
          aria-expanded={ 'false' }
          role={'button'}
        />
        <div id={ `content-${ props.attributes.id }` } className={ 'accordion-content' }>
          <InnerBlocks.Content />
        </div>
      </div>:      
      <div className="accordion">
        <RichText.Content
          id={ `title-${ props.attributes.id }` }
          className={ 'accordion-title' }
          tagName={ props.attributes.titleLevel }
          value={ props.attributes.title }
          aria-controls={ `content-${ props.attributes.id }` }
          aria-expanded={ 'false' }
          role={'button'}
        />
        <div id={ `content-${ props.attributes.id }` } className={ 'accordion-content' }>
          <InnerBlocks.Content />
        </div>
      </div>
    );
    return returned;
  },
} );
