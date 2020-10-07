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

const {
  Placeholder,
  Button,
  FormFileUpload,
  SelectControl,
  IconButton,
  PanelBody,
  PanelRow,
  Toolbar,
  BaseControl,
  TextControl,
} = wp.components;
const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
const {
  Component,
  Fragment,
} = wp.element;

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
registerBlockType( 'purdue-blocks/video-carousel', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Video Carousel' ), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="photo-video"
      className="svg-inline--fa fa-photo-video fa-w-20 fa-7x"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
    >
      <path fill="#8E6F3E" d="M608 0H160a32 32 0 0 0-32 32v96h160V64h192v320h128a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zM232 103a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm352 208a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm-168 57H32a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM96 224a32 32 0 1 1-32 32 32 32 0 0 1 32-32zm288 224H64v-32l64-64 32 32 128-128 96 96z" class=""></path>
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
    videoCards: {
      type: 'array',
      default: {
        cardVideoUrl: {
          type: 'string',
          default: '',
        },
        description: {
          type: 'string',
          default: '',
        },
      },
    },
    videosUrl: { type: 'string', default: '' },
    videosUrlText: { type: 'string', default: '' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add this block to add Videos in a Carousel.'
  ),

  edit: ( props ) => {
    const handleAddVideoCard = () => {
      const videoCards = [ ...props.attributes.videoCards ];
      videoCards.push( {
        cardVideoUrl: '',
        description: '',
      } );
      props.setAttributes( { videoCards } );
    }; //End handleAddVideoCard
    const handleRemoveVideoCard = ( index ) => {
      const videoCards = [ ...props.attributes.videoCards ];
      videoCards.splice( index, 1 );
      props.setAttributes( { videoCards } );
    }; //End handleRemoveVideoCard
    const handleChangeVideoCardVideo = ( cardVideoUrl, index ) => {
      const videoCards = [ ...props.attributes.videoCards ];
      videoCards[ index ].cardVideoUrl = cardVideoUrl;
      props.setAttributes( { videoCards } );
    }; // End handleChangeVideoCardVideo
    const handleChangeVideoCardDescription = ( description, index ) => {
      const videoCards = [ ...props.attributes.videoCards ];
      videoCards[ index ].description = description;
      props.setAttributes( { videoCards } );
    }; // End handleChangeVideoCardDescription
    const handleChangeVideosUrl = ( videosUrl ) => {
      this.videosUrl = videosUrl;
      props.setAttributes( { videosUrl } );
    }; // End handleChangeVideosUrl
    const handleChangeVideosUrlText = ( videosUrlText ) => {
      this.videosUrl = videosUrlText;
      props.setAttributes( { videosUrlText } );
    }; // End handleChangeVideosUrl

    let videoFields,
        videoDisplay;

    if ( props.attributes.videoCards.length ) {
      videoFields = props.attributes.videoCards.map( ( card, index ) => {
        return  <Fragment key={index}>
                  <TextControl
                    className="purdue_video_carousel_url"
                    placeholder="YouTube URL"
                    value={ props.attributes.videoCards[ index ].cardVideoUrl }
                    onChange={ ( cardVideoUrl ) =>  handleChangeVideoCardVideo( cardVideoUrl, index ) }
                  />
                  <TextControl
                    className="video_carrousel_description"
                    placeholder="Description"
                    value={ props.attributes.videoCards[ index ].description }
                    onChange={ ( description ) => handleChangeVideoCardDescription( description, index ) }
                  />
                  <Button
                    className={ 'bulma-blocks-editor-site-hero__button is-danger' }
                    onClick={ () => handleRemoveVideoCard( index ) }
                  >
                    Remove Video
                  </Button>
                  <hr />
                </Fragment>
      } );

      videoDisplay = props.attributes.videoCards.map( ( card, index ) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = card.cardVideoUrl.match( regExp );
        const video_id = (match&&match[7].length==11)? match[7] : false;
        return  <div key={ index } className='item'>
                  <div className='purdue_video'>
                    <iframe title="" src={`https://www.youtube.com/embed/${ video_id }`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" rel="0" allowfullscreen/>
                  </div>
                  <div className='purdue_video_carousel_description'>
                    <p>{ card.description }</p>
                  </div>
                </div>;
      } );
    }

    return [
      <InspectorControls key="1">
        <PanelBody title={ __( 'Video Carousel Cards' ) }>
          { videoFields }
          <Button
            isDefault
            onClick={ handleAddVideoCard.bind( this ) }
          >
            { __( 'Add Video Card' ) }
          </Button>
          <hr />
          <TextControl
            className="video_carrousel_url_text"
            placeholder="Videos URL Link Text"
            value={ props.attributes.videosUrlText }
            onChange={ ( videosUrlText ) => handleChangeVideosUrlText( videosUrlText ) }
          />
          <TextControl
            className="video_carrousel_url"
            placeholder="Videos URL"
            value={ props.attributes.videosUrl }
            onChange={ ( videosUrl ) => handleChangeVideosUrl( videosUrl ) }
          />
        </PanelBody>
      </InspectorControls>,
      <div key="2" className={ props.className } className='carousel-video'>
        { videoDisplay }
      </div>,
    ];
  },

  save: ( props ) => {
    const videoFields = props.attributes.videoCards.map( ( card, index ) => {
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const match = card.cardVideoUrl.match( regExp );
      const video_id = (match&&match[7].length==11)? match[7] : false;
      return  <div key={ index } className='item'>
                <div className='purdue_video_carousel'>
                  <iframe title="" src={`https://www.youtube.com/embed/${ video_id }`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" rel="0" allowfullscreen/>
                </div>
                <div className='purdue_video_carousel_description'>
                  <p>{ card.description }</p>
                </div>
              </div>;
    } );
    return (
      <div className={ props.className } className='videos-carousel'>
        <div className='videos-carousel-inner'>
          { videoFields }
        </div>
        <div className={ 'read-more-button' }>
        <a
          href={ props.attributes.videosUrl }
          className={ 'media home-card-horizontal' }
          rel="noopener noreferrer"
        >
          <span>{ props.attributes.videosUrlText !== '' ? props.attributes.videosUrlText : 'Read More' }</span>
        </a>
        </div>
      </div>
    );
  },
} );
