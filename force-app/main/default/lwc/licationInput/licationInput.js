import { LightningElement, api } from 'lwc';

export default class LocationInput extends LightningElement {
    @api location;
    @api locationOptions;

    handleChange(event) {
        this.location = event.detail.value;
    }
}