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
  Disabled
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps, RichText } = wp.blockEditor;

import { arrowUp,arrowDown, alignCenter } from '@wordpress/icons';

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

registerBlockType( 'purdue-blocks/image-gallery', {
	title: __( 'Image Gallery' ),
	description: __( 'Create an image gallery.' ),
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
    </svg>  ),
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
	edit:( props )=>{

    return [
      <InspectorControls key="1">
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Choose how to align the header."
              selected={ props.attributes.headerLocation }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
              ] }
              onChange={ ( headerLocation ) => {
                props.setAttributes( { headerLocation } )
              } }
            />
          </PanelRow>
            <PanelRow>
            <RadioControl
              label="Choose how to align the content."
              selected={ props.attributes.contentAlign }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
              ] }
              onChange={ ( contentAlign ) => {
                props.setAttributes( { contentAlign } )
              } }
            />
          </PanelRow>
          <PanelRow>
						<SelectControl
							label="Number of Columns"
							value={props.attributes.columns}
							options={[
								{ value: '3', label: 'Three Columns' },
								{ value: '4', label: 'Four Columns' },
							]}
							onChange={(columns) => {
								props.setAttributes({ columns });
							}}
						/>
					</PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Remove space at the bottom?"
              checked={ !props.attributes.hasBottomPadding }
              onChange={ () => {
                props.setAttributes( { hasBottomPadding: !props.attributes.hasBottomPadding } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="HTML Anchor"
              help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
              value={ props.attributes.id }
              onChange={ ( id ) => props.setAttributes( { id } ) }
            />
          </PanelRow>
          </PanelBody>
      </InspectorControls>,
      <div key="2" className={`purdue-image-gallery purdue-image-gallery-editor section is-medium${props.attributes.hasBottomPadding?"":" no-bottom-padding"}`}>
            <div class="container">
              <RichText
                tagName="h2"
                value={props.attributes.header}
                className={`purdue-image-gallery__header align-${props.attributes.headerLocation}`}
                onChange={(header) => {
                  props.setAttributes({ header});
                }}
                placeholder="Add header (optional)"
                keepPlaceholderOnFocus={true}
              ></RichText>
              <RichText
                tagName="p"
                value={props.attributes.content}
                className={`purdue-image-gallery__content align-${props.attributes.contentAlign}`}
                onChange={(content) => {
                  props.setAttributes({ content });
                }}
                placeholder="Add Text (optional)"
                keepPlaceholderOnFocus={true}
              ></RichText>
                <MediaUploadCheck>
                  <MediaUpload
                    addToGallery={true}
                    multiple={true}
                    gallery={true}
                    onSelect={(imgs) => {
                      props.setAttributes( { imgs } )
                    }}
                    render={ ( { open } ) => {
                      return <div class="image-slider-editor">
                        <div class="buttons-container">
                              <button onClick={open}>
                                {
                                  props.attributes.imgs.length === 0
                                  ? "Select images"
                                  : "Select new images"
                                }
                              </button>
                        </div>
                        {props.attributes.imgs.length>0?
                        <div className='columns is-multiline'>
                          {props.attributes.imgs.map((img, index)=>{
                            return <div className={`column${props.attributes.columns === "4"?" is-one-quarter-desktop":" is-one-third-desktop"} is-half-tablet is-full-mobile`}>
                              <div className={ `image-gallery-open${img.caption?"":" image-no-caption"}` } data-toggle={img.id}>
                               <div className={ `image is-square` }
                                role="img"
                                style={ { backgroundImage: `url(${ img.url })` } }
                                aria-label={ img.alt }
                              ></div>
                              {img.caption?
                                <button className={`image-modal-button`}  aria-label="More information"><i class="fas fa-plus" aria-hidden='true'></i></button>
                                :""}
                              </div>
                              {img.caption?
                                <div className="image-modal-content" data-modal={img.id}>
                                  <div className="image-modal-close">
                                    <p>
                                  {img.caption}
                                  </p>
                                  </div>
                                <button className="image-modal-button" aria-label="close"><i class="fas fa-minus" aria-hidden="true"></i></button>
                                </div>:""
                              }
                              </div>
                            
                          })}
                        </div>:""}                      
                      </div>
                    } }
                  />
                </MediaUploadCheck>
            </div>
      </div>,
    ];
  },

} );
