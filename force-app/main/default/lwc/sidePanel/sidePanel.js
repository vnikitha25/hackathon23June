/*
 * Copyright 2023 salesforce.com, inc.
 * All Rights Reserved
 * Company Confidential
 */

import { LightningElement, track, wire, api } from "lwc";
import { classSet } from "lightning/utils";
import video1 from "@salesforce/resourceUrl/video1";
import hackLMS from "@salesforce/messageChannel/hackathonMessageChannel__c";
import { subscribe, MessageContext } from "lightning/messageService";
import getAssignment from "@salesforce/apex/drona.getAssignment";
import getTranscript from "@salesforce/apex/drona.getTranscript";
import getSummary from "@salesforce/apex/drona.getSummary";
import updateLecture from "@salesforce/apex/assignment.updateLecture";
import AssignmentModal from "c/assignmentModal";

export default class SidePanel extends LightningElement {
  @wire(MessageContext)
  messageContext;
  @track pinned = true;
  @track videoURL = video1;

  @track recordId;

  @track hasVisibiltyHidden = true;
  @track animateOpen = false;
  @track currentWidth = "medium";
  @track canResize = true;
  @track selectedQuestions = [];

  fallbackAssignment = [
    {"type": "text", "number":"1","question": "What is chat GPT and how can it be used?"},
    {"type": "radio", "number":"2", "question": "What is the cost associated with using AI chatbot created by OpenAI? ",
    "options": ["completely free", "2 to 4 cents per request", "not mentioned"]},
    {"type": "text", "number":"3", "question": "What are the steps to set up an account with OpenAI?"},
    {"type": "text", "number":"4", "question": "What is the playground in beta.openai.com and how is it different from thebasic interface?"},
    {"type": "checkbox", "number":"5", "question": "What are the benefits of manual controls in chat GPT? (Select all thatapply)", "options": ["limiting the maximum length of the character", "providing inspiration through the use of presets",
    "access to a wider range of AI models", "cost reduction in future"]},
    {"type": "checkbox", "number":"6", "question": "What are the potential use cases for chat GPT? (Select all that apply)",
    "options": ["movie title to emoji transformer", "generating conversational text for answering questions", "coding forthe user", "exploring AI models"]},
    {"type": "code", "number":"7", "question": "Identify the error(s) in the following code snippet in Python. \ndefsum_even(n):\n total = 0\n for i in range(n):\n if i % 2 == 0:\n total += i\n return total\n", "code": "The functioncode has no error."},
    {"type": "code", "number":"8", "question": "Identify the error(s) in the following Java code snippet used for sorting anarray using bubble sort. \nvoid bubbleSort(int arr[]) {\n int n = arr.length;\n for (int i = 0; i < n-1; i++) {\n for(int j=0; j < n-i-1; j++) {\n if (arr[j]> arr[j+1]) {\n int temp = arr[j];\n arr[j] = arr[j+1];\n arr[j+1] = temp;\n}\n }\n }\n}", "code": "The function code has no error."},
      {"type": "code", "number":"9", "question": "Identify the error(s) in the following C++ code snippet for finding thefactorial of a number using recursion. \nint factorial(int n) {\n if (n <= 1)\n return 1;\n else\n returnn*factorial(n-1);\n}", "code" : "The function code has no error." }, {"type": "code" , "number"
        :"10", "question"
        : "Identify the error(s) in the following JavaScript code snippet for finding the sum of elements in an array using recursion. \nconst sum = (arr) => {\n     if (arr.length === 0)\n         return 0;\n     else\n         return arr[0] + sum(arr.slice(1));\n};"
        , "code" : "The function code has no error." } ];

  //assignment related

  @track isLoaded = true;
  @track assignmentQuestions = [];
  @track transcript = "";
  @track summary;
  @track showNotification=false;
  @track lecture;

  get computedStyles() {
    return classSet({
      pinned: this.pinned === true,
      wrapper: true,
      "slds-panel": true,
      "slds-grid": true,
      "slds-grid_vertical": true,
      "slds-is-fixed": true,
      "slds-hidden": this.hasVisibiltyHidden === true,
      opened: this.animateOpen === true,
      medium: this.currentWidth === "medium"
    }).toString();
  }

  connectedCallback() {
    console.log("CompC loaded", this.recordId);
    this.subscription = subscribe(this.messageContext, hackLMS, (message) => {
      this.lecture = message.lecture;
      this.recordId = message.recordId;
      console.log("Message received by compC", this.message);
      this.hasVisibiltyHidden = false;
      this.animateOpen = true;
    });
  }

  createAssignments() {
    this.isLoaded = false;

    if (this.transcript === "") {
      getTranscript({lecture:this.lecture})
        .then((result) => {
          console.log("Received transcript", result);
          this.transcript = result;
          getAssignment({ transcript: result })
            .then((assignment) => {
              let assignmentContent = '';
              if (typeof assignment === "string")
                assignmentContent = JSON.parse(assignment);
              else if (typeof assignment === "object") {
                assignmentContent = assignment;
              }
              console.log("assignment result", assignmentContent);
              if (assignmentContent.questions) {
                this.assignmentQuestions = assignmentContent.questions;
              }
              this.isLoaded = true;
              this.showNotification=true;
            })
            .catch((e) => {
              console.log(e);
              this.assignmentQuestions=this.fallbackAssignment;
              this.isLoaded = true;
              this.showNotification=true;
            });
        })
        .catch((e) => {
          console.log(e);
          this.isLoaded = true;
        });
    } else {
      getAssignment({ transcript: this.transcript })
        .then((assignment) => {
          let assignmentContent = "";
          if (typeof assignment === "string")
            assignmentContent = JSON.parse(assignment);
          else if (typeof assignment === "object") {
            assignmentContent = assignment;
          }
          console.log("assignment result", assignmentContent);
          if (assignmentContent.questions) {
            this.assignmentQuestions = assignmentContent.questions;
          }
          this.isLoaded = true;
          this.showNotification=true;
        })
        .catch((e) => {
          console.log(e);
          this.assignmentQuestions=this.fallbackAssignment;
          this.isLoaded = true;
          this.showNotification=true;
        });
    }
  }
  //this.assignmentQuestions=[ { "type": "text", "question": "What is LWC and for what purpose is it used within Salesforce?" }, { "type": "text", "question": "What are the three components of a web-based application?" }, { "type": "text", "question": "What language is used by Salesforce in the backend?" }, { "type": "text", "question": "What UI frameworks have been used by Salesforce in the past and what is being used currently?" }, { "type": "checkbox", "question": "What are the steps to learn LWC? (Select all that apply)", "options": [ "Learn HTML, CSS and JavaScript", "Learn Salesforce development", "Learn LWC syntax and structure", "Join communities to ask questions", "Attend training sessions or workshops" ] }, { "type": "radio", "question": "What is included in Salesforce development?", "options": [ "Frontend only", "Backend only", "Both frontend and backend", "None of the above" ] }, { "type": "code", "question": "Identify the language used by Salesforce in the following code snippet:", "code": "public class MyApexClass {\n public static void helloWorld() {\n System.debug('Hello World!');\n }\n}" }, { "type": "code", "question": "Identify the error(s) in the following code snippet that retrieves data from a Salesforce object using LWC and Apex:", "code": "@AuraEnabled(cacheable=true)\npublic static getAccountList() {\nList<Account> accountList = [SELECT Id, Name,     Type FROM Account];\n return accountList;\n}"     },     {     "type": "code",     "question": "Identify the purpose of the following code snippet within an LWC component:",     "code": "import { LightningElement, api } from 'lwc';\n\nclass MyClass extends LightningElement {\n @api     myInput;\n}"     },     {     "type": "text",     "question": "What resources can you utilize if you are facing issues or problems while learning LWC?"     }     ];

  createSummary() {
    this.isLoaded = false;

    //this.assignmentQuestions=[ { "type": "text", "question": "What is LWC and for what purpose is it used within Salesforce?" }, { "type": "text", "question": "What are the three components of a web-based application?" }, { "type": "text", "question": "What language is used by Salesforce in the backend?" }, { "type": "text", "question": "What UI frameworks have been used by Salesforce in the past and what is being used currently?" }, { "type": "checkbox", "question": "What are the steps to learn LWC? (Select all that apply)", "options": [ "Learn HTML, CSS and JavaScript", "Learn Salesforce development", "Learn LWC syntax and structure", "Join communities to ask questions", "Attend training sessions or workshops" ] }, { "type": "radio", "question": "What is included in Salesforce development?", "options": [ "Frontend only", "Backend only", "Both frontend and backend", "None of the above" ] }, { "type": "code", "question": "Identify the language used by Salesforce in the following code snippet:", "code": "public class MyApexClass {\n public static void helloWorld() {\n System.debug('Hello World!');\n }\n}" }, { "type": "code", "question": "Identify the error(s) in the following code snippet that retrieves data from a Salesforce object using LWC and Apex:", "code": "@AuraEnabled(cacheable=true)\npublic static getAccountList() {\nList<Account> accountList = [SELECT Id, Name,     Type FROM Account];\n return accountList;\n}"     },     {     "type": "code",     "question": "Identify the purpose of the following code snippet within an LWC component:",     "code": "import { LightningElement, api } from 'lwc';\n\nclass MyClass extends LightningElement {\n @api     myInput;\n}"     },     {     "type": "text",     "question": "What resources can you utilize if you are facing issues or problems while learning LWC?"     }     ];
    getTranscript({lecture:this.lecture})
      .then((result) => {
        console.log("Received transcript", result);
        this.transcript = result;
        getSummary({ transcript: result })
          .then((summary) => {
            //let summaryContent = JSON.parse(summary);
            console.log("summary result", summary);
            this.summary = summary;
            this.isLoaded = true;
            this.processLecture();
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

  get expandCollapseIcon() {
    return this.currentWidth === "small" ? "utility:left" : "utility:right";
  }

  get expandCollapseLabel() {
    return this.currentWidth === "small" ? "expand" : "collapse";
  }

  onSizeToggle() {
    this.hasVisibiltyHidden = true;
  }

  handleCheckboxSelection(event) {
    this.selectedQuestions.push(this.assignmentQuestions[event.target.value]);
  }

  get isAssignmentGenerated() {
    return this.assignmentQuestions.length > 0;
  }

  handleAssignmentGeneration(){
    //this.selectedQuestions=[ { "type": "text", "question": "What is LWC and for what purpose is it used within Salesforce?" }, { "type": "text", "question": "What are the three components of a web-based application?" }, { "type": "text", "question": "What language is used by Salesforce in the backend?" }, { "type": "text", "question": "What UI frameworks have been used by Salesforce in the past and what is being used currently?" }, { "type": "checkbox", "question": "What are the steps to learn LWC? (Select all that apply)", "options": [ "Learn HTML, CSS and JavaScript", "Learn Salesforce development", "Learn LWC syntax and structure", "Join communities to ask questions", "Attend training sessions or workshops" ] }, { "type": "radio", "question": "What is included in Salesforce development?", "options": [ "Frontend only", "Backend only", "Both frontend and backend", "None of the above" ] }, { "type": "code", "question": "Identify the language used by Salesforce in the following code snippet:", "code": "public class MyApexClass {\n public static void helloWorld() {\n System.debug('Hello World!');\n }\n}" }, { "type": "code", "question": "Identify the error(s) in the following code snippet that retrieves data from a Salesforce object using LWC and Apex:", "code": "@AuraEnabled(cacheable=true)\npublic static getAccountList() {\nList<Account> accountList = [SELECT Id, Name,     Type FROM Account];\n return accountList;\n}"     },     {     "type": "code",     "question": "Identify the purpose of the following code snippet within an LWC component:",     "code": "import { LightningElement, api } from 'lwc';\n\nclass MyClass extends LightningElement {\n @api     myInput;\n}"     },     {     "type": "text",     "question": "What resources can you utilize if you are facing issues or problems while learning LWC?"     }     ];

    let res = AssignmentModal.open({
        content: this.selectedQuestions,
        recordId: this.recordId

    });
    console.log(res);
  }

  onNotifyClose(){
    this.showNotification=false;
  }

  processLecture(){
    updateLecture({Id: this.recordId, transcript:this.transcript, summary: this.summary})
    .then((res)=>{
      console.log("Update successful");
    })
    .catch((e)=>{

    })
  }
}
