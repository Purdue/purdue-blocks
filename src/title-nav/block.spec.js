// title-nav test
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

const block = {blockTitle: 'Titled Navigation', blockName: 'purdue-blocks/title-nav'}

describe( '🔬 Titled Navigation Block', () => {
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

    describe( '🔬 Block Editor Fields', () => {
        test( 'Richtext editor should update output correctly.', async () => {
            await blockStartup(block)

            const typeString = 'Title Test'

            // focus the title richtext editor and type in it.
            await page.focus('.block-editor-rich-text__editable.editor-title-nav__title')
            await page.keyboard.type(typeString, {delay: 10})
            
            const editedContent = await getEditedPostContent()
            
            expect( editedContent.includes(`<h2 class="pu-title-nav__title">${typeString}</h2>`)).toBe(true)
            expect( await getEditedPostContent() ).toMatchSnapshot()
        })
    })

    describe( '🔬 Side Panel Settings', () => {

        // Test settings in side panel
        test( 'Outline should be added correctly.', async () => {
            await blockStartup(block)
    
            //click to check the checkbox, outline should be on
            await clickCheckbox('Give Menu Items an Outline?')
            
            let editedContent = await getEditedPostContent()
            
            expect( editedContent.includes('{"hasOutline":true}')).toBe(true)
            expect( await getEditedPostContent() ).toMatchSnapshot()
            
    
            // click to uncheck the checkbox, outline should now turn off
            await clickCheckbox('Give Menu Items an Outline?')
            
            editedContent = await getEditedPostContent()
            
            expect( editedContent.includes('{"hasOutline":true}')).toBe(false)
            expect( await getEditedPostContent() ).toMatchSnapshot()
        })

        describe( '🔬 Adding/Removing Navigation Links', () => {

            // test settings to do with adding and removing the inner navigation links
            test( 'Navigation links added correctly.', async () => {
                await blockStartup(block)
        
                const addLinks = 3
                await updateRangeInput(`.components-input-control__input[aria-label="Number of Navigation Items"]`, addLinks)
        
                const linksNum = await page.$$eval(`[data-type="purdue-blocks/title-nav-link"]`, array => array.length)
        
                expect( linksNum ).toEqual(addLinks)
                expect( await getEditedPostContent() ).toMatchSnapshot()
        
            })
        
            test( 'Number of navigation links update correctly.', async () => {
                await blockStartup(block)
        
                let update = 5
                await updateRangeInput(`.components-input-control__input[aria-label="Number of Navigation Items"]`, update)
                
                let linksNum = await page.$$eval(`[data-type="purdue-blocks/title-nav-link"]`, array => array.length)
                expect( linksNum ).toEqual(update)
        
                update = 2
                await updateRangeInput(`.components-input-control__input[aria-label="Number of Navigation Items"]`, update)
        
        
                linksNum = await page.$$eval(`[data-type="purdue-blocks/title-nav-link"]`, array => array.length)
                expect( linksNum ).toEqual(update)
        
                expect( await getEditedPostContent() ).toMatchSnapshot()
        
            })
        })

        describe( '🔬 CTA Button Settings', () => {
            test( 'CTA button checkbox should toggle controls.', async () => {
                await blockStartup(block)
        
                // click the checkbox to show button controls
                await clickCheckbox('Add a CTA Button?')
                // incase the controls are not expanded by default
                await openSidebarPanelWithTitle('Button Controls')
        
                const buttonControls = await page.$('.components-panel__body.is-opened')
        
                expect(buttonControls).not.toBeNull()
        
            })
        
            test( 'CTA button controls should update output correctly.', async () => {
                await blockStartup(block)
        
                // click the checkbox to show button controls
                await clickCheckbox('Add a CTA Button?')
                // incase the controls are not expanded by default
                await openSidebarPanelWithTitle('Button Controls')
        
                const typeString = 'Button Text'
                const typeUrl = 'https://www.purdue.edu'
        
                await clickElementByText('label', 'Button Text')
                await page.keyboard.type(typeString, {delay: 10})
        
                await clickElementByText('label', 'Button Link')
                await page.keyboard.type(typeUrl, {delay: 10})
        
                const editedContent = await getEditedPostContent()
                
                expect( editedContent.includes('{"addButton":true,')).toBe(true)
                expect( editedContent.includes(`"buttonText":"${typeString}"`)).toBe(true)
                expect( editedContent.includes(`"buttonLink":"${typeUrl}"}`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })
    
    })
} );
