import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import getWorkingDays from '@salesforce/apex/TableOneCalculation.getWorkingDays';
//import getWorkingDays from '@salesforce/apex/firstDataTable.getWorkingDays';
import getResourcesWithProjects from '@salesforce/apex/firstDataTable.getResourcesWithProjects'; 
import updateRecords from '@salesforce/apex/firstDataTable.updateRecords';


const COLUMNS = [
    { label: 'Id', fieldName: 'id' },
    { label: 'Resource Name', fieldName: 'resourceName',  editable: true },
    { label: 'Project', fieldName: 'project' },
    { label: 'Working Hours', fieldName: 'workingHours', type: 'number', editable: true },
    { label: 'Location', fieldName: 'location', type: 'text', editable: true },
    
    { label: 'Month', fieldName: 'month', type: 'text', editable: true },
    
    { label: 'Sick/Casual Leave', fieldName: 'sickLeave', type: 'number', editable: true },
    { label: 'Optional Holiday', fieldName: 'optionalHoliday', type: 'number', editable: true },
    { label: 'Hours', fieldName: 'hours', type: 'number', editable: true },
    { label: 'Expected Hours', fieldName: 'expectedHours', type: 'number' },

    { label: 'Utilization', fieldName: 'utilization', type: 'number' },
    
];



export default class DataTableComponent extends LightningElement {
  

   
    @track tableData = [];
    @track tableColumns = COLUMNS;

 


   
    connectedCallback() {
        this.loadData();
    }

    loadData() {
        getResourcesWithProjects()
            .then((result) => {
                this.tableData = result.map((resource) => ({
                    id: resource.id,
                    resourceName: resource.resourceName,
                    project: resource.project,
                    location: resource.location,
                    workingHours: resource.workingHours,
                    month: resource.month,
                    hours: resource.hours,
                    sickLeave: resource.sickLeave,
                    optionalHoliday: resource.optionalHoliday,
                    expectedHours: resource.expectedHours,
                    utilization: resource.utilization,
                }));
            })
            .catch((error) => {
                // Handle error
            });
    }

    handleSave(event) {
        const updatedFields = event.detail.draftValues;
      console.log(updatedFields);


        updateRecords({ data: updatedFields })
            .then(() => {
                
                // Handle success if needed
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record(s) updated and look at your Expected hrs and Utilization',
                        variant: 'success',
                    })
                );

                // Refresh the data after successful update
                return this.loadData();
            })
            .catch((error) => {
                // Handle error if needed
                console.error(error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error occurred while updating records',
                        variant: 'error',
                    })
                    
                );
            });
    }

  
        
}