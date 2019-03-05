import { mount } from "enzyme";
import React from "react";
import MockFactory from "../../common/mockFactory";
import { KeyCodes } from "../../common/utils";
import { TagsInput, ITagsInputProps } from "./tagsInput";
// tslint:disable-next-line:no-var-requires
import { tagColors } from "../common/tagColors";

describe("Tags Input Component", () => {

    const originalTags = MockFactory.createTestTags();

    function createComponent(props: ITagsInputProps) {
        return mount(
            <TagsInput {...props} />,
        );
    }

    it("tags are initialized correctly", () => {
        const onChangeHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
        });
        const stateTags = wrapper.find(TagsInput).state().tags;
        const tagElements = wrapper.find(".tag");

        expect(stateTags).toHaveLength(originalTags.length);
        expect(tagElements).toHaveLength(originalTags.length);

        for (let i = 0; i < stateTags.length; i++) {
            expect(stateTags[i]).toEqual(originalTags[i]);
            expect(tagElements.at(i).getDOMNode().getAttribute("data-tag-name")).toEqual(originalTags[i].name);
        }
    });

    it("renders appropriate number of color boxes", () => {
        const onChangeHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
        });
        expect(wrapper.find("div.tag-color-box")).toHaveLength(originalTags.length);
    });

    it("one text input field is available", () => {
        const onChangeHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
        });
        expect(wrapper.find("input")).toHaveLength(1);
    });

    it("create a new tag from text box - enter key", () => {
        const onChangeHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
        });
        const newTagName = "My new tag";
        wrapper.find("input").simulate("change", { target: { value: newTagName } });
        wrapper.find("input").simulate("keyDown", { keyCode: KeyCodes.enter });
        expect(onChangeHandler).toBeCalled();
        expect(wrapper.find(TagsInput).state().tags).toHaveLength(originalTags.length + 1);
        const newTagIndex = originalTags.length;
        expect(wrapper.find(TagsInput).state().tags[newTagIndex].name).toEqual(newTagName);
        const colorValues: string[] = [];
        for (const key of Object.keys(tagColors)) {
            colorValues.push(tagColors[key]);
        }
        expect(colorValues).toContain(wrapper.find(TagsInput).state().tags[newTagIndex].color);
    });

    it("create a new tag with no existing tags", () => {
        const onChangeHandler = jest.fn();
        const wrapper = createComponent({
            tags: null,
            onChange: onChangeHandler,
        });
        const newTagName = "My new tag"
        wrapper.find("input").simulate("change", { target: { value: newTagName } });
        wrapper.find("input").simulate("keyDown", { keyCode: KeyCodes.enter });
        expect(onChangeHandler).toBeCalled();
        expect(wrapper.find(TagsInput).state().tags).toHaveLength(1);
        expect(wrapper.find(TagsInput).state().tags[0].name).toEqual(newTagName);
    });

    it("create a new tag from text box - comma key", () => {
        const onChangeHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
        });
        const newTagName = "My new tag";
        wrapper.find("input").simulate("change", { target: { value: newTagName } });
        wrapper.find("input").simulate("keyDown", { keyCode: KeyCodes.comma });
        expect(onChangeHandler).toBeCalled();
        expect(wrapper.find(TagsInput).state().tags).toHaveLength(originalTags.length + 1);
        const newTagIndex = originalTags.length;
        expect(wrapper.find(TagsInput).state().tags[newTagIndex].name).toEqual(newTagName);

        const colorValues: string[] = [];
        for (const key of Object.keys(tagColors)) {
            colorValues.push(tagColors[key]);
        }
        expect(colorValues).toContain(wrapper.find(TagsInput).state().tags[newTagIndex].color);
    });

    it("remove a tag", () => {
        const onChangeHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
        });
        expect(wrapper.find(TagsInput).state().tags).toHaveLength(originalTags.length);
        wrapper.find("a.ReactTags__remove")
            .last().simulate("click");
        expect(onChangeHandler).toBeCalled();
        expect(wrapper.find(TagsInput).state().tags).toHaveLength(originalTags.length - 1);
        expect(wrapper.find(TagsInput).state().tags[0].name).toEqual(originalTags[0].name);
        expect(wrapper.find(TagsInput).state().tags[0].color).toEqual(originalTags[0].color);
    });

    it("typing backspace on empty field does NOT delete tag", () => {
        const onChangeHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
        });
        // Root component calls handleDelete when backspace is pressed
        // Component should handle backspace and return, not deleting and not calling onChange
        wrapper.find("input").simulate("keyDown", { keyCode: KeyCodes.backspace }); // backspace
        expect(onChangeHandler).not.toBeCalled();
        expect(wrapper.find(TagsInput).state().tags).toHaveLength(originalTags.length);
    });

    it("clicking tag calls click handler", () => {
        const onChangeHandler = jest.fn();
        const onTagClickHandler = jest.fn();
        const onCtrlClickHandler = jest.fn();
        const onShiftClickHandler = jest.fn();
        const onCtrlShiftClickHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
            onTagClick: onTagClickHandler,
            onCtrlTagClick: onCtrlClickHandler,
            onShiftTagClick: onShiftClickHandler,
            onCtrlShiftTagClick: onCtrlShiftClickHandler,
        });
        wrapper.find("div.tag")
            .first()
            .simulate("click", { target: { innerText: originalTags[0].name } });
        expect(onTagClickHandler).toBeCalledWith(originalTags[0]);
        expect(onShiftClickHandler).not.toBeCalled();
        expect(onCtrlClickHandler).not.toBeCalled();
        expect(onCtrlShiftClickHandler).not.toBeCalled();
    });

    it("ctrl clicking tag calls ctrl click handler", () => {
        const onChangeHandler = jest.fn();
        const onTagClickHandler = jest.fn();
        const onCtrlClickHandler = jest.fn();
        const onShiftClickHandler = jest.fn();
        const onCtrlShiftClickHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
            onTagClick: onTagClickHandler,
            onCtrlTagClick: onCtrlClickHandler,
            onShiftTagClick: onShiftClickHandler,
            onCtrlShiftTagClick: onCtrlShiftClickHandler,
        });
        wrapper.find("div.tag")
            .first()
            .simulate("click", { target: { innerText: originalTags[0].name }, ctrlKey: true });
        expect(onCtrlClickHandler).toBeCalledWith(originalTags[0]);
        expect(onTagClickHandler).not.toBeCalled();
        expect(onShiftClickHandler).not.toBeCalled();
        expect(onCtrlShiftClickHandler).not.toBeCalled();
    });

    it("shift clicking tag calls shift click handler", () => {
        const onChangeHandler = jest.fn();
        const onTagClickHandler = jest.fn();
        const onCtrlClickHandler = jest.fn();
        const onShiftClickHandler = jest.fn();
        const onCtrlShiftClickHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
            onTagClick: onTagClickHandler,
            onCtrlTagClick: onCtrlClickHandler,
            onShiftTagClick: onShiftClickHandler,
            onCtrlShiftTagClick: onCtrlShiftClickHandler,
        });
        wrapper.find("div.tag")
            .first()
            .simulate("click", { target: { innerText: originalTags[0].name }, shiftKey: true });
        expect(onShiftClickHandler).toBeCalledWith(originalTags[0]);
        expect(onTagClickHandler).not.toBeCalled();
        expect(onCtrlClickHandler).not.toBeCalled();
        expect(onCtrlShiftClickHandler).not.toBeCalled();
    });

    it("ctrl shift clicking tag calls ctrl shift click handler", () => {
        const onChangeHandler = jest.fn();
        const onTagClickHandler = jest.fn();
        const onCtrlClickHandler = jest.fn();
        const onShiftClickHandler = jest.fn();
        const onCtrlShiftClickHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
            onTagClick: onTagClickHandler,
            onCtrlTagClick: onCtrlClickHandler,
            onShiftTagClick: onShiftClickHandler,
            onCtrlShiftTagClick: onCtrlShiftClickHandler,
        });
        wrapper.find("div.tag")
            .first()
            .simulate("click", { target: { innerText: originalTags[0].name }, ctrlKey: true, shiftKey: true });
        expect(onCtrlShiftClickHandler).toBeCalledWith(originalTags[0]);
        expect(onTagClickHandler).not.toBeCalled();
        expect(onCtrlClickHandler).not.toBeCalled();
        expect(onShiftClickHandler).not.toBeCalled();
    });

    it("Renders with provided getTagSpan", async () => {
        const getTagSpan = jest.fn((name, index) => `${name}-${index}`);
        const onChangeHandler = jest.fn();
        const wrapper = createComponent({
            tags: originalTags,
            onChange: onChangeHandler,
            getTagSpan,
        });
        await MockFactory.flushUi();
        expect(getTagSpan).toBeCalledTimes(originalTags.length * 2); // Should run twice with componentDidMount
        expect(wrapper.find("div.tag").first().text()).toEqual(`${originalTags[0].name}-0`);
    });
});
