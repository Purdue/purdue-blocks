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
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.75 100"><defs></defs><g id="lightbulb" class="cls-1"><g class="cls-1"><path class="color-d9ab28" d="M84.38,34.38A34.21,34.21,0,0,1,75.87,57c-3.25,3.71-8.35,11.49-10.24,18H56.26v0a11,11,0,0,1,.43-2.79A61.73,61.73,0,0,1,68.82,50.81a25,25,0,1,0-37.64,0A61.7,61.7,0,0,1,43.33,72.23,9.49,9.49,0,0,1,43.74,75v0H34.37c-1.89-6.51-7-14.29-10.24-18A34.37,34.37,0,1,1,84.38,34.38ZM53.12,18.75A3.12,3.12,0,0,1,50,21.88a12.51,12.51,0,0,0-12.5,12.5,3.13,3.13,0,0,1-6.25,0A18.77,18.77,0,0,1,50,15.63,3.11,3.11,0,0,1,53.12,18.75ZM34.38,81.25H65.62v8.43a3.11,3.11,0,0,1-.52,1.73L60.3,98.6a3.1,3.1,0,0,1-2.6,1.4H42.3a3.1,3.1,0,0,1-2.6-1.4l-4.79-7.19a3.11,3.11,0,0,1-.52-1.73Z" transform="translate(-15.62)"/></g></g></svg>
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
    'This block adds a row of one or two testimonials to your page. It pulls from testimonial posts from this site and requires the installation of acf-to-rest-api to work.'
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
          <div className="testimonial__list columns is-multiline">
            { posts.map( post =>{
              if ( props.attributes.selectedPosts && props.attributes.selectedPosts.length > 0 ) {
                return (
                  props.attributes.selectedPosts.map( selectedPost => {
                    if ( post.id == selectedPost ) {
                      if ( props.attributes.selectedPosts.length === 2 ) {
                        return (
                          <div className="column is-full-mobile is-full-tablet is-half-desktop">
                            <div className="testimonial__item">
                              <div className="testimonial__body testimonial__body--small">
                                { post.img ? ( <img src={ post.img.source_url } alt={ post.img.alt_text } /> ) : '' }
                                { ! post.excerpt.raw ? ( <p className="testimonial__content">{ post.content.raw.replace( /<!--(?!>)[\S\s]*?-->/g, '' ).replace( /(<([^>]+)>)/ig, '' ) }</p> ) :
                                  ( <p className="testimonial__content">{ post.excerpt.raw }</p> ) }
                                <p className="testimonial__name">{ post.acf.name }</p>
                                <p className="testimonial__info">{ post.acf.persons_information }</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div className="column">
                          <div className="testimonial__item testimonial--big">
                            <div className="testimonial__body testimonial__body--big">
                              { post.img ? ( <img src={ post.img.source_url } alt={ post.img.alt_text } /> ) : '' }
                              { ! post.excerpt.raw ? ( <p className="testimonial__content">{ post.content.raw.replace( /<!--(?!>)[\S\s]*?-->/g, '' ).replace( /(<([^>]+)>)/ig, '' ) }</p> ) :
                                ( <p className="testimonial__content">{ post.excerpt.raw }</p> ) }
                              <p className="testimonial__name">{ post.acf.name }</p>
                              <p className="testimonial__info">{ post.acf.persons_information }</p>
                            </div>
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
