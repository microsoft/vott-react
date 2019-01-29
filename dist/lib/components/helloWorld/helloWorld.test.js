import React from "react";
import { HelloWorld } from "./helloWorld";
import { mount } from "enzyme";
describe("Hello World", () => {
    function createComponent() {
        return (mount(React.createElement(HelloWorld, null)));
    }
    it("is defined", () => {
        const wrapper = createComponent();
        expect(wrapper.exists()).toBe(true);
    });
});
