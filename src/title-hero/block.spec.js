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

    // Tests can be added here by using the it() function
    it( 'Block should be available.', async () => {
        await insertBlock( 'Title Hero' )

        expect(await page.$('[data-type="purdue-blocks/title-hero"]')).not.toBeNull()

        expect( await getEditedPostContent()).toMatchSnapshot()
    } )

    it( 'Button should open Media Library.', async () => {
        await blockStartup(block)

        // open media library
        await clickElementByText('button', 'Open Media Library')

        // media library title is there?
        expect(await page.$(`div.media-frame-title`)).not.toBeNull()
    })

    it( 'Title should be editable.', async () => {
        await blockStartup(block)

        const typeString = "Test Title"
        
        await page.focus( `[data-type="purdue-blocks/title-hero"] input` );
        await page.keyboard.type(typeString, {delay: 10})

        const editedContent = await getEditedPostContent()

        expect( editedContent.includes(`<h1>${typeString}</h1>`)).toBe(true)
        expect( editedContent).toMatchSnapshot()
    })

    it( 'Intro copy should be editable.', async () => {
        await blockStartup(block)

        const typeString = "Test intro copy here."
        
        await page.focus( `[data-type="purdue-blocks/title-hero"] textarea` );
        await page.keyboard.type(typeString, {delay: 10})

        const editedContent = await getEditedPostContent()

        expect( editedContent.includes(`<p>${typeString}</p>`)).toBe(true)
        expect( editedContent).toMatchSnapshot()
    })

    it( 'Image alt text should be editable.', async () => {
        await blockStartup(block)

        const typeString = "Image alt text."
        
        await clickElementByText('label', 'Hero Image Alt Text')
        await page.keyboard.type(typeString, {delay: 10})

        const editedContent = await getEditedPostContent()

        expect( editedContent.includes(`<div class="background-image" aria-label="${typeString}">`)).toBe(true)
        expect( editedContent).toMatchSnapshot()
    })
} );
