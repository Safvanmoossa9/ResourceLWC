global class receiveParametersOrg2
{
    //for Contact obj
 webservice static String createContactRecord( string firstName, string lastName, string title, string email)
 {
     Contact rec = new Contact();
     rec.FirstName=firstName;
     rec.LastName=lastName;
     rec.Title=title;
     rec.email=email;
     insert rec;
     return 'success';
 }   
    
    
    //for Salesbook Obj
    
  webservice static String createSalesBookRecord(id Account,string Quarter,integer Sales,integer Saving)
 {
     Sales_Book__c rec = new Sales_Book__c();
    
     rec.Account__c=Account;
     rec.Quarter__c=Quarter;
     rec.Sales__c=Sales;
     rec.Saving__c=Saving;
     insert rec;
     return 'success';
 }  
 //for Account obj   
    
  webservice static String createAccountRecord(string Name,string AccountNumber,String Site)
  {
   Account rec = new Account();
   
     rec.Name=Name;
     rec.AccountNumber=AccountNumber;
     rec.Site=Site;
     insert rec;
     return 'success';
}
//for Oppor Obj
 webservice static String createOpportunityRecord(string Name,id AccountId,String StageName,Date CloseDate)
 {
  Opportunity rec = new Opportunity();
   
     rec.Name=Name;
     rec.AccountId=AccountId;
     rec.StageName=StageName;
     rec.CloseDate=CloseDate;
     insert rec;
     return 'success';
 }
  //for Lead obj
  webservice static String createLeadRecord(string firstName, string lastName, string title, string email,string Company)
 {
  Lead rec = new Lead();
   
     rec.FirstName=firstName;
     rec.LastName=lastName;
     rec.Title=title;
     rec.email=email;
     rec.Company=Company;
     insert rec;
     return 'success';
 }
 }