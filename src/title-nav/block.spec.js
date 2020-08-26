// title-nav test
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

const block = {blockTitle: 'Titled Navigation', blockName: 'purdue-blocks/title-nav'}

describe( 'Titled Navigation Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    it( 'Block should be available.', async () => {
        await insertBlock( 'Titled Navigation' )


        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$('[data-type="purdue-blocks/title-nav"]')).not.toBeNull()
        expect( await getEditedPostContent() ).toMatchSnapshot()
    } )

    it( 'Navigation links added correctly.', async () => {
        await blockStartup(block)

        const addLinks = "3"
        
        // double click in the range field to highlight current text
        await page.click( `[aria-label="Number of Navigation Items"]`, {clickCount: 2} );
        await page.keyboard.type(addLinks, {delay: 10})

        const linksNum = await page.$$eval(`[data-type="purdue-blocks/title-nav-link"]`, array => array.length)

        expect( linksNum ).toEqual(addLinks)
        expect( await getEditedPostContent() ).toMatchSnapshot()

    })
} );
