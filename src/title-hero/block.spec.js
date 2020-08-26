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

const block = {blockTitle: 'Title Hero', blockName: 'purdue-blocks/title-hero'}

describe( 'Title Hero Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    it( 'Block should be available.', async () => {
        await insertBlock( 'Title Hero' )


        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$('[data-type="purdue-blocks/title-hero"]')).not.toBeNull()
        expect( await getEditedPostContent()).toMatchSnapshot()
    } )

    it( 'Button should open Media Library.', async () => {
        await blockStartup(block)

        // open media library
        await clickElementByText('button', 'Open Media Library')

        // tests that media library does open
        expect(await page.$(`div.media-frame-title`)).not.toBeNull()

        /*
        NOTE: explore further to see how media items can be spoofed so that the actual
              image urls can be properly snapshotted and tested.
        */
    })

    it( 'Title should be editable.', async () => {
        await blockStartup(block)

        const typeString = "Test Title"
        
        // focus the text box then type into it with the virtual keyboard
        await page.focus( `[data-type="purdue-blocks/title-hero"] input` );
        await page.keyboard.type(typeString, {delay: 10})

        const editedContent = await getEditedPostContent()

        // tests: 
        // a. save output properly contains the correct string 
        // b. save output matches the existing snapshot
        expect( editedContent.includes(`<h1>${typeString}</h1>`)).toBe(true)
        expect( editedContent).toMatchSnapshot()
    })

    it( 'Intro copy should be editable.', async () => {
        await blockStartup(block)

        const typeString = "Test intro copy here."
        
        // focus the textarea then type into it with the virtual keyboard
        await page.focus( `[data-type="purdue-blocks/title-hero"] textarea` );
        await page.keyboard.type(typeString, {delay: 10})

        const editedContent = await getEditedPostContent()

        // tests: 
        // a. save output properly contains the correct string 
        // b. save output matches the existing snapshot
        expect( editedContent.includes(`<p>${typeString}</p>`)).toBe(true)
        expect( editedContent).toMatchSnapshot()
    })

    it( 'Image alt text should be editable.', async () => {
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
} );
