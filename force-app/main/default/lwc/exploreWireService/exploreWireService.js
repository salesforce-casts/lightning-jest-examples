import { LightningElement, api, wire, track } from 'lwc';

import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import RATING_FIELD from '@salesforce/schema/Account.Rating';

import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [ACCOUNT_NAME_FIELD, INDUSTRY_FIELD, RATING_FIELD];

export default class ExploreWireService extends LightningElement {
    @api recordId;
    @track accounts;
    @track error;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredsAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    get name() {
        return this.accounts.fields.Name.value;
    }

    get industry() {
        return this.accounts.fields.Industry.value;
    }

    get rating() {
        return this.accounts.fields.Rating.value;
    }
}