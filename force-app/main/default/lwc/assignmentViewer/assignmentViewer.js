import { LightningElement, api, track } from 'lwc';
import getAssignment from "@salesforce/apex/assignment.getAssignment";

export default class AssignmentViewer extends LightningElement {

    @track content;
    @api recordId

    connectedCallback(){
        getAssignment({Id: this.recordId})
        .then((res)=>{
            this.content = JSON.parse(res.replaceAll('&quot;','"'));
        })
        .catch((e)=>{
            console.log(e);
        })
    }
}