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
} = wp.components;
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks,BlockControls } = wp.blockEditor;
const { apiFetch } = wp;
const { useState } = wp.element;

import { pencil, rss } from '@wordpress/icons';
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
const v1 = {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Purdue RSS feed' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 66.67"><defs></defs><g id="newspaper" class="cls-1"><g class="cls-1"><path class="cls-2" d="M100,21.83V80.16a4.17,4.17,0,0,1-4.17,4.17H9.72A9.73,9.73,0,0,1,0,74.6V27.38a4.17,4.17,0,0,1,4.17-4.17h7.42a8.34,8.34,0,0,1,7.85-5.55H95.83A4.17,4.17,0,0,1,100,21.83ZM9.72,76a1.39,1.39,0,0,0,1.39-1.39v-43H8.33V74.6A1.39,1.39,0,0,0,9.72,76Zm82-50H19.44V74.6a9.1,9.1,0,0,1-.1,1.39H91.67ZM27.78,53.08V36.41a2.08,2.08,0,0,1,2.08-2.08H53.47a2.08,2.08,0,0,1,2.08,2.08V53.08a2.08,2.08,0,0,1-2.08,2.08H29.86A2.08,2.08,0,0,1,27.78,53.08Zm0,8.33a2.08,2.08,0,0,1,2.08-2.08H53.47a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H29.86a2.08,2.08,0,0,1-2.08-2.08Zm6.94-13.2H48.61V41.27H34.72Zm26.39-11.8a2.08,2.08,0,0,1,2.08-2.08H81.25a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H63.19a2.08,2.08,0,0,1-2.08-2.08Zm0,12.5a2.08,2.08,0,0,1,2.08-2.08H81.25a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H63.19a2.08,2.08,0,0,1-2.08-2.08Zm0,12.5a2.08,2.08,0,0,1,2.08-2.08H81.25a2.08,2.08,0,0,1,2.08,2.08v4.17a2.08,2.08,0,0,1-2.08,2.08H63.19a2.08,2.08,0,0,1-2.08-2.08Z" transform="translate(0 -17.66)"/></g></g></svg>
  ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],
  attributes: {
    type: { type: 'string', default: "withImage" },
    feedURL: { type: 'string', default: '' },
    title: { type: 'string', source: 'html', selector: '.feed-header' },
    titleLevel: { type: 'string', default: 'h2' },
    hasLink: { type: 'boolean', default: false },
    link: { type: 'string', default: '' },
    linkText: { type: 'string', default: '' },
    imgLocation:{ type: 'string', default: 'left' },
    imgUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
    data:[],
    error:{ type: 'string', default: 'Loading...' },
  },
  supports: {
    className: false,
  },
  save: ( props ) => {
    const itemListImage=props.attributes.data&&props.attributes.data.length>0?props.attributes.data.slice(0, 3).map(data => {
      return (
        <div key={data.id} className={"column is-one-third-desktop is-one-third-tablet is-full-mobile"}>
          {itemImage(data)}
        </div>)
    }):"";

    const itemListWithoutImage=props.attributes.data&&props.attributes.data.length>0?[...props.attributes.data].slice(0, 4).map(data => {
      return (
        <div key={data.id} class="feed-item-noimage">
          {itemNoImage(data)}
        </div>
      )
    }):"";

    const itemListAll=props.attributes.data&&props.attributes.data.length>0?[...props.attributes.data].map(data => {
      return (
        <div key={data.id} className={"column is-one-third-desktop is-half-tablet is-full-mobile"}>
          {itemAll(data)}
        </div>
      )
    }):"";
    return (
      <div className={'news-feed'}>
        <div className={'container'}>
          { props.attributes.title ? (
            <RichText.Content
              className={ 'feed-header' }
              tagName={ props.attributes.titleLevel }
              value={ props.attributes.title }
            /> ) : '' }
          {props.attributes.error!==""? <p className="error">{props.attributes.error}</p>:""}
          {props.attributes.data&&(props.attributes.type==="withImage"||props.attributes.type==="all")?(
            <div className={'columns is-multiline feed-items'}>
              {props.attributes.type==="withImage"?itemListImage:itemListAll}
            </div>):''}
          {props.attributes.data&&props.attributes.type==="withImage"&&props.attributes.hasLink ? (
            <div className="read-more-button">
              <a href={props.attributes.link}
                 target={ props.attributes.external ? '_blank' : '_self' }
                 rel="noopener noreferrer"
              >
                { props.attributes.linkText }
              </a>
            </div>) : '' }
          {props.attributes.data&&props.attributes.type==="withoutImage"?(
            <div className={'feed-grid'}>
              { props.attributes.imgUrl ?
                <figure className="feed-image is-3by2">
                  <img src={ props.attributes.imgUrl } alt={ props.attributes.altText }></img>
                </figure> : '' }
              <div className={'feed-items'}>
                {itemListWithoutImage}
              </div>
              {props.attributes.hasLink?
                <a className="button" href={props.attributes.link}
                   target={ props.attributes.external ? '_blank' : '_self' }
                   rel="noopener noreferrer"
                >
                  { props.attributes.linkText }
                </a>:""}
            </div>):''}
        </div>
      </div>
    );
  },
}

function itemImage(data){
  return (
    <div className={"card feed-item"}>
      <a href={data.link}>
        {data.imgURL&&data.imgURL!==""?
          <div className={"card-bg-image image is-2by1"}
               role="img"
               style={{backgroundImage:`url(${ data.imgURL })`}}
               aria-label={ data.imgALT }
          >
          </div>:""}
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">
                {data.title}
              </p>
            </div>
          </div>
          <div className="read-more-button">
            <span>Read More</span>
          </div>
        </div>
      </a>
    </div>
  );
}
function itemNoImage(data){
  return (
    <a className={"meida feed-item-noimage"} href={data.link}>
      <div className="media-left">
        <p className="month">
          {data.month}
        </p>
        <p className="day">
          {data.day}
        </p>
      </div>
      <div className="media-content">
        <div className="content">
          <p className="title">
            {data.title}
          </p>
          <p className="desc">
            {data.text}
          </p>
        </div>
      </div>
    </a>
  );
}
function itemAll(data){
  return (
    <div className={"card feed-item"}>
      <a href={data.link}>
        {data.imgURL&&data.imgURL!==""?
          <div className={"card-bg-image image is-2by1"}
               role="img"
               style={{backgroundImage:`url(${ data.imgURL })`}}
               aria-label={ data.imgALT }
          >
          </div>:""}
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="subtitle">
                {data.date}
              </p>
              <p className="title is-4">
                {data.title}
              </p>
            </div>
          </div>
          <div className="content-text">
            {data.text}
          </div>
          <div className="read-more-button">
            <span>Read More</span>
          </div>
        </div>
      </a>
    </div>
  );
}

export default [v1];
