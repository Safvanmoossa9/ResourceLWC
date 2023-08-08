import { LightningElement, api } from 'lwc';

export default class MultiSelectPicklist extends LightningElement {
    @api picklistOptions; // Array of available options
    @api selectedValues = []; // Array to store selected values

    handleSelectionChange(event) {
        this.selectedValues = event.detail.value;
    }
}
