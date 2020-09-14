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
    clickRadio,
} from '../test-helpers'

const block = {blockTitle: 'CTA Banner', blockName: 'purdue-blocks/cta-banner'}

describe( '🔬 CTA Banner Block', () => {
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
        test( '🔎 CTA Description Text Field', async () => {
            await blockStartup(block)

            const typeString = "CTA Description Text test."

            await page.focus('input[placeholder="CTA Description Text..."]')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"ctaDesc":"${typeString}"`)).toBe(true)
        })
        test( '🔎 CTA Button Text Field', async () => {
            await blockStartup(block)

            const typeString = "CTA Button test."

            await page.focus('input[placeholder="CTA Button Text..."]')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"ctaText":"${typeString}"`)).toBe(true)
        })
        test( '🔎 CTA Link URL Field', async () => {
            await blockStartup(block)

            const typeString = "https://www.purdue.edu"

            await page.focus('input[placeholder="CTA URL..."]')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"ctaUrl":"${typeString}"`)).toBe(true)
        })
    })

    describe('🔬 Side Panel Settings', () => {
        test( '🔎 Banner type radio controls', async () => {
            await blockStartup(block)

            await clickRadio('CTA Banner Type', 'black')
            
            let editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"type":"black"`)).toBe(true)


            await clickRadio('CTA Banner Type', 'gold')
            
            editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"type":"black"`)).toBe(false)
            expect( editedContent.includes(`"type":"gray"`)).toBe(false)
            expect( editedContent.includes(`"type":"image"`)).toBe(false)


            await clickRadio('CTA Banner Type', 'gray')
            
            editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"type":"gray"`)).toBe(true)


            await clickRadio('CTA Banner Type', 'image')
            
            editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"type":"image"`)).toBe(true)
        })
        test('🔎 Image banner type media library button', async () => {
            await blockStartup(block)

            await clickRadio('CTA Banner Type', 'image')
            
            const editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"type":"image"`)).toBe(true)

            // open media library
            await clickElementByText('button', 'Open Media Library')

            // tests that media library does open
            expect(await page.$(`div.media-frame-title`)).not.toBeNull()
        })
        test('🔎 Image banner type alt text field', async () => {
            await blockStartup(block)
            
            await clickRadio('CTA Banner Type', 'image')
            let editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"type":"image"`)).toBe(true)

            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Hero Image Alt Text')
            await page.keyboard.type(typeString, {delay: 10})
    
            editedContent = await getEditedPostContent()

            expect( editedContent).toMatchSnapshot()
            expect( editedContent.includes(`aria-label="${typeString}"`)).toBe(true)
            expect( editedContent.includes(`"altText":"${typeString}"`)).toBe(true)
        })
    })
})