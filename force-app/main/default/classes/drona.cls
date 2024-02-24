public with sharing class drona {
  public drona() {
  }

  @AuraEnabled
  public static string getTranscript(String lecture) {
    try {
      Http http = new Http();
      HttpRequest request = new HttpRequest();
      request.setEndpoint(
        'https://drona101-9a321867e339.herokuapp.com/getTranscript'
      );
      request.setHeader('Content-Type', 'application/json;charset=UTF-8');
      JSONGenerator gen = JSON.createGenerator(true);
      gen.writeStartObject();
      gen.writeStringField('lecture', lecture);
      gen.writeEndObject();
      String reqBody = gen.getAsString();
      request.setBody(reqBody);
      request.setMethod('POST');
      request.setTimeout(120000);
      HttpResponse response = http.send(request);
      return response.getBody();
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static string getSummary(String transcript) {
    try {
      Http http = new Http();
      HttpRequest request = new HttpRequest();
      request.setEndpoint(
        'https://drona101-9a321867e339.herokuapp.com/getSummary'
      );
      request.setMethod('POST');
      request.setTimeout(120000);
      request.setHeader('Content-Type', 'application/json;charset=UTF-8');
      JSONGenerator gen = JSON.createGenerator(true);
      gen.writeStartObject();
      gen.writeStringField('transcript', transcript);
      gen.writeEndObject();
      String reqBody = gen.getAsString();
      request.setBody(reqBody);
      HttpResponse response = http.send(request);
      return response.getBody();
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static string getAssignment(String transcript) {
    try {
      Http http = new Http();
      HttpRequest request = new HttpRequest();
      request.setEndpoint(
        'https://drona101-9a321867e339.herokuapp.com/getAssignment'
      );
      request.setMethod('POST');
      request.setTimeout(120000);
      request.setHeader('Content-Type', 'application/json;charset=UTF-8');
      JSONGenerator gen = JSON.createGenerator(true);
      gen.writeStartObject();
      gen.writeStringField('transcript', transcript);
      gen.writeEndObject();
      String reqBody = gen.getAsString();
      request.setBody(reqBody);
      HttpResponse response = http.send(request);
      return response.getBody();
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
