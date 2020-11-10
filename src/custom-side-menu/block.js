
/**
 * BLOCK: Custom menu
 *
 */


const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  SelectControl,
  CheckboxControl
} = wp.components;
const { InspectorControls } = wp.blockEditor;
const { withSelect } = wp.data;
const { apiFetch } = wp;
// Array of social media share options.
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

var menus =[];

registerBlockType( 'purdue-blocks/custom-side-menu', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Custom Side Menu' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85 82.85"><defs></defs><g id="Arrow-right" class="color-dust-gold"><path class="cls-1" d="M47.85,9.91a4.54,4.54,0,0,1,6.42,0h0L91.16,46.77a4.53,4.53,0,0,1,0,6.41l0,0L54.28,90.09a4.54,4.54,0,0,1-6.42,0h0l-4.21-4.22a4.55,4.55,0,0,1,0-6.43l.07-.07L66.58,57.59H12.05A4.54,4.54,0,0,1,7.5,53.06V47A4.54,4.54,0,0,1,12,42.45H66.58L43.72,20.63a4.52,4.52,0,0,1-.19-6.39l.11-.11Z" transform="translate(-7.5 -8.58)"/></g></svg>
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
    menuItems: { type: 'array', default: [] },
    selectedMenu: { type: 'string', default: '' },
    toTop: { type: 'boolean', default: true },
  },

  // Block description in side panel
  description: __(
    'Select a menu to create a side navigation for this page. It requires the installation of "WP-REST-API V2 Menus" to work.'
  ),

  edit: withSelect( ( select )=> {
      const response=apiFetch( { 
        path: '/menus/v1/menus/',
        method: 'GET'
      }).then(res => {
        menus=res;
        return res;
      });
      return {
        menus,
        response,
      };
  } )( ( props )=>{
    const { menus,response } = props;
    if ( ! response ) {
      return ( <div className="custom-side-menu"><p className="error-message">Loading...</p></div> );
    }
    if ( response.length === 0 ) {
      return ( <div className="custom-side-menu"><p className="error-message">No menus found!</p></div> );
    }

    const options = [ { value:'',
      label: 'Select a menu',
    }];
    for ( let i = 0; i < menus.length; i++ ) {
      const option = { value: menus[ i ].term_id,
        label: menus[ i ].name,
      };
      options.push( option );
    }

    return[
      <InspectorControls>
      <PanelBody>
        <PanelRow>
          <SelectControl
            label={ __( 'Select a menu:' ) }
            value={ props.attributes.selectedMenu }
            options={ options }
            onChange={ ( selectedMenu ) => {
              props.setAttributes( { selectedMenu } );
              selectedMenu!==''?(async function(){
                var result = await getMenuItems(selectedMenu, menus)
                props.setAttributes( { menuItems: result.items } );
              })():'';
            } }
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Add a back to top button at the bottom?"
            checked={ props.attributes.toTop }
            onChange={ () =>
              props.setAttributes( { toTop: ! props.attributes.toTop } )
            }
          />
        </PanelRow>
      </PanelBody>
    </InspectorControls>,
      <div className="custom-side-menu-editor components-disabled">
        {props.attributes.selectedMenu===''?
        <div className="empty-message">
        Select a menu from the right panel
        </div>:(<div className="custom-side-menu">
          <ul className="custom-side-menu-top">
          { printMenu(props.attributes.menuItems)}
          </ul>
          {props.attributes.toTop?
          <button class="to-top-sidebar"><span class="editor">Back To Top</span></button>:<div class="to-top-sidebar"></div>}
        </div>)}
      </div>
    ];
  } ),

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
    return (
      <div className="custom-side-menu">
        <ul className="custom-side-menu-top">
          {props.attributes.selectedMenu!==''?printMenu(props.attributes.menuItems):''}
        </ul>
        {props.attributes.toTop?
          <button id="to-top-sidebar" class="to-top-sidebar"><span class="text">Back To Top</span></button>:<div class="to-top-sidebar"></div>}
      </div>
    )
  },

} );

function getMenuItems(selectedMenu, menus){
  const menu=menus.find(menu=>menu.term_id==selectedMenu);
  return apiFetch( { 
    path: '/menus/v1/menus/'+menu.slug,
    method: 'GET'
  }).then(res => {
    return res;    
  });
}
function printMenu(menuItems){
  return menuItems.map((menuItem)=>{
    if(menuItem.child_items&&menuItem.child_items.length>0){
      return (
        <li className="custom-side-menu-item">
          <a href={menuItem.url}>{menuItem.title}</a>
          <ul className="custom-side-menu-item-submenu">
          {
            menuItem.child_items.map((items)=>{
              return (
              <li className="custom-side-menu-item-subitem">
                <a href={items.url}>{items.title}</a>
              </li>
              );
            })
          }
          </ul>
        </li>
      );
    }else{
      return (
        <li className="custom-side-menu-item">
          <a href={menuItem.url}>{menuItem.title}</a>
        </li>
      );
    }
  })
}