import { LightningElement, api,track, wire } from 'lwc';
import { getRecord  } from 'lightning/uiRecordApi';

import telaCotacaoOnlyView from './telaCotacaoOnlyView.html';
import telaCotacaoView from './telaCotacaoView.html';
const myfields = [
    'Quote.Status'
];
 
export default class TelaCotacaoView extends LightningElement {
    @api recordId;
    @api objectApiName;
    @track editar = false;
    @track status='';

    @wire(getRecord, { recordId: '$recordId', fields: myfields })
    wireRec({ error, data }) {
        if (error) {
            this.error = error;
        } else if (data) {
            this.status = data.fields.Status.value;
        }
    }
    render() {
        if(this.status === 'APROVADO' || this.status === 'REJEITADO' || this.status === 'EM APROVAÇÃO'){
            return telaCotacaoOnlyView;
        } 
            return telaCotacaoView;   
    }
    handleClick() {
        if(this.editar){
            this.editar = false;
        } else {
            this.editar = true;
        }
    }
    handleSubmit(event){
        event.preventDefault();
        this.editar = false;
        this.template.querySelector('lightning-record-edit-form').submit();
    }
}