
jest.setTimeout(30000)
import {
    createNewPost,
    enablePageDialogAccept,
    getEditedPostContent,
    insertBlock,
} from '@wordpress/e2e-test-utils';

import {
    selectOption,
    clickElementByText,
    blockStartup,
    updateRangeInput,
    clickCheckbox,
    clickRadio,
    openSidebarPanelWithTitle
} from '../test-helpers'

const block = {blockTitle: 'Accordion', blockName: 'purdue-blocks/accordion'}

describe( '🔬 Accordion Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( 'Block should be available.', async () => {
        await insertBlock( 'Titled Navigation' )


        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$('[data-type="purdue-blocks/title-nav"]')).not.toBeNull()
        expect( await getEditedPostContent() ).toMatchSnapshot()
    } )

    describe( '🔬 Richtext Block Fields', () => {
        test( 'Title updates output correctly', async () => {
            await blockStartup(block)

            const typeString = "Accordion Title Test"
            await page.click('.block-editor-rich-text__editable[aria-label="Add Title"]')
            await page.keyboard.type(typeString, {delay: 10})
            
            const editedContent = await getEditedPostContent()
            expect( editedContent.includes(`>${typeString}</p>`)).toBe(true)
        })

        test( 'Content updates output correctly', async () => {
            await blockStartup(block)

            const typeString = "Accordion content test string"
            await page.click('.block-editor-rich-text__editable[data-type="core/paragraph"]')
            await page.keyboard.type(typeString, {delay: 10})
            
            const editedContent = await getEditedPostContent()
            expect( editedContent.includes(`<p>${typeString}</p>`)).toBe(true)
        })
    })

    describe( '🔬 Side Panel Settings', () => {
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
    } )
})