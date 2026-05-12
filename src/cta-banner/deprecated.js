import {RichText, InnerBlocks, useBlockProps} from "@wordpress/block-editor";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  TextareaControl,
  Button,
  RadioControl,
  CheckboxControl,
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload } = wp.blockEditor;
const { select } = wp.data;

const v1 = {
  attributes: {
    type: { type: 'string', default: 'gold' },
    imgUrl: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    ctaDesc: { type: 'string', default: '' },
    ctaUrl: { type: 'string', default: '' },
    ctaText: { type: 'string', default: '' },
    external: { type: 'boolean', default: false },
  },
  supports: {
    className: false,
    anchor: true,
  },
  save: ( props ) => {
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className={ `pu-cta-banner${ props.attributes.type === 'gold' ? ' pu-cta-banner-gold' : '' }${ props.attributes.type === 'black' ? ' pu-cta-banner-black' : '' }
      ${ props.attributes.type === 'gray' ? ' pu-cta-banner-gray' : '' }${ props.attributes.type === 'image' ? ' pu-cta-banner-image' : '' }` }
           style={ props.attributes.type === 'image' && props.attributes.imgUrl ? { backgroundImage: `url(${ props.attributes.imgUrl })` } : {} }
           aria-label={ props.attributes.type === 'image' && props.attributes.altText ? props.attributes.altText : '' }>
        <div className="container">
          { props.attributes.type === 'gray' ? (
            <a
              href={ props.attributes.ctaUrl }
              className="pu-cta-banner-gray__desc"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              { props.attributes.ctaDesc }
            </a> ) : '' }
          { props.attributes.type === 'image' ? (
            <a
              href={ props.attributes.ctaUrl }
              className="pu-cta-banner-image__button"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              { props.attributes.ctaText }
            </a> ) : '' }
          { props.attributes.type === 'gold' ? (
            <p className="pu-cta-banner-gold__desc">{ props.attributes.ctaDesc }</p>
          ) : '' }
          {props.attributes.type === 'gold' ? (
            <a
              href={ props.attributes.ctaUrl }
              className="pu-cta-banner-gold__button"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              { props.attributes.ctaText }
            </a> ) : '' }
          { props.attributes.type === 'black' ? (
            <p className="pu-cta-banner-black__desc">{ props.attributes.ctaDesc }</p>
          ) : '' }
          { props.attributes.type === 'black' ? (
            <a
              href={ props.attributes.ctaUrl }
              className="pu-cta-banner-black__button"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              { props.attributes.ctaText }
            </a> ) : '' }
        </div>
      </div>
    );
    return returned;
  },
}

export default [v1];
