/* eslint-disable react/jsx-key */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
// import './editor.scss';
// import './style.scss';
import { createBlock } from '@wordpress/blocks';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  RangeControl,
  CheckboxControl,
  TextControl,
} = wp.components;
const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;

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
registerBlockType( 'purdue-blocks/title-nav', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Titled Navigation' ), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="ellipsis-h"
      className="svg-inline--fa fa-ellipsis-h fa-w-12"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#8E6F3E"
        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
      ></path>
    </svg>
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
    hasOutline: { type: 'boolean', default: false },
    addButton: { type: 'boolean', default: false },
    numLinks: { type: 'number', default: 1 },
    titleText: { source: 'html', selector: 'h2' },
    buttonText: { type: 'string', default: '' },
    buttonLink: { type: 'string', default: '' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add this block and select navigation items to build a menu that will show above the title of the page.'
  ),

  edit: ( props ) => {
    if ( props.attributes.numLinks === 1) {
      updateInner( props, 1, 1 );
    }
    return [
      <InspectorControls>
        <PanelBody>

          <PanelRow>
            <RangeControl
              className={ 'bulma-columns-range-control' }
              label="Number of Navigation Items"
              value={ props.attributes.numLinks}
              min={ 1 }
              max={ 15 }
              onChange={ ( numLinks ) => {
                console.log(numLinks)
                updateInner( props, props.attributes.numLinks, numLinks );
                props.setAttributes( { numLinks } );
              } }
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Give Menu Items an Outline?"
              checked={ props.attributes.hasOutline }
              onChange={ ( checked ) =>
                props.setAttributes( { hasOutline: checked } )
              }
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Add a CTA Button?"
              checked={ props.attributes.addButton }
              onChange={ ( checked ) =>
                props.setAttributes( { addButton: checked } )
              }
            />
          </PanelRow>
          { props.attributes.addButton ? (
            <PanelBody title={'Button Controls'}>
              <PanelRow>
                <TextControl
                  label="Button Text"
                  value={ props.attributes.buttonText }
                  onChange={ ( buttonText ) => props.setAttributes( { buttonText } ) }
                />
              </PanelRow>
              <PanelRow>
                <TextControl
                  label="Button Link"
                  value={ props.attributes.buttonLink }
                  onChange={ ( buttonLink ) => props.setAttributes( { buttonLink } ) }
                />
              </PanelRow>
            </PanelBody>
          ) : '' }
        </PanelBody>
      </InspectorControls>,

      <div className={ `editor-title-nav  ${ props.attributes.hasOutline ? 'outline-on' : '' }` }>
        <RichText
          tagName="h2"
          value={ props.attributes.titleText }
          className={ 'editor-title-nav__title' }
          onChange={ ( text ) => {
            props.setAttributes( { titleText: text } )
          } }
          placeholder="Nav Title (Optional)"
          keepPlaceholderOnFocus={ true }
        />
        <InnerBlocks templateLock="all" />
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
    return ! props.attributes.addButton ? (
      <section className={ `section pu-title-nav ${ props.attributes.hasOutline ? 'has-outline' : '' }` } >
        <RichText.Content className="pu-title-nav__title" tagName="h2" value={ props.attributes.titleText } />
        <ul className="pu-title-nav__menu">
          <InnerBlocks.Content />
        </ul>
      </section>
    ) : (
      <section className={ `section pu-title-nav ${ props.attributes.hasOutline ? 'has-outline' : '' }` } >
        <div className="columns">
          <div className="column is-8 pu-title-nav__left">
            <RichText.Content className="pu-title-nav__title" tagName="h2" value={ props.attributes.titleText } />
            <ul className="pu-title-nav__menu">
              <InnerBlocks.Content />
            </ul>
          </div>
          <div className="column is-3 is-offset-1 pu-title-nav__right">
            <a className="pu-title-nav__cta" href={ props.attributes.buttonLink }> { props.attributes.buttonText } </a>
          </div>
        </div>
      </section>
    )
  },
} );

const updateInner = ( props, oldNum, newNum ) => {
  const select = wp.data.select( 'core/block-editor' );
  let innerBlocks = select.getBlock( props.clientId ).innerBlocks;

  console.log(`newnum: ${newNum}, oldnum: ${oldNum}`)

  const adding = newNum > oldNum;
  const triedZero = newNum === 0

  if ( oldNum === 1 && oldNum === newNum ) {
    const firstBlock = createBlock( 'purdue-blocks/title-nav-link' );
    innerBlocks = [ firstBlock ];
    wp.data
      .dispatch( 'core/block-editor' )
      .replaceInnerBlocks( props.clientId, innerBlocks, false );
  } else if ( adding && !triedZero ) {
    const newToAdd = newNum - oldNum

    for(let i = 0; i < newToAdd; i++) {
      const newLinkToAdd = createBlock( 'purdue-blocks/title-nav-link' );
      innerBlocks.push( newLinkToAdd );
    }
    wp.data
      .dispatch( 'core/block-editor' )
      .replaceInnerBlocks( props.clientId, innerBlocks, false );
  } else if (!adding && !triedZero) {
    const removingNum = oldNum - newNum

    for(let i = 0; i < removingNum; i++) {
      innerBlocks.pop();
    }
    wp.data
      .dispatch( 'core/block-editor' )
      .replaceInnerBlocks( props.clientId, innerBlocks, false );
  }
};
