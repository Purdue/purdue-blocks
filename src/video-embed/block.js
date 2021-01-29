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
  PanelBody,
  PanelRow,
  RangeControl,
  CheckboxControl,
  TextControl,
} = wp.components;
const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;

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
registerBlockType( 'purdue-blocks/video-embed', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Video Embed' ), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="ellipsis-h"
      className="svg-inline--fa fa-ellipsis-h fa-w-12"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path
        fill="#8E6F3E"
        d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
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
    urlText: { type: 'string', default: '' },
  },

  supports: {
    className: false,
  },

  // Block description in side panel
  description: __(
    'Add this block and paste the YouTube video link to embed it.'
  ),

  edit: ( props ) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = props.attributes.urlText.match( regExp );
    const video_id = (match&&match[7].length==11)? match[7] : false;
    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
          <TextControl
            className="purdue_video_url"
            placeholder="YouTube URL"
            value={ props.attributes.urlText }
            onChange={ ( urlText ) => props.setAttributes( {urlText} ) }
          />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className='purdue_video'>
        <iframe title="" src={`https://www.youtube.com/embed/${ video_id }`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" rel="0" allowfullscreen/>
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
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = props.attributes.urlText.match( regExp );
    const video_id = (match&&match[7].length==11)? match[7] : false;

    return  <div className='purdue_video'>
      <iframe id="player" type="text/html" src={`https://www.youtube.com/embed/${ video_id }?modestbranding=1&rel=0&theme=light&controls=0&enablejsapi=1`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" rel="0" allowfullscreen/>
        <div className="purdue_video_controls">
          <div className="purdue_video_controls_pause">
            <div className="purdue_video_controls_pause_share">
              <button className="purdue_video_controls_pause_share_share"><i className="fas fa-share video-embed__share"></i> Share</button>
              <button id="play" className="purdue_video_controls_pause_share_play">
                <span className="purdue_video_controls_pause_share_play_border"><i className="fas fa-play"></i><i class="fas fa-pause hidden"></i></span>
              </button>
            </div>
            <div className="purdue_video_controls_pause_button"></div>
          </div>
          <div className="purdue_video_controls_black">
            <div className="purdue_video_controls_black_elapsed"></div>
            <div className="purdue_video_controls_black_timeline"><span className="time_elapsed"></span></div>
            <div className="purdue_video_controls_black_total"></div>
            <div className="purdue_video_controls_black_volume"><i class="fas fa-volume-up"></i><i class="fas fa-volume-mute hidden"></i></div>
            <div className="purdue_video_controls_black_fullscreen"><i class="fas fa-expand"></i></div>
          </div>
        </div>
        <div class="modal">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="top_article_data">
              <div class="top_article_data_share">
                <a id="share_text" class="top_article_data_share_text " target="_blank" aria-label={`Share link https://youtu.be/${ video_id }`} href={`https://youtu.be/${ video_id }`} title="Share link" rel="noopener noreferrer">{`https://youtu.be/${ video_id }`}</a>
                <a class="top_article_data_share_button" href={`https://www.facebook.com/sharer/sharer.php?u=https://youtu.be/${ video_id }`} title="Share on Facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
                <a class="top_article_data_share_button" href={`https://www.linkedin.com/sharing/share-offsite/?url=https://youtu.be/${ video_id }`} title="Share on Linkedin" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
                <a class="top_article_data_share_button" href={`https://twitter.com/intent/tweet?text=https://youtu.be/${ video_id }`} title="Share on Twitter" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                <a class="top_article_data_share_button" href={`mailto:?subject=&body=https://youtu.be/${ video_id }`} title="{{ Drupal.t('Share via Email') }}" target="_blank" rel="noopener noreferrer"><i class="fas fa-envelope"></i></a>
              </div>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close"></button>
        </div>
      </div>
  },
} );
