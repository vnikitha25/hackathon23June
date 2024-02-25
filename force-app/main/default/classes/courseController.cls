public with sharing class courseController {
    public courseController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<nvCme234__Course__c> getCourses() {
        return [SELECT Id, Name FROM nvCme234__Course__c LIMIT 200];
    }
}