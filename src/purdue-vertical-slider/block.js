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
  Disabled,
  Placeholder
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps } = wp.blockEditor;
const { useState,Fragment } = wp.element;
const { isEmpty } = _;

import { ReactSortable } from 'react-sortablejs';

import ManualForm from './form';
import ServerSideRender from '@wordpress/server-side-render';
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

registerBlockType( 'purdue-blocks/purdue-vertical-slider', {
	title: __( 'Purdue Vertical Slider' ),
	description: __( 'Create a vertical slider. Can only have one on each page.' ),
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
    const { className, setAttributes } = props;
    const { background, tabs, id } = props.attributes;
    const [addNew, setAddNew] = useState(false);

    const addManualTab = (newTab) => {
      setAddNew(false);
      setAttributes({
        tabs: [...tabs, ...[newTab]],
      });
    };
  
    const updateSavedTab= (index, tabData) => {
      // Clone the array first so we can mutate it.
      const newTabs = [...tabs];
      newTabs[index] = tabData;
  
      setAttributes({ tabs: newTabs });
    };
  
    const removeItem = (identifier) => {
      const newTabs = tabs.filter((item) => {
        return item.header!== identifier;
      });
      setAttributes({ tabs: newTabs });
    };
    return [
      <InspectorControls key="1">
        <PanelBody>
          <PanelRow>
            <SelectControl
              label="Choose a background"
              value={ props.attributes.background }
              options={ [
                { label: 'White', value: 'white' },
                { label: 'Black', value: 'black' },
                { label: 'Gray', value: 'gray' },
              ] }
              onChange={ ( background ) => {
                props.setAttributes( { background } )
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
          <PanelBody title={__('Slides')}>
					<PanelRow>
          <ReactSortable
							list={tabs}
							setList={(val) => {
								const cardTitles = [],
									valueTitles = [];
								tabs.map((item) => cardTitles.push(item.header));
								val.map((item) => valueTitles.push(item.header));
								if (_.isEqual(cardTitles, valueTitles)) {
									return;
								}

								setAttributes({
									tabs: val,
								});
							}}
							className="sortable-posts"
						>
							{tabs.map((item, i) => {
                
								return (
									<PanelBody initialOpen={false} key={item.header} title={item.header}>
										<ManualForm
											initialState={item}
											onSave={(val) => {
												updateSavedTab(i, val);
											}}
										/>
										<Button
											style={{ marginTop: '5px' }}
											isSecondary
											onClick={() => {
												removeItem(item.header);
											}}
										>
											Remove Item
										</Button>
									</PanelBody>
								);
							})}
						</ReactSortable>
					</PanelRow>
          {(addNew || tabs.length === 0) && (
						<Fragment>
							<ManualForm onSave={addManualTab} />
						</Fragment>
					)}
					<hr></hr>
					<PanelRow>
						<Button
							isPrimary
							onClick={() => {
								setAddNew(true);
							}}
						>
							Add New Slide
						</Button>
					</PanelRow>
        </PanelBody>
      </InspectorControls>,
      <div key="2" className={`purdue-block-slider-editor`}>
				{isEmpty(tabs) ? (
					<Placeholder>{__('Add slides using the sidebar.')}</Placeholder>
				) : (
					<Disabled>
						<ServerSideRender
							block="purdue-blocks/purdue-vertical-slider"
							attributes={{
								background,
								tabs,
                id,
								context: 'editor',
								className: className,
							}}
						/>
					</Disabled>
				)}
      </div>,
    ];
  },

} );