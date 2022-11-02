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
		header: '',
		media: {
			url: '',
			alt: '',
		},
		subtext: '',
		buttonLabel: '',
		buttonLink: '',
		newtab: false,
	},
}) => {
	// Form related controls.
	const [newHeader, updateNewHeader] = useState(initialState.header);
	const [newMedia, updateNewMedia] = useState(initialState.media);
	const [newSubtext, updateNewSubtext] = useState(initialState.subtext);
	const [newButtonLink, updateNewButtonLink] = useState(initialState.buttonLink);
	const [newButtonLabel, updateNewButtonLabel] = useState(initialState.buttonLabel);
	const [newNewtab, updateNewtab] = useState(initialState.newtab);
	const [showNoHeader, updateShowNoHeader] = useState(false);
	let mediaButtonLabel = 'Add Image';

	if (!isEmpty(newMedia.url)) {
		mediaButtonLabel = 'Replace Image';
	}

	const saveItem = () => {
		if (newHeader.length < 1) {
			updateShowNoHeader(true);
			return;
		}

		const newPost = {
			header: newHeader,
			media: newMedia,
			subtext: newSubtext,
			buttonLink: newButtonLink,
			buttonLabel: newButtonLabel,
			newtab: newNewtab,
		};

		onSave(newPost);
	};

	return (
		<Fragment>
			{showNoHeader && (
				<p
					style={{
						color: '#ff5454',
						fontWeight: 'bold',
					}}
				>
					Please add a header before saving.
				</p>
			)}
			<PanelRow>
				<TextControl
					label={'Header'}
					onChange={(val) => {
						if (showNoHeader) {
							updateShowNoHeader(false);
						}
						updateNewHeader(val);
					}}
					value={newHeader}
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
					label={'Button Label'}
					onChange={(val) => {
						updateNewButtonLabel(val);
					}}
					value={newButtonLabel}
				/>
			</PanelRow>

			<PanelRow>
				<TextControl
					label={'Button URL'}
					type="url"
					onChange={(val) => {
						updateNewButtonLink(val);
					}}
					value={newButtonLink}
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
