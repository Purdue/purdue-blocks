// title-nav test
jest.setTimeout(30000)
import {
    createNewPost,
    enablePageDialogAccept,
    getEditedPostContent,
    insertBlock,
} from '@wordpress/e2e-test-utils';

import {
    selectOption,
    clickElementByText,
    clickElementByAria,
    blockStartup,
    updateRangeInput,
    clickCheckbox,
    clickRadio,
    openSidebarPanelWithTitle
} from '../test-helpers'

const block = {blockTitle: 'Purdue RSS feed', blockName: 'purdue-blocks/purdue-rss'}

describe( '🔬 Purdue RSS Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    test( '🔎 Block should be available.', async () => {
        await insertBlock( 'Purdue RSS feed' )


        // tests that the block is properly inserted and matches the existing snapshot
        expect(await page.$('[data-type="purdue-blocks/purdue-rss"]')).not.toBeNull()
        expect( await getEditedPostContent() ).toMatchSnapshot()
    } )

    describe('🔬 Block Editor Fields', () => {
        describe('🔬 Feed URL Editor', () => {
            var originalTimeout;
            test('🔎 Feed URL is editable', async () => {
                await blockStartup(block)

                const typeString = "https://www.purdue.edu/"
    
                await page.focus('input[placeholder="Enter URL here…"]')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"feedURL":"${typeString}"`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
            test('🔎 Feed URL can be submitted', async () => {
                await blockStartup(block)
                const url = "https://www.purdue.edu/"
    
                await page.focus('input[placeholder="Enter URL here…"]')
                await page.keyboard.type(url, {delay: 10})
                await clickElementByText('button', 'Use URL')
                const typeString = "Header text"   
                await page.focus( '.block-editor-rich-text__editable.feed-header' );
                await page.keyboard.type(typeString, {delay: 10})

                const editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"error":"Invalid RSS feed URL."`)).toBe(true)
                expect( await getEditedPostContent() ).toMatchSnapshot()
            })
        })
        describe('🔬 Feeds Display Editor', () => {
            test('🔎 Header field should be editable', async () => {
                await blockStartup(block)
                const url = "https://www.purdue.edu/"
    
                await page.focus('input[placeholder="Enter URL here…"]')
                await page.keyboard.type(url, {delay: 10})
                await clickElementByText('button', 'Use URL')

                const typeString = "Header text"   
                await page.focus( '.block-editor-rich-text__editable.feed-header' );
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()

                expect( editedContent.includes(`<p class="feed-header">${typeString}</p>`)).toBe(true)
                expect( editedContent).toMatchSnapshot()
            })
            test('🔎 Pencil on the toolbar is clickable', async () => {
                await blockStartup(block)

                const typeString = "https://www.purdue.edu/"
    
                await page.focus('input[placeholder="Enter URL here…"]')
                await page.keyboard.type(typeString, {delay: 10})
                await clickElementByText('button', 'Use URL')
                await page.focus('div[aria-label="Block: Purdue RSS feed"]')
                await clickElementByAria('button', 'Edit RSS URL')
    
                expect(await page.$(`div.news-feed-editor`)).not.toBeNull()
            })
            test( '🔎 Button should open Media Library.', async () => {
                await blockStartup(block)
                const url = "http://lorem-rss.herokuapp.com/feed"
    
                await page.focus('input[placeholder="Enter URL here…"]')
                await page.keyboard.type(url, {delay: 10})
                await clickElementByText('button', 'Use URL')

                const typeString = "Header text"   
                await page.focus( '.block-editor-rich-text__editable.feed-header' );
                await page.keyboard.type(typeString, {delay: 10})
                await clickRadio('Layout of the RSS feed', 'withoutImage')
                // open media library
                await clickElementByText('button', 'Select an image')
    
                // tests that media library does open
                expect(await page.$(`div.media-frame-title`)).not.toBeNull()
            })
        })
        describe( '🔬 Side Panel Settings', () => {
            describe( '🔬 Layout of the RSS feed should be selectable', () => {
                test( '🔎 Recent news without image should be selectable.', async () => {
                    await blockStartup(block)
        
                    // select the radio button with the virtual keyboard
                    await clickRadio('Layout of the RSS feed', 'withoutImage')
        
                    const editedContent = await getEditedPostContent()
        
                    expect( editedContent.includes(`"type":"withoutImage"`)).toBe(true)
                    expect( editedContent).toMatchSnapshot()
                })
                test( '🔎 All News/Events should be selectable.', async () => {
                    await blockStartup(block)
        
                    // select the radio button with the virtual keyboard
                    await clickRadio('Layout of the RSS feed', 'all')
        
                    const editedContent = await getEditedPostContent()
        
                    expect( editedContent.includes(`"type":"all"`)).toBe(true)
                    expect( editedContent).toMatchSnapshot()
                })
            })
            test( 'Heading level dropdown selector', async () => {
                await blockStartup(block)
    
                await selectOption('Heading level of the Header', 'h2')
                let editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h2"`)).toBe(true)
    
                await selectOption('Heading level of the Header', 'h3')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h3"`)).toBe(true)
    
                await selectOption('Heading level of the Header', 'h4')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h4"`)).toBe(true)
    
                await selectOption('Heading level of the Header', 'h5')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h5"`)).toBe(true)
    
                await selectOption('Heading level of the Header', 'h6')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h6"`)).toBe(true)
    
                await selectOption('Heading level of the Header', 'p')
                editedContent = await getEditedPostContent()
                expect( editedContent.includes(`"titleLevel":"h2"`)).toBe(false)
                expect( editedContent.includes(`"titleLevel":"h3"`)).toBe(false)
                expect( editedContent.includes(`"titleLevel":"h4"`)).toBe(false)
                expect( editedContent.includes(`"titleLevel":"h5"`)).toBe(false)
                expect( editedContent.includes(`"titleLevel":"h6"`)).toBe(false)
    
            })
            test( '🔎 Image alt text should be editable.', async () => {
                await blockStartup(block)
    
                const typeString = "Image alt text."
                
                // focus the text box then type into it with the virtual keyboard
                await clickElementByText('label', 'Image Alt Text')
                await page.keyboard.type(typeString, {delay: 10})
    
                const editedContent = await getEditedPostContent()
    
                // tests: 
                // a. save output properly contains the correct string 
                // b. save output matches the existing snapshot
                expect( editedContent.includes(`"altText":"${typeString}"`)).toBe(true)
                // expect( editedContent).toMatchSnapshot()
            })
            describe( '🔬 Link can be added', () => {
                test( '🔎 "Add a link to the news/events page?" checkbox reveals link inputs', async () => {
                    await blockStartup(block)
    
                    await clickCheckbox('Add a link to the news/events page?')
                          
                    let editedContent = await getEditedPostContent()
                    
                    expect( editedContent.includes('{"hasLink":true}')).toBe(true)
                    expect( await getEditedPostContent() ).toMatchSnapshot()
     
                    await clickCheckbox('Add a link to the news/events page?')
                    
                    editedContent = await getEditedPostContent()
                    
                    expect( editedContent.includes('{"hasLink":true}')).toBe(false)
                    expect( await getEditedPostContent() ).toMatchSnapshot()
                })
                test('🔎 Link text field updates output correctly', async () => {
                    await blockStartup(block)
    
                    const typeString = "CTA text"
                    await clickCheckbox('Add a link to the news/events page?')
                    await clickElementByText('label', 'Link text')
                    await page.keyboard.type(typeString, {delay: 10})
    
                    const editedContent = await getEditedPostContent()
                    expect( editedContent.includes(`"linkText":"${typeString}"`)).toBe(true)
                    expect( await getEditedPostContent() ).toMatchSnapshot()
                })
                test('🔎 Link url field updates output correctly', async () => {
                    await blockStartup(block)
                    await clickCheckbox('Add a link to the news/events page?')
                    const typeString = "https://www.purdue.edu"
    
                    await clickElementByText('label', 'Link URL')
                    await page.keyboard.type(typeString, {delay: 10})
    
                    const editedContent = await getEditedPostContent()
                    expect( editedContent.includes(`"link":"${typeString}"`)).toBe(true)
                    expect( await getEditedPostContent() ).toMatchSnapshot()
                })
                test('🔎 Link can be opened in new tab', async () => {
                    await blockStartup(block)
    
                    const typeString = "https://www.purdue.edu"
                    await clickCheckbox('Add a link to the news/events page?')
                    await clickCheckbox('Open link in new tab?')
    
                    const editedContent = await getEditedPostContent()
                    expect( editedContent.includes(`"external": false`)).toBe(false)
                    expect( await getEditedPostContent() ).toMatchSnapshot()
                })
            })
        })
    })
})