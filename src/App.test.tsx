import App from "./App";
import * as React from "react";
import { shallow } from "enzyme";

describe("<App />", () => {
  it("should render without throwing an error", () => {
      expect(shallow(<App />).find(".App")).toHaveLength(1);
  });
});
