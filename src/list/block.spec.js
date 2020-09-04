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
    openSidebarPanelWithTitle
} from '../test-helpers'

const block = {blockTitle: 'List', blockName: 'purdue-blocks/list'}

describe( '🔬 List Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( 'Block should be available.', async () => {
        await insertBlock( 'List' )

        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$('[data-type="purdue-blocks/list"]')).not.toBeNull()
        expect( await getEditedPostContent() ).toMatchSnapshot()
    } )

    describe('🔬 Block Editor Fields', () => {
        test('List Header field', async () => {
            await blockStartup(block)

            const typeString = 'List Header Test'

            await page.focus('input[placeholder="Content Header..."]')
            await page.keyboard.type(typeString, {delay: 10})
            
            const editedContent = await getEditedPostContent()
            
            expect( editedContent.includes(`"header":"${typeString}"`)).toBe(true)
            expect( editedContent.includes(`<div class="pu-list"><h2>${typeString}</h2>`)).toBe(true)
            expect( await getEditedPostContent() ).toMatchSnapshot()
        })

        describe('🔬 WP Core List Field', () => {
            test('Add unordered list in inner core list block field', async () => {
                await blockStartup(block)
    
                const listItem1 = 'list item 1'
                const listItem2 = 'list item 2'
                const listItem3 = 'list item 3'
    
                await page.focus('ul[data-type="core/list"]')
                await page.keyboard.type(listItem1, {delay: 10})
                await page.keyboard.press('Enter')
                await page.keyboard.type(listItem2, {delay: 10})
                await page.keyboard.press('Enter')
                await page.keyboard.type(listItem3, {delay: 10})
                
                const editedContent = await getEditedPostContent()
                
                expect( editedContent.includes(`<ul><li>${listItem1}</li><li>${listItem2}</li><li>${listItem3}</li></ul>`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })

            test('Add ordered list in inner core list block field', async () => {
                await blockStartup(block)
    
                const listItem1 = 'list item 1'
                const listItem2 = 'list item 2'
                const listItem3 = 'list item 3'
    
                await page.focus('ul[data-type="core/list"]')

                await page.click('button[aria-label="Convert to ordered list"]')

                await page.keyboard.type(listItem1, {delay: 10})
                await page.keyboard.press('Enter')
                await page.keyboard.type(listItem2, {delay: 10})
                await page.keyboard.press('Enter')
                await page.keyboard.type(listItem3, {delay: 10})
                
                const editedContent = await getEditedPostContent()
                
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`<ol><li>${listItem1}</li><li>${listItem2}</li><li>${listItem3}</li></ol>`)).toBe(true)
            })

            
        })


    })

})