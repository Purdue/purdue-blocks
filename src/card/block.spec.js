// card test
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
    clickCheckbox
} from '../test-helpers'

const block = {blockTitle: 'Custom Card', blockName: 'purdue-blocks/card'}

describe( '🔬 Card Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( '🔬 Block should be available.', async () => {
        await insertBlock( 'Custom Card' )

        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$('[data-type="purdue-blocks/card"]')).not.toBeNull()
        expect( await getEditedPostContent()).toMatchSnapshot()
    } )

    describe( '🔬 Block Editor Fields', () => {
        test( '🔬 Button should open Media Library.', async () => {
            await blockStartup(block)

            // open media library
            await clickElementByText('button', 'Select an image (optional)')

            // tests that media library does open
            expect(await page.$(`div.media-frame-title`)).not.toBeNull()

            /*
            NOTE: explore further to see how media items can be spoofed so that the actual
                image urls can be properly snapshotted and tested.
            */
        })
        test( '🔬 Title Richtext editor should be editable.', async () => {
            await blockStartup(block)

            const typeString = "Test Title"
            
            // focus the text box then type into it with the virtual keyboard
            await page.focus( '.block-editor-rich-text__editable.title' );
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            // tests: 
            // a. save output properly contains the correct string 
            // b. save output matches the existing snapshot
            expect( editedContent.includes(`<p class="title">${typeString}</p>`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })

        test( '🔬 Text Richtext editor should be editable.', async () => {
            await blockStartup(block)

            const typeString = "Test text here."
            
            // focus the textarea then type into it with the virtual keyboard
            await page.focus( '.block-editor-rich-text__editable.content' );
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            // tests: 
            // a. save output properly contains the correct string 
            // b. save output matches the existing snapshot
            expect( editedContent.includes(`<p class="content">${typeString}</p>`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })
    })
    describe( '🔬 Side Panel Settings', () => {
        test( '🔬 Gold background color should be selectable.', async () => {
            await blockStartup(block)

            // select the radio button with the virtual keyboard
            await clickRadio('Background Color', 'gold')

            const editedContent = await getEditedPostContent()

            expect( editedContent.includes(`"backgroundColor":"white"`)).toBe(false)
            expect( editedContent).toMatchSnapshot()
        })
        test( '🔬 Black border color should be selectable.', async () => {
            await blockStartup(block)
        
            // select the radio button with the virtual keyboard
            await clickRadio('Border Color', 'black')

            const editedContent = await getEditedPostContent()

            expect( editedContent.includes(`"borderColor":"gold"`)).toBe(false)
            expect( editedContent).toMatchSnapshot()
        })
        test( '🔬 Image alt text should be editable.', async () => {
            await blockStartup(block)

            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Image Alt Text')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            // tests: 
            // a. save output properly contains the correct string 
            // b. save output matches the existing snapshot
            expect( editedContent.includes(`"altText":"${typeString}"`)).toBe(true)
            // expect( editedContent).toMatchSnapshot()
        })
        describe( '🔬 Link can be added to the card', () => {
            test( '🔬 "Add a link to this card?" checkbox reveals link inputs', async () => {
                await blockStartup(block)

                await clickCheckbox('Add a link to this card?')
                      
                let editedContent = await getEditedPostContent()
                
                expect( editedContent.includes('{"hasLink":true}')).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
                
        
                // click to uncheck the checkbox, outline should now turn off
                await clickCheckbox('Add a link to this card?')
                
                editedContent = await getEditedPostContent()
                
                expect( editedContent.includes('{"hasLink":true}')).toBe(false)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔬 Link text field updates output correctly', async () => {
                await blockStartup(block)

                const typeString = "CTA text"
                await clickCheckbox('Add a link to this card?')
                await clickElementByText('label', 'Call to action text')
                await page.keyboard.type(typeString, {delay: 10})

                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`<div class="read-more-button"><span>${typeString}</span></div>`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔬 Link url field updates output correctly', async () => {
                await blockStartup(block)
                await clickCheckbox('Add a link to this card?')
                const typeString = "https://www.purdue.edu"

                await clickElementByText('label', 'Link address')
                await page.keyboard.type(typeString, {delay: 10})

                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`<a href="${typeString}" target="_self" class="square-card" rel="noopener noreferrer"></a>`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔬 Link can be opened in new tab', async () => {
                await blockStartup(block)

                const typeString = "https://www.purdue.edu"
                await clickCheckbox('Add a link to this card?')
                await clickElementByText('label', 'Link address')
                await page.keyboard.type(typeString, {delay: 10})

                await clickCheckbox('Open link in new tab?')

                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`<a href="${typeString}" target="_blank" class="square-card" rel="noopener noreferrer"></a>`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })
    })
} );
