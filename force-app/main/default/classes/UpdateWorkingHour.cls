public class UpdateWorkingHour {
    public static void updateWorkingHoursTo176() {
        List<Resource__c> resourcesToUpdate = [SELECT Id, Working_Hours__c FROM Resource__c];

        for (Resource__c resource : resourcesToUpdate) {
            resource.Working_Hours__c = 176; // Update the Working Hours field to 176
        }

        // Perform the update
        update resourcesToUpdate;
    }
}