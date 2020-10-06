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
    clickElementByText,
} from '../test-helpers'

const block = {blockTitle: 'Sidebar CTA', blockName: 'purdue-blocks/sidebar-cta'}

describe( '🔬 Sidebar CTA Block', () => {
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

    describe('🔬 Block Editor Fields', () => {
        test('🔎 Header Text field updates output correctly', async () => {
            await blockStartup(block)

            const typeString = "Header text test."

            await page.focus( '.block-editor-rich-text__editable.header' );
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()
            expect( editedContent.includes(`<p class="header">${typeString}</p>`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })
        test('🔎 Content Text field updates output correctly', async () => {
            await blockStartup(block)

            const typeString = "Content text test."

            await page.focus( '.block-editor-rich-text__editable.content' );
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()
            expect( editedContent.includes(`<p class="content">${typeString}</p>`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })
        test('🔎 Button Text field updates output correctly', async () => {
            await blockStartup(block)

            const typeString = "Button Text"
            
            await page.focus( '.block-editor-rich-text__editable.cta-button' );
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()
            expect( editedContent.includes(`<a href="" class="cta-button" target="_self" rel="noopener noreferrer">${typeString}</a>`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })    
    })

    describe('🔬 Side Panel Settings', () => {
        describe('🔬 Background color controls', () => {
            test('🔎 Black background option is slectable', async () => {
                await blockStartup(block)

                await clickRadio('Background Color', 'black')
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"backgroundColor":"black"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔎 Gray background option is slectable', async () => {
                await blockStartup(block)

                await clickRadio('Background Color', 'gray')
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"backgroundColor":"gray"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔎 White background option is slectable', async () => {
                await blockStartup(block)

                await clickRadio('Background Color', 'white')
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"backgroundColor":"gray"`)).toBe(false)
                expect( editedContent.includes(`"backgroundColor":"black"`)).toBe(false)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })

        describe('🔬 Button Link Settings', () => {
            test('🔎 Link URL field updates output correctly ', async () => {
                await blockStartup(block)

                const typeString = "https://www.purdue.edu"
                await clickElementByText('label', 'Link URL')
                await page.keyboard.type(typeString, {delay: 10})

                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"ctaUrl":"${typeString}"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })

            test('🔎 Link can be opened in new tab', async () => {
                await blockStartup(block)

                await clickCheckbox('Open link in new tab?')

                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"external":true`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })
    })
})