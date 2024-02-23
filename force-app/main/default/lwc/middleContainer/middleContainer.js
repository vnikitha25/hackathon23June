import { LightningElement, wire, api, track } from 'lwc';
import lecture1 from "@salesforce/resourceUrl/lecture1";
import lecture2 from "@salesforce/resourceUrl/lecture2";
import lecture3 from "@salesforce/resourceUrl/lecture3";
import video1 from "@salesforce/resourceUrl/video1";
import lecture4 from "@salesforce/resourceUrl/lecture4";
import {
    publish,
    MessageContext,
    createMessageContext,
    releaseMessageContext,
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE
  } from "lightning/messageService";
  import hackLMS from "@salesforce/messageChannel/hackathonMessageChannel__c";
  

export default class MiddleContainer extends LightningElement {
    @wire(MessageContext)
    messageContext;

    @api
    recordId;

    @track video;

    connectedCallback(){
        switch(this.recordId){
            case "a615e000000sHQuAAM" : {
                this.video= lecture1;
                this.lecture = "1";
                break;
            }
            case "a615e000000sHQzAAM" : {
                this.video= lecture2;
                this.lecture = "2";
                break;
            }
            case "a615e000000sHR4AAM" : {
                this.video=lecture3;
                this.lecture = "3";
                break;
            }
            default : {
                this.video= lecture4;
                this.lecture = "4";
            }
        }
    }

    openSidePanel(){
        publish(this.messageContext, hackLMS, {"lecture" : this.lecture, "recordId" : this.recordId});
    }
}