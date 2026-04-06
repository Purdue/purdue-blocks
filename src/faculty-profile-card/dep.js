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

const v1 = {
  title: __( 'Faculty Profile Card' ), // Block title.
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 77.78"><defs></defs><g id="Address-card" class="cls-1"><g class="cls-1"><path class="cls-2" d="M100,19.44V80.56a8.33,8.33,0,0,1-8.33,8.33H8.33A8.33,8.33,0,0,1,0,80.56V19.44a8.33,8.33,0,0,1,8.33-8.33H91.67A8.33,8.33,0,0,1,100,19.44Zm-8.33,0H8.33V80.56H91.67Zm-75,49.45V65.56c0-5.53,5.22-10,11.66-10,2,0,3.11,1.38,7.78,1.38s5.9-1.38,7.78-1.38c6.44,0,11.66,4.47,11.66,10v3.33a3.63,3.63,0,0,1-3.88,3.33H20.56A3.63,3.63,0,0,1,16.67,68.89Zm8.33-30A11.11,11.11,0,1,1,36.11,50,11.12,11.12,0,0,1,25,38.89ZM61.11,37.5V34.72a1.4,1.4,0,0,1,1.39-1.39H81.94a1.39,1.39,0,0,1,1.39,1.39V37.5a1.39,1.39,0,0,1-1.39,1.39H62.5A1.4,1.4,0,0,1,61.11,37.5Zm0,11.11V45.83a1.4,1.4,0,0,1,1.39-1.39H81.94a1.39,1.39,0,0,1,1.39,1.39v2.78A1.39,1.39,0,0,1,81.94,50H62.5A1.39,1.39,0,0,1,61.11,48.61Zm0,11.11V56.94a1.39,1.39,0,0,1,1.39-1.38H81.94a1.38,1.38,0,0,1,1.39,1.38v2.78a1.39,1.39,0,0,1-1.39,1.39H62.5A1.39,1.39,0,0,1,61.11,59.72Z" transform="translate(0 -11.11)"/></g></g></svg>
  ), // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: 'purdue-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],
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
  }
}

export default [v1];
