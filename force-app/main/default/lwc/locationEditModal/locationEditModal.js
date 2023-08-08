import { LightningElement, api, track } from 'lwc';

export default class LocationEditModal extends LightningElement {
    @api isModalOpen = false;
    @api locationOptions = [];
    @api locationValue;

    @track selectedLocation;

    @api
    openModal() {
        this.selectedLocation = this.locationValue;
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    handleLocationChange(event) {
        this.selectedLocation = event.detail.value;
    }

    handleSave() {
        this.dispatchEvent(new CustomEvent('locationselected', { detail: this.selectedLocation }));
        this.isModalOpen = false;
    }
}