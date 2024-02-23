import { LightningElement, wire, track } from "lwc";
import { getLecturesData } from "./getLecturesData";
import video1 from "@salesforce/resourceUrl/video1";
import drona1 from "@salesforce/resourceUrl/drona01";
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

const actions = [
  { label: "Preview Lecture", name: "preview" },
  { label: "Generate Summary", name: "generateSummary" },
  { label: "Generate Assignments", name: "generateAssignments" }
];

const columns = [
  { label: "Name", fieldName: "name" },
  { label: "Description", fieldName: "description" },
  { label: "Lecture Code", fieldName: "code" },
  { label: "Summary", fieldName: "summary" },
  { label: "Lecture Date", fieldName: "date", type: "date" },
  {
    type: "action",
    typeAttributes: { rowActions: actions }
  }
];
export default class MainContainer extends LightningElement {
  @wire(MessageContext)
  messageContext;
  data = [];
  columns = columns;
  record = {};
  @track videoURL = video1;
  @track drona1 = drona1;

  connectedCallback() {
    this.data = getLecturesData();
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case "preview":
        this.preview(row);
        break;
      case "generateSummary":
        this.generateSummary(row);
        break;
      case "generateAssignments":
        this.generateAssignments(row);
        break;
      default:
    }
  }

  preview(row) {
    publish(this.messageContext, hackLMS, null);
  }
}
