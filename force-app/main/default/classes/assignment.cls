public with sharing class assignment {
    public assignment() {

    }

    @AuraEnabled
  public static string createNewAssignment(String lecture, String JSON, String Name) {
    try {
        nvCme234__Assignment__c  a1= new nvCme234__Assignment__c();
        a1.Name=Name;
        a1.nvCme234__JSON__c=JSON;
        a1.nvCme234__lecture__c=lecture;
        insert a1;
        return 'Success';
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static string getAssignment(String Id) {
    try {
        nvCme234__Assignment__c  a1= [Select nvCme234__JSON__c from nvCme234__Assignment__c where Id=:Id];
        return a1.nvCme234__JSON__c;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static string updateLecture(String Id, String summary, String transcript) {
    try {
      nvCme234__lecture__c  a1= [Select Id from nvCme234__lecture__c where Id=:Id];
      a1.nvCme234__Summary__c = summary;
      a1.nvCme234__Transcript__c = transcript;
      update a1;
        return 'Success';
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}