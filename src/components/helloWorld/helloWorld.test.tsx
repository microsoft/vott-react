
import React from "react";
import { HelloWorld } from "./helloWorld";
import { mount, ReactWrapper } from "enzyme";

describe("Hello World", () => {
    function createComponent(): ReactWrapper {
        return (mount(<HelloWorld />));
    }

    it("is defined", () => {
        const wrapper = createComponent();
        expect(wrapper.exists()).toBe(true);
    });
});
