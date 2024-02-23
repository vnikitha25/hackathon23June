import { LightningElement, track, wire } from "lwc";
import getAssignment from "@salesforce/apex/drona.getAssignment";
import getTranscript from "@salesforce/apex/drona.getTranscript";
import getSummary from "@salesforce/apex/drona.getSummary";

export default class App1 extends LightningElement {
  @track resultMessage = "Nothing here";
  isLoaded = true;
  data;
  assignmentQuestions=[];
  transcript;
  summary;

  createSummary() {
    this.isLoaded = false;

    //this.assignmentQuestions=[ { "type": "text", "question": "What is LWC and for what purpose is it used within Salesforce?" }, { "type": "text", "question": "What are the three components of a web-based application?" }, { "type": "text", "question": "What language is used by Salesforce in the backend?" }, { "type": "text", "question": "What UI frameworks have been used by Salesforce in the past and what is being used currently?" }, { "type": "checkbox", "question": "What are the steps to learn LWC? (Select all that apply)", "options": [ "Learn HTML, CSS and JavaScript", "Learn Salesforce development", "Learn LWC syntax and structure", "Join communities to ask questions", "Attend training sessions or workshops" ] }, { "type": "radio", "question": "What is included in Salesforce development?", "options": [ "Frontend only", "Backend only", "Both frontend and backend", "None of the above" ] }, { "type": "code", "question": "Identify the language used by Salesforce in the following code snippet:", "code": "public class MyApexClass {\n public static void helloWorld() {\n System.debug('Hello World!');\n }\n}" }, { "type": "code", "question": "Identify the error(s) in the following code snippet that retrieves data from a Salesforce object using LWC and Apex:", "code": "@AuraEnabled(cacheable=true)\npublic static getAccountList() {\nList<Account> accountList = [SELECT Id, Name,     Type FROM Account];\n return accountList;\n}"     },     {     "type": "code",     "question": "Identify the purpose of the following code snippet within an LWC component:",     "code": "import { LightningElement, api } from 'lwc';\n\nclass MyClass extends LightningElement {\n @api     myInput;\n}"     },     {     "type": "text",     "question": "What resources can you utilize if you are facing issues or problems while learning LWC?"     }     ];
    getTranscript()
      .then((result) => {
        console.log("Received transcript", result);
        this.transcript = result;
        getSummary({ transcript: result })
          .then((summary) => {
            //let summaryContent = JSON.parse(summary);
            console.log("summary result", summary);
            this.summary = summary;
            this.isLoaded = true;
          })
          .catch((e) => {
            console.log(e);
            this.isLoaded = true;
          });
      })
      .catch((e) => {
        console.log(e);
        this.isLoaded = true;
      });
    }

    createAssignments() {
        this.isLoaded = false;

    
        //this.assignmentQuestions=[ { "type": "text", "question": "What is LWC and for what purpose is it used within Salesforce?" }, { "type": "text", "question": "What are the three components of a web-based application?" }, { "type": "text", "question": "What language is used by Salesforce in the backend?" }, { "type": "text", "question": "What UI frameworks have been used by Salesforce in the past and what is being used currently?" }, { "type": "checkbox", "question": "What are the steps to learn LWC? (Select all that apply)", "options": [ "Learn HTML, CSS and JavaScript", "Learn Salesforce development", "Learn LWC syntax and structure", "Join communities to ask questions", "Attend training sessions or workshops" ] }, { "type": "radio", "question": "What is included in Salesforce development?", "options": [ "Frontend only", "Backend only", "Both frontend and backend", "None of the above" ] }, { "type": "code", "question": "Identify the language used by Salesforce in the following code snippet:", "code": "public class MyApexClass {\n public static void helloWorld() {\n System.debug('Hello World!');\n }\n}" }, { "type": "code", "question": "Identify the error(s) in the following code snippet that retrieves data from a Salesforce object using LWC and Apex:", "code": "@AuraEnabled(cacheable=true)\npublic static getAccountList() {\nList<Account> accountList = [SELECT Id, Name,     Type FROM Account];\n return accountList;\n}"     },     {     "type": "code",     "question": "Identify the purpose of the following code snippet within an LWC component:",     "code": "import { LightningElement, api } from 'lwc';\n\nclass MyClass extends LightningElement {\n @api     myInput;\n}"     },     {     "type": "text",     "question": "What resources can you utilize if you are facing issues or problems while learning LWC?"     }     ];
        getTranscript()
          .then((result) => {
            console.log("Received transcript", result);
            this.transcript = result;
            getAssignment({ transcript: result })
              .then((assignment) => {
                let assignmentContent = JSON.parse(assignment);
                console.log("assignment result", assignmentContent);
                    if(assignmentContent.questions){
                        this.assignmentQuestions = assignmentContent.questions;
                    }
                    this.isLoaded = true; 
              })
              .catch((e) => {
                console.log(e);
                this.isLoaded = true;
              });
          })
          .catch((e) => {
            console.log(e);
            this.isLoaded = true;
          });
        }

        selectedQuestions = [];

    populateQuestions(response) {
        if(response){
        let i = 0;
        this.generatingQues = false;
            response.forEach(question =>
            {
                question.number = i++;
                question.question = i + ". " + question.question;
            });
            this.assignmentQuestions = response;
        }
    }

    handleCheckboxSelection(event) {
        this.selectedQuestions.push(event.target.value);
    }

    get isAssignmentGenerated(){
        return this.assignmentQuestions>0;
    }

}
