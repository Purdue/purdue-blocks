
/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
// import "./editor.scss";
// import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  TextControl,
  TextareaControl,
  Button,
  CheckboxControl,
  RadioControl
} = wp.components;
const { InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, useBlockProps, RichText } = wp.blockEditor;

const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Body content copy' } ],
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
  attributes: {
    color: { type: "string", default: "black"  },
    border:{ type: "boolean", default: false },
    buttonColor: { type: "string", default: "black"  },
    highlighted: { type: "string", default: "" },
    headerfontStyle: { type: "string", default: "narrow" },
    contentfontStyle: { type: "string", default: "narrow" },
    content: { type: "string", default: "" },
    source: { type: "string", default: "" },
    ctaUrl: { type: "string", default: "" },
    ctaText: { type: "string", default: "" },
    external: { type: 'boolean', default: false },
    height: { type: "string", default: "auto" },
  },
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className={ `pu-proofpoint${
        props.attributes.color === 'black' ? ' pu-proofpoint__black' : ' pu-proofpoint__white'
      }${
        props.attributes.border ? ' pu-proofpoint__border' : ''
      }
          ${
        props.attributes.height==="full"?" pu-proofpoint__height":""
      }`}>
        <div className="container">
          {!props.attributes.highlighted ?'':props.attributes.headerfontStyle==="wide" ?(
            <p className="pu-proofpoint__highlighted pu-proofpoint__highlighted-wide">
              {props.attributes.highlighted}
            </p>):(
            <p className="pu-proofpoint__highlighted pu-proofpoint__highlighted-narrow">
              {props.attributes.highlighted}
            </p>)}
          {!props.attributes.content ?'':props.attributes.contentfontStyle==="wide" ?(
            <p className="pu-proofpoint__content pu-proofpoint__content-wide">
              {props.attributes.content}
            </p>):(<p className="pu-proofpoint__content pu-proofpoint__content-narrow">
            {props.attributes.content}
          </p>)}
          {!props.attributes.source ?'':(
            <p className="pu-proofpoint__source">
              {props.attributes.source}
            </p>)}
          {(!props.attributes.ctaUrl||!props.attributes.ctaText)?'':(props.attributes.color === 'white'&&props.attributes.buttonColor==="white")?
            (<a
              href={props.attributes.ctaUrl}
              className="pu-proofpoint__button pu-proofpoint__button-white"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              {props.attributes.ctaText}
            </a>):(<a
              href={props.attributes.ctaUrl}
              className="pu-proofpoint__button"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              {props.attributes.ctaText}
            </a>)}
        </div>
      </div>
    );
    return returned;
  },
};

const v2 = {
  attributes: {
    color: { type: "string", default: "black"  },
    border:{ type: "boolean", default: false },
    buttonColor: { type: "string", default: "black"  },
    hasLead: { type: 'boolean', default: false },
    lead: { type: "string", default: "" },
    highlighted: { type: "string", default: "" },
    headerfontStyle: { type: "string", default: "narrow" },
    contentfontStyle: { type: "string", default: "narrow" },
    content: { type: "string", default: "" },
    source: { type: "string", default: "" },
    ctaUrl: { type: "string", default: "" },
    ctaText: { type: "string", default: "" },
    external: { type: 'boolean', default: false },
    height: { type: "string", default: "auto" },
    boxshadow:  { type: 'boolean', default: true },
  },
  supports: {
    className: true,
    anchor: true,
  },
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className={ `pu-proofpoint${
        props.attributes.color === 'black' ? ' pu-proofpoint__black' : ' pu-proofpoint__white'
      }${
        props.attributes.border ? ' pu-proofpoint__border' : ''
      }
      ${
        props.attributes.boxshadow ? '' : ' pu-proofpoint__no-shadow'
      }
      ${
        props.attributes.height==="full"?" pu-proofpoint__height":""
      }
      ${
        props.attributes.hasLead?" pu-proofpoint__has-lead":""
      }
      `}>
        <div className="container">
          {props.attributes.lead && props.attributes.hasLead ?
            <RichText.Content
              className={`pu-proofpoint__lead`}
              tagName={ "p" }
              value={props.attributes.lead}
            />:""}
          {!props.attributes.highlighted ?'':
            <RichText.Content
              tagName={"p"}
              value={props.attributes.highlighted}
              className={`pu-proofpoint__highlighted
                        ${props.attributes.headerfontStyle==="wide" ?"  pu-proofpoint__highlighted-wide":"  pu-proofpoint__highlighted-narrow"}
                        `}
            />}
          {!props.attributes.content ?'':
            <RichText.Content
              className={`pu-proofpoint__content
            ${props.attributes.contentfontStyle==="wide" ?"  pu-proofpoint__content-wide":"  pu-proofpoint__content-narrow"}
            `}
              tagName={ "p" }
              value={props.attributes.content}
            />}
          {!props.attributes.source ?'':
            <RichText.Content
              className={`pu-proofpoint__source`}
              tagName={ "p" }
              value={props.attributes.source}
            />}
          {(!props.attributes.ctaUrl||!props.attributes.ctaText)?'':(props.attributes.color === 'white'&&props.attributes.buttonColor==="white")?
            (<a
              href={props.attributes.ctaUrl}
              className="pu-proofpoint__button pu-proofpoint__button-white"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              {props.attributes.ctaText}
            </a>):(<a
              href={props.attributes.ctaUrl}
              className="pu-proofpoint__button"
              target={ props.attributes.external ? '_blank' : '_self' }
              rel="noopener noreferrer"
            >
              {props.attributes.ctaText}
            </a>)}
        </div>
      </div>
    );
    return returned;
  },
}

export default [v2, v1];
