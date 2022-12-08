/**
 * Breaking up edit functionality into a separate component for easier access
 */

const { Fragment } = wp.element;
const { MediaUpload } = wp.blockEditor;
const { PanelRow, Button, TextControl, TextareaControl, CheckboxControl } = wp.components;
const { useState } = wp.element;

import isEmpty from 'lodash/isEmpty';

const LinkForm = ({
	onSave,
	initialState = {
		title: '',
		media: {
			url: '',
			alt: '',
		},
		subtext: '',
		link: '',
		newtab: false,
	},
}) => {
	// Form related controls.
	const [newTitle, updateNewTitle] = useState(initialState.title);
	const [newMedia, updateNewMedia] = useState(initialState.media);
	const [newSubtext, updateNewSubtext] = useState(initialState.subtext);
	const [newLink, updateNewLink] = useState(initialState.link);
	const [newNewtab, updateNewtab] = useState(initialState.newtab);
	const [showNoTitle, updateShowNoTitle] = useState(false);
	let mediaButtonLabel = 'Add Image';

	if (!isEmpty(newMedia.url)) {
		mediaButtonLabel = 'Replace Image';
	}

	const saveItem = () => {
		if (newTitle.length < 1) {
			updateShowNoTitle(true);
			return;
		}

		const newPost = {
			title: newTitle,
			media: newMedia,
			subtext: newSubtext,
			link: newLink,
			newtab: newNewtab,
		};

		onSave(newPost);
	};

	return (
		<Fragment>
			{showNoTitle && (
				<p
					style={{
						color: '#ff5454',
						fontWeight: 'bold',
					}}
				>
					Please add a title before saving.
				</p>
			)}
			<PanelRow>
				<TextControl
					label={'Title'}
					onChange={(val) => {
						if (showNoTitle) {
							updateShowNoTitle(false);
						}
						updateNewTitle(val);
					}}
					value={newTitle}
				/>
			</PanelRow>

			{!isEmpty(newMedia.url) && (
				<PanelRow>
					<img src={newMedia.url} />
				</PanelRow>
			)}

			<PanelRow>
				<MediaUpload
					onSelect={(media) => {
						updateNewMedia({
							url: media.url,
							alt: media.alt,
						});
			
					}}
					allowedTypes={['image']}
					render={({ open }) => (
						<Button isSecondary onClick={open}>
							{mediaButtonLabel}
						</Button>
					)}
				/>
			</PanelRow>
			<PanelRow>
				<TextareaControl
					label={'Subtext'}
					onChange={(val) => {
						updateNewSubtext(val);
					}}
					value={newSubtext}
				/>
			</PanelRow>

			<PanelRow>
				<TextControl
					label={'Button URL'}
					type="url"
					onChange={(val) => {
						updateNewLink(val);
					}}
					value={newLink}
				/>
			</PanelRow>
			<PanelRow>
				<CheckboxControl
					label="Open link in new tab?"
					checked={newNewtab}
					onChange={() => {
						updateNewtab(!newNewtab);
					}}
				/>
			</PanelRow>
			<PanelRow>
				<Button isPrimary onClick={saveItem}>
					Save
				</Button>
			</PanelRow>
		</Fragment>
	);
};

export default LinkForm;
