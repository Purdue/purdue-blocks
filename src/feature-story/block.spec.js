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
    clickCheckbox
} from '../test-helpers'

const block = {blockTitle: 'Featured Story', blockName: 'purdue-blocks/feature-story'}

describe( '🔬 Featured Story Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( '🔎 Block should be available.', async () => {
        await insertBlock( block.blockTitle )

        // tests that the block is properly inserted and matches the existing snapshot
        expect( await getEditedPostContent()).toMatchSnapshot()
        expect(await page.$(`[data-type="${block.blockName}"]`)).not.toBeNull()
    } )

    describe( '🔬 Block Editor Fields', () => {

        describe('🔬 Main content fields', () => {
            test( '🔎 Media Library Button.', async () => {
                await blockStartup(block)
    
                // open media library
                await clickElementByText('button', 'Open Media Library')
    
                // tests that media library does open
                expect(await page.$(`div.media-frame-title`)).not.toBeNull()
            })

            test('🔎 Story Header Field', async () => {
                await blockStartup(block)

                const typeString = "Content Header test."
    
                await page.focus('input[placeholder="Content Header..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`"header":"${typeString}"`)).toBe(true)
            })

            test('🔎 Content Body Field', async () => {
                await blockStartup(block)

                const typeString = "Content main body test."
    
                await page.focus('.block-editor-inner-blocks p[data-type="core/paragraph"]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`<p>${typeString}</p>`)).toBe(true)
            })
        })

        describe('🔬 CTA Button fields', () => {
            test('🔎 CTA Text Field', async () => {
                await blockStartup(block)

                const typeString = "CTA Text test."
    
                await page.focus('input[placeholder="CTA Text..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`"ctaText":"${typeString}"`)).toBe(true)
            })
            test('🔎 CTA URL Field', async () => {
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

    describe('🔬 Side Panel Fields', () => {
        test('🔎 Full width option checkbox', async () => {
            await blockStartup(block)
            
            let editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"style":false`)).toBe(false)

            await clickCheckbox('Full width')

            editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"style":false`)).toBe(true)
        })

        test ('🔎 Content alignment option radio buttons', async () => {
            await blockStartup(block)

            let editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"contentAlign":"right"`)).toBe(false)

            await clickRadio('Align content', 'right')

            editedContent = await getEditedPostContent()
            expect( await getEditedPostContent() ).toMatchSnapshot()
            expect( editedContent.includes(`"contentAlign":"right"`)).toBe(true)

        })
        
        test( '🔎 Image alt text field.', async () => {
            await blockStartup(block)

            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Featured Image Alt Text')
            await page.keyboard.type(typeString, {delay: 10})

            const editedContent = await getEditedPostContent()

            expect( editedContent.includes(`"altText":"${typeString}"`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
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