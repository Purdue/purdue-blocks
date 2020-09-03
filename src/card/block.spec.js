// title-hero test
jest.setTimeout(30000)
import {
    createNewPost,
    enablePageDialogAccept,
    getEditedPostContent,
    insertBlock,
} from '@wordpress/e2e-test-utils';

import {
    clickElementByText,
    blockStartup
} from '../test-helpers'

const block = {blockTitle: 'Card', blockName: 'purdue-blocks/card'}

describe( '🔬 Card Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( 'Block should be available.', async () => {
        await insertBlock( 'Card' )


        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$('[data-type="purdue-blocks/card"]')).not.toBeNull()
        expect( await getEditedPostContent()).toMatchSnapshot()
    } )

    describe( '🔬 Block Editor Fields', () => {
        test( 'Button should open Media Library.', async () => {
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
        test( 'Title Richtext editor should be editable.', async () => {
            await blockStartup(block)

            const typeString = "Test Title"
            
            // focus the text box then type into it with the virtual keyboard
            await page.focus( '.block-editor-rich-text__editable.title' );
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            // tests: 
            // a. save output properly contains the correct string 
            // b. save output matches the existing snapshot
            expect( editedContent.includes(`<p>${typeString}</p>`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })

        test( 'Text Richtext editor should be editable.', async () => {
            await blockStartup(block)

            const typeString = "Test text here."
            
            // focus the textarea then type into it with the virtual keyboard
            await page.focus( '.block-editor-rich-text__editable.content' );
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            // tests: 
            // a. save output properly contains the correct string 
            // b. save output matches the existing snapshot
            expect( editedContent.includes(`<p>${typeString}</p>`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })
    })
    describe( '🔬 Side Panel Settings', () => {
        test( 'Background color should be selectable.', async () => {
            await blockStartup(block)

            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Hero Image Alt Text')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            // tests: 
            // a. save output properly contains the correct string 
            // b. save output matches the existing snapshot
            expect( editedContent.includes(`<div class="background-image" aria-label="${typeString}">`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })
        test( 'Border color should be selectable.', async () => {
            await blockStartup(block)

            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Hero Image Alt Text')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            // tests: 
            // a. save output properly contains the correct string 
            // b. save output matches the existing snapshot
            expect( editedContent.includes(`<div class="background-image" aria-label="${typeString}">`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })
        test( 'Image alt text should be editable.', async () => {
            await blockStartup(block)

            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Hero Image Alt Text')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            // tests: 
            // a. save output properly contains the correct string 
            // b. save output matches the existing snapshot
            expect( editedContent.includes(`<div class="background-image" aria-label="${typeString}">`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })
    })
} );
