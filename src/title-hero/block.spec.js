// title-hero test
jest.setTimeout(30000)
import {
    createNewPost,
    enablePageDialogAccept,
    getEditedPostContent,
    insertBlock,
} from '@wordpress/e2e-test-utils';

describe( 'Title Hero Block', () => {
    beforeAll( async () => {
        await enablePageDialogAccept();
    } );
    beforeEach( async () => {
        await createNewPost();
    } );

    // Tests can be added here by using the it() function
    it( 'Block should be available.', async () => {
        await insertBlock( 'Title Hero' )

        expect(await page.$('[data-type="purdue-blocks/title-hero"]')).not.toBeNull()

        expect( await getEditedPostContent()).toMatchSnapshot()
    } )
} );
