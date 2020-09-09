// cta card test
jest.setTimeout(30000)
import {
    createNewPost,
    enablePageDialogAccept,
    getEditedPostContent,
    insertBlock,
} from '@wordpress/e2e-test-utils';

import {
    clickElementByText,
    blockStartup,
    clickRadio,
    clickCheckbox,
    selectOption
} from '../test-helpers'

const block = {blockTitle: 'CTA Card', blockName: 'purdue-blocks/cta-card'}

describe( '🔬 CTA Card Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( '🔬 Block should be available.', async () => {
        await insertBlock( block.blockTitle )

        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$(`[data-type="${block.blockName}"]`)).not.toBeNull()
        expect( await getEditedPostContent()).toMatchSnapshot()
    } )

    describe( '🔬 Block Editor Fields', () => {
        test( '🔎 Button should open Media Library.', async () => {
            await blockStartup(block)

            // open media library
            await clickElementByText('button', 'Select an image')

            // tests that media library does open
            expect(await page.$(`div.media-frame-title`)).not.toBeNull()
        })
        describe('🔬 Card Content Richtext fields', () => {
            test( '🔎 Title Richtext field.', async () => {
                await blockStartup(block)
    
                const typeString = "Test Title"
                
                // focus the text box then type into it with the virtual keyboard
                await page.focus( '.block-editor-rich-text__editable.title' );
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
    
                expect( editedContent).toMatchSnapshot()
            })
    
            test( '🔎 Text Richtext field.', async () => {
                await blockStartup(block)
    
                const typeString = "Test text here."
                
                // focus the textarea then type into it with the virtual keyboard
                await page.focus( '.block-editor-rich-text__editable.content' );
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
    
                expect( editedContent).toMatchSnapshot()
                expect( editedContent.includes(`<p class="content">${typeString}</p>`)).toBe(true)
            })
        })
    })
    describe( '🔬 Side Panel Settings', () => {
        describe('🔬 General Card Settings', () => {
            test( '🔎 Card Size Options Radio Buttons.', async () => {
                await blockStartup(block)
    
                // select the radio button with the virtual keyboard
                await clickRadio('Card type', 'large')
    
                const editedContent = await getEditedPostContent()
    
                expect( editedContent).toMatchSnapshot()
                expect( editedContent.includes(`"cardType":"large"`)).toBe(true)
            })

            test( 'Heading level dropdown selector', async () => {
                await blockStartup(block)
    
                await selectOption('Heading level of the title', 'h2')
                let editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h2"`)).toBe(true)
    
                await selectOption('Heading level of the title', 'h3')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h3"`)).toBe(true)
    
                await selectOption('Heading level of the title', 'h4')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h4"`)).toBe(true)
    
                await selectOption('Heading level of the title', 'h5')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h5"`)).toBe(true)
    
                await selectOption('Heading level of the title', 'h6')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h6"`)).toBe(true)
    
                await selectOption('Heading level of the title', 'p')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h2"`)).toBe(false)
                expect( editedContent.includes(`"titleLevel":"h3"`)).toBe(false)
                expect( editedContent.includes(`"titleLevel":"h4"`)).toBe(false)
                expect( editedContent.includes(`"titleLevel":"h5"`)).toBe(false)
                expect( editedContent.includes(`"titleLevel":"h6"`)).toBe(false)
    
            })
        })
        describe('🔬 Card Image Settings', () => {
            test( '🔎 Image Alignment Options Radio Buttons', async () => {
                await blockStartup(block)
            
                // select the radio button with the virtual keyboard
                await clickRadio('Align image', 'right')
    
                const editedContent = await getEditedPostContent()
    
                expect( editedContent).toMatchSnapshot()
                expect( editedContent.includes(`"imgLocation":"right"`)).toBe(true)
            })
            test( '🔎 Image alt text field', async () => {
                await blockStartup(block)
    
                const typeString = "Image alt text."
                
                // focus the text box then type into it with the virtual keyboard
                await clickElementByText('label', 'Image Alt Text')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
    
                expect( editedContent).toMatchSnapshot()
                expect( editedContent.includes(`"altText":"${typeString}"`)).toBe(true)
            })
        })
        describe( '🔬 Link can be added to the card', () => {
            test( '🔎 "Add a link to this card?" checkbox reveals link inputs', async () => {
                await blockStartup(block)

                await clickCheckbox('Add a link to this card?')
                      
                let editedContent = await getEditedPostContent()
                
                expect( editedContent.includes('{"hasLink":true}')).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
 
                await clickCheckbox('Add a link to this card?')
                
                editedContent = await getEditedPostContent()
                
                expect( editedContent.includes('{"hasLink":true}')).toBe(false)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔎 Link text field updates output correctly', async () => {
                await blockStartup(block)

                const typeString = "CTA text"
                await clickCheckbox('Add a link to this card?')
                await clickElementByText('label', 'Call to action text')
                await page.keyboard.type(typeString, {delay: 10})

                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"linkText":"${typeString}"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔎 Link url field updates output correctly', async () => {
                await blockStartup(block)
                await clickCheckbox('Add a link to this card?')
                const typeString = "https://www.purdue.edu"

                await clickElementByText('label', 'Link address')
                await page.keyboard.type(typeString, {delay: 10})

                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"link":"${typeString}"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔎 Link can be opened in new tab', async () => {
                await blockStartup(block)

                const typeString = "https://www.purdue.edu"
                await clickCheckbox('Add a link to this card?')
                await clickElementByText('label', 'Link address')
                await page.keyboard.type(typeString, {delay: 10})

                await clickCheckbox('Open link in new tab?')

                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"external":true`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })
    })
} );
