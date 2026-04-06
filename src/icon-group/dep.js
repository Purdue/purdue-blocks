const {
  RichText,
  useBlockProps
} = wp.blockEditor;


const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks


const v1 = {
  category: 'purdue-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [],
  attributes: {
    iconGroup: {
      type: 'array',
      default: []
    },
  },
  supports: {
    className: false,
    anchor: true,
  },
  description: __(
    'Add a group of icons to be displayed inline.'
  ),
  save: ( props ) => {
    const blockProps = useBlockProps.save();
    const iconFields = props.attributes.iconGroup.map( ( card, index ) => {
      return  <div key={ index } className='icon-item'>
        <a href={ card.iconUrl } target="_blank" rel="noopener noreferrer">
          <div className='icon-item-icon-placeholder'>
            <div dangerouslySetInnerHTML={{ __html: card.icon }} />
          </div>
        </a>
      </div>;
    } );
    return (
      <div {...blockProps} className='icon-group'>
        { iconFields }
      </div>
    );
  }
}

export default [v1];
