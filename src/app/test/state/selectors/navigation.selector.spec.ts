import { getHeaderSelector, getFooterSelector } from '../../../state/selectors/index';

describe('NavigationSelector', () => {
    let navState;

    beforeEach(() => {
        navState = {
            navigation: {
                header: 'header',
                footer: 'footer',
            },
        };
    });

    it('should return header information', () => {
        expect(getHeaderSelector(navState)).toEqual('header');
    });

    it('should return footer', () => {
        expect(getFooterSelector(navState)).toEqual('footer');
    });
});
