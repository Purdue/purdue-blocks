/**
 * Breaking up edit functionality into a separate component for easier access
 */

const { Fragment } = wp.element;
const { MediaUpload } = wp.blockEditor;
const { PanelRow, Button, TextControl, TextareaControl, CheckboxControl, SelectControl } = wp.components;
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
		buttontext: '',
		date:'',
		mediaType:'',
	},
	type,
}) => {
	// Form related controls.
	const [newTitle, updateNewTitle] = useState(initialState.title);
	const [newMedia, updateNewMedia] = useState(initialState.media);
	const [newSubtext, updateNewSubtext] = useState(initialState.subtext);
	const [newLink, updateNewLink] = useState(initialState.link);
	const [newNewtab, updateNewtab] = useState(initialState.newtab);
	const [newDate, updateNewDate] = useState(initialState.date);
	const [newButtontext, updateNewButtontext] = useState(initialState.buttontext);
	const [newMediaType, updateNewMediaType] = useState(initialState.mediaType);
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
			buttontext: newButtontext,
			date:newDate,
			mediaType:newMediaType,
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
			{type === 'regular'? (
				<PanelRow>
					<TextControl
						label={'Button Text'}
						onChange={(val) => {
							updateNewButtontext(val);
						}}
						value={newButtontext}
					/>
				</PanelRow>
			):''
			}
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
			{type === 'regular' || type === 'simple'? (
				<PanelRow>
					<TextControl
						label={'Optional Date'}
						onChange={(val) => {
							updateNewDate(val);
						}}
						value={newDate}
					/>
				</PanelRow>
			):''
			}
			{type === 'regular' || type === 'simple'? (
				<PanelRow>
					<SelectControl
						label="Optional story type"
						value={newMediaType}
						options={[
							{ value: '', label: 'Select a story type' },
							{ value: 'article', label: 'Article' },
							{ value: 'podcast', label: 'Podcast' },
							{ value: 'video', label: 'Video' },
						]}
						onChange={(val) => {
							updateNewMediaType(val);
						}}
					/>
				</PanelRow>
			):''
			}
			<PanelRow>
				<Button isPrimary onClick={saveItem}>
					Save
				</Button>
			</PanelRow>
		</Fragment>
	);
};

export default LinkForm;
