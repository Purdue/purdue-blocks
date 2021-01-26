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
registerBlockType( 'purdue-blocks/content-page-layout', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Content Page Layout' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 87.5"><defs></defs><g id="Columns" class="cls-1"><g class="cls-1"><path class="color-d9ab28" d="M100,15.62V84.38a9.38,9.38,0,0,1-9.38,9.37H9.37A9.38,9.38,0,0,1,0,84.38V15.62A9.38,9.38,0,0,1,9.37,6.25H90.62A9.38,9.38,0,0,1,100,15.62ZM43.75,31.25H12.5v50H43.75Zm43.75,0H56.25v50H87.5Z" transform="translate(0 -6.25)"/></g></g></svg>
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
    withSidebar:{ type: "boolean", default: false },
    sidebarLocationDesktop: { type: 'string', default: 'right' },
    sidebarLocationMobile: { type: 'string', default: 'below' },
  },
  supports: {
    className: false,
  },
  // Block description in side panel
  description: __(
    'A content page layout with a main content area with/without a sidebar area.'
  ),

  edit: ( props ) => {
    const setChecked = () => {
      if (props.attributes.withSidebar) {
        props.setAttributes({
          withSidebar: false,
        });
      } else {
        props.setAttributes({
          withSidebar: true,
        });
      }
    };
    return [
      <InspectorControls>
      <PanelBody>
        <PanelRow>
            <CheckboxControl
              label="Add A Sidebar?"
              help="Would you like to add sidebar to this page?"
              checked={props.attributes.withSidebar}
              onChange={setChecked}
            />
        </PanelRow>
        {props.attributes.withSidebar?(
        <PanelRow>
          <RadioControl
            label="Sidebar Location On Desktop"
            help="Choose to place sidebar on the left/right side of the main content."
            selected={ props.attributes.sidebarLocationDesktop }
            options={ [
              { label: 'Left', value: 'left' },
              { label: 'Right', value: 'right' },
            ] }
            onChange={ ( option ) => {
              props.setAttributes( { sidebarLocationDesktop: option } )
            } }
          />
        </PanelRow>
        ):''}
        {props.attributes.withSidebar?(
        <PanelRow>
          <RadioControl
              label="Sidebar Location On Mobile"
              help="Choose to place sidebar above/below the main content."
              selected={ props.attributes.sidebarLocationMobile }
              options={ [
                { label: 'Above main content', value: 'above' },
                { label: 'Below main content', value: 'below' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { sidebarLocationMobile: option } )
              } }
            />
        </PanelRow>
        ):''}
      </PanelBody>
    </InspectorControls>,
    <div className={`section${props.attributes.withSidebar?' page-layout-with-sidebar':''}`}>
      <div className={`container${props.attributes.sidebarLocationDesktop==='left'?' desktop-reverse':''}${props.attributes.sidebarLocationMobile==='above'?' mobile-reverse':''}`}>
        <InnerBlocks
        template={[
          [ 'core/columns', {'className': 'page-layout-columns columns is-multiline'}, [
            [ 'core/column', {'className': 'column is-two-thirds-desktop is-full-tablet is-full-mobile page-layout-main'},[['core/paragraph', {'placeholder': 'Main content area. Start typing to add content, or remove this default paragraph block and then add new blocks.'}]] ],
            [ 'core/column', {'className': 'column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar'},[['core/paragraph', {'placeholder': 'Sidebar content area. Start typing to add content, or remove this default paragraph block and then add new blocks.'}]]],
        ]
        ]]} />
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
      <div className={`section${props.attributes.withSidebar?' page-layout-with-sidebar':''}`}>
        <div className={`container${props.attributes.sidebarLocationDesktop==='left'?' desktop-reverse':''}${props.attributes.sidebarLocationMobile==='above'?' mobile-reverse':''}`}>
            <InnerBlocks.Content />
        </div>
      </div>
    );
    return returned;
  },
} );

