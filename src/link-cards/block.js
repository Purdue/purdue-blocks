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
import { newspaper,video,headphone } from '../img/svg';
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

registerBlockType( 'purdue-blocks/link-cards', {
	title: __( 'Purdue Link Cards' ),
	description: __( 'Create a grid of cards with links.' ),
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
    const { type, header, headerLocation, background, tabs, id, columns} = props.attributes;
    const [addNew, setAddNew] = useState(false);

    const addManualTab = (newTab) => {
      setAddNew(false);
      setAttributes({
        tabs: [...tabs, ...[newTab]],
      });
    };
  
    const updateSavedTab= (index, tabData) => {
      const newTabs = [...tabs];
      newTabs[index] = tabData;
  
      setAttributes({ tabs: newTabs });
    };
  
    const removeItem = (identifier) => {
      const newTabs = tabs.filter((item) => {
        return item.title!== identifier;
      });
      setAttributes({ tabs: newTabs });
    };
    return [
      <InspectorControls key="1">
        <PanelBody>
          <PanelRow>
            <SelectControl
              label="Card Type"
              value={ type }
              options={ [
                { label: 'Compact', value: 'compact' },
                { label: 'Regular', value: 'regular' },
                { label: 'Simple', value: 'simple' },
              ] }
              onChange={ ( type ) => {
                setAttributes( { type } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Choose a background"
              value={ background }
              options={ [
                { label: 'White', value: 'white' },
                { label: 'Black', value: 'black' },
                { label: 'Gray', value: 'gray' },
              ] }
              onChange={ ( background ) => {
                setAttributes( { background } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="Add a header"
              help="Add a header to this region."
              value={ header }
              onChange={ ( header ) => setAttributes( { header } ) }
            />
          </PanelRow>
          <PanelRow>
            <RadioControl
              label="Choose how to align the header."
              selected={ headerLocation }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
              ] }
              onChange={ ( headerLocation ) => {
                setAttributes( { headerLocation } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="HTML Anchor"
              help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
              value={id }
              onChange={ ( id ) => setAttributes( { id } ) }
            />
          </PanelRow>
          <PanelRow>
						<SelectControl
							label="Number of Columns"
							value={columns}
							options={[
                { value: '2', label: 'Two Columns' },
								{ value: '3', label: 'Three Columns' },
								{ value: '4', label: 'Four Columns' },
							]}
							onChange={(columns) => {
								setAttributes({ columns });
							}}
						/>
					</PanelRow>
         </PanelBody>
          <PanelBody title={__('Cards')}>
					<PanelRow>
          <ReactSortable
							list={tabs}
							setList={(val) => {
								const cardTitles = [],
									valueTitles = [];
								tabs.map((item) => cardTitles.push(item.title));
								val.map((item) => valueTitles.push(item.title));
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
									<PanelBody initialOpen={false} key={item.title} title={item.title}>
										<ManualForm
											initialState={item}
                      type={type}
											onSave={(val) => {
												updateSavedTab(i, val);
											}}
										/>
										<Button
											style={{ marginTop: '5px' }}
											isSecondary
											onClick={() => {
												removeItem(item.title);
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
							<ManualForm onSave={addManualTab} type={type}/>
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
							Add New Card
						</Button>
					</PanelRow>
        </PanelBody>
      </InspectorControls>,
      <div key="2" className={`purdue-block-slider-editor`}>
				{isEmpty(tabs) ? (
					<Placeholder>{__('Add cards using the sidebar.')}</Placeholder>
				) : (
					<Disabled>
            <div className={`purdue-link-cards has-${background}-background section is-medium${type==="regular"?" purdue-link-cards--regular":""}${type==="simple"?" purdue-link-cards--simple":""}`}>
              <div className="container">
                {header?
                <h2 className={`section-header align-${headerLocation}`}>{header}</h2>:""}
                <div className="columns is-multiline">
               {tabs.map((tab)=>{
                  return <div  className={`column is-half-tablet is-full-mobile${columns=="4"?" is-one-quarter-desktop":""}${columns=="3"?" is-one-third-desktop":""}`}>
                  <div  className="card media link-card">
                  <div className="image is-16by9 background-image" style={{backgroundImage:`url(${tab.media.url})`}}></div>
                  <div className="media-content">
                  {tab.mediaType?
                    <p className="media-type">
                      {tab.mediaType ==="article"? <span dangerouslySetInnerHTML={{ __html:newspaper }}></span>:""}
                      {tab.mediaType}</p>:""
                    }
                   {tab.date?
                    <p className="story-date">{tab.date}</p>:""
                    }
                    <p className="title is-4">{tab.title}</p>
                    {tab.subtext?
                    <p className="vertical-subtext">{tab.subtext}</p>:""
                    }
                    {tab.buttontext?
                    <div className="purdue-blocks__button purdue-blocks__button--gold-light">{tab.buttontext}</div>:""
                    }
                  </div>
                  </div>
                </div>
                })}
                </div>
              </div>
            </div>
					</Disabled>
				)}
      </div>,
    ];
  },

} );