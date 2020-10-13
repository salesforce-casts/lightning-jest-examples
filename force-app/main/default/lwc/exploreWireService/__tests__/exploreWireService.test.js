import { createElement } from "lwc";
import ExploreWireService from "c/exploreWireService";

import { registerLdsTestWireAdapter } from "@salesforce/sfdx-lwc-jest";
import { getRecord } from "lightning/uiRecordApi";

const mockGetRecord = require("./data/getRecord.json");
const getRecordWireAdapter = registerLdsTestWireAdapter(getRecord);

describe("c-explore-wire-service", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("displaying account name using wire", () => {
    const element = createElement("c-explore-wire-service", {
      is: ExploreWireService
    });
    document.body.appendChild(element);

    getRecordWireAdapter.emit(mockGetRecord);

    return Promise.resolve().then(() => {
      const content = element.shadowRoot.querySelector(".accountName");

      const nameField = mockGetRecord.fields.Name.value;

      expect(content.textContent).toBe(nameField);
    });
  });
});
