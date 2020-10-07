//  Import CSS.
// import './editor.scss';
// import './style.scss';
// (function(wp, $, Drupal, drupalSettings, DrupalGutenberg) {
  const { __ } = wp.i18n; // Import __() from wp.i18n

  // const __ = Drupal.t;
  const {
    registerBlockType,
  } = wp.blocks;
  const {
    Placeholder,
    Button,
    FormFileUpload,
    SelectControl,
    IconButton,
    PanelBody,
    Toolbar,
    BaseControl,
    TextControl,
  } = wp.components;
  const {
    BlockIcon,
    MediaUploadCheck,
    MediaUpload,
    BlockControls,
    InspectorControls,
    URLInput,
  } = wp.blockEditor;
  const {
    Component,
    Fragment,
  } = wp.element;
  // const { DrupalIcon } = DrupalGutenberg.Components;

  const blockEditor = wp.blockEditor,
        data = wp.data,
        dispatch = data.dispatch;
  const RichText = blockEditor.RichText;
  // const { DrupalMediaEntity } = DrupalGutenberg.Components;
  // const gutenberg = drupalSettings.gutenberg || {};
  // const isMediaLibraryEnabled = gutenberg['media-library-enabled'] || false;
  // const isMediaEnabled = gutenberg['media-enabled'] || false;
  const blockId = 'purdue-blocks/hero-carousel';

  registerBlockType('purdue-blocks/hero-carousel', {
    title: __('Hero Carousel'),
    icon: (
      <svg
        aria-hidden="true"
	  		focusable="false"
	  		data-prefix="fas"
	  		data-icon="external-link-square-alt"
	  		className="svg-inline--fa fa-external-link-square-alt fa-w-14"
	  		role="img"
	  		xmlns="http://www.w3.org/2000/svg"
	  		viewBox="0 0 512 512"
	  	>
	  		<path
	  			fill="#8E6F3E"
	  			d="M138.889,55.88c-1.86-1.86-4.43-2.93-7.07-2.93c-2.63,0-5.21,1.07-7.07,2.93c-1.86,1.86-2.93,4.44-2.93,7.08 c0,2.63,1.07,5.21,2.93,7.06c1.86,1.87,4.44,2.93,7.07,2.93c2.64,0,5.21-1.06,7.07-2.93c1.87-1.86,2.93-4.43,2.93-7.06 C141.819,60.32,140.759,57.74,138.889,55.88z"></path>
	  		<path
	  			fill="#8E6F3E"
	  			d="M499.347,268.363c-8.313-5.283-17.976-11.41-22.497-14.276l-12.024-27.452c-1.513-3.454-4.839-5.763-8.604-5.972 c-3.764-0.221-7.327,1.715-9.213,4.979L412.636,285.1c-5.224,9.035-13.948,15.397-23.876,17.802V167.717 c12.641-2.51,23.612-9.706,31.019-19.7c9.292,12.536,24.19,20.68,40.957,20.68c28.098,0,50.957-22.859,50.957-50.958v-1.589 c0.508-4.363-1.905-8.597-6.007-10.348L261.136,1.422C259.601,0.505,257.836,0,256.013,0c-0.042,0-0.083,0.006-0.124,0.006 c-1.383-0.018-2.768,0.245-4.065,0.8l-90.011,38.528c-5.077,2.173-7.431,8.051-5.258,13.128c2.173,5.078,8.05,7.429,13.128,5.258 l47.783-20.453L155.406,105H58.868L91.77,90.942c5.079-2.17,7.437-8.046,5.267-13.125c-2.17-5.078-8.045-7.437-13.125-5.267 L6.084,105.804c-4.349,1.858-6.797,6.509-5.877,11.143v0.793c0,28.098,22.859,50.958,50.957,50.958 c16.767,0,31.665-8.144,40.957-20.68c2.13,2.874,4.559,5.511,7.234,7.878c-0.259,0.89-0.405,1.828-0.405,2.802v145.284H86.013 c-11.3,0-21.782,3.543-30.417,9.561H10.013c-5.523,0-10,4.477-10,10v31.836c0,3.052,1.394,5.937,3.784,7.833 c1.786,1.417,3.981,2.167,6.216,2.167c0.757,0,1.52-0.086,2.272-0.262l20.146-4.701C24.92,364.078,17.825,371.9,10.95,384.06 c-6.296,11.136-10.204,22.13-10.367,22.592c-1.556,4.409,0.15,9.307,4.108,11.795l23.333,14.667 c1.604,1.009,3.446,1.523,5.304,1.523c0.993,0,1.991-0.147,2.96-0.445c2.781-0.854,5.058-2.891,6.227-5.554 c0.105-0.24,10.991-24.035,27.374-23.011c0.208,0.013,0.416,0.02,0.624,0.02h5.5c15.547,0,28.726-10.338,33.022-24.5h55.307 c2.438,0,4.42,1.983,4.42,4.42v25.495c0,5.523,4.477,10,10,10h28.5c5.523,0,10-4.477,10-10v-54.583 c0-15.629-12.393-28.418-27.869-29.058l1.922-4.992c1.65-4.286,6.363-6.515,10.722-5.083c11.976,3.942,25.001-0.774,31.676-11.469 c7.911-12.673,4.089-29.503-8.52-37.516c-8.313-5.283-17.976-11.41-22.497-14.276l-12.024-27.452 c-1.513-3.454-4.839-5.763-8.604-5.972c-3.766-0.221-7.327,1.715-9.213,4.979l-34.373,59.458 c-4.446,7.69-11.432,13.439-19.533,16.469V166.689c4.49,1.298,9.227,2.008,14.129,2.008c16.767,0,31.665-8.144,40.957-20.68 c9.292,12.536,24.19,20.68,40.957,20.68c16.767,0,31.665-8.144,40.957-20.68c9.292,12.536,24.19,20.68,40.957,20.68 s31.665-8.144,40.957-20.68c7.383,9.962,18.306,17.146,30.896,19.678v136.286h-8.593c-11.3,0-21.782,3.543-30.417,9.561h-45.583 c-5.523,0-10,4.477-10,10v31.836c0,3.052,1.394,5.937,3.784,7.833c1.786,1.417,3.981,2.167,6.216,2.167 c0.757,0,1.52-0.086,2.272-0.262l20.147-4.701c-7.511,3.662-14.607,11.484-21.481,23.644 c-6.297,11.137-10.205,22.131-10.368,22.593c-1.556,4.409,0.15,9.307,4.108,11.795l23.333,14.667 c1.604,1.009,3.446,1.523,5.304,1.523c0.993,0,1.991-0.147,2.96-0.445c2.78-0.854,5.058-2.891,6.227-5.554 c0.105-0.24,11.013-24.035,27.374-23.011c0.208,0.013,0.416,0.02,0.624,0.02h5.5c15.547,0,28.726-10.338,33.022-24.5h55.307 c2.438,0,4.42,1.983,4.42,4.42v25.495c0,5.523,4.477,10,10,10h28.5c5.523,0,10-4.477,10-10v-54.583 c0-15.629-12.394-28.418-27.869-29.058l1.922-4.992c1.649-4.286,6.355-6.518,10.722-5.083c11.975,3.942,25-0.774,31.675-11.469 C515.778,293.207,511.956,276.377,499.347,268.363z M51.164,148.697c-14.569,0-26.812-10.12-30.089-23.697h60.178 C77.976,138.577,65.733,148.697,51.164,148.697z M20.013,342.776v-9.234h18.278c-0.895,1.79-1.702,3.631-2.395,5.528 L20.013,342.776z M155.797,295.111l24.484-42.352l5.322,12.15c0.799,1.824,2.125,3.369,3.807,4.435 c0,0,13.772,8.727,25.057,15.898c3.376,2.146,4.399,6.652,2.281,10.047c-1.782,2.854-5.258,4.113-8.457,3.062 c-14.498-4.774-30.154,2.648-35.639,16.894l-2.352,6.108c-2.27,5.894-1.491,12.521,2.084,17.729 c3.575,5.208,9.479,8.316,15.795,8.316c5.009,0,9.083,4.075,9.083,9.083v44.583h-8.5v-15.495c0-13.465-10.955-24.42-24.42-24.42 h-63.83c-5.523,0-10,4.477-10,10c0,7.995-6.505,14.5-14.5,14.5h-5.211c-20.316-1.083-33.985,14.193-41.034,24.939l-7.421-4.665 c6.479-14.979,15.656-27.941,20.333-27.941c5.523,0,10-4.477,10-10v-10.667c0-18.38,14.953-33.333,33.333-33.333h19.748 C126.33,323.981,145.503,312.919,155.797,295.111z M133.078,148.697c-14.569,0-26.813-10.12-30.089-23.697h56.817h3.361 C159.891,138.577,147.648,148.697,133.078,148.697z M460.735,148.697c-14.569,0-26.812-10.12-30.089-23.697h60.178 C487.547,138.577,475.304,148.697,460.735,148.697z M214.992,148.697c-14.569,0-26.812-10.12-30.089-23.697h60.178 C241.805,138.577,229.562,148.697,214.992,148.697z M296.907,148.697c-14.569,0-26.812-10.12-30.089-23.697h60.178 C323.719,138.577,311.476,148.697,296.907,148.697z M182.532,105l73.481-80.197L329.494,105H182.532z M294.81,37.541L452.857,105 H356.62L294.81,37.541z M348.732,125h3.488h56.69c-3.277,13.577-15.52,23.697-30.089,23.697 C364.252,148.697,352.008,138.577,348.732,125z M294.166,342.777v-9.235h18.278c-0.895,1.79-1.702,3.631-2.395,5.528 L294.166,342.777z M490.901,295.29c-1.783,2.854-5.262,4.112-8.457,3.062c-14.498-4.774-30.154,2.648-35.64,16.894l-2.352,6.109 c-2.27,5.894-1.49,12.521,2.084,17.728c3.575,5.207,9.479,8.315,15.795,8.315c5.008,0,9.083,4.075,9.083,9.083v44.583h-8.5 v-15.495c0-13.465-10.955-24.42-24.42-24.42h-63.83c-5.523,0-10,4.477-10,10c0,7.995-6.505,14.5-14.5,14.5h-5.211 c-20.308-1.083-33.985,14.193-41.034,24.939l-7.365-4.629c1.536-3.528,3.609-7.924,6.075-12.262 c7.066-12.431,12.379-15.715,14.202-15.715c5.523,0,10-4.477,10-10v-10.667c0-18.38,14.953-33.333,33.333-33.333h19.748 c20.569,0,39.742-11.062,50.036-28.87l24.484-42.352l5.322,12.15c0.799,1.824,2.125,3.369,3.807,4.435 c0,0,13.772,8.727,25.057,15.898C491.996,287.389,493.019,291.896,490.901,295.29z"></path>
	  		<path
	  			fill="#8E6F3E"
	  			d="M263.019,185.43c-1.86-1.86-4.44-2.93-7.07-2.93s-5.21,1.07-7.07,2.93c-1.86,1.86-2.93,4.44-2.93,7.07 s1.07,5.21,2.93,7.07c1.861,1.86,4.44,2.93,7.07,2.93s5.21-1.07,7.07-2.93c1.86-1.86,2.93-4.44,2.93-7.07 S264.879,187.29,263.019,185.43z"></path>
	  		<path
	  			fill="#8E6F3E"
	  			d="M472.949,492h-16.133c-4.646-22.795-24.847-40-48.994-40H265.949V227.5c0-5.523-4.477-10-10-10s-10,4.477-10,10V452h-142 c-24.146,0-44.348,17.205-48.994,40H38.949c-5.523,0-10,4.477-10,10s4.477,10,10,10h434c5.523,0,10-4.477,10-10 S478.472,492,472.949,492z M75.663,492c4.127-11.641,15.249-20,28.287-20h303.873c13.038,0,24.159,8.359,28.287,20H75.663z"></path>
	  	</svg>
    ),
    category: 'purdue-blocks',

    supports: {
      align: false,
      html: false,
      reusable: false
    },

    // Block description in side panel
    description: __('Create a carousel with images linking to a categorized article.'),

    attributes: {
      contentCards: {
        type: 'array',
        default: {
          imgUrl: {
            type: 'array',
            default: ['image', 'video', 'audio', 'application'],
            mediaEntityIds: {
              type: 'array',
            },
          },
          title: {
            type: 'string',
            default: '',
          },
          categoryName: {
            type: 'string',
            default: '',
          },
          targetUrl: {
            type: 'string',
            default: '',
          },
        },
      },
    },
    edit: ( props ) => {
      const handleAddContentCard = () => {
        const contentCards = props.attributes.contentCards;
        contentCards.push( {
          imgUrl: '',
          title: '',
          categoryName: '',
          targetUrl: '',
        } );
        props.setAttributes( { contentCards } );
      }; //End handleAddContentCard

      const handleRemoveContentCard = ( index ) => {
        const contentCards = props.attributes.contentCards;
        contentCards.splice( index, 1 );
        props.setAttributes( { contentCards } );
      }; //End handleRemoveContentCard

      const handleChangeContentCardImg = ( imgUrl, index ) => {
        const contentCards = props.attributes.contentCards;
        contentCards[ index ].imgUrl = imgUrl.url;
        props.setAttributes( { contentCards } );
      }; // End handleChangeContentCardImg
      const handleChangeContentCardTitle = ( title, index ) => {
        const contentCards = props.attributes.contentCards;
        contentCards[ index ].title = title;
        props.setAttributes( { contentCards } );
      }; // End handleChangeContentCardTitle
      const handleChangeContentCardCategory = ( categoryName, index ) => {
        const contentCards = props.attributes.contentCards;
        contentCards[ index ].categoryName = categoryName;
        props.setAttributes( { contentCards } );
      }; // End handleChangeContentCardCategory
      const handleChangeContentCardTarget = ( targetUrl, index ) => {
        const contentCards = props.attributes.contentCards;
        contentCards[ index ].targetUrl = targetUrl;
        props.setAttributes( { contentCards } );
      }; // End handleChangeContentCardTarget

      let contentCardFields,
          contentCardDisplay;

      if ( props.attributes.contentCards.length ) {
        contentCardFields = props.attributes.contentCards.map( ( card, index ) => {
            return <Fragment key={index}>
                      <MediaUploadCheck>
                        <MediaUpload
                          allowedTypes={['image']}
                          onSelect={ ( img ) => handleChangeContentCardImg( img, index ) }
                          render={ ( { open } ) => {
                            return props.attributes.contentCards[ index ].imgUrl !== '' &&
                            ! props.attributes.imgError ? (
                              <div className={ 'bulma-blocks-editor-site-hero__preview' }>
                                <figure className={ 'image' }>
                                  <img
                                    src={ props.attributes.contentCards[ index ].imgUrl }
                                  />
                                </figure>
                                <Button
                                  className={ 'bulma-blocks-editor-site-hero__button' }
                                  onClick={ open }
                                >
                                  Update Image
                                </Button>
                              </div>
                            ) : props.attributes.imgError ? (
                              <div className={ 'bulma-blocks-editor-site-hero__container' }>
                                <p
                                  className={
                                    'bulma-blocks-editor-site-hero__description bulma-blocks-editor-site-hero__description--error'
                                  }
                                >
                                    There was an error.
                                </p>
                                <Button
                                  className={ 'bulma-blocks-editor-site-hero__button' }
                                  onClick={ open }
                                >
                                  Open Media Library
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
                      <br />
                      <TextControl
                        className="hero_carrousel_title"
                        placeholder="Title"
                        value={ props.attributes.contentCards[ index ].title }
                        onChange={ ( title ) => handleChangeContentCardTitle( title, index ) }
                      />
                      <TextControl
                        className="hero_carrousel_category"
                        placeholder="Category Name"
                        value={ props.attributes.contentCards[ index ].categoryName }
                        onChange={ ( categoryName ) => handleChangeContentCardCategory( categoryName, index ) }
                      />
                      <TextControl
                        className="hero_carrousel_target_url"
                        placeholder="Target URL"
                        value={ props.attributes.contentCards[ index ].targetUrl }
                        onChange={ ( targetUrl ) => handleChangeContentCardTarget( targetUrl, index ) }
                      />
                      <Button
                        className={ 'bulma-blocks-editor-site-hero__button is-danger' }
                        onClick={ () => handleRemoveContentCard( index ) }
                      >
                        Remove Card
                      </Button>
                      <hr />
                    </Fragment>
        } );

        contentCardDisplay = props.attributes.contentCards.map( ( card, index ) => {
          return <div key={ index } className='item'>
                    <a href={ card.targetUrl }>
                    <figure className='cardFigure' style={{ backgroundImage: `url(${card.imgUrl})` }}>
                      <h6 className='cardCategory'>{ card.categoryName }</h6>
                      <h3 className='cardTitle'>{ card.title }</h3>
                    </figure>
                    </a>
                  </div>;
        } );
      }

      return [
        <InspectorControls key="1">
          <PanelBody title={ __( 'Hero Carousel Cards' ) }>
            { contentCardFields }
            <Button
              isDefault
              onClick={ handleAddContentCard.bind( this ) }
            >
              { __( 'Add Carousel Card' ) }
            </Button>
          </PanelBody>
        </InspectorControls>,
        <div key="2" className={ props.className } className='carousel'>
          { contentCardDisplay }
        </div>,
      ];

    },
    save: ( props ) => {
      if ( props.attributes.contentCards.length ) {
      const contentCardFields = props.attributes.contentCards.map( ( card, index ) => {
        return <div key={ index } className='item'>
                  <a href={ card.targetUrl }>
                  <figure className='cardFigure' style={{ backgroundImage: `url(${card.imgUrl})` }}>
                    <h6 className='cardCategory'>{ card.categoryName }</h6>
                    <h3 className='cardTitle'>{ card.title }</h3>
                  </figure>
                  </a>
                </div>;
      } );
      return (
        <div className={ props.className } className='carousel'>
          { contentCardFields }
        </div>
      );}
    },
  });

// })(wp, jQuery, Drupal, drupalSettings, DrupalGutenberg);
