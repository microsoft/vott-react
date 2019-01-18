import React from "react";
import { ITag } from "../../models/models";
/**
 * Properties for Tag Editor Modal
 * @member tag - Tag for editing
 * @member showModal - Modal is visible
 * @member onOk - Function to call when 'Ok' button is clicked
 * @member onCancel - Function to call when 'Cancel' button is clicked or modal closed
 */
export interface ITagEditorModalProps {
    onOk: (tag: ITag) => void;
    tagColors?: {
        [id: string]: string;
    };
    tagNameText?: string;
    tagColorText?: string;
    editTagText?: string;
    saveText?: string;
    cancelText?: string;
    show?: boolean;
    onCancel?: () => void;
}
/**
 * State for Tag Editor Modal
 * @member tag - Current tag being edited
 * @member isOpen - Modal is open
 */
export interface ITagEditorModalState {
    tag: ITag;
    isOpen: boolean;
    formSchema: any;
}
/**
 * Simple modal for editing the name and color of project tags
 */
export default class TagEditorModal extends React.Component<ITagEditorModalProps, ITagEditorModalState> {
    private tagColors;
    constructor(props: ITagEditorModalProps);
    render(): JSX.Element;
    open(tag: ITag): void;
    close(): void;
    /**
     * Called when change made to modal form
     */
    private handleFormChange;
    /**
     * Called when 'Ok' is clicked
     */
    private handleOk;
    private createFormSchema;
}
