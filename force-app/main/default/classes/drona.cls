public with sharing class drona {
  public drona() {
  }
  public static string getAssignments() {
    try {
      Http http = new Http();
      HttpRequest request = new HttpRequest();
      request.setEndpoint('https://drona-101-881df3dd5c1d.herokuapp.com/');
      request.setMethod('GET');
      request.setTimeout(120000);
      HttpResponse response = http.send(request);
      return response.getBody();
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
  @AuraEnabled(cacheable=true)
  public static string getAssignments1() {
    try {
      Http http = new Http();
      HttpRequest request = new HttpRequest();
      request.setEndpoint('https://drona-101-881df3dd5c1d.herokuapp.com/');
      request.setMethod('GET');
      request.setTimeout(200000);
      HttpResponse response = http.send(request);
      return response.getBody();
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
