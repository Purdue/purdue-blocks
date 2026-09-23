/* eslint-disable react/jsx-key */
/* eslint-disable no-nested-ternary */

import dep from './dep';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
  PanelBody,
  PanelRow,
  SelectControl,
} = wp.components;
const { InspectorControls } = wp.blockEditor;
const { withSelect } = wp.data;

registerBlockType( 'purdue-blocks/testimonial', {
  title: __( 'Testimonial' ),
  icon: (
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68.75 100"><defs></defs><g id="lightbulb" class="cls-1"><g class="cls-1"><path class="color-d9ab28" d="M84.38,34.38A34.21,34.21,0,0,1,75.87,57c-3.25,3.71-8.35,11.49-10.24,18H56.26v0a11,11,0,0,1,.43-2.79A61.73,61.73,0,0,1,68.82,50.81a25,25,0,1,0-37.64,0A61.7,61.7,0,0,1,43.33,72.23,9.49,9.49,0,0,1,43.74,75v0H34.37c-1.89-6.51-7-14.29-10.24-18A34.37,34.37,0,1,1,84.38,34.38ZM53.12,18.75A3.12,3.12,0,0,1,50,21.88a12.51,12.51,0,0,0-12.5,12.5,3.13,3.13,0,0,1-6.25,0A18.77,18.77,0,0,1,50,15.63,3.11,3.11,0,0,1,53.12,18.75ZM34.38,81.25H65.62v8.43a3.11,3.11,0,0,1-.52,1.73L60.3,98.6a3.1,3.1,0,0,1-2.6,1.4H42.3a3.1,3.1,0,0,1-2.6-1.4l-4.79-7.19a3.11,3.11,0,0,1-.52-1.73Z" transform="translate(-15.62)"/></g></g></svg>
  ),
  category: 'purdue-blocks',
  keywords: [],

  attributes: {
    posts: { type: 'array', default: [] },
    selectedPosts: { type: 'array', default: [] },
  },

  description: __(
    'This block adds a row of one or two testimonials to your page. It pulls from testimonial posts from this site and requires the installation of acf-to-rest-api to work.'
  ),

  edit: withSelect( ( select ) => {
    const posts = wp.data.select( 'core' ).getEntityRecords( 'postType', 'test_post', { per_page: -1, _embed: true } );
    return { posts };
  } )( ( props ) => {
    const { posts } = props;

    if ( ! posts ) {
      return ( <div className="pu-blocks-editor-testimonial"><p className="error-message">loading..</p></div> );
    }
    if ( posts.length === 0 ) {
      return ( <div className="pu-blocks-editor-testimonial"><p className="error-message">No testimonial posts</p></div> );
    }

    posts.map( ( post ) => {
      post.img = post._embedded[ 'wp:featuredmedia' ][ 0 ];
    } );
    props.setAttributes( { posts: posts } );

    const options = [];
    for ( let i = 0; i < posts.length; i++ ) {
      options.push( {
        value: posts[ i ].id,
        label: posts[ i ].title.rendered,
      } );
    }

    const isSmall = props.attributes.selectedPosts.length === 2;

    const renderTestimonial = ( post ) => (
      <div className="column">
        <div className="testimonial__item">
          <figure className={ `testimonial__body ${ isSmall ? 'testimonial__body--small' : 'testimonial__body--big' }` }>
            { post.img ? ( <img src={ post.img.source_url } alt={ post.img.alt_text } /> ) : '' }
            <blockquote className="testimonial__content">
              { ! post.excerpt.raw
                ? post.content.raw.replace( /<!--(?!>)[\S\s]*?-->/g, '' ).replace( /(<([^>]+)>)/ig, '' )
                : post.excerpt.raw }
            </blockquote>
            <figcaption className="testimonial__caption">
              <cite>
                <span className="testimonial__name">{ post.acf.name }</span>
                <span className="testimonial__info">{ post.acf.persons_information }</span>
              </cite>
            </figcaption>
          </figure>
        </div>
      </div>
    );

    return [
      <InspectorControls>
        <PanelBody>
          <PanelRow>
            <SelectControl
              multiple
              label={ __( 'Select one or two testimonials:' ) }
              value={ props.attributes.selectedPosts }
              onChange={ ( selectedPosts ) => {
                props.setAttributes( {
                  selectedPosts: selectedPosts.length <= 2 ? selectedPosts : selectedPosts.slice( 0, 2 ),
                } );
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
            { props.attributes.posts.map( ( post ) => {
              if ( props.attributes.selectedPosts && props.attributes.selectedPosts.length > 0 ) {
                return props.attributes.selectedPosts.map( ( selectedPost ) => {
                  if ( post.id == selectedPost ) {
                    return renderTestimonial( post );
                  }
                } );
              }
            } ) }
          </div>
        </div>
      </div>,
    ];
  } ),

  save: ( props ) => {
    const posts = props.attributes.posts;
    const isSmall = props.attributes.selectedPosts.length === 2;

    const renderTestimonial = ( post ) => (
      <div className={ `column${ isSmall ? ' is-full-mobile is-full-tablet is-half-desktop' : '' }` }>
        <div className={ `testimonial__item${ isSmall ? '' : ' testimonial--big' }` }>
          <figure className={ `testimonial__body ${ isSmall ? 'testimonial__body--small' : 'testimonial__body--big' }` }>
            { post.img ? ( <img src={ post.img.source_url } alt={ post.img.alt_text } /> ) : '' }
            <blockquote className="testimonial__content">
              { ! post.excerpt.raw
                ? post.content.raw.replace( /<!--(?!>)[\S\s]*?-->/g, '' ).replace( /(<([^>]+)>)/ig, '' )
                : post.excerpt.raw }
            </blockquote>
            <figcaption className="testimonial__caption">
              <cite>
                <span className="testimonial__name">{ post.acf.name }</span>
                <span className="testimonial__info">{ post.acf.persons_information }</span>
              </cite>
            </figcaption>
          </figure>
        </div>
      </div>
    );

    return (
      <div className="pu-blocks-testimonial">
        <div className="testimonial__section container">
          <h2>Testimonials</h2>
          <div className="testimonial__list columns is-multiline">
            { posts.map( ( post ) => {
              if ( props.attributes.selectedPosts && props.attributes.selectedPosts.length > 0 ) {
                return props.attributes.selectedPosts.map( ( selectedPost ) => {
                  if ( post.id == selectedPost ) {
                    return renderTestimonial( post );
                  }
                } );
              }
            } ) }
          </div>
        </div>
      </div>
    );
  },

  deprecated: dep,
} );
