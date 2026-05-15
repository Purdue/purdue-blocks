/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */


const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextareaControl,
  SelectControl,
  TextControl,
  RadioControl,
  Button,
  Disabled,
} = wp.components;
const { RichText, InspectorControls, MediaUploadCheck, MediaUpload, InnerBlocks, useBlockProps } = wp.blockEditor;
const { select } = wp.data;
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Optional subtext' } ],
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
const ALLOWED_MEDIA_TYPES_2 = [ 'video' ];

const v1 = {
  attributes: {
    storyTitle: { type: 'string', source: 'html', selector: '.story-title' },
    imgUrl: { type: "string", default: "" },
    altText: { type: "string", default: "" },
    position: { type: "string", default: "left" },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    "Adds a hero with a profile image."
  ),

  edit: (props) => {
    const removeMedia = () => {
      props.setAttributes({
        imgUrl: ''
      });
    }
    return [
      <InspectorControls>
        <PanelBody>
          < PanelRow>
            <RadioControl
              label="Image Position"
              selected={ props.attributes.position }
              options={ [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ] }
              onChange={ ( position ) => {
                props.setAttributes( { position } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <TextareaControl
              label="Hero Image Alt Text"
              value={props.attributes.altText}
              onChange={(altText) => props.setAttributes({ altText })}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,
      <div className={`pu-profile-hero pu-profile-hero-editor${props.attributes.position==="right"?" pu-profile-hero--right":""}`}>
        <div className="section is-large">
          <div className="container">
            <div className="columns">
              <div className="column is-two-fifths-desktop is-full-mobile">
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(img) => {
                      props.setAttributes({
                        imgUrl: img.url,
                        altText:
                          props.attributes.altText !== ""
                            ? props.attributes.altText
                            : img.alt,
                      });
                    }}
                    render={({ open }) => {
                      return (
                        <div
                          className={"background-image image is-1by1"}
                          role="img"
                          style={{ backgroundImage: `url(${props.attributes.imgUrl})` }}
                          aria-label={props.attributes.altText}
                        >
                          <div class="buttons-container">
                            <button className="remove-image-button" onClick={open}>
                              {props.attributes.imgUrl !== ""
                                ? "Select a new image"
                                : "Select an image"}
                            </button>
                            {props.attributes.imgUrl !== ""?
                              <button className="remove-image-button" onClick={removeMedia}>
                                Remove image
                              </button>:""}
                          </div>
                        </div>
                      );
                    }}
                  />
                </MediaUploadCheck>
              </div>
              <div className="column">
                <div className="pu-profile-hero__content">
                  <RichText
                    tagName={ "h1"}
                    value={ props.attributes.storyTitle }
                    className={ 'story-title' }
                    onChange={ ( storyTitle ) => {
                      props.setAttributes( { storyTitle } )
                    } }
                    placeholder="Add header"
                    keepPlaceholderOnFocus={ true }                  >
                  </RichText>
                  <InnerBlocks
                    template={ BLOCKS_TEMPLATE }
                    templateLock={ false }
                  />
                </div>
              </div>
            </div>
          </div>
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
  save: (props) => {
    const blockProps = useBlockProps.save();
    const returned = (
      <div {...blockProps} className={`pu-profile-hero ${props.attributes.position==="right"?" pu-profile-hero--right":""}`}>
        <div className="section is-large">
          <div className="container">
            <div className="columns">
              <div className="column is-two-fifths-desktop is-full-mobile">
                <div
                  role={`${props.attributes.altText?"img":""}`}
                  className="background-image image is-1by1"
                  aria-label={props.attributes.altText}
                  style={{backgroundImage: `url(${props.attributes.imgUrl})`}}
                >
                </div>
              </div>
              <div className="column">
                <div className="pu-profile-hero__content">
                  { props.attributes.storyTitle ? ( <RichText.Content
                    tagName={ "h1"}
                    value={ props.attributes.storyTitle }
                    className={ 'story-title' }
                  /> ) : '' }
                  <InnerBlocks.Content />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return returned;
  },
}

export default [v1];
