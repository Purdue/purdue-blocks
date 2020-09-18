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
    updateRangeInput,
    clickCheckbox,
    clickRadio,
    openSidebarPanelWithTitle
} from '../test-helpers'

const block = {blockTitle: 'CTA Hero', blockName: 'purdue-blocks/cta-hero'}

describe( '🔬 CTA Hero Block', () => {
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
        expect( await getEditedPostContent() ).toMatchSnapshot()
    } )

    describe('🔬 Block Editor Fields', () => {
        test('🔎 Page Title Field', async () =>{
            await blockStartup(block)

            const typeString = "CTA Hero page title test."
            
            await page.focus('input[placeholder="Page Title..."]')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"pageTitle":"${typeString}"`)).toBe(true)
        })

        test('🔎 Media Library button', async () => {
            await blockStartup(block)

            // open media library
            await clickElementByText('button', 'Open Media Library')

            // tests that media library does open
            expect(await page.$(`div.media-frame-title`)).not.toBeNull()
        })

        describe('🔬 CTA Button Settings Fields', () => {
            test('🔎 CTA text field', async () => {
                await blockStartup(block)

                const typeString = "CTA Hero button text test."
    
                await page.focus('input[placeholder="CTA Text..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`"ctaText":"${typeString}"`)).toBe(true)
            })
            test('🔎 CTA url field', async () => {
                await blockStartup(block)

                const typeString = "https://www.purdue.edu"
    
                await page.focus('input[placeholder="CTA URL..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`"ctaUrl":"${typeString}"`)).toBe(true)
            })
        })
    })

    describe('🔬 Side Panel Settings', () => {
        
        test( '🔎 Image alt text field.', async () => {
            await blockStartup(block)

            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Hero Image Alt Text')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()
            expect( editedContent).toMatchSnapshot()
            expect( editedContent.includes(`aria-label="${typeString}"`)).toBe(true)
            expect( editedContent.includes(`"altText":"${typeString}"`)).toBe(true)
        })
    })
})