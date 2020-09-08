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

const block = {blockTitle: 'Faculty Profile Card', blockName: 'purdue-blocks/faculty-profile-card'}


// cannot use match snapshot as a test case because everytime a new page is created, it will have a new id, 
// and that id is captured in a block attribute and in the snapshot, so it will change every time 
// the test runs.
describe( '🔬 Faculty Profile Card Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( '🔎 Block should be available.', async () => {
        await insertBlock( block.blockTitle )


        // tests that the block is properly inserted
        expect( await getEditedPostContent() ).toMatchSnapshot()
        expect(await page.$(`[data-type="${block.blockName}"]`)).not.toBeNull()
    } )

    describe('🔬 Block Editor Fields', () => {
        
        test('🔎 Media Library Button', async () =>{
            await blockStartup(block)

            // open media library
            await clickElementByText('button', 'Open Media Library')
    
            // tests that media library does open
            expect(await page.$(`div.media-frame-title`)).not.toBeNull()
        })

        describe('🔬 Personal Info Fields', () => {
            test('🔎 Add Phone Number Field', async () =>{
                await blockStartup(block)
                
                const typeString = "123 456 7890"
        
                await page.focus('input[placeholder="Phone Number..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`"phone":"${typeString}"`)).toBe(true)
            })
            test('🔎 Add Email Address Field', async () =>{
                await blockStartup(block)
                
                const typeString = "test@test.test"
        
                await page.focus('input[placeholder="Email..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`"email":"${typeString}"`)).toBe(true)
            })
            test('🔎 Add Personal Website Field', async () =>{
                await blockStartup(block)
                
                const typeString = "https://www.purdue.edu"
        
                await page.focus('input[placeholder="Personal Site..."]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( await getEditedPostContent() ).toMatchSnapshot()
                expect( editedContent.includes(`"personalLink":"${typeString}"`)).toBe(true)
            })
        })
    })

    describe('🔬 Side Panel Settings', () => {
        test('🔎 Image alt text field', async () => {
            await blockStartup(block)

            const typeString = "Image alt text."
            
            // focus the text box then type into it with the virtual keyboard
            await clickElementByText('label', 'Profile Picture Alt Text')
            await page.keyboard.type(typeString, {delay: 10})
    
            const editedContent = await getEditedPostContent()
    
            expect( editedContent.includes(`"altText":"${typeString}"`)).toBe(true)
            expect( editedContent).toMatchSnapshot()
        })

        describe('🔬 Social Share Links', () => {

            // test settings in the sidebar for adding the social share links to the hero
            test( '🔎 "Include Social Share Links" checkbox reveals individual checkboxes', async () => {
                await blockStartup(block)
        
                await clickCheckbox('Include Social Media Links')
        
                const socialsCheckboxes = await page.$x(
                    `//label[@class = "components-checkbox-control__label"][.="Facebook" or .="Twitter" or .="LinkedIn" or .="Instagram"]`
                )
        
                const editedContent = await getEditedPostContent()
                // check that the checkboxes appear and that the correct number exist, 3
                expect(socialsCheckboxes).not.toBeNull()
                expect(socialsCheckboxes.length).toBe(4)
                expect( editedContent ).toMatchSnapshot()
            })

            test( '🔎 Social links added correctly', async () => {
                await blockStartup(block)
                await clickCheckbox('Include Social Media Links')

                await clickCheckbox('Facebook')
                let editedContent = await getEditedPostContent()
                expect( editedContent.includes('"Facebook":{"slug":"facebook-square","checked":true}')).toBe(true)
                
                await clickCheckbox('Twitter')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes('"Twitter":{"slug":"twitter-square","checked":true}')).toBe(true)
                
                await clickCheckbox('LinkedIn')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes('"LinkedIn":{"slug":"linkedin","checked":true}')).toBe(true)
                
                await clickCheckbox('Instagram')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes('"Instagram":{"slug":"instagram","checked":true}')).toBe(true)

                expect( editedContent).toMatchSnapshot()
            })
        })
    })
})