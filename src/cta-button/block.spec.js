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
    clickCheckbox
} from '../test-helpers'

const block = {blockTitle: 'CTA Button', blockName: 'purdue-blocks/cta-button'}

describe( '🔬 Card Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( '🔎 Block should be available.', async () => {
        await insertBlock( block.blockTitle )

        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$(`[data-type="${block.blockName}"]`)).not.toBeNull()
        expect( await getEditedPostContent()).toMatchSnapshot()
    } )

    describe('🔬 Block Editor Fields', () => {
        test( '🔎 Open Media Library Button.', async () => {
            await blockStartup(block)

            // open media library
            await clickElementByText('button', 'Open Media Library')

            // tests that media library does open
            expect(await page.$(`div.media-frame-title`)).not.toBeNull()
        })

        test('🔎 Card Text Field', async () => {
            await blockStartup(block)
            
            const typeString = "Test Title"

            await page.focus('input[placeholder="Card text..."]')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"subText":"${typeString}"`)).toBe(true)
        })

        describe('🔬 CTA Button Setting Fields', () => {

            test('🔎 CTA Button Text Field', async () => {
                await blockStartup(block)
                
                const typeString = "CTA text test"
    
                await page.focus('input[placeholder="CTA Text..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`"ctaText":"${typeString}"`)).toBe(true)
            })

            test('🔎 CTA Link Field', async () => {
                await blockStartup(block)
                
                const typeString = "Https://www.purdue.edu"
    
                await page.focus('input[placeholder="Paste permalink or url..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`"link":"${typeString}"`)).toBe(true)
            })
        })
    })

    describe('🔬 Side Panel Settings', () => {
        test( '🔎 Image alt text should be editable.', async () => {
            await blockStartup(block)

            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Image Alt Text')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            expect( editedContent).toMatchSnapshot()
            expect( editedContent.includes(`"altText":"${typeString}"`)).toBe(true)
        })

        test( '🔎 Open Link in New Tab Chackbox', async () => {
            await blockStartup(block)

            await clickCheckbox('Open link in new tab?')
            
            const editedContent = await getEditedPostContent()

            expect( editedContent).toMatchSnapshot()
            expect( editedContent.includes(`"external":true`)).toBe(true)
        })
    })
})