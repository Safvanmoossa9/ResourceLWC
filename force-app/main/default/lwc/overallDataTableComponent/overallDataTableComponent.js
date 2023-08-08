import { LightningElement, wire, track } from 'lwc';
import getResourcesWithProjects from '@salesforce/apex/getResourcesOverall.getResourcesWithProjects';

const COLUMNS = [
    { label: 'Id', fieldName: 'id' },
    { label: 'Resource Name', fieldName: 'resourceName', editable: true },
    { label: 'Expected Hours', fieldName: 'expectedHours', type: 'number' },
    { label: 'Utilization', fieldName: 'utilization', type: 'number' },
    { label: 'Additional Hours', fieldName: 'additionalHours', type: 'number' },
    { label: 'Lost Hours', fieldName: 'lostHours', type: 'number' },
];

export default class OverallDataTableComponent extends LightningElement {
    @track tableData = [];
    @track tableColumns = COLUMNS;

    renderedCallback() {
        if (!this.tableData.length) {
            this.loadData();
        }
    }

    loadData() {
        getResourcesWithProjects()
            .then((result) => {
                console.log('Apex Response:', result); // Check the response in the browser console
                this.tableData = result.map((resource) => ({
                    id: resource.id,
                    resourceName: resource.resourceName,
                    expectedHours: resource.expectedHours,
                    utilization: resource.utilization,
                    additionalHours: resource.additionalHours,
                    lostHours: resource.lostHours,
                }));
                console.log('tableData:', this.tableData); // Check the tableData in the browser console
            })
            .catch((error) => {
                console.error('Error:', error); // Check if there's any error in the browser console
            });
    }
    
}
