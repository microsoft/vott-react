import { shallow } from "enzyme";
import * as React from "react";
import App from "./App";
describe("<App />", () => {
    it("should render without throwing an error", () => {
        expect(shallow(React.createElement(App, null)).find(".App")).toHaveLength(1);
    });
});
//# sourceMappingURL=App.test.js.map