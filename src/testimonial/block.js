/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

/**
 * BLOCK: Bulma Container
 *
 * Bulma container block: https://bulma.io/documentation/layout/container/.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const {
  PanelBody,
  PanelRow,
  SelectControl,
} = wp.components;
const { InspectorControls } = wp.blockEditor;
const { withSelect } = wp.data;

// Array of social media share options.
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
registerBlockType( 'purdue-blocks/testimonial', {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __( 'Testimonial' ), // Block title.
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="object-group"
      className="svg-inline--fa fa-object-group fa-w-16"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#8E6F3E"
        d="M480 128V96h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v20H64V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v40c0 6.627 5.373 12 12 12h20v320H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-20h384v20c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-20V128zM96 276V140c0-6.627 5.373-12 12-12h168c6.627 0 12 5.373 12 12v136c0 6.627-5.373 12-12 12H108c-6.627 0-12-5.373-12-12zm320 96c0 6.627-5.373 12-12 12H236c-6.627 0-12-5.373-12-12v-52h72c13.255 0 24-10.745 24-24v-72h84c6.627 0 12 5.373 12 12v136z"
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
    posts: { type: 'array', default: [] },
    selectedPosts: { type: 'array', default: [] },
  },

  // Block description in side panel
  description: __(
    'This block adds a row of one or two testimonials to your page.'
  ),
  edit: withSelect( ( select )=> {
    const posts = wp.data.select( 'core' ).getEntityRecords( 'postType', 'test_post', { per_page: -1, _embed: true } );
    return {
      posts,
    };
  } )( ( props )=>{
    const { posts } = props;

    if ( ! posts ) {
      return ( <div className="pu-blocks-editor-testimonial"><p className="error-message">loading..</p></div> );
    }
    if ( posts.length === 0 ) {
      return ( <div className="pu-blocks-editor-testimonial"><p className="error-message">No testimonial posts</p></div> );
    }
    posts.map( ( post )=>{
      post.img = post._embedded[ 'wp:featuredmedia' ][ 0 ];
    } )
    props.setAttributes( { posts: posts } );

    const options = [];
    for ( let i = 0; i < posts.length; i++ ) {
      const option = { value: posts[ i ].id,
        label: posts[ i ].title.rendered,
      };
      options.push( option );
    }

    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <SelectControl
              multiple
              label={ __( 'Select one or two testimonials:' ) }
              value={ props.attributes.selectedPosts } // e.g: value = [ 'a', 'c' ]
              onChange={ ( selectedPosts ) => {
                if ( selectedPosts.length <= 2 ) {
                  props.setAttributes( { selectedPosts } );
                } else {
                  props.setAttributes( { selectedPosts: selectedPosts.slice( 0, 2 ) } );
                }
              } }
              options={ options }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className="pu-blocks-editor-testimonial">
        <div className="testimonial__section container">
          <h2>Testimonials</h2>
          <div className="testimonial__list columns">
            { props.attributes.posts.map( post =>{
              if ( props.attributes.selectedPosts && props.attributes.selectedPosts.length > 0 ) {
                return (
                  props.attributes.selectedPosts.map( selectedPost => {
                    if ( post.id == selectedPost ) {
                      return (
                        <div className="column">
                          <div className="testimonial__item">
                            { props.attributes.selectedPosts.length === 2 ? (
                              <div className="testimonial__body testimonial__body--small">
                                { post.img ? ( <img src={ post.img.source_url } alt={ post.img.alt_text } /> ) : '' }
                                { ! post.excerpt.raw ? ( <p className="testimonial__content">"{ post.content.raw.replace( /<!--(?!>)[\S\s]*?-->/g, '' ).replace( /(<([^>]+)>)/ig, '' ) }"</p> ) :
                                  ( <p className="testimonial__content">"{ post.excerpt.raw }"</p> ) }
                                <p className="testimonial__name">{ post.acf.name }</p>
                                <p className="testimonial__info">{ post.acf.persons_information }</p>
                              </div>
                            ) : ( <div className="testimonial__body testimonial__body--big">
                              { post.img ? ( <img src={ post.img.source_url } alt={ post.img.alt_text } /> ) : '' }
                              { ! post.excerpt.raw ? ( <p className="testimonial__content">"{ post.content.raw.replace( /<!--(?!>)[\S\s]*?-->/g, '' ).replace( /(<([^>]+)>)/ig, '' ) }"</p> ) :
                                ( <p className="testimonial__content">"{ post.excerpt.raw }"</p> ) }
                              <p className="testimonial__name">{ post.acf.name }</p>
                              <p className="testimonial__info">{ post.acf.persons_information }</p>
                            </div> ) }
                          </div>
                        </div>
                      );
                      // } )
                    }
                  } ) )
              }
            }
            ) }
          </div>
        </div>
      </div>,
    ];
  } ),

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
    const posts = props.attributes.posts;
    return (
      <div className="pu-blocks-testimonial">
        <div className="testimonial__section container">
          <h2>Testimonials</h2>
          <div className="testimonial__list columns">
            { posts.map( post =>{
              if ( props.attributes.selectedPosts && props.attributes.selectedPosts.length > 0 ) {
                return (
                  props.attributes.selectedPosts.map( selectedPost => {
                    if ( post.id == selectedPost ) {
                      return (
                        <div className="column">
                          <div className="testimonial__item">
                            { props.attributes.selectedPosts.length === 2 ? (
                              <div className="testimonial__body testimonial__body--small">
                                { post.img ? ( <img src={ post.img.source_url } alt={ post.img.alt_text } /> ) : '' }
                                { ! post.excerpt.raw ? ( <p className="testimonial__content">{ post.content.raw.replace( /<!--(?!>)[\S\s]*?-->/g, '' ).replace( /(<([^>]+)>)/ig, '' ) }</p> ) :
                                  ( <p className="testimonial__content">{ post.excerpt.raw }</p> ) }
                                <p className="testimonial__name">{ post.acf.name }</p>
                                <p className="testimonial__info">{ post.acf.persons_information }</p>
                              </div>
                            ) : ( <div className="testimonial__body testimonial__body--big">
                              { post.img ? ( <img src={ post.img.source_url } alt={ post.img.alt_text } /> ) : '' }
                              { ! post.excerpt.raw ? ( <p className="testimonial__content">{ post.content.raw.replace( /<!--(?!>)[\S\s]*?-->/g, '' ).replace( /(<([^>]+)>)/ig, '' ) }</p> ) :
                                ( <p className="testimonial__content">{ post.excerpt.raw }</p> ) }
                              <p className="testimonial__name">{ post.acf.name }</p>
                              <p className="testimonial__info">{ post.acf.persons_information }</p>
                            </div> ) }
                          </div>
                        </div>
                      );
                    }
                  } ) )
              }
            }
            ) }
          </div>
        </div>
      </div>
    )
  },

} );
