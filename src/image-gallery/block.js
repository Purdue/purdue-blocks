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
  CheckboxControl,
  TextareaControl,
  TextControl,
  RadioControl,
  SelectControl,
  Button,
  Disabled,
} = wp.components;
const {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  useBlockProps,
  RichText,
} = wp.blockEditor;
import { ReactSortable } from "react-sortablejs";

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

registerBlockType("purdue-blocks/image-gallery", {
  title: __("Image Gallery"),
  description: __("Create an image gallery."),
  icon: (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="ellipsis-h"
      className="svg-inline--fa fa-ellipsis-h fa-w-12"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="#8E6F3E"
        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
      ></path>
    </svg>
  ),
  category: "purdue-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
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
  edit: (props) => {
    const { className, setAttributes } = props;
    const {
      type,
      header,
      headerLocation,
      background,
      content,
      contentAlign,
      imageAlign,
      imgs,
      cards,
      id,
      columns,
      hasBottomPadding,
    } = props.attributes;

    const removeItem = (identifier) => {
      const newCards = cards.filter((item) => {
        return item.media_id !== identifier;
      });
      setAttributes({ cards: newCards });
    };
    const initialCard = {
      media_id: "",
      media_url: "",
      media_alt: "",
      media_caption: "",
      imgs: [],
      subtext: "",
      title: "",
      cardType: "modal",
      linkURL: "",
      external: false,
      buttonText: "View Full Gallery",
    };
    if (type !== "image" && cards.length === 0) {
      setAttributes({ cards: [initialCard] });
    }
    const handleAddNew = () => {
      let cards = [...props.attributes.cards];
      cards.push(initialCard);
      setAttributes({ cards });
    };
    const handleImageChange = (img, index) => {
      let cards = [...props.attributes.cards];
      cards[index].media_id = img.id;
      cards[index].media_url = img.url;
      cards[index].media_alt = img.alt;
      cards[index].media_caption = img.caption;
      setAttributes({ cards });
      console.log(props.attributes.cards);
    };
    const handleGalleryChange = (imgs, index) => {
      let cards = [...props.attributes.cards];
      cards[index].imgs = imgs;
      setAttributes({ cards });
      console.log(props.attributes.cards);
    };
    let editorFields;
    if (cards.length > 0) {
      editorFields = cards.map((card, index) => {
        return (
          <div
            className={`column${
              columns === "4"
                ? " is-one-quarter-widescreen"
                : " is-one-third-widescreen"
            } is-half-tablet is-full-mobile is-one-third-desktop`}
          >
            <div
              className={`card${type === "gallery" ? " media link-card" : ""}`}
            >
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(img) => handleImageChange(img, index)}
                  render={({ open }) => {
                    return (
                      <div
                        className={`${
                          type === "imageText" ? " image-gallery-open" : ""
                        }`}
                        data-toggle={card.media_id}
                      >
                        <div
                          className={`image background-image ${
                            type === "gallery" ? " is-16by9" : " is-square"
                          }`}
                          role="img"
                          style={{ backgroundImage: `url(${card.media_url})` }}
                          aria-label={card.media_alt}
                        >
                          <button isPrimary onClick={open}>
                            {card.media_url !== ""
                              ? "Select a new cover image"
                              : "Select an cover image"}
                          </button>
                        </div>
                        {card.media_url && type === "imageText" ? (
                          <button
                            className={`image-modal-button`}
                            aria-label="More information"
                          >
                            <i class="fas fa-plus" aria-hidden="true"></i>
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  }}
                />
              </MediaUploadCheck>
              {type === "gallery" ? (
                card.cardType && card.cardType === "link" ? (
                  ""
                ) : (
                  <MediaUploadCheck>
                    <MediaUpload
                      addToGallery={true}
                      multiple={true}
                      gallery={true}
                      onSelect={(imgs) => handleGalleryChange(imgs, index)}
                      value={card.imgs.map((item) => item.id)}
                      render={({ open }) => {
                        return (
                          <div class="image-slider-editor">
                            <div>
                              <button isPrimary onClick={open}>
                                {card.imgs && card.imgs.length > 0
                                  ? "Select new gallery images"
                                  : "Select gallery images"}
                              </button>
                            </div>
                          </div>
                        );
                      }}
                    />
                  </MediaUploadCheck>
                )
              ) : (
                ""
              )}
              {type === "gallery" ? (
                <RichText
                  tagName="p"
                  value={card.title}
                  className={`card-title`}
                  onChange={(title) => {
                    let cards = [...props.attributes.cards];
                    cards[index].title = title;
                    setAttributes({ cards });
                  }}
                  placeholder="Add Title..."
                  keepPlaceholderOnFocus={true}
                ></RichText>
              ) : (
                ""
              )}
              <RichText
                tagName="p"
                value={card.subtext}
                className={`card-subtext`}
                onChange={(subtext) => {
                  let cards = [...props.attributes.cards];
                  cards[index].subtext = subtext;
                  setAttributes({ cards });
                }}
                placeholder="Add description..."
                keepPlaceholderOnFocus={true}
              ></RichText>
              {type === "gallery" ? (
                <div class="purdue-blocks__button purdue-blocks__button--gold-light">
                  {card.buttonText ? card.buttonText : "View Full Gallery"}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      });
    }

    return [
      <InspectorControls key="1">
        <PanelBody>
          <PanelRow>
            <RadioControl
              label="Choose the type of image gallery"
              help={`${
                type === "imageText"
                  ? "Add new or delete cards on the side panel."
                  : ""
              }`}
              selected={type}
              options={[
                { label: "Image Only", value: "image" },
                { label: "Image and Text", value: "imageText" },
                { label: "Multiple Galleries", value: "gallery" },
              ]}
              onChange={(type) => {
                setAttributes({ type });
              }}
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Choose a background"
              value={background}
              options={[
                { label: "White", value: "white" },
                { label: "Black", value: "black" },
                { label: "Gray", value: "gray" },
              ]}
              onChange={(background) => {
                setAttributes({ background });
              }}
            />
          </PanelRow>
          <PanelRow>
            <RadioControl
              label="Choose how to align the header."
              selected={headerLocation}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
              ]}
              onChange={(headerLocation) => {
                setAttributes({ headerLocation });
              }}
            />
          </PanelRow>
          <PanelRow>
            <RadioControl
              label="Choose how to align the content."
              selected={contentAlign}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
              ]}
              onChange={(contentAlign) => {
                setAttributes({ contentAlign });
              }}
            />
          </PanelRow>
          <PanelRow>
            <RadioControl
              label="Choose how to align the images horizontally."
              selected={imageAlign}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
              ]}
              onChange={(imageAlign) => {
                setAttributes({ imageAlign });
              }}
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Number of Columns"
              value={columns}
              options={[
                { value: "3", label: "Three Columns" },
                { value: "4", label: "Four Columns" },
              ]}
              onChange={(columns) => {
                setAttributes({ columns });
              }}
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Remove space at the bottom?"
              checked={!hasBottomPadding}
              onChange={() => {
                setAttributes({ hasBottomPadding: !hasBottomPadding });
              }}
            />
          </PanelRow>
          <PanelRow>
            <TextControl
              label="HTML Anchor"
              help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
              value={id}
              onChange={(id) => setAttributes({ id })}
            />
          </PanelRow>
        </PanelBody>
        {props.attributes.type !== "image" ? (
          <PanelBody title={__("Images")}>
            <PanelRow>
              <ReactSortable
                list={cards}
                setList={(val) => {
                  let media_ids = [],
                    values = [];
                  cards.map((item) => media_ids.push(item.media_id));
                  val.map((item) => values.push(item.media_id));
                  if (_.isEqual(media_ids, values)) {
                    return;
                  }

                  setAttributes({
                    cards: val,
                  });
                }}
                className="sortable-posts"
              >
                {cards.map((item, i) => {
                  return (
                    <PanelBody
                      initialOpen={false}
                      key={item.media_id}
                      title={`Card ${i + 1}`}
                    >
                      <PanelRow>
                        <img src={item.media_url} />
                      </PanelRow>
                      {type === "gallery" ? (
                        <PanelRow>
                          <RadioControl
                            label="Choose the type of card"
                            selected={item.cardType}
                            options={[
                              { label: "Modal", value: "modal" },
                              { label: "Link", value: "link" },
                            ]}
                            onChange={(cardType) => {
                              let cards = [...props.attributes.cards];
                              cards[i].cardType = cardType;
                              setAttributes({ cards });
                            }}
                          />
                        </PanelRow>
                      ) : (
                        ""
                      )}
                      {item.cardType === "link" ? (
                        <>
                          <PanelRow>
                            <TextControl
                              label="Link URL"
                              value={item.linkURL}
                              onChange={(linkURL) => {
                                let cards = [...props.attributes.cards];
                                cards[i].linkURL = linkURL;
                                setAttributes({ cards });
                              }}
                            />
                          </PanelRow>
                          <PanelRow>
                            <CheckboxControl
                              label="Open link in new tab?"
                              checked={item.external}
                              onChange={() => {
                                let cards = [...props.attributes.cards];
                                cards[i].external = !item.external;
                                setAttributes({ cards });
                              }}
                            />
                          </PanelRow>
                        </>
                      ) : (
                        ""
                      )}
                      <Button
                        style={{ marginTop: "5px" }}
                        isSecondary
                        onClick={() => {
                          removeItem(item.media_id);
                        }}
                      >
                        Remove Item
                      </Button>
                    </PanelBody>
                  );
                })}
              </ReactSortable>
            </PanelRow>
            <hr></hr>
            <PanelRow>
              <Button isPrimary onClick={() => handleAddNew()}>
                Add New Card
              </Button>
            </PanelRow>
          </PanelBody>
        ) : (
          ""
        )}
      </InspectorControls>,
      <div
        key="2"
        className={`purdue-image-gallery purdue-image-gallery-editor section is-medium${
          hasBottomPadding ? "" : " no-bottom-padding"
        } has-${background}-background${
          type === "imageText" ? "purdue-image-gallery--mixed" : ""
        }`}
      >
        <div class="container">
          <RichText
            tagName="h2"
            value={header}
            className={`purdue-image-gallery__header align-${headerLocation}`}
            onChange={(header) => {
              setAttributes({ header });
            }}
            placeholder="Add header (optional)"
            keepPlaceholderOnFocus={true}
          ></RichText>
          <RichText
            tagName="p"
            value={content}
            className={`purdue-image-gallery__content align-${contentAlign}`}
            onChange={(content) => {
              setAttributes({ content });
            }}
            placeholder="Add Text (optional)"
            keepPlaceholderOnFocus={true}
          ></RichText>
          {type === "image" ? (
            <MediaUploadCheck>
              <MediaUpload
                addToGallery={true}
                multiple={true}
                gallery={true}
                onSelect={(imgs) => {
                  setAttributes({ imgs });
                }}
                render={({ open }) => {
                  return (
                    <div class="image-slider-editor">
                      <div class="buttons-container">
                        <button onClick={open}>
                          {imgs.length === 0
                            ? "Select images"
                            : "Select new images"}
                        </button>
                      </div>
                      {imgs.length > 0 ? (
                        <div
                          className={`columns is-multiline${
                            imageAlign === "center" ? " align-center" : ""
                          }`}
                        >
                          {imgs.map((img, index) => {
                            return (
                              <div
                                className={`column${
                                  columns === "4"
                                    ? " is-one-quarter-widescreen"
                                    : " is-one-third-widescreen"
                                } is-half-tablet is-full-mobile is-one-third-desktop`}
                              >
                                <div
                                  className={`image-gallery-open${
                                    img.caption ? "" : " image-no-caption"
                                  }`}
                                  data-toggle={img.id}
                                >
                                  <div
                                    className={`image is-square`}
                                    role="img"
                                    style={{
                                      backgroundImage: `url(${img.url})`,
                                    }}
                                    aria-label={img.alt}
                                  ></div>
                                  {img.caption ? (
                                    <button
                                      className={`image-modal-button`}
                                      aria-label="More information"
                                    >
                                      <i
                                        class="fas fa-plus"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                {img.caption ? (
                                  <div
                                    className="image-modal-content"
                                    data-modal={img.id}
                                  >
                                    <div className="image-modal-close">
                                      <p>{img.caption}</p>
                                    </div>
                                    <button
                                      className="image-modal-button"
                                      aria-label="close"
                                    >
                                      <i
                                        class="fas fa-minus"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                }}
              />
            </MediaUploadCheck>
          ) : (
            ""
          )}
          {type !== "image" ? (
            <div class="image-slider-editor">
              <div className="columns is-multiline">{editorFields}</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>,
    ];
  },
});
