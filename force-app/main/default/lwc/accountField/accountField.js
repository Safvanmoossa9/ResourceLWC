import { LightningElement, wire, track } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const columns = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Industry', fieldName: 'Industry', editable: true },
    // Add more columns as needed
];

export default class AccountTable extends LightningElement {
    @track accounts;
    @track error;

    columns = columns;

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    handleSave(event) {
        const fields = event.detail.draftValues;
        const recordInputs = fields.map((draft) => {
            const { Id, ...fields } = draft;
            return { fields };
        });
        console.debug('recordInput',recordInputs);
        const promises = recordInputs.map((recordInput) =>
            updateRecord(recordInput)
        );

        Promise.all(promises)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account updated',
                        variant: 'success',
                    })
                );
                return refreshApex(this.accounts);
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                    })
                );
            });
    }
}