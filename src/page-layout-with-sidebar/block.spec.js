// title-nav test
jest.setTimeout(30000)
import {
    createNewPost,
    enablePageDialogAccept,
    getEditedPostContent,
    insertBlock,
} from '@wordpress/e2e-test-utils';

import {
    blockStartup,
    clickCheckbox,
    clickRadio,
} from '../test-helpers'

const block = {blockTitle: 'Page Layout With Sidebar', blockName: 'purdue-blocks/page-layout-with-sidebar'}

describe( '🔬 Page Layout With Sidebar Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( 'Block should be available.', async () => {
        await insertBlock( block.blockTitle )


        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$(`[data-type="${block.blockName}"]`)).not.toBeNull()
        expect( await getEditedPostContent() ).toMatchSnapshot()
    } )

    describe('🔬 Side Panel Settings', () => {
        test('🔎 Sidebar Location On Desktop Options', async () => {
            await blockStartup(block)

            await clickRadio('Sidebar Location On Desktop', 'left')

            let editedContent = await getEditedPostContent()
            expect( editedContent.includes(`"sidebarLocationDesktop":"right"`)).toBe(false)
            expect( await getEditedPostContent() ).toMatchSnapshot()


            await clickRadio('Sidebar Location On Desktop', 'right')

            editedContent = await getEditedPostContent()
            expect( editedContent.includes(`"sidebarLocationDesktop":"right"`)).toBe(true)
            expect( await getEditedPostContent() ).toMatchSnapshot()
        })
        test('🔎 Sidebar Location On Mobile Options', async () => {
            await blockStartup(block)

            await clickRadio('Sidebar Location On Mobile', 'above')

            let editedContent = await getEditedPostContent()
            expect( editedContent.includes(`"sidebarLocationMobile":"below"`)).toBe(false)
            expect( await getEditedPostContent() ).toMatchSnapshot()


            await clickRadio('Sidebar Location On Mobile', 'right')

            editedContent = await getEditedPostContent()
            expect( editedContent.includes(`"sidebarLocationMobile":"below"`)).toBe(true)
            expect( await getEditedPostContent() ).toMatchSnapshot()
        })
    })
})