import { createElement } from 'lwc';
import MultiSelectPicklist from 'c/multiSelectPicklist';

describe('c-multi-select-picklist', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file, so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('should display selected values after user selection', () => {
        // Arrange
        const element = createElement('c-multi-select-picklist', {
            is: MultiSelectPicklist
        });
        document.body.appendChild(element);

        // Act
        // Simulate user interaction to select values
        const options = element.shadowRoot.querySelectorAll('option');
        options[0].selected = true;
        options[1].selected = true;
        element.dispatchEvent(new Event('change'));

        // Assert
        const selectedValues = element.selectedValues;
        expect(selectedValues).toEqual(['Option 1', 'Option 2']);
    });
});
