import { createElement } from "lwc";
import ExploreHelloWorld from "c/exploreHelloWorld";

describe("c-explore-hello-world", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("displays hello world greeting", () => {
    const element = createElement("c-explore-hello-world", {
      is: ExploreHelloWorld
    });
    document.body.appendChild(element);

    element.shadowRoot.querySelector("lightning-button").click();

    let p = new Promise((resolve) => {
      resolve();
    });
    return p.then(() => {
      const uname = element.shadowRoot.querySelector(".userName");
      expect(uname.textContent).toBe("Teja");
    });
  });
});
