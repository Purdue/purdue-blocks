const { 
	RichText,
	useBlockProps
} = wp.blockEditor;

const v1 = {
	attributes: {
		profiles: {
			type: "array",
			default: [{
				name: 'add',
				title: '',
				photoUrl: '',
				photoAlt: '',
				bio: '',
				bioEditorOpen: false
			}]
		},
		numColumns: { 
			type: "number", 
			default: 4 
		},
		header: { 
			type: "string", 
			default: "" 
		},
		headerLocation: { 
			type: "string", 
			default: "center" 
		}
	},
	supports: {
		className: false,
		anchor: true,
	},
	save: ( props ) => {
		console.log("depppp");
		const blockProps = useBlockProps.save();
		const profiles = props.attributes.profiles
		const numColumns = parseInt(props.attributes.numColumns)
	
		const columnSize = numColumns === 4 ? 'is-3' : numColumns === 3 ? 'is-4' : numColumns === 2 ? 'is-6' : 'is-12'
	
		const returned = (
		  props.attributes.header?
			<div className="pu-profile-gallery">
			<h2 className={`align-${props.attributes.headerLocation}`}>{props.attributes.header}</h2>
			<div {...blockProps} className={`pu-profile-gallery columns is-multiline`}>
			{profiles.map((profile, i, profiles) => {
			  if (profile.name !== 'add') {
	
				const toggle = `${i}-${profile.name}`
	
				return (
				  <div className={`column ${columnSize} is-half-mobile`}>
					<div className={ `profile-gallery-open${profile.bio?"":" profile-no-bio"}` } data-toggle={toggle}
					>
					<div className={ `image is-square` }
					  role="img"
					  style={ { backgroundImage: `url(${ profile.photoUrl })` } }
					  aria-label={ profile.photoAlt }
					></div>
					{profile.bio?
					  <button className={`modal-open-button`}  aria-label="More information"><i class="fas fa-plus" aria-hidden='true'></i></button>
					  :""}
					  </div>
					<p className={`pu-profile-gallery--name`}>
					  {profile.name}
					</p>
					<p className={`pu-profile-gallery--title`}>
					  {profile.title}
					</p>
					{profile.bio?
					<div className={`pu-profile-gallery--modal`} data-modal={toggle}>
					  <div className={`container`}>
						<div className={`box`}>
						  <div className={`modal--close-button`}  aria-label="close">
							<i class="fas fa-times" aria-hidden="true"></i>
						  </div>
						  <div className={`modal--img-container`}>
							<div className={ `image is-square` }
							  role="img"
							  style={ { backgroundImage: `url(${ profile.photoUrl })` } }
							  aria-label={ profile.photoAlt }
							></div>
						  </div>
						  <div className={`modal--content-container`}>
							<p className={`pu-profile-gallery--name`}>
							  {profile.name}
							</p>
							<p className={`pu-profile-gallery--title`}>
							  {profile.title}
							</p>
	
							<RichText.Content 
							  className={`pu-profile-gallery--bio`}
							  tagName="p"
							  value={profile.bio}
							/>
	
							<button className={`modal--secondary-close-button`}>
							  {'< BACK TO ARTICLE'}
							</button>
						  </div>
						</div>
					  </div>
					</div>:""}
				  </div>
				)
			  }
			})}
		  </div>
			</div>:
		  <div {...blockProps} className={`pu-profile-gallery columns is-multiline`}>
			{profiles.map((profile, i, profiles) => {
			  if (profile.name !== 'add') {
	
				const toggle = `${i}-${profile.name}`
	
				return (
				  <div className={`column ${columnSize} is-half-mobile`}>
					<div className={ `profile-gallery-open${profile.bio?"":" profile-no-bio"}` } data-toggle={toggle}
					>
					<div className={ `image is-square` }
					  role="img"
					  style={ { backgroundImage: `url(${ profile.photoUrl })` } }
					  aria-label={ profile.photoAlt }
					></div>
					{profile.bio?
					  <button className={`modal-open-button`}  aria-label="More information"><i class="fas fa-plus" aria-hidden='true'></i></button>
					  :""}
					  </div>
					<p className={`pu-profile-gallery--name`}>
					  {profile.name}
					</p>
					<p className={`pu-profile-gallery--title`}>
					  {profile.title}
					</p>
					
					{profile.bio?
					<div className={`pu-profile-gallery--modal`} data-modal={toggle}>
					  <div className={`container`}>
						<div className={`box`}>
						  <div className={`modal--close-button`}  aria-label="close">
							<i class="fas fa-times" aria-hidden="true"></i>
						  </div>
						  <div className={`modal--img-container`}>
							<div className={ `image is-square` }
							  role="img"
							  style={ { backgroundImage: `url(${ profile.photoUrl })` } }
							  aria-label={ profile.photoAlt }
							></div>
						  </div>
						  <div className={`modal--content-container`}>
							<p className={`pu-profile-gallery--name`}>
							  {profile.name}
							</p>
							<p className={`pu-profile-gallery--title`}>
							  {profile.title}
							</p>
	
							<RichText.Content 
							  className={`pu-profile-gallery--bio`}
							  tagName="p"
							  value={profile.bio}
							/>
	
							<button className={`modal--secondary-close-button`}>
							  {'< BACK TO ARTICLE'}
							</button>
						  </div>
						</div>
					  </div>
					</div>:""}
				  </div>
				)
			  }
			})}
		  </div>
		);
		return returned;
	}
}

export default [v1];