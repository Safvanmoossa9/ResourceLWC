public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Industry FROM Account LIMIT 10]; // Change the query as needed
    }
}