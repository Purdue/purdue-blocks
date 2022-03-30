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
  RadioControl,
  SelectControl,
  CheckboxControl
} = wp.components;

const { 
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  RichText
} = wp.blockEditor;


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
registerBlockType( 'purdue-blocks/profile-gallery', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Profile Gallery' ), // Block title.
  icon: (
    <svg id="ef9c2100-31be-4639-82c5-0ef6f30faf8a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 71.42857"><g id="e07d924f-208c-4ad5-884f-434897ed4326" data-name="Grip-horizontal" class="cls-1"><g class="cls-1"><path class="cls-2" d="M28.57143,15.17857V29.46429a7.14374,7.14374,0,0,1-7.14286,7.14285H7.14286A7.14374,7.14374,0,0,1,0,29.46429V15.17857A7.14375,7.14375,0,0,1,7.14286,8.03571H21.42857A7.14375,7.14375,0,0,1,28.57143,15.17857Zm0,42.85714V72.32143a7.14375,7.14375,0,0,1-7.14286,7.14286H7.14286A7.14375,7.14375,0,0,1,0,72.32143V58.03571a7.14374,7.14374,0,0,1,7.14286-7.14285H21.42857A7.14374,7.14374,0,0,1,28.57143,58.03571ZM64.28571,15.17857V29.46429a7.14374,7.14374,0,0,1-7.14285,7.14285H42.85714a7.14374,7.14374,0,0,1-7.14285-7.14285V15.17857a7.14375,7.14375,0,0,1,7.14285-7.14286H57.14286A7.14375,7.14375,0,0,1,64.28571,15.17857Zm0,42.85714V72.32143a7.14375,7.14375,0,0,1-7.14285,7.14286H42.85714a7.14375,7.14375,0,0,1-7.14285-7.14286V58.03571a7.14374,7.14374,0,0,1,7.14285-7.14285H57.14286A7.14374,7.14374,0,0,1,64.28571,58.03571ZM100,15.17857V29.46429a7.14374,7.14374,0,0,1-7.14286,7.14285H78.57143a7.14374,7.14374,0,0,1-7.14286-7.14285V15.17857a7.14375,7.14375,0,0,1,7.14286-7.14286H92.85714A7.14375,7.14375,0,0,1,100,15.17857Zm0,42.85714V72.32143a7.14375,7.14375,0,0,1-7.14286,7.14286H78.57143a7.14375,7.14375,0,0,1-7.14286-7.14286V58.03571a7.14374,7.14374,0,0,1,7.14286-7.14285H92.85714A7.14374,7.14374,0,0,1,100,58.03571Z" transform="translate(0 -8.03571)"/></g></g></svg>
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
    profiles: {type: "array", default: [{name: 'add', title: '', photoUrl: '', photoAlt: '', bio: '', bioEditorOpen: false}]},
    numColumns: { type: "number", default: 4 },
  },
  supports: {
    className: false,
  },
  // Block description in side panel
  description: __(
    'A gallery view of 1-4 columns of profiles with a modal overlay to view the full bio.'
  ),

  edit: ( props ) => {

    const profiles = props.attributes.profiles
    const numColumns = parseInt(props.attributes.numColumns)

    return [
      <InspectorControls>
          <PanelBody>
            <PanelRow>
              <SelectControl
                label="Number of Columns"
                value={ props.attributes.numColumns }
                options={
                  [
                    { value: 1, label: 'One Column' },
                    { value: 2, label: 'Two Columns' },
                    { value: 3, label: 'Three Columns' },
                    { value: 4, label: 'Four Columns' },
                  ]
                }
                onChange={ ( numColumns ) => {
                  props.setAttributes({ numColumns });
                } }
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>,

        <div className={`editor-profile-gallery columns ${numColumns === 2 ? 'editor-profile-gallery--md' : numColumns === 1 ? 'editor-profile-gallery--sm' : ''} is-multiline ${props.attributes.bioEditorOpen ? 'bio-editor-open' : ''}`}>
          {
            profiles.map((profile, i, profiles) => {
              const columnSize = numColumns === 4 ? 'is-3' : numColumns === 3 ? 'is-4' : numColumns === 2 ? 'is-6' : 'is-12'
              if (profile.name === 'add') {
                return(
                  <div className={`editor-profile-add column ${columnSize}`}>
                    <button 
                      onClick={(e) => {
                        const newProfiles = [...profiles]
                        newProfiles.push({name: '', title: '', photoUrl: '', photoAlt: '', bio: ''})
                        const length = newProfiles.length
                        let addButton = newProfiles[length-2]
                        newProfiles[length-2] = newProfiles[length-1]
                        newProfiles[length-1] = addButton
                        props.setAttributes({profiles: newProfiles})
                      }} 
                      className={`editor-add-profile-button`}
                      >
                      <i class="fas fa-plus-circle" aria-hidden="true"></i>
                    </button>
                  </div>
                )
              } else {
                return(
                  <div className={`column ${columnSize}`}>
                    <div className={`editor-profile-form`}>
                      <div className={`editor-profile-order`}>
                        <label>Swap Position: </label>
                        <select onChange={e => {
                          const order = e.target.value
                          const newProfiles = [...profiles]
                          let temp = newProfiles[order]
                          newProfiles[order] = newProfiles[i]
                          newProfiles[i] = temp
                          e.target.selectedIndex = i
                          props.setAttributes({profiles: newProfiles})
                        }}>
                          {profiles.map((profile, j, profiles) => {
                            if(profile.name !== 'add') {
                              return(
                                <option selected={i === j ? 'selected': ''} value={(j)}>{`${j + 1}`}</option>
                              )
                            }
                          })}
                        </select>
                      </div>
                      <MediaUploadCheck>
                        <MediaUpload
                          onSelect={ ( img ) => {
                            const newProfiles = [...profiles]
                            profile.photoUrl = img.url
                            profile.photoAlt = img.alt
                            newProfiles[i] = profile
                            props.setAttributes( {profiles: newProfiles} );
                          } }
                          render={ ( { open } ) => {
                            return (
                              <div className={ `image is-square ${profile.photoUrl === '' ? 'is-empty' : ''}` }
                                role="img"
                                style={ { backgroundImage: `url(${ profile.photoUrl })` } }
                                aria-label={ profile.photoAlt }
                              >
                                <button onClick={ open }>{ profile.photoUrl !== '' ? 'Select a new image' : 'Select an image' }</button>
                              </div>
                            );
                          } }
                        />
                      </MediaUploadCheck>
                      <input
                        className="editor-profile-text-input"
                        value={profile.name}
                        type="text"
                        placeholder="Full Name"
                        onChange={ ( e ) => {
                          const newProfiles = [...profiles]
                          profile.name = e.target.value
                          newProfiles[i] = profile
                          props.setAttributes( { profiles: newProfiles } );
                        } }
                      ></input>
                      <input
                        className="editor-profile-text-input"
                        value={profile.title}
                        type="text"
                        placeholder="Title"
                        onChange={ ( e ) => {
                          const newProfiles = [...profiles]
                          profile.title = e.target.value
                          newProfiles[i] = profile
                          props.setAttributes( { profiles: newProfiles } );
                        } }
                      ></input>
                      <div className={`editor-profile-buttons`}>
                        <button className={`editor-profile-buttons--edit`} onClick={e => {
                          const newProfiles = [...profiles]
                          profile.bioEditorOpen = !profile.bioEditorOpen
                          newProfiles[i] = profile
                          newProfiles.forEach((newProfile, j) => {
                            if(i !== j) {
                              newProfile.bioEditorOpen = false
                            }
                          })
                          props.setAttributes({profiles: newProfiles})
                        }}>
                          {profile.bioEditorOpen ? 'Close' : 'Edit Biography'}
                        </button>
                        <button className={`editor-profile-buttons--delete`} onClick={e => {
                          const newProfiles = [...profiles]
                          newProfiles.splice(i, 1)
                          props.setAttributes({profiles: newProfiles})
                        }}>
                          <i class="fas fa-times" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                    {profile.bioEditorOpen ? (
                      <div className={`editor-profile-bio ${numColumns > 3 ? 'editor-profile-bio--wide' : ''}`}>
                        <RichText
                          tagName="p"
                          className={`pu-profile-gallery--bio`}
                          value={profile.bio}
                          placeholder="Biography..."
                          onChange={ (text) => {
                            const newProfiles = [...profiles]
                            profile.bio = text
                            newProfiles[i] = profile
                            props.setAttributes( { profiles: newProfiles } );
                          }}
                        >
                        </RichText>
                      </div>
                    ) : ''}
                  </div>
                )
              }
            })
          }
        </div>,
    ]
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
    const profiles = props.attributes.profiles
    const numColumns = parseInt(props.attributes.numColumns)

    const columnSize = numColumns === 4 ? 'is-3' : numColumns === 3 ? 'is-4' : numColumns === 2 ? 'is-6' : 'is-12'

    const returned = (
      <div className={`pu-profile-gallery columns is-multiline`}>
        {profiles.map((profile, i, profiles) => {
          if (profile.name !== 'add') {

            const toggle = `${i}-${profile.name}`

            return (
              <div className={`column ${columnSize} is-half-mobile`}>
                <div className={ `profile-gallery-open` } data-toggle={toggle}
                >
                <div className={ `image is-square` }
                  role="img"
                  style={ { backgroundImage: `url(${ profile.photoUrl })` } }
                  aria-label={ profile.photoAlt }
                ></div>
                  <button className={`modal-open-button`}  aria-label="More information"><i class="fas fa-plus" aria-hidden='true'></i></button>
                </div>
                <p className={`pu-profile-gallery--name`}>
                  {profile.name}
                </p>
                <p className={`pu-profile-gallery--title`}>
                  {profile.title}
                </p>

                <div className={`pu-profile-gallery--modal`} data-modal={toggle}>
                  <div className={`container`}>
                    <div className={`box`}>
                      <div className={`modal--close-button`}  aria-label="close">
                        <i class="fas fa-times" aria-hidden="true"></i>
                      </div>
                      <div className={`modal--img-container`}>
                        <div className={ `image is-square` }
                          role="img"
                          style={ { backgroundImage: `url(${ profile.photoUrl })` } }
                          aria-label={ profile.photoAlt }
                        ></div>
                      </div>
                      <div className={`modal--content-container`}>
                        <p className={`pu-profile-gallery--name`}>
                          {profile.name}
                        </p>
                        <p className={`pu-profile-gallery--title`}>
                          {profile.title}
                        </p>

                        <RichText.Content 
                          className={`pu-profile-gallery--bio`}
                          tagName="p"
                          value={profile.bio}
                        />

                        <button className={`modal--secondary-close-button`}>
                          {'< BACK TO ARTICLE'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    );
    return returned;
  },
} );