import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createNewAssignment from "@salesforce/apex/assignment.createNewAssignment";

export default class AssignmentModal extends LightningModal {
    @api content;
    @track showLoading;
    @api recordId;

    generateAssignment(){

        //this.showLoading = true;
        createNewAssignment({Name: 'Assignment1', lecture: this.recordId, JSON:JSON.stringify(this.content) })
        .then((res)=>{
            this.showToast('Success!!', 'Assignment created successfully!!', 'success', 'dismissable');
            this.showLoading = false;
            this.close('Success!!');
        })
        .catch((e) => {
            this.showToast('Error!!', e.body.message, 'error', 'dismissable');
            this.showLoading = false;
            this.close('Unable to create');
        })
        // var fields = { 'nvCme234__JSON__c': JSON.stringify(this.content) };
        // const recordInput = { 'apiName': '	nvCme234__lecture__c', fields };

        // createRecord(recordInput)
        //         .then(() => {
        //             this.showToast('Success!!', 'Assignment created successfully!!', 'success', 'dismissable');
        //             // Display fresh data in the form
        //             this.showLoading = false;
        //         })
        //         .catch(error => {
        //             this.showLoading = false;
        //             console.log(error);
        //             this.showToast('Error!!', error.body.message, 'error', 'dismissable');
        //         });


    }

    showToast(title, message, variant, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }

}