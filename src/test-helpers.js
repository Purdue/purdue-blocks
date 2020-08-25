import {
    getAllBlocks,
    selectBlockByClientId,
} from '@wordpress/e2e-test-utils';

export const selectBlockByName = async ( name ) => {
    await selectBlockByClientId(
        ( await getAllBlocks() ).find( ( block ) => block.name === name ).clientId
    );
};

export const clickElementByText = async ( elementExpression, text ) => {
    const [ element ] = await page.$x( `//${ elementExpression }[contains(text(),"${ text }")]` );
    await element.click();
};

export const selectOption = async ( label, value ) => {
    const [ selectEl ] = await page.$x( `//label[@class="components-base-control__label"][contains(text(),"${ label }")]/following-sibling::select[@class="components-select-control__input"]` );
    const selectId = await page.evaluate(
        ( el ) => el.id,
        selectEl
    );
    await page.select( `#${ selectId }`, value );
};

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