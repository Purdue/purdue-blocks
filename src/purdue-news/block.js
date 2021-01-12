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
  ToolbarGroup,
  Disabled
} = wp.components;
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks,BlockControls,useBlockProps } = wp.blockEditor;
const { apiFetch } = wp;
const { useState } = wp.element;

import { pencil} from '@wordpress/icons';
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

registerBlockType( 'purdue-blocks/purdue-news', {
	title: __( 'Purdue News' ),
	description: __( 'Display entries from RSS feed.' ),
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 66.67"><defs></defs><g id="newspaper" class="cls-1"><g class="cls-1"><path class="cls-2" d="M100,21.83V80.16a4.17,4.17,0,0,1-4.17,4.17H9.72A9.73,9.73,0,0,1,0,74.6V27.38a4.17,4.17,0,0,1,4.17-4.17h7.42a8.34,8.34,0,0,1,7.85-5.55H95.83A4.17,4.17,0,0,1,100,21.83ZM9.72,76a1.39,1.39,0,0,0,1.39-1.39v-43H8.33V74.6A1.39,1.39,0,0,0,9.72,76Zm82-50H19.44V74.6a9.1,9.1,0,0,1-.1,1.39H91.67ZM27.78,53.08V36.41a2.08,2.08,0,0,1,2.08-2.08H53.47a2.08,2.08,0,0,1,2.08,2.08V53.08a2.08,2.08,0,0,1-2.08,2.08H29.86A2.08,2.08,0,0,1,27.78,53.08Zm0,8.33a2.08,2.08,0,0,1,2.08-2.08H53.47a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H29.86a2.08,2.08,0,0,1-2.08-2.08Zm6.94-13.2H48.61V41.27H34.72Zm26.39-11.8a2.08,2.08,0,0,1,2.08-2.08H81.25a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H63.19a2.08,2.08,0,0,1-2.08-2.08Zm0,12.5a2.08,2.08,0,0,1,2.08-2.08H81.25a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H63.19a2.08,2.08,0,0,1-2.08-2.08Zm0,12.5a2.08,2.08,0,0,1,2.08-2.08H81.25a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H63.19a2.08,2.08,0,0,1-2.08-2.08Z" transform="translate(0 -17.66)"/></g></g></svg>
  ),
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
    const onSubmitURL = (e) => {
      e.preventDefault();
      if ( props.attributes.feedURL ) {
        setIsEditing( false );
      }
    }
    const [ isEditing, setIsEditing ] = useState( ! props.attributes.feedURL );

    const toolbarControls = [
      {
        icon: pencil,
        title: __( 'Edit RSS URL' ),
        onClick: () => setIsEditing( true ),
      },
    ];

    return [
      <BlockControls>
        <ToolbarGroup controls={ toolbarControls } />
      </BlockControls>,
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Layout of the RSS feed"
              selected={ props.attributes.type }
              options={ [
                { label: 'Recent news with image', value: 'withImage' },
                { label: 'Recent news without image', value: 'withoutImage' },
                { label: 'All News/Events', value: 'all' },
              ] }
              onChange={ ( type ) => {
                props.setAttributes( { type } )
              } }
            />
          </PanelRow>
          <PanelRow>
              <TextControl
                label="Add a header to this region?"
                value={ props.attributes.header }
                onChange={ ( header ) => props.setAttributes( { header } ) }
              />
          </PanelRow>
          {props.attributes.header?
          <PanelRow>
            <SelectControl
              label="Heading level of the Header"
              value={ props.attributes.headerLevel }
              options={ [
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
                { label: 'H4', value: 'h4' },
                { label: 'H5', value: 'h5' },
                { label: 'H6', value: 'h6' },
                { label: 'P', value: 'p' },
              ] }
              onChange={ ( headerLevel ) => {
                props.setAttributes( { headerLevel } )
              } }
            />
          </PanelRow>:''}
          {props.attributes.type==="withoutImage"?
           <PanelRow>
              <p>Choose a hero Image</p>
           </PanelRow>:''}
          {props.attributes.type==="withoutImage"?
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={ ( img ) => {
                  props.setAttributes( {
                    imgUrl: img.url,
                    altText:
                        props.attributes.altText !== '' ?
                          props.attributes.altText :
                          img.alt,
                  } );
                } }
                render={ ( { open } ) => {
                  return props.attributes.imgUrl !== '' ? (
                    <div className={ 'purdue-blocks-editor-news__preview' }>
                      <figure className={ 'image' }>
                        <img
                          alt={ props.attributes.altText }
                          src={ props.attributes.imgUrl }
                        />
                      </figure>
                      <Button
                        className={ 'purdue-blocks-editor-feature-story__button' }
                        onClick={ open }
                      >
                        Select a New Image
                      </Button>
                    </div>
                  ) : (
                    <div className={ 'purdue-blocks-editor-news__container' }>
                      <p className={ 'purdue-blocks-editor-news__description' }>
                        Pick an image from the media library. The recommended aspect ratio is 3:2.
                      </p>
                      <Button
                        className={ 'purdue-blocks-editor-feature-story__button' }
                        onClick={ open }
                      >
                        Open Media Library
                      </Button>
                    </div>
                  );
                } }
              />
            </MediaUploadCheck>
          </PanelRow>:""}
          {props.attributes.type==="withoutImage"?
          <PanelRow>
            <TextareaControl
              label="Image Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>:""}
          {props.attributes.type!=="all"?
          <PanelRow>
            <CheckboxControl
              label="Add a link to the news/events page?"
              checked={ props.attributes.hasLink }
              onChange={ () =>
                props.setAttributes( { hasLink: ! props.attributes.hasLink } )
              }
            />
          </PanelRow>:""}
          { props.attributes.type!=="all"&&props.attributes.hasLink ?
            ( <PanelRow>
              <TextControl
                label="Link text"
                value={ props.attributes.linkText }
                onChange={ ( linkText ) => props.setAttributes( { linkText } ) }
              />
            </PanelRow> ) : '' }
          { props.attributes.type!=="all"&&props.attributes.hasLink ? (
            <PanelRow>
              <TextControl
                label="Link URL"
                value={ props.attributes.link }
                onChange={ ( link ) => props.setAttributes( { link } ) }
              />
            </PanelRow> ) : '' }

          { props.attributes.type!=="all"&&props.attributes.hasLink ?
            <PanelRow>
              <CheckboxControl
                label="Open link in new tab?"
                checked={ props.attributes.external }
                onChange={ () =>
                  props.setAttributes( { external: ! props.attributes.external } )
                }
              />
            </PanelRow> : '' }
        </PanelBody>
      </InspectorControls>,
      <div>
      {isEditing?
        <div className={ 'news-feed-editor'}>		
          <p>Enter feed URL in the box and then click "Use URL" to retrive the feed</p>		
            <form onSubmit={ onSubmitURL }
            className="rss-form"
            >
              <TextControl
                placeholder={ __( 'Enter URL here…' ) }
                value={ props.attributes.feedURL }
                onChange={ ( value ) =>
                  props.setAttributes( { feedURL: value } )
                }
                className="rss-input"
              />
              <Button isPrimary type="submit">
                { __( 'Use URL' ) }
              </Button>
            </form>
          </div>: 
          <Disabled>
            <ServerSideRender
              block="purdue-blocks/purdue-news"
              attributes={ props.attributes }
            />
          </Disabled>
          }
        </div>,
    ];
  },

});

