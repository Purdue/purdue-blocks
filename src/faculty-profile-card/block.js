/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  CheckboxControl,
  RadioControl,
  TextareaControl,
  TextControl,
  Button,
} = wp.components;
const { InnerBlocks, InspectorControls, MediaUploadCheck, MediaUpload, useBlockProps } = wp.blockEditor;
const { select } = wp.data;

// Array of social media share options.
const socials = [
  {
    faSlug: 'facebook-square',
    name: 'Facebook',
    share: 'https://www.facebook.com/',
  },
  {
    faSlug: 'twitter-square',
    name: 'Twitter',
    share: 'https://twitter.com/',
  },
  {
    faSlug: 'linkedin',
    name: 'LinkedIn',
    share: 'https://www.linkedin.com/in/',
  },
  {
    faSlug: 'instagram',
    name: 'Instagram',
    share: 'https://www.instagram.com/',
  },
];
const BLOCKS_TEMPLATE = [
  [ 'core/paragraph', { placeholder: 'Add bio' } ],
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
registerBlockType( 'purdue-blocks/faculty-profile-card', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Faculty Profile Card' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 77.78"><defs></defs><g id="Address-card" class="cls-1"><g class="cls-1"><path class="cls-2" d="M100,19.44V80.56a8.33,8.33,0,0,1-8.33,8.33H8.33A8.33,8.33,0,0,1,0,80.56V19.44a8.33,8.33,0,0,1,8.33-8.33H91.67A8.33,8.33,0,0,1,100,19.44Zm-8.33,0H8.33V80.56H91.67Zm-75,49.45V65.56c0-5.53,5.22-10,11.66-10,2,0,3.11,1.38,7.78,1.38s5.9-1.38,7.78-1.38c6.44,0,11.66,4.47,11.66,10v3.33a3.63,3.63,0,0,1-3.88,3.33H20.56A3.63,3.63,0,0,1,16.67,68.89Zm8.33-30A11.11,11.11,0,1,1,36.11,50,11.12,11.12,0,0,1,25,38.89ZM61.11,37.5V34.72a1.4,1.4,0,0,1,1.39-1.39H81.94a1.39,1.39,0,0,1,1.39,1.39V37.5a1.39,1.39,0,0,1-1.39,1.39H62.5A1.4,1.4,0,0,1,61.11,37.5Zm0,11.11V45.83a1.4,1.4,0,0,1,1.39-1.39H81.94a1.39,1.39,0,0,1,1.39,1.39v2.78A1.39,1.39,0,0,1,81.94,50H62.5A1.39,1.39,0,0,1,61.11,48.61Zm0,11.11V56.94a1.39,1.39,0,0,1,1.39-1.38H81.94a1.38,1.38,0,0,1,1.39,1.38v2.78a1.39,1.39,0,0,1-1.39,1.39H62.5A1.39,1.39,0,0,1,61.11,59.72Z" transform="translate(0 -11.11)"/></g></g></svg>
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
    profilePhoto: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    phone: { type: 'string', default: '' },
    email: { type: 'string', default: '' },
    personalLink: { type: 'string', default: '' },
    personalLinkText: { type: 'string', default: '' },
    extraLink: { type: 'string', default: '' },
    name: { type: 'string', default: '' },
    title: { type: 'string', default: '' },
    bio: { type: 'string',  default: '' },
    styleToggle: { type: 'string', default: "wide" },
    includeSocial: { type: 'boolean', default: false },
    checkedSocials: { type: 'object', default: {} },
    titlePosition: { type: 'boolean', default: false },
    bioPosition: { type: 'boolean', default: false },
    street: { type: 'string', default: ''},
    city: { type: 'string', default: ''},
    state: { type: 'string', default: ''},
    zip: { type: 'string', default: ''},
    officePhone: { type: 'string', default: ''},
    fax: { type: 'string', default: '' },
    height:{ type: 'string', default: "auto" },
  },

  supports: {
    className: false,
    anchor: true,
  },

  // Block description in side panel
  description: __(
    'This block renders a card that can contain a photo, the contact information, and the social media links for a faculty member.'
  ),

  edit: ( props ) => {
    const checkedSocials = props.attributes.checkedSocials;

    const setChecked = () => {
      if ( props.attributes.includeSocial ) {
        props.setAttributes( {
          includeSocial: false,
        } );
      } else {
        props.setAttributes( {
          includeSocial: true,
        } );
      }
    };
    const removeMedia = () => {
      props.setAttributes({
        profilePhoto: ''
      });
    }

    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Card Style"
              help="The wide card accepts a 2x1 image and presents the name, title, and social links at the bottom of the card.
              The narrow card accepts a square image and presents the name, title, and social links at the top of the card.
              The Mini card has no image, social links, or description."
              selected={ props.attributes.styleToggle }
              options={ [
                { label: 'Wide', value: 'wide' },
                { label: 'Narrow', value: 'narrow' },
                { label: 'Mini', value: 'mini' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { styleToggle: option } )
              } }
            />
          </PanelRow>
          <PanelRow>
            <RadioControl
              label="Height"
              help="Select 100% if you want the card to take the full height of its container."
              selected={ props.attributes.height }
              options={ [
                { label: 'Auto', value: 'auto' },
                { label: '100%', value: 'full' },
              ] }
              onChange={ ( option ) => {
                props.setAttributes( { height: option } )
              } }
            />
          </PanelRow>
        </PanelBody>
        <PanelBody>
        <PanelRow>
            <CheckboxControl
              label="Place title on the right?"
              checked={ props.attributes.titlePosition }
              onChange={ () =>
                props.setAttributes( { titlePosition: ! props.attributes.titlePosition } ) 
             
              }
            />
          </PanelRow>
          { props.attributes.styleToggle !== 'mini' ?
          <PanelRow>
            <CheckboxControl
              label="Place Faculty Bio on the right?"
              checked={ props.attributes.bioPosition }
              onChange={ () =>
                props.setAttributes( { bioPosition: ! props.attributes.bioPosition } ) 
             
              }
            />
          </PanelRow>:""}
          <PanelRow>
            <CheckboxControl
              label="Include Social Media Links"
              help="Would you like to include this faculty member's social media account links?"
              checked={ props.attributes.includeSocial }
              onChange={ setChecked }
            />
          </PanelRow>
          { props.attributes.styleToggle !== 'mini' ? (
            <PanelRow>
              <CheckboxControl
                label="Include Social Media Links"
                help="Would you like to include this faculty member's social media account links?"
                checked={ props.attributes.includeSocial }
                onChange={ setChecked }
              />
            </PanelRow>
          ) : ''}
          { props.attributes.includeSocial ? (
            <PanelRow className="social-check-list">
              { socials.map( ( { faSlug, name } ) => {
                return (
                  <PanelRow>
                    <CheckboxControl
                      className="social-check-list__item"
                      label={ name }
                      checked={
                        checkedSocials[ name ] ?
                          checkedSocials[ name ].checked :
                          false
                      }
                      onChange={ ( check ) => {
                        if ( check ) {
                          checkedSocials[ name ] = {};
                          checkedSocials[ name ].slug = faSlug;
                          checkedSocials[ name ].checked = true;

                        } else {
                          delete checkedSocials[ name ];
                        }
                        props.setAttributes( {
                          includeSocial: true,
                          checkedSocials: { ...checkedSocials },
                        } );
                      } }
                    />
                    { checkedSocials[ name ] !== undefined &&
                    checkedSocials[ name ].checked === true ? (
                      <TextControl
                          label={ `${ name } Profile Link` }
                          type="text"
                          value={ checkedSocials[ name ].link }
                          onChange={ ( link ) => {
                            checkedSocials[ name ].link = link;
                            props.setAttributes( {
                              checkedSocials: { ...checkedSocials },
                            } );
                          } }
                        />
                      ) : (
                        ''
                      ) }
                  </PanelRow>
                );
              } ) }
            </PanelRow>
          ) : (
            ''
          ) }
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <TextareaControl
              label="Profile Picture Alt Text"
              value={ props.attributes.altText }
              onChange={ ( altText ) => props.setAttributes( { altText } ) }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={ 'pu-blocks-editor-faculty-profile' }>
        <div className="columns">
          {/* don't show image upload if mini option selected */}
          { props.attributes.styleToggle !== 'mini' ? (
            <div className="content column">
              <span>Choose a Profile Picture</span>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={ ( img ) => {
                    props.setAttributes( {
                      profilePhoto: img.url,
                      altText:
                        props.attributes.altText !== '' ?
                          props.attributes.altText :
                          img.alt,
                    } );
                  } }
                  render={ ( { open } ) => {
                    return props.attributes.profilePhoto !== '' ? (
                      <div className={ 'bulma-blocks-editor-site-hero__preview' }>
                        <figure className={ 'image' }>
                          <img
                            alt={ props.attributes.altText }
                            src={ props.attributes.profilePhoto }
                          />
                        </figure>
                        <Button
                          className={ 'bulma-blocks-editor-site-hero__button' }
                          onClick={ open }
                        >
                          Select a New Image
                        </Button>
                        <Button className={ 'bulma-blocks-editor-site-hero__button' } onClick={removeMedia}>
                          Remove image
                      </Button>
                      </div>
                    ) : (
                      <div className={ 'bulma-blocks-editor-site-hero__container' }>
                        <p className={ 'bulma-blocks-editor-site-hero__description' }>
                          Pick an image from the media library.
                        </p>
                        <Button
                          className={ 'bulma-blocks-editor-site-hero__button' }
                          onClick={ open }
                        >
                          Open Media Library
                        </Button>
                      </div>
                    );
                  } }
                />
              </MediaUploadCheck>
            </div>
          ) : ''}

          <div className="content column">
            <span>Add Phone Number</span>
            <div className="field">
              <div className="control">
                <input
                  value={
                    props.attributes.phone !== '' ? props.attributes.phone : ''
                  }
                  className="input"
                  type="text"
                  placeholder="Phone Number..."
                  onChange={ ( e ) => {
                    props.setAttributes( { phone: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
            <span>Add Fax Number</span>
            <div className="field">
              <div className="control">
                <input
                  value={
                    props.attributes.fax !== '' ? props.attributes.fax : ''
                  }
                  className="input"
                  type="text"
                  placeholder="Fax Number..."
                  onChange={ ( e ) => {
                    props.setAttributes( { fax: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
            <span>Add Email Address</span>
            <div className="field">
              <div className="control">
                <input
                  value={
                    props.attributes.email !== '' ? props.attributes.email : ''
                  }
                  className="input"
                  type="text"
                  placeholder="Email..."
                  onChange={ ( e ) => {
                    props.setAttributes( { email: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
            <span>Add Optional Personal Website or page</span>
            <div className="field">
              <div className="control">
                <input
                  value={
                    props.attributes.personalLink !== '' ?
                      props.attributes.personalLink :
                      ''
                  }
                  className="input"
                  type="text"
                  placeholder="Link URL..."
                  onChange={ ( e ) => {
                    props.setAttributes( { personalLink: e.target.value.trim() } );
                  } }
                ></input>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  value={
                    props.attributes.personalLinkText !== '' ?
                      props.attributes.personalLinkText :
                      ''
                  }
                  className="input"
                  type="text"
                  placeholder="Link Text..."
                  onChange={ ( e ) => {
                    props.setAttributes( { personalLinkText: e.target.value } );
                  } }
                ></input>
                <span style={{fontStyle:"italic"}}>Link text is optional. When left empty it'll use the link URL.</span>
              </div>
            </div>
            <span>Add Optional Google Scholar Link</span>
            <div className="field">
              <div className="control">
                <input
                  value={
                    props.attributes.extraLink !== '' ?
                      props.attributes.extraLink :
                      ''
                  }
                  className="input"
                  type="text"
                  placeholder="Google Scholar Link..."
                  onChange={ ( e ) => {
                    props.setAttributes( { extraLink: e.target.value.trim() } );
                  } }
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="content main-info">

          <span>Optional Address</span>
          <div className="address-form">
            <div className="field street">
              <div className="control">
                <input
                  value={
                    props.attributes.street !== '' ? props.attributes.street : ''
                  }
                  className="input"
                  type="text"
                  placeholder="Street..."
                  onChange={ ( e ) => {
                    props.setAttributes( { street: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
            <div className="field city">
              <div className="control">
                <input
                  value={
                    props.attributes.city !== '' ? props.attributes.city : ''
                  }
                  className="input"
                  type="text"
                  placeholder="City..."
                  onChange={ ( e ) => {
                    props.setAttributes( { city: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
            <div className="field state">
              <div className="control">
                <input
                  value={
                    props.attributes.state !== '' ? props.attributes.state : ''
                  }
                  className="input"
                  type="text"
                  placeholder="State..."
                  onChange={ ( e ) => {
                    props.setAttributes( { state: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
            <div className="field zip">
              <div className="control">
                <input
                  value={
                    props.attributes.zip !== '' ? props.attributes.zip : ''
                  }
                  className="input"
                  type="text"
                  placeholder="Zipcode..."
                  onChange={ ( e ) => {
                    props.setAttributes( { zip: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
            <div className="field office-phone">
              <div className="control">
                <input
                  value={
                    props.attributes.officePhone !== '' ? props.attributes.officePhone : ''
                  }
                  className="input"
                  type="text"
                  placeholder="Office Phone Number..."
                  onChange={ ( e ) => {
                    props.setAttributes( { officePhone: e.target.value } );
                  } }
                ></input>
              </div>
            </div>
          </div>
          <span>Faculty Name</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.name !== '' ? props.attributes.name : ''
                }
                className="input"
                type="text"
                placeholder="Faculty Name..."
                onChange={ ( e ) => {
                  props.setAttributes( { name: e.target.value } );
                } }
              ></input>
            </div>
          </div>
          <span>Faculty Position</span>
          <div className="field">
            <div className="control">
              <input
                value={
                  props.attributes.title !== '' ? props.attributes.title : ''
                }
                className="input"
                type="text"
                placeholder="Faculty Position..."
                onChange={ ( e ) => {
                  props.setAttributes( { title: e.target.value } );
                } }
              ></input>
            </div>
          </div>

          {/* only show bio field when mini option not selected */}
          { props.attributes.styleToggle !== 'mini' ? (
            <span>Optional Faculty Bio</span>
          ) : ''}
          { props.attributes.styleToggle !== 'mini' ? (
                  props.attributes.bioPosition?
                  <InnerBlocks
                  template={ BLOCKS_TEMPLATE }
                  templateLock={ false }
                />:
                <div className="field">
                  <div className="control">
                    <textarea
                      value={
                        props.attributes.bio !== '' ? props.attributes.bio : ''
                      }
                      className="input"
                      placeholder="Faculty Bio..."
                      onChange={ ( e ) => {
                        props.setAttributes( { bio: e.target.value } );
                      } }
                    ></textarea>
                  </div> 
                </div>                       
          ) : ''}

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
    const returned = props.attributes.name == '' ? (
      <div {...blockProps} className={`faculty-profile-card faculty-profile-card--${props.attributes.styleToggle} box${props.attributes.height==="auto"?"":" faculty-profile-card--full-height"}`}>
        <div className="media">
          <div className="media-left">
            <div className="image">
              <img alt={props.attributes.altText} src={ props.attributes.profilePhoto }></img>
            </div>
          </div>
          <div className="media-content">
            <div className="content">
              <ul>
                { props.attributes.phone !== '' ? (
                  <li>
                    <i className="fas fa-phone" aria-hidden="true" />
                    <div className="profile-info-item">
                      <p>{ props.attributes.phone }</p>
                      <span>Phone</span>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
                { props.attributes.fax !== '' ? (
                  <li>
                    <i className="fas fa-fax" aria-hidden="true" />
                    <div className="profile-info-item">
                      <p>{ props.attributes.fax }</p>
                      <span>Fax</span>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
                { props.attributes.email !== '' ? (
                  <li>
                    <i className="fas fa-envelope" aria-hidden="true" />
                    <div className="profile-info-item">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={ `mailto:${ props.attributes.email }` }
                      >
                        { props.attributes.email }
                      </a>
                      <span>Email</span>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
                { props.attributes.street !== ''||props.attributes.city !== ''||props.attributes.state !== ''||props.attributes.zip !== ''||props.attributes.officePhone !== '' ? (
                  <li>
                    <i className="fas fa-address-book" aria-hidden="true" />
                    <div className="profile-info-item">
                      <p>
                        {props.attributes.street}
                        {props.attributes.street?<br />:""}
                        {`${props.attributes.city?`${props.attributes.city}, `:""}${props.attributes.state?`${props.attributes.state} `:""}${props.attributes.zip}`}
                        <br />
                        {props.attributes.officePhone.replace(/\s+/g, '') !== '' ? `Office: ${props.attributes.officePhone}` : ''}
                      </p>
                      <span>Address</span>
                    </div>
                  </li>
                ) : ''}
                { props.attributes.personalLink !== '' ? (
                  <li>
                    <i className="fas fa-desktop" aria-hidden="true" />
                    <div className="profile-info-item">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          props.attributes.personalLink.includes( 'https://' ) ?
                            props.attributes.personalLink :
                            `https://${ props.attributes.personalLink }`
                        }
                      >
                        { props.attributes.personalLinkText ? props.attributes.personalLinkText :props.attributes.personalLink  }
                      </a>
                      <span>Personal Website</span>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
                { props.attributes.extraLink !== '' ? (
                  <li>
                    <i className="fas fa-link" aria-hidden="true" />
                    <div className="profile-info-item">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          props.attributes.extraLink.includes( 'https://' ) ?
                            props.attributes.extraLink :
                            `https://${ props.attributes.extraLink }`
                        }
                      >
                        Google Scholar Website
                      </a>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
              </ul>
            </div>
          </div>
        </div>
        {props.attributes.bio !== ''&&props.attributes.styleToggle !== 'mini' ? (
          <div className="content">
            {
              props.attributes.bioPosition?
              <InnerBlocks.Content />:<p>{props.attributes.bio}</p>
            }
          </div>
        ) : ''}
        <div className="level is-mobile">
          { props.attributes.includeSocial ? (
            <div className="level-right content">
              <p className="level-item">Follow Me: </p>
              { Object.keys( props.attributes.checkedSocials ).map( ( social ) => {
                return (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="level-item"
                    href={ `${ props.attributes.checkedSocials[ social ].link }` }
                  >
                    <i
                      className={ `fab fa-${ props.attributes.checkedSocials[ social ].slug }` }
                      aria-hidden="true"
                    />
                  </a>
                );
              } ) }
            </div>
          ) : (
            ''
          ) }
        </div>
      </div>
    ) : (
      <div {...blockProps} className={`faculty-profile-card faculty-profile-card--${props.attributes.styleToggle} box${props.attributes.height==="auto"?"":" faculty-profile-card--full-height"}`}>
        <div className="media">
          <div className="media-left">
            <div className="image">
              <img alt={props.attributes.altText} src={ props.attributes.profilePhoto }></img>
            </div>
          </div>
          <div className="media-content">
            <div className="content">
            {
                props.attributes.titlePosition?<p className="faculty-title faculty-title-side">{props.attributes.title}</p>:""
              }  
            {props.attributes.bioPosition&&props.attributes.styleToggle !== 'mini'  ? (
                  <InnerBlocks.Content />
              ) : ''}
              <ul>
                { props.attributes.phone !== '' ? (
                  <li>
                    <i className="fas fa-phone" aria-hidden="true" />
                    <div className="profile-info-item">
                      <p>{ props.attributes.phone }</p>
                      <span>Phone</span>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
                { props.attributes.fax !== '' ? (
                  <li>
                    <i className="fas fa-fax" aria-hidden="true" />
                    <div className="profile-info-item">
                      <p>{ props.attributes.fax }</p>
                      <span>Fax</span>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
                { props.attributes.email !== '' ? (
                  <li>
                    <i className="fas fa-envelope" aria-hidden="true" />
                    <div className="profile-info-item">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={ `mailto:${ props.attributes.email }` }
                      >
                        { props.attributes.email }
                      </a>
                      <span>Email</span>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
                { props.attributes.street !== ''||props.attributes.city !== ''||props.attributes.state !== ''||props.attributes.zip !== ''||props.attributes.officePhone !== '' ? (
                  <li>
                    <i className="fas fa-address-book" aria-hidden="true" />
                    <div className="profile-info-item">
                      <p>
                        {props.attributes.street}
                        {props.attributes.street?<br />:""}
                        {`${props.attributes.city?`${props.attributes.city}, `:""}${props.attributes.state?`${props.attributes.state} `:""}${props.attributes.zip}`}
                        <br />
                        {props.attributes.officePhone.replace(/\s+/g, '') !== '' ? `Office: ${props.attributes.officePhone}` : ''}
                      </p>
                      <span>Address</span>
                    </div>
                  </li>
                ) : ''}
                { props.attributes.personalLink !== '' ? (
                  <li>
                    <i className="fas fa-desktop" aria-hidden="true" />
                    <div className="profile-info-item">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          props.attributes.personalLink.includes( 'https://' ) ?
                            props.attributes.personalLink :
                            `https://${ props.attributes.personalLink }`
                        }
                      >
                        { props.attributes.personalLinkText ? props.attributes.personalLinkText:props.attributes.personalLink }
                      </a>
                      <span>Personal Website</span>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
                { props.attributes.extraLink !== '' ? (
                  <li>
                    <i className="fas fa-link" aria-hidden="true" />
                    <div className="profile-info-item">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          props.attributes.extraLink.includes( 'https://' ) ?
                            props.attributes.extraLink :
                            `https://${ props.attributes.extraLink }`
                        }
                      >
                        Google Scholar Website
                      </a>
                    </div>
                  </li>
                ) : (
                  ''
                ) }
              </ul>
            </div>
          </div>
        </div>

        {props.attributes.bio !== ''&&!props.attributes.bioPosition&&props.attributes.styleToggle !== 'mini'  ? (
          <div className="content">
            <p>{props.attributes.bio}</p>
          </div>
        ) : ''}

        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="faculty-name">{props.attributes.name}</p>
              {
                props.attributes.titlePosition?"":<p className="faculty-title">{props.attributes.title}</p>
              }              
            </div>
          </div>
          { props.attributes.includeSocial ? (
            <div className="level-right content">
              <p className="level-item">Follow Me: </p>
              { Object.keys( props.attributes.checkedSocials ).map( ( social ) => {
                return (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="level-item"
                    href={ `${ props.attributes.checkedSocials[ social ].link }` }
                  >
                    <i
                      className={ `fab fa-${ props.attributes.checkedSocials[ social ].slug }` }
                      aria-hidden="true"
                    />
                  </a>
                );
              } ) }
            </div>
          ) : (
            ''
          ) }
        </div>
      </div>
    );
    return returned;
  },
} );
