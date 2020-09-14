// title-hero test
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

const block = {blockTitle: 'Site Hero', blockName: 'purdue-blocks/site-hero'}


// cannot use match snapshot as a test case because everytime a new page is created, it will have a new id, 
// and that id is captured in a block attribute and in the snapshot, so it will change every time 
// the test runs.
describe( '🔬 Site Hero Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    it( 'Block should be available.', async () => {
        await insertBlock( block.blockTitle )


        // tests that the block is properly inserted
        expect(await page.$(`[data-type="${block.blockName}"]`)).not.toBeNull()
    } )

    describe ( '🔬 Block Editor Fields', () => {
        
        // test fields and settings that appear in the editor in the block area.
        test( '🔎 Button should open Media Library.', async () => {
            await blockStartup(block)
    
            // open media library
            await clickElementByText('button', 'Open Media Library')
    
            // tests that media library does open
            expect(await page.$(`div.media-frame-title`)).not.toBeNull()
    
            /*
            NOTE: explore further to see how media items can be spoofed so that the actual
                  image urls can be properly snapshotted and tested.
            */
        })
    
        test( '🔎 Title should be editable.', async () => {
            await blockStartup(block)
    
            const typeString = "Test Title"
            
            // focus the text box then type into it with the virtual keyboard
            await page.focus( `[data-type="purdue-blocks/site-hero"] input` );
            await page.keyboard.type(typeString, {delay: 10})
    
            const editedContent = await getEditedPostContent()
    
            // tests: 
            // a. save output properly contains the correct string
            expect( editedContent.includes(`<h1>${typeString}</h1>`)).toBe(true)
        })
    
        test( '🔎 Intro copy should be editable.', async () => {
            await blockStartup(block)
    
            const typeString = "Test intro copy here."
            
            // focus the textarea then type into it with the virtual keyboard
            await page.focus( `[data-type="purdue-blocks/site-hero"] textarea` );
            await page.keyboard.type(typeString, {delay: 10})
    
            const editedContent = await getEditedPostContent()
    
            // tests: 
            // a. save output properly contains the correct string
            expect( editedContent.includes(`<p>${typeString}</p>`)).toBe(true)
        })
    })

    describe('🔬 Side Panel Settings', () => {

        // Test settings found in block settings sidebar.
        test( '🔎 Hero layout correctly toggled.', async () => {
            await blockStartup(block)
    
            // first toggle to 40/60 hero
            await clickElementByText('label', 'Hero Style Toggle')
    
            let editedContent = await getEditedPostContent()
            
            expect( editedContent.includes(`<div class="bulma-blocks-40-60-hero">`)).toBe(true)
            expect( editedContent.includes(`"styleToggle":true`)).toBe(true)
    
            // now toggle back to 50/50 and recheck
            await clickElementByText('label', 'Hero Style Toggle')
    
            editedContent = await getEditedPostContent()
            
            expect( editedContent.includes(`<div class="bulma-blocks-50-50-hero">`)).toBe(true)
            expect( editedContent.includes(`"styleToggle":true`)).toBe(false)
        })
    
        test( '🔎 Image alt text should be editable.', async () => {
            await blockStartup(block)
    
            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Hero Image Alt Text')
            await page.keyboard.type(typeString, {delay: 10})
    
            let editedContent = await getEditedPostContent()
    
            // tests: 
            // a. save output properly contains the correct string for 50-50 hero
            expect( editedContent.includes(`aria-label="${typeString}"`)).toBe(true)
    
            
            // now toggle to 40/60 hero and recheck
            await clickElementByText('label', 'Hero Style Toggle')
    
            editedContent = await getEditedPostContent()
            
            expect( editedContent.includes(`<div class="bulma-blocks-40-60-hero">`)).toBe(true)
            expect( editedContent.includes(`"styleToggle":true`)).toBe(true)
            expect( editedContent.includes(`aria-label="${typeString}"`)).toBe(true)
        })

        describe('🔬 "Jump to Article" Button',  () => {

            // test the settings for adding a jump to article button
            test( '🔎 Add "Jump to Article" Button', async () => {
                await blockStartup(block)
    
                await clickCheckbox('Include a Jump to Article button')
    
                let editedContent = await getEditedPostContent()
    
                expect( editedContent.includes('"include-social":true'))
            })

            test( '🔎 Add anchor via id', async () => {
                await blockStartup(block)
                await clickCheckbox('Include a Jump to Article button')

                const typeId = "exampleAnchor"

                await clickElementByText('label', 'ID of the element the button will jump to')
                await page.keyboard.type(typeId, {delay: 10})
    
                let editedContent = await getEditedPostContent()
    
                expect( editedContent.includes(`<a href={ ${typeId} } className="jump-button">jump to articles <i className="fas fa-arrow-down" aria-hidden="true"></i></a>`))
            })
        })


        describe('🔬 Social Share Links', () => {

            // test settings in the sidebar for adding the social share links to the hero
            test( '🔎 "Include Social Share Links" checkbox reveals individual checkboxes', async () => {
                await blockStartup(block)
        
                await clickCheckbox('Include Social Share Links')
        
                const socialsCheckboxes = await page.$x(
                    `//label[@class = "components-checkbox-control__label"][.="Facebook" or .="Twitter" or .="LinkedIn"]`
                )
        
                // check that the checkboxes appear and that the correct number exist, 3
                expect(socialsCheckboxes).not.toBeNull()
                expect(socialsCheckboxes.length).toBe(3)
                
            })

            test( '🔎 Social links added corrctly', async () => {
                await blockStartup(block)
                await clickCheckbox('Include Social Share Links')

                await clickCheckbox('Facebook')
                let editedContent = await getEditedPostContent()
                expect( editedContent.includes('"facebook-f":true'))
                
                await clickCheckbox('Twitter')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes('"twitter":true'))
                
                await clickCheckbox('LinkedIn')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes('"linkedin-in":true'))
            })
        })
    
    })


} );
