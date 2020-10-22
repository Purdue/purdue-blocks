/* eslint-disable react/jsx-key */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
// import './editor.scss';
// import './style.scss';
import { createBlock } from '@wordpress/blocks';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { withSelect, withDispatch } = wp.data;

const {
  PanelBody,
  PanelRow,
  RangeControl,
  CheckboxControl,
  TextControl,
  TextareaControl,
  Button,
} = wp.components;
const {
  useState,
  Component,
  Fragment,
} = wp.element;
const {
  InnerBlocks,
  InspectorControls,
  RichText,
  MediaUploadCheck,
  MediaUpload,
} = wp.blockEditor;

const applyWithSelect = withSelect( ( select ) => {
	const { getMedia, getPostType } = select( 'core' );
	const { getCurrentPostId, getEditedPostAttribute } = select( 'core/editor' );
	const featuredImageId = getEditedPostAttribute( 'featured_media' );

	return {
		media: featuredImageId ? getMedia( featuredImageId ) : null,
		currentPostId: getCurrentPostId(),
		postType: getPostType( getEditedPostAttribute( 'type' ) ),
		featuredImageId,
		isDisabled: select( 'core/edit-post' ).isFeatureActive( 'disableEditorsKitDragAndDropFeaturedTools' ),
	};
} );

const post_id = applyWithSelect.currentPostId;

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
registerBlockType( 'purdue-blocks/podcast', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Podcast' ), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="ellipsis-h"
      className="svg-inline--fa fa-podcast fa-w-14 fa-7x"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="#8E6F3E"
        d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z"
      ></path>
    </svg>
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
    isChecked: { type: 'boolean', default: false },
    urlText: { type: 'string', default: '' },
    internalFile: { type: 'string', default: '' },
    coverImage: { type: 'string', default: '' },
    altText: { type: 'string', default: '' },
    podcastName: { type: 'string', default: '' },
    shortDescription: { type: 'string', default: '' },
    episodeNumber: { type: 'string', default: '' },
    episodeTitle: { type: 'string', default: '' },
    fullDescription: { type: 'string', default: '' },
    listenOnUrls: { type: 'array', default: []
    },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add this block and add a Podcast episode.'
  ),

  edit: ( props ) => {
    const [ isChecked, setChecked ] = useState( false );
    const handleAddVideoCard = () => {
      const listenOnUrls = [ ...props.attributes.listenOnUrls ];
      listenOnUrls.push( {
        chennelname: '',
        chennelUrl: '',
      } );
      props.setAttributes( { listenOnUrls } );
    }; //End handleAddVideoCard
    const handleRemoveVideoCard = ( index ) => {
      const listenOnUrls = [ ...props.attributes.listenOnUrls ];
      listenOnUrls.splice( index, 1 );
      props.setAttributes( { listenOnUrls } );
    }; //End handleRemoveVideoCard
    const handleChangeVideoCardVideo = ( chennelname, index ) => {
      const listenOnUrls = [ ...props.attributes.listenOnUrls ];
      listenOnUrls[ index ].chennelname = chennelname;
      props.setAttributes( { listenOnUrls } );
    }; // End handleChangeVideoCardVideo
    const handleChangeVideoCardDescription = ( chennelUrl, index ) => {
      const listenOnUrls = [ ...props.attributes.listenOnUrls ];
      listenOnUrls[ index ].chennelUrl = chennelUrl;
      props.setAttributes( { listenOnUrls } );
    }; // End handleChangeVideoCardDescription

    let videoFields,
        videoDisplay;
    if ( props.attributes.listenOnUrls.length ) {
      videoFields = props.attributes.listenOnUrls.map( ( card, index ) => {
        return  <Fragment key={index}>
                  <TextControl
                    className="purdue_video_carousel_url"
                    placeholder="Channel Name"
                    value={ props.attributes.listenOnUrls[ index ].chennelname }
                    onChange={ ( chennelname ) =>  handleChangeVideoCardVideo( chennelname, index ) }
                  />
                  <TextControl
                    className="video_carrousel_description"
                    placeholder="Channel URL"
                    value={ props.attributes.listenOnUrls[ index ].chennelUrl }
                    onChange={ ( chennelUrl ) => handleChangeVideoCardDescription( chennelUrl, index ) }
                  />
                  <Button
                    className={ 'bulma-blocks-editor-site-hero__button is-danger' }
                    onClick={ () => handleRemoveVideoCard( index ) }
                  >
                    Remove Chennel
                  </Button>
                  <hr />
                </Fragment>
      } );

      videoDisplay = props.attributes.listenOnUrls.map( ( card, index ) => {
        return  <a key={ index } className='item' href={ card.chennelUrl } target="_blank">
                    { card.chennelname }
                </a>;
      } );
    }
    return [
      <InspectorControls>
      <PanelBody title={ __( 'Listen On Chennels' ) }>
        { videoFields }
        <Button
          isDefault
          onClick={ handleAddVideoCard.bind( this ) }
        >
          { __( 'Add Chennel' ) }
        </Button>
        <hr />
        </PanelBody>
        <PanelBody>
          <PanelRow>
            <TextControl
              label="Espisode Number"
              value={ props.attributes.episodeNumber }
              onChange={ ( episodeNumber ) => props.setAttributes( { episodeNumber } ) }
              type="number"
            />
          </PanelRow>
          <PanelRow>
            <MediaUploadCheck>
              <label>{ __('Cover Image') }
              <MediaUpload
                allowedTypes={['image']}
                onSelect={ ( coverImage ) => {
                  props.setAttributes( {
                    coverImage: coverImage.url,
                    altText:
                      props.attributes.altText !== '' ?
                        props.attributes.altText :
                        coverImage.alt,
                  } );
                } }
                render={ ( { open } ) => {
                  return props.attributes.coverImage !== '' ? (
                    <div className={ 'bulma-blocks-editor-home-card__preview' }>
                      <figure className={ 'image' }>
                        <img
                          alt={ props.attributes.altText }
                          src={ props.attributes.coverImage }
                        />
                      </figure>
                      <Button
                        className={ 'bulma-blocks-editor-home-card__button' }
                        onClick={ open }
                      >
                        Update Image
                      </Button>
                    </div>
                  ) : (
                    <div className={ 'bulma-blocks-editor-home-card__container' }>
                      <p className={ 'bulma-blocks-editor-home-card__description' }>
                        Pick an image from the media library.
                      </p>
                      <Button
                        className={ 'bulma-blocks-editor-home-card__button' }
                        onClick={ open }
                      >
                        Open Media Library
                      </Button>
                    </div>
                  );
                } }
              />
              </label>
            </MediaUploadCheck>
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Podcast Source"
              help="Is the Podcast episode loading from an external source?"
              checked={ props.attributes.isChecked }
              onChange={ (isChecked) => {
                props.setAttributes( { isChecked: isChecked } );
              } }
            />
          </PanelRow>
          { props.attributes.isChecked ? (
            <PanelRow>
              <TextControl
                label="Podcast URL"
                value={ props.attributes.urlText }
                onChange={ ( urlText ) => props.setAttributes( { urlText } ) }
              />
            </PanelRow>
            ) : (
            <PanelRow>
              <MediaUploadCheck>
                <label>{ __('Podcast File') }
                <MediaUpload
                  allowedTypes={['audio']}
                  onSelect={ ( internalFile ) => {
                    props.setAttributes( {
                      internalFile: internalFile.url,
                    } );
                  } }
                  render={ ( { open } ) => {
                    return props.attributes.internalFile !== '' ? (
                      <div className={ 'bulma-blocks-editor-home-card__preview' }>
                        <TextControl
                          value={ props.attributes.internalFile }
                          disabled = {true}
                        />
                        <Button
                          className={ 'bulma-blocks-editor-home-card__button' }
                          onClick={ open }
                        >
                          Update File
                        </Button>
                      </div>
                    ) : (
                      <div className={ 'bulma-blocks-editor-home-card__container' }>
                        <p className={ 'bulma-blocks-editor-home-card__description' }>
                          Pick a file from the library.
                        </p>
                        <Button
                          className={ 'bulma-blocks-editor-home-card__button' }
                          onClick={ open }
                        >
                          Open Media Library
                        </Button>
                      </div>
                    );
                  } }
                />
                </label>
              </MediaUploadCheck>
            </PanelRow>
            )
          }
        </PanelBody>
      </InspectorControls>,

      <div className='purdue_podcast'>
        <div className="columns">
          <div className="column">
            <div className="purdue_podcast_podcast_name">
              <RichText
                tagName="h2"
                label="Podcast Name"
                value={ props.attributes.podcastName }
                onChange={ ( podcastName ) => props.setAttributes( { podcastName } ) }
                placeholder={ __( 'Podcast Name' ) }
              />
            </div>
          </div>
        </div>
        <div className="columns purdue_podcast_desc">
          <div className="column is-one-quarter">
            <img className="purdue_podcast_episode_cover_image" src={ props.attributes.coverImage } alt={ props.attributes.altText } />
          </div>
          <div className="column is-three-quarters">
            <div className="purdue_podcast_episode_short_desc">
              <RichText
                tagName="div"
                multiline="p"
                label="Short Description"
                value={ props.attributes.shortDescription }
                onChange={ ( shortDescription ) => props.setAttributes( { shortDescription } ) }
                placeholder={ __( 'Short Description' ) }
              />
            </div>
            <div className="purdue_podcast_episode_links">
              <strong>{__('Listen on: ')}</strong> { videoDisplay }
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="purdue_podcast_episode_player">
              <div className="purdue_podcast_controls">
                <div className="purdue_podcast_controls_pause">
                  <div className="purdue_podcast_controls_pause_playing">
                    NOW PLAYING
                    <button id="play" className="purdue_podcast_controls_pause_share_play">
                      <span className="purdue_podcast_controls_pause_share_play_border"><i className="fas fa-play"></i><i class="fas fa-pause hidden"></i></span>
                    </button>
                  </div>
                  <div className="purdue_podcast_controls_pause_button"></div>
                </div>
                <div className="purdue_podcast_controls_black">
                  <div className="purdue_podcast_controls_black_elapsed">00:00:00</div>
                  <div className="purdue_podcast_controls_black_timeline"><span className="time_elapsed"></span></div>
                  <div className="purdue_podcast_controls_black_total">00:00:00</div>
                  <div className="purdue_podcast_controls_black_volume"><i class="fas fa-volume-up"></i><i class="fas fa-volume-mute hidden"></i></div>
                  <div className="purdue_podcast_controls_black_speed"><button class="pcast-speed">1x</button></div>
                  { isChecked ? (
                  <audio src={ props.attributes.urlText }></audio> ) : (
                    <audio src={ props.attributes.internalFile }></audio>
                  )
                }
                </div>
              </div>
              <div class="modal">
                <div class="modal-background"></div>
                  <div class="modal-content">
                    <div class="top_article_data">
                      <div class="top_article_data_share">
                        <a id="share_text" class="top_article_data_share_text " target="_blank" aria-label={`Share link https://youtu.be/${ post_id }`} href={`https://youtu.be/${ post_id }`} title="Share link">{`https://youtu.be/${ post_id }`}</a>
                        <a class="top_article_data_share_button" href={`https://www.facebook.com/sharer/sharer.php?u=https://youtu.be/${ post_id }`} title="Share on Facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        <a class="top_article_data_share_button" href={`https://www.linkedin.com/sharing/share-offsite/?url=https://youtu.be/${ post_id }`} title="Share on Linkedin" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                        <a class="top_article_data_share_button" href={`https://twitter.com/intent/tweet?text=https://youtu.be/${ post_id }`} title="Share on Twitter" target="_blank"><i class="fab fa-twitter"></i></a>
                        <a class="top_article_data_share_button" href={`mailto:?subject=&body=https://youtu.be/${ post_id }`} title="{{ Drupal.t('Share via Email') }}" target="_blank"><i class="fas fa-envelope"></i></a>
                      </div>
                    </div>
                  </div>
                  <button class="modal-close is-large" aria-label="close"></button>
                </div>
              </div>
              <div className="purdue_podcast_episode_box">
                <div className="purdue_podcast_episode_number">
                  {__('Espisode # ')}{ props.attributes.episodeNumber }
                </div>
                <div className="purdue_podcast_episode_title">
                  <RichText
                    tagName="h3"
                    value={ props.attributes.episodeTitle }
                    onChange={ ( episodeTitle ) => props.setAttributes( { episodeTitle } ) }
                    placeholder={ __( "Episode Name" ) }
                  />
                </div>
                <div className="purdue_podcast_episode_date">
                </div>
                <div className="purdue_podcast_full_desc">
                <RichText
                  tagName="div"
                  multiline="p"
                  label="Full Description"
                  value={ props.attributes.fullDescription }
                  onChange={ ( fullDescription ) => props.setAttributes( { fullDescription } ) }
                  placeholder={ __( "Full Description" ) }
                />
                </div>
                <div className="purdue_podcast_controls_pause_share">
                  <button className="purdue_podcast_controls_pause_share_share"><i className="fas fa-share"></i> Share</button>
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
  save: ( props ) => {
    const videoFields = props.attributes.listenOnUrls.map( ( card, index ) => {
      return  <a key={ index } className='item' href={ card.chennelUrl } target="_blank">
                  { card.chennelname }
              </a>;
    } );
    return (
    <div className='purdue_podcast'>
      <div className="columns">
        <div className="column">
          <div className="purdue_podcast_podcast_name">
            <RichText.Content tagName="h2" value={ props.attributes.podcastName } />
          </div>
        </div>
      </div>
      <div className="columns purdue_podcast_desc">
        <div className="column is-one-quarter">
          <img className="purdue_podcast_episode_cover_image" src={ props.attributes.coverImage } alt={ props.attributes.altText } />
        </div>
        <div className="column is-three-quarters">
          <div className="purdue_podcast_episode_short_desc">
            <RichText.Content tagName="div" multiline="p" value={ props.attributes.shortDescription } />
          </div>
          <div className="purdue_podcast_episode_links">
            <strong>{__('Listen on: ')}</strong> { videoFields }
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="purdue_podcast_episode_player">
            <div className="purdue_podcast_controls">
              <div className="purdue_podcast_controls_pause">
                <div className="purdue_podcast_controls_pause_playing">
                  NOW PLAYING
                  <button id="play" className="purdue_podcast_controls_pause_share_play">
                    <span className="purdue_podcast_controls_pause_share_play_border"><i className="fas fa-play"></i><i class="fas fa-pause hidden"></i></span>
                  </button>
                </div>
                <div className="purdue_podcast_controls_pause_button"></div>
              </div>
              <div className="purdue_podcast_controls_black">
                <div className="purdue_podcast_controls_black_elapsed">00:00:00</div>
                <div className="purdue_podcast_controls_black_timeline"><span className="time_elapsed"></span></div>
                <div className="purdue_podcast_controls_black_total">00:00:00</div>
                <div className="purdue_podcast_controls_black_volume"><i class="fas fa-volume-up"></i><i class="fas fa-volume-mute hidden"></i></div>
                <div className="purdue_podcast_controls_black_speed"><button class="pcast-speed">1x</button></div>
                { props.attributes.isChecked ? (
                <audio src={ props.attributes.urlText }></audio> ) : (
                  <audio src={ props.attributes.internalFile }></audio>
                )
              }
              </div>
            </div>
            <div class="modal">
              <div class="modal-background"></div>
                <div class="modal-content">
                  <div class="top_article_data">
                    <div class="top_article_data_share">
                      <a id="share_text" class="top_article_data_share_text " target="_blank" aria-label={`Share link https://youtu.be/${ post_id }`} href={`https://youtu.be/${ post_id }`} title="Share link">{`https://youtu.be/${ post_id }`}</a>
                      <a class="top_article_data_share_button" href={`https://www.facebook.com/sharer/sharer.php?u=https://youtu.be/${ post_id }`} title="Share on Facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>
                      <a class="top_article_data_share_button" href={`https://www.linkedin.com/sharing/share-offsite/?url=https://youtu.be/${ post_id }`} title="Share on Linkedin" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                      <a class="top_article_data_share_button" href={`https://twitter.com/intent/tweet?text=https://youtu.be/${ post_id }`} title="Share on Twitter" target="_blank"><i class="fab fa-twitter"></i></a>
                      <a class="top_article_data_share_button" href={`mailto:?subject=&body=https://youtu.be/${ post_id }`} title="{{ Drupal.t('Share via Email') }}" target="_blank"><i class="fas fa-envelope"></i></a>
                    </div>
                  </div>
                </div>
                <button class="modal-close is-large" aria-label="close"></button>
              </div>
            </div>
            <div className="purdue_podcast_episode_box">
              <div className="purdue_podcast_episode_number">
                {__('Espisode # ')}{ props.attributes.episodeNumber }
              </div>
              <div className="purdue_podcast_episode_title">
                <RichText.Content tagName="h3" value={ props.attributes.episodeTitle } />
              </div>
              <div className="purdue_podcast_episode_date">
              </div>
              <div className="purdue_podcast_full_desc">
                <RichText.Content tagName="div" multiline="p" value={ props.attributes.fullDescription } />
              </div>
              <div className="purdue_podcast_controls_pause_share">
                <button className="purdue_podcast_controls_pause_share_share"><i className="fas fa-share"></i> Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  },
} );
