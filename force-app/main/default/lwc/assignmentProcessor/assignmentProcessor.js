import { LightningElement, api } from 'lwc';

export default class AssignmentProcessor extends LightningElement {
    @api
    question;
    get isCheckbox() {
        return this.question.type === 'checkbox';
    }
    get isRadio() {
        return this.question.type === 'radio';
    }
    get isText() {
        return this.question.type === 'text';
    }
    get isDate() {
        return this.question.type === 'date';
    }

    get isCode() {
        return this.question.type === 'code';
    }


}