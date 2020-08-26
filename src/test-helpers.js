import {
    getAllBlocks,
    selectBlockByClientId,
    insertBlock,
} from '@wordpress/e2e-test-utils';

// Selects a block with the given name
export const selectBlockByName = async ( name ) => {
    const clientId = ( await getAllBlocks() ).find( ( block ) => block.name === name ).clientId
    await selectBlockByClientId(clientId);
};

// Clicks an element on the page given an html element and inner text of the element
// useful for clicking buttons or links with text
export const clickElementByText = async ( elementExpression, text ) => {
    const [ element ] = await page.$x( `//${ elementExpression }[contains(text(),"${ text }")]` );
    await element.click();
};

// Used to select settings on sidebar by clicking the corresponding label for the control
export const selectOption = async ( label, value ) => {
    const [ selectEl ] = await page.$x( `//label[@class="components-base-control__label"][contains(text(),"${ label }")]/following-sibling::select[@class="components-select-control__input"]` );
    const selectId = await page.evaluate(
        ( el ) => el.id,
        selectEl
    );
    await page.select( `#${ selectId }`, value );
};

// Used when panel bodies on the side bar may be closed by default to open them so settings can be accessed
export const openSidebarPanelWithTitle = async ( title ) => {
    // Check if sidebar panel exists
    await page.waitForXPath( `//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][contains(text(),"${ title }")]` );

    // Only open panel if it's not expanded already (aria-expanded check)
    const [ panel ] = await page.$x(
        `//div[contains(@class,"edit-post-sidebar")]//button[@class="components-button components-panel__body-toggle"][@aria-expanded="false"][contains(text(),"${ title }")]`
    );
    if ( panel ) {
        await panel.click();
    }
};

// Used to open the sidebar which is closed by default
export const openSidebar = async () => {
    await page.click('.edit-post-header__settings [aria-label="Settings"]')
}

// Wrapper for the startup used by most tests
export const blockStartup = async ({blockTitle, blockName}) => {
    await insertBlock( blockTitle )
    await selectBlockByName( blockName )
    await openSidebar()
}

// wrapper for the process of cleanly updating a range input in the sidebar
export const updateRangeInput = async (selector, number) => {
    await page.click( selector );
        
    await page.keyboard.down('ControlLeft');
    await page.keyboard.press('KeyA');
    await page.keyboard.up('ControlLeft');
    await page.keyboard.type(`${number}`, {delay: 10})
}