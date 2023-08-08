import { LightningElement, track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; // Import the toast event
import getWorkingDays from '@salesforce/apex/ResourceUtilizationController.getWorkingDays';
import getExistingResourceNames from '@salesforce/apex/ResourceUtilizationController.getExistingResourceNames';

export default class ResourceUtilizationLWC extends LightningElement {
    
    @track hours = '';
    @track sickCasualLeave = 0;
    @track optionalLeave = 0;
    @track location = '';
    @track selectedMonth = '';
    @track showResults = false;
    @track result;
    @track showError = false;
   
     
   
    
    resourceName;
    resourceNameOptions=[];


    @wire(getExistingResourceNames)
    wiredReasourceName({ error, data }) {
        if (data) {
            this.resourceNameOptions = data.map((rname) => {
                return {
                    label: rname.Resource_Name__c,
                    value: rname.Resource_Name__c
                };
            });
            this.resourceNameOptions.unshift({ label: 'Select Resource', value: '' });

        } else if (error) {
            // Handle error
        }
    }
 
    handleResourceChange(event) {
        this.resourceName = event.detail.value;
        // You can perform any additional actions upon selecting an account here.
    }








    handleInputChange(event) {
       
         if(event.target.name === "hours"){
            this.hours = event.target.value;
        }
        else if(event.target.name === "sickorcasual"){
            this.sickCasualLeave = event.target.value;
        }
        else if(event.target.name === "oppleave"){
            this.optionalLeave = event.target.value;
        }
        
        
    }
    

    // Helper function to check if all required fields are filled
isAllFieldsEntered() {
    return (
      this.resourceName &&
      this.hours &&
      this.location &&
      this.selectedMonth
    );
  }
  
  









  calculateUtilization() {
    if (this.isAllFieldsEntered()) {
      getWorkingDays({
        resourceName: this.resourceName,
        Hours: this.hours,
        Sick_Casual_Leave: this.sickCasualLeave,
        Optional_Leave: this.optionalLeave,
        Location: this.location,
        Month: this.selectedMonth
      })
        .then(result => {
          console.log('>>>>', result);
          this.result = result;
          this.showResults = true;
        })
        .catch(error => {
          console.error('Error calculating utilization:', error);
          this.showErrorToast('Error calculating utilization:', 'error');

        });
    } else {
      // Show an error message or take appropriate action when not all fields are filled.
      this.showError = true;
      this.showErrorToast('Please fill all required fields.', 'error');
      console.error('Please fill all required fields.');
    }
  }
  
  showErrorToast(message, variant) {
    const evt = new ShowToastEvent({
      title: 'Error',
      message: message,
      variant: variant,
    });
    this.dispatchEvent(evt);
  }


    @track monthsOptions = [
        { label: 'January', value: 'January' },
        { label: 'February', value: 'February' },
        { label: 'March', value: 'March' },
        { label: 'April', value: 'April' },
        { label: 'May', value: 'May' },
        { label: 'June', value: 'June' },
        { label: 'July', value: 'July' },
        { label: 'August', value: 'August' },
        { label: 'September', value: 'September' },
        { label: 'October', value: 'October' },
        { label: 'November', value: 'November' },
        { label: 'December', value: 'December' },
    ];

    

    handleMonthChange(event) {
        this.selectedMonth = event.detail.value;
       
    }

@track placesOptions = [
    { label: 'Kerala', value: 'Kerala' },
    { label: 'Noida', value: 'Noida' },
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Banglore', value: 'January' }
    
];

handlePlaceChange(event){
    this.location = event.detail.value;
}



       
    
}