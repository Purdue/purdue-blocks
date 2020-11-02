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

const block = {blockTitle: 'Reasons to Believe', blockName: 'purdue-blocks/proofpoint'}

describe( '🔬 Proofpoint Block', () => {
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
        describe('🔬 Proofpoint body text fields', () => {
            test('🔎 Highlighted Text field updates output correctly', async () => {
                await blockStartup(block)

                const typeString = "Highlighted text test."
    
                await page.focus('input[placeholder="Highlighted Text..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"highlighted":"${typeString}"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔎 Content Text field updates output correctly', async () => {
                await blockStartup(block)

                const typeString = "Content text test."
    
                await page.focus('input[placeholder="Content Text..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"content":"${typeString}"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔎 Proofpoint source field updates output correctly', async () => {
                await blockStartup(block)

                const typeString = "Proofpoint source test."
    
                await page.focus('input[placeholder="Source of Text..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"source":"${typeString}"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })

        describe('🔬 Proofpoint CTA fields', () => {
            test('🔎 CTA text field updates output correctly', async () => {
                await blockStartup(block)

                const typeString = "CTA text"
    
                await page.focus('input[placeholder="CTA Text..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"ctaText":"${typeString}"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔎 CTA url field updates output correctly', async () => {
                await blockStartup(block)

                const typeString = "https://www.purdue.edu"
    
                await page.focus('input[placeholder="CTA URL..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"ctaUrl":"${typeString}"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })        
    })

    describe('🔬 Side Panel Settings', () => {
        describe('🔬 Background color controls', () => {
            test('🔎 White background option reveals add border checkbox', async () => {
                await blockStartup(block)

                await clickRadio('Background Color', 'white')

                const [borderCheckbox] = await page.$x( `//label[@class="components-checkbox-control__label"][contains(text(),"Add border?")]` )

                expect( borderCheckbox ).not.toBeNull()
                expect( borderCheckbox ).not.toBe(undefined)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })

            test('🔎 Add border checkbox correctly adds borders', async () => {
                await blockStartup(block)

                await clickRadio('Background Color', 'white')
                await clickCheckbox('Add border?')
                
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"border":true`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })

            test('🔎 Button color on white background updates output correctly', async () => {
                await blockStartup(block)

                await clickRadio('Background Color', 'white')
                await clickRadio('Button Color', 'white')

                let editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"buttonColor":"white"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()


                await clickRadio('Button Color', 'black')

                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"buttonColor":"white"`)).toBe(false)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })

        describe('🔬 Text Style Settings', () => {
            test('🔎 Highlighted text style radio controls', async () => {
                await blockStartup(block)

                // type in some content so that the p el is added to output to test text style setting
                const typeString = "Highlighted text test."
                await page.focus('input[placeholder="Highlighted Text..."]')
                await page.keyboard.type(typeString, {delay: 10})

                const [wideControl] = await page.$x( `//div[@class="components-radio-control__option"][../label='Highlighted Text Style']//input[@value='wide']` )
                await wideControl.click()
                
                let editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"headerfontStyle":"wide"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()

                // then test that it swaps back correctly
                const [narrowControl] = await page.$x( `//div[@class="components-radio-control__option"][../label='Highlighted Text Style']//input[@value='narrow']` )
                await narrowControl.click()
                
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"headerfontStyle":"wide"`)).toBe(false)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })

            test('🔎 Content text style radio controls', async () => {
                await blockStartup(block)

                // type in some content so that the p el is added to output to test text style setting
                const typeString = "Content text test."
                await page.focus('input[placeholder="Content Text..."]')
                await page.keyboard.type(typeString, {delay: 10})

                await clickRadio('Content Text Style', 'wide')
                
                let editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"contentfontStyle":"wide"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()

                // then test that it swaps back correctly
                await clickRadio('Content Text Style', 'narrow')
                
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"contentfontStyle":"wide"`)).toBe(false)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })
        describe('🔬 Button Link Setting', () => {
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