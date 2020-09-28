// title-nav test
jest.setTimeout(30000)
import {
    createNewPost,
    enablePageDialogAccept,
    getEditedPostContent,
    getAllBlocks,
    selectBlockByClientId
} from '@wordpress/e2e-test-utils';

import {
    clickElementByText,
    blockStartup,
    clickCheckbox,
} from '../../test-helpers'

const block = {blockTitle: 'Titled Navigation', blockName: 'purdue-blocks/title-nav'}

describe( '🔬 Titled Navigation Link Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( '🔎 Block should exist at minimum one.', async () => {
        await blockStartup(block)

        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$('[data-type="purdue-blocks/title-nav-link"]')).not.toBeNull()
        expect( await getEditedPostContent() ).toMatchSnapshot()
    } )

    test( '🔎 Current page checkbox should add correct style.', async () => {
        await blockStartup(block)

        // select title-nav-link
        const inner = [...await getAllBlocks()][0].innerBlocks
        await selectBlockByClientId(inner.clientId)

        // force open block settings
        await clickElementByText('button', 'Block')

        // click title-nav-link to make sure block is focused and the settings appear in sidebar
        const x = await page.$( '[data-type="purdue-blocks/title-nav-link"] .block-editor-rich-text__editable' )
        await x.click()

        // click the checkbox to show button controls
        await clickCheckbox('Is this the current page?')

        const editedContent = await getEditedPostContent()
        
        expect( editedContent.includes(`wp:purdue-blocks/title-nav-link {"isCurrent":true}`)).toBe(true)
        expect( await getEditedPostContent() ).toMatchSnapshot()
    })

    test( '🔎 Richtext editor should update output correctly.', async () => {
        await blockStartup(block)

        const typeString = 'Text'

        // select title-nav-link
        const inner = [...await getAllBlocks()][0].innerBlocks
        await selectBlockByClientId(inner.clientId)

        // force open block settings
        await clickElementByText('button', 'Block')

        // click title-nav-link to make sure block is focused and the settings appear in sidebar
        const x = await page.$( '[data-type="purdue-blocks/title-nav-link"] .block-editor-rich-text__editable' )
        await x.click()

        await page.keyboard.type(typeString, {delay: 1})

        const editedContent = await getEditedPostContent()
        
        expect( editedContent.includes(`<li class="">${typeString}</li>`)).toBe(true)
        expect( await getEditedPostContent() ).toMatchSnapshot()
    })
})