import { mount } from "enzyme";
import React from "react";
import MockFactory from "../../common/mockFactory";
import { TagEditorModal, ITagEditorModalProps, ITagEditorModalState } from "./tagEditorModal";

describe("Tag Editor Modal", () => {

    function createComponent(props: ITagEditorModalProps) {
        return mount(
            <TagEditorModal {...props} />,
        );
    }

    const tag = MockFactory.createTestTag();

    it("modal is initialized properly", () => {
        const onCancel = jest.fn();
        const onOk = jest.fn();
        const wrapper = createComponent({
            onCancel,
            onOk,
        });
        let state: ITagEditorModalState = wrapper.find(TagEditorModal).state();

        expect(state.originalTag).toBeNull();
        expect(state.currentTag).toBeNull();
        expect(state.isOpen).toBeUndefined();

        const instance = wrapper.instance() as TagEditorModal;
        instance.open(tag);
        state = wrapper.find(TagEditorModal).state();

        expect(state.originalTag).toEqual(tag);
        expect(state.currentTag).toEqual(tag);
        expect(state.isOpen).toBe(true);
    });

    it("modal is not visible", () => {
        const onCancel = jest.fn();
        const onOk = jest.fn();
        const wrapper = createComponent({
            onCancel,
            onOk,
        });
        expect(wrapper.find("div.modal-content").exists()).toBe(false);
        expect(wrapper.find("div.modal-header").exists()).toBe(false);
        expect(wrapper.find("div.modal-body").exists()).toBe(false);
    });

    it("modal is visible", () => {
        const onCancel = jest.fn();
        const onOk = jest.fn();
        const wrapper = createComponent({
            show: true,
            onCancel,
            onOk,
        });
        expect(wrapper.find("div.modal-content").exists()).toBe(true);
        expect(wrapper.find("div.modal-header").exists()).toBe(true);
        expect(wrapper.find("div.modal-body").exists()).toBe(true);
    });

    it("modal calls 'onCancel' when cancel is clicked", () => {
        const onCancel = jest.fn();
        const onOk = jest.fn();
        const wrapper = createComponent({
            show: true,
            onCancel,
            onOk,
        });
        expect(wrapper.find("div.modal-header").exists()).toBe(true);
        expect(wrapper.find("div.modal-body").exists()).toBe(true);
        wrapper.find("button.btn.btn-secondary").simulate("click");
        expect(onCancel).toBeCalled();
        expect(onOk).not.toBeCalled();
    });

    it("modal calls 'onOk' when ok is clicked", () => {
        const onCancel = jest.fn();
        const onOk = jest.fn();
        const wrapper = createComponent({
            show: true,
            onCancel,
            onOk,
        });
        expect(wrapper.find("div.modal-header").exists()).toBe(true);
        expect(wrapper.find("div.modal-body").exists()).toBe(true);
        (wrapper.instance() as TagEditorModal).open(tag);

        wrapper.find("button.btn.btn-success").simulate("click");
        expect(onOk).toBeCalledWith(tag, tag);
        expect(onCancel).not.toBeCalled();
    });
});
