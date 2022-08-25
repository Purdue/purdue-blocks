/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  RadioControl,
  SelectControl,
  CheckboxControl,
  TextareaControl,
  TextControl,
  Button,
} = wp.components;
const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;

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
registerBlockType( 'purdue-blocks/alert-banner', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Alert Banner' ), // Block title.
  icon: (
    <svg id="a8ae3902-6091-40f1-ba15-728f5bf1f742" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.0008 88.88934"><defs></defs><g id="e2c1153f-a3b0-433f-9633-3fec02e357e5" data-name="Exclamation-triangle" class="a7b4a3b0-640a-46e0-a18c-acb6750103c6"><g class="a7b4a3b0-640a-46e0-a18c-acb6750103c6"><path class="cls-2" d="M91.65678,94.44467H8.34279A8.33857,8.33857,0,0,1,1.124,81.94631L42.78228,9.72008a8.33709,8.33709,0,0,1,14.43588,0L98.87472,81.94631A8.33821,8.33821,0,0,1,91.65678,94.44467ZM42.01405,75.00008a7.98617,7.98617,0,1,0,7.98617-7.98617A7.98564,7.98564,0,0,0,42.01405,75.00008Zm1.69185-13.0817a2.083,2.083,0,0,0,2.07988,1.97051h8.42888a2.083,2.083,0,0,0,2.07988-1.97051l1.2882-23.61128A2.08352,2.08352,0,0,0,55.502,36.1109H44.49844a2.08352,2.08352,0,0,0-2.08074,2.1962Z" transform="translate(0.0004 -5.55533)"/></g></g></svg>
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
    content: { type: 'string', default: '' },
    link: { type: 'string', default: '' },
    linkText: { type: 'string', default: '' },
    type: { type: 'string', default: 'notice' },
    noticeColor: {type: 'string', default: 'gray'},
    alertColor: {type: 'string', default: 'green'},
    external: { type: 'boolean', default: false },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    'Create a notice or alert banner with a link.'
  ),

  edit: ( props ) => {
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow className={`blocks-editor-alert--recommendations`}>
            <h2>Text Recommendations</h2>
            <p>The recommended maximum character count for the alert content is 90 characters.</p>
          </PanelRow>
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Banner type"
              selected={ props.attributes.type }
              options={ [
                { label: 'Notice', value: 'notice' },
                { label: 'Alert', value: 'alert' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { type: option } )
              } }
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
          {
            props.attributes.type === 'notice' ? (
              <PanelRow>
                <SelectControl
                  label="Notice Color"
                  help="Select the color for your notice banner."
                  value={props.attributes.noticeColor}
                  options={[
                    { value: "gray", label: "Default (Gray)" },
                    { value: "green", label: "Success (Green)" },
                    { value: "blue", label: "Info (Blue)" },
                    { value: "gold", label: "Message (Gold)" },
                    { value: "orange", label: "Error (Orange)" },
                  ]}
                  onChange={(noticeColor) => {
                    props.setAttributes({ noticeColor });
                  }}
                />
              </PanelRow>
            ) : (
              <PanelRow>
                <SelectControl
                  label="Alert Color"
                  help="Select the color for your alert banner."
                  value={props.attributes.alertColor}
                  options={[
                    { value: "green", label: "All Clear (Green)" },
                    { value: "blue", label: "Minor Alert (Blue)" },
                    { value: "gold", label: "Moderate Alert (Gold)" },
                    { value: "orange", label: "Severe Alert (Orange)" },
                    { value: "red", label: "Extreme Alert (Red)" },
                  ]}
                  onChange={(alertColor) => {
                    props.setAttributes({ alertColor });
                  }}
                />
              </PanelRow>
            )
          }
        </PanelBody>
      </InspectorControls>,

      <div className={ `blocks-editor-alert blocks-editor-alert--${props.attributes.type} ${props.attributes.type}--${props.attributes.type === 'notice' ? props.attributes.noticeColor : props.attributes.alertColor}` }>
        <div className="content">
          <RichText
            tagname="p"
            value={props.attributes.content}
            className={"editor-alert-content"}
            onChange={(text) => {
              props.setAttributes({ content: text });
            }}
            placeholder="Alert content..."
            allowedFormats={[]}
          ></RichText>
        </div>
        <div className="alert-link">
          <RichText
            tagname="div"
            value={props.attributes.linkText}
            className={"editor-link-content"}
            onChange={(linkText) => {
              props.setAttributes({ linkText });
            }}
            placeholder="Alert Link (optional)"
          ></RichText>
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
    const blockProps = useBlockProps.save();
    const returned = (
      <div className={ `alert-banner alert-banner--${props.attributes.type} ${props.attributes.type}--${props.attributes.type === 'notice' ? props.attributes.noticeColor : props.attributes.alertColor}` } 
      {...blockProps}
      >
        <div className={'container'}>
          <RichText.Content
            className={"alert-banner--content"}
            tagName={'p'}
            value={props.attributes.content}
          />
          {props.attributes.linkText !== "" && props.attributes.linkText !== undefined ? (
            <RichText.Content
              className={"alert-banner--link link-effect"}
              tagName={'div'}
              value={props.attributes.linkText}
            />
          ) : ''}
        </div>
      </div>
    );
    return returned;
  },
} );
