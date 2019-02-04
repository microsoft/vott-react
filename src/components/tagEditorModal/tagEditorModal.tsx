import * as React from "react";
import Form from "react-jsonschema-form";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ITag } from "../../models/models";
import { tagColors } from "../common/tagColors";

const defaultValues = {
    tagColors,
    tagNameText: "Tag",
    editTagText: "Edit Tag",
    tagColorText: "Color",
    saveText: "Save",
    cancelText: "Cancel",
};

/**
 * Properties for Tag Editor Modal
 */
export interface ITagEditorModalProps extends React.Props<TagEditorModal> {
    /** Function to call when "Ok" button is clicked */
    onOk: (oldTag: ITag, newTag: ITag) => void;

    /**
     * Dictionary of colors indexed by color name, value is color code.
     * Used to choose colors available to apply to tags
     */
    tagColors?: { [id: string]: string };
    /** Allows for substitution of English word "Tag" */
    tagNameText?: string;
    /** Allows for substitution of English word "Color" */
    tagColorText?: string;
    /** Allows for substitution of English words "Edit Tag" */
    editTagText?: string;
    /** Allows for substitution of English word "Save" */
    saveText?: string;
    /** Allows for substitution of English word "Cancel" */
    cancelText?: string;

    // Optional
    /** Modal is visible. Won't have tag unless `open` is called with tag */
    show?: boolean;
    /** Function to call when "Cancel" button is clicked or modal closed */
    onCancel?: () => void;
}

/**
 * State for Tag Editor Modal
 */
export interface ITagEditorModalState {
    /**  Tag originally opened with */
    originalTag: ITag;
    /** Current tag as modified by modal */
    currentTag: ITag;
    /** Modal is open */
    isOpen: boolean;
    /** JSON form schema for modal body form */
    formSchema: any;
}

/**
 * Simple modal for editing the name and color of project tags
 */
export class TagEditorModal extends React.Component<ITagEditorModalProps, ITagEditorModalState> {
    private static createFormSchema = (colors: { [id: string]: string }, tagNameText: string, tagColorText: string) => {
        const keys = Object.keys(colors);
        const values: string[] = [];
        for (const key of keys) {
            values.push(colors[key]);
        }
        return {
            type: "object",
            properties: {
                name: {
                    title: tagNameText,
                    type: "string",
                },
                color: {
                    title: tagColorText,
                    type: "string",
                    enum: values,
                    default: values[0],
                    enumNames: keys,
                },
            },
        };
    }

    public state: ITagEditorModalState = {
        originalTag: null,
        currentTag: null,
        isOpen: this.props.show,
        formSchema: TagEditorModal.createFormSchema(
            this.props.tagColors || defaultValues.tagColors,
            this.props.tagNameText || defaultValues.tagNameText,
            this.props.tagColorText || defaultValues.tagColorText),
    };

    public render() {
        const closeBtn = <button className="close" onClick={this.close}>&times;</button>;

        return (
            <div>
                <Modal isOpen={this.state.isOpen} centered={true}>
                    <ModalHeader toggle={this.close} close={closeBtn}>
                        {this.props.editTagText || defaultValues.editTagText}
                    </ModalHeader>
                    <ModalBody>
                        <Form
                            idPrefix={"modal-form"}
                            schema={this.state.formSchema}
                            formData={this.state.currentTag}
                            onChange={this.handleFormChange}>
                            <button style={{
                                display: "none",
                            }} type="submit"></button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="success"
                            onClick={this.handleOk}>{this.props.saveText || defaultValues.saveText}</Button>
                        <Button
                            color="secondary"
                            onClick={this.close}>{this.props.cancelText || defaultValues.cancelText}</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    /**
     * Open editor modal with tag
     * @param tag Tag to be edited
     */
    public open = (tag: ITag): void => {
        this.setState({
            isOpen: true,
            originalTag: tag,
            currentTag: tag,
        });
    }

    /**
     * Close editor modal and call `onCancel` if provided
     */
    public close = (): void => {
        this.setState({
            isOpen: false,
        }, () => {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        });
    }

    /**
     * Called when change made to modal form
     */
    private handleFormChange = (args): void => {
        this.setState({
            currentTag: {
                name: args.formData.name,
                color: args.formData.color,
            },
        });
    }

    /**
     * Called when "Ok" is clicked
     */
    private handleOk = (e): void => {
        this.props.onOk(this.state.originalTag, this.state.currentTag);
    }
}
