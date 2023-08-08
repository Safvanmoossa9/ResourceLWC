public with sharing class firstDataTable {
         Public Class ResourceUtilizationWrapper{
        
    }
     
    
    @AuraEnabled
    public static void updateRecords(List<Map<String, Object>> data) {
        List<Resource__c> resourcesToUpdate = new List<Resource__c>();
      
        for (Map<String, Object> record : data) {
            Id recordId = (Id) record.get('id');
            
            Integer Hoursint = Integer.valueOf(record.get('hours'));
            Integer Sickint = Integer.valueOf(record.get('sickLeave'));
            Integer Optionalint = Integer.valueOf(record.get('optionalHoliday'));
            


            Resource__c resource = new Resource__c(
                Id = recordId,
                
                Location__c = (String) record.get('location'),
                
                Month__c = (String) record.get('month'),
                Hours__c = (Decimal) Hoursint,
                Sick_Casual_Leave__c = (Decimal) Sickint,
                Optional_Holiday__c = (Decimal) Optionalint
                //Hours__c = (Decimal) record.get('hours'),
                //Sick_Casual_Leave__c = (Decimal) record.get('sickLeave'),
                //Optional_Holiday__c = (Decimal) record.get('optionalHoliday')
            );
            resourcesToUpdate.add(resource);
        }
        update resourcesToUpdate;
    
      
        
       
    }
    
        
     @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> getResourcesWithProjects() {
        List<Map<String, Object>> resourceDataWithProjects = new List<Map<String, Object>>();
        for (Resource__c resource : [SELECT Resource_Name__c, Project__c,Location__c,Working_Hours__c, Hours__c, Month__c,Optional_Holiday__c,Utilization__c, Expected_hours__c, Sick_Casual_Leave__c FROM Resource__c]) {
            List<String> projects = resource.Project__c.split(';');
            for (String project : projects) {
                if (!String.isBlank(project)) {
                    Map<String, Object> resourceMap = new Map<String, Object>();
                    resourceMap.put('id', resource.Id);
                    resourceMap.put('resourceName', resource.Resource_Name__c);
                    resourceMap.put('project', resource.Project__c);
                   resourceMap.put('workingHours', resource.Working_Hours__c);
                    resourceMap.put('location',resource.Location__c);
                    resourceMap.put('month',resource.Month__c);
                    resourceMap.put('sickLeave',resource.Sick_Casual_Leave__c);
                    resourceMap.put('hours',resource.Hours__c);
                    resourceMap.put('optionalHoliday',resource.Optional_Holiday__c);
                    resourceMap.put('expectedHours',resource.Expected_Hours__c);
                    resourceMap.put('utilization',resource.Utilization__c);
                    

                    resourceDataWithProjects.add(resourceMap);
                }
            }
        }

        return resourceDataWithProjects;
    }

   



    
}