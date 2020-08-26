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
    blockStartup,
    updateRangeInput
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

        const addLinks = 3
        await updateRangeInput(`.components-input-control__input[aria-label="Number of Navigation Items"]`, addLinks)

        const linksNum = await page.$$eval(`[data-type="purdue-blocks/title-nav-link"]`, array => array.length)

        expect( linksNum ).toEqual(addLinks)
        expect( await getEditedPostContent() ).toMatchSnapshot()

    })

    it( 'Navigation links update correctly.', async () => {
        await blockStartup(block)

        let update = 5
        await updateRangeInput(`.components-input-control__input[aria-label="Number of Navigation Items"]`, update)
        
        let linksNum = await page.$$eval(`[data-type="purdue-blocks/title-nav-link"]`, array => array.length)
        expect( linksNum ).toEqual(update)

        update = 2
        await updateRangeInput(`.components-input-control__input[aria-label="Number of Navigation Items"]`, update)


        linksNum = await page.$$eval(`[data-type="purdue-blocks/title-nav-link"]`, array => array.length)
        expect( linksNum ).toEqual(update)

        expect( await getEditedPostContent() ).toMatchSnapshot()

    })
} );
