public with sharing class TableOneCalculation {
    Public Class ResourceUtilizationWrapper{
        @AuraEnabled
        Public String utilizationperc;
        @AuraEnabled
        public integer expectedHours;
        @AuraEnabled
        public integer lostHours;
        @AuraEnabled
        public integer addHours;
        @AuraEnabled
        public list<string> resourceNames;  
    }
    @AuraEnabled
    public static ResourceUtilizationWrapper getWorkingDays(String resourceName,integer Hours,integer Sick_Casual_Leave,integer Optional_Leave,string Location, string Month) {
        integer TotalHours = 176; //22days*8
       
        Integer noOfHolidays = getNoOfHolidays(Month, Location);
        Integer expectedHours = TotalHours - ((noOfHolidays + Sick_Casual_Leave + Optional_Leave)*8);
        String utilization = String.valueOf((Hours*100/expectedHours)); 
        System.debug(Hours);
        System.debug(expectedHours);
        System.debug(utilization);
        integer lostHours;
        integer additionalHours;
        //Compute Additional hr and lost hr
        if(expectedHours>Hours){
            lostHours=expectedHours-Hours;
        }else{
           additionalHours= Hours-expectedHours;
        }
        ResourceUtilizationWrapper resourceWrapper= new ResourceUtilizationWrapper();
        resourceWrapper.utilizationperc = utilization;
        resourceWrapper.expectedHours = expectedHours;
        resourceWrapper.lostHours =lostHours;
        resourceWrapper.addHours =additionalHours;
        return resourceWrapper;
    }
	
    public static integer getNoOfHolidays(String Mon, String Loc) {
        Integer noOfHolidays = 0;
        List<Holiday__c> holidays = [SELECT Date__c FROM Holiday__c WHERE Location__c = :Loc];
        Integer monNum = lookupMonthName(Mon);
        
        For(Holiday__c holiday : holidays)	{
            if(holiday.Date__c.Month() == monNum){
                noOfHolidays =+ 1;
            }
        }
        
        return noOfHolidays;
        
    }    
    
      @AuraEnabled(cacheable=true)
    public static List<Resource__c> getExistingResourceNames() {
      
        
        
        
        return [SELECT Resource_Name__c from Resource__c WHERE CreatedById = :UserInfo.getUserId()]; 
   
}
    
    

    
    
    
    
    
    //This method returns the corresponding month number
    private Static Integer lookupMonthName(String Mon) {
        Map<String,Integer> monthNames = new Map<String,Integer>{
           	'January' => 1,
            'February' => 2,
            'March' => 3,
            'April' => 4,
            'May' => 5,
            'June' => 6,
            'July' => 7,
            'August' => 8,
            'September' => 9,
            'October' => 10,
            'November' => 11,
            'December' => 12
        };
        try {
            return monthNames.get(Mon);
        } catch(NullPointerException e) {
            return NULL;
    	}
	}

    @AuraEnabled
    public static void updateRecords(List<Map<String, Object>> data) {
        List<Resource__c> resourcesToUpdate = new List<Resource__c>();

        for (Map<String, Object> record : data) {
            Resource__c resource = new Resource__c(
                Id = (String)record.get('id'),
                Location__c = (String)record.get('location'),
                Working_Hours__c = (Decimal)record.get('workingHours'),
                Month__c = (String)record.get('month'),
                Hours__c = (Decimal)record.get('hours'),
                Sick_Casual_Leave__c = (Decimal)record.get('sickLeave'),
                Optional_Holiday__c = (Decimal)record.get('optionalHoliday')
            );
            resourcesToUpdate.add(resource);
        }

        if (!resourcesToUpdate.isEmpty()) {
            update resourcesToUpdate;
        }
    }
    
}