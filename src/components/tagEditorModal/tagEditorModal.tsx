import * as React from "react";
import * as PropTypes from "prop-types";

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
 * @member onOk - Function to call when "Ok" button is clicked
 * @member tagColors - Dictionary of colors indexed by color name, value is color code.
 * Used to choose colors available to apply to tags
 * @member tagNameText - Allows for substitution of English word "Tag"
 * @member editTagText - Allows for substitution of English words "Edit Tag"
 * @member tagColorText - Allows for substitution of English word "Color"
 * @member saveText - Allows for substitution of English word "Save"
 * @member cancelText - Allows for substitution of English word "Cancel"
 * @member show - Modal is visible. Won't have tag unless `open` is called with tag
 * @member onCancel - Function to call when "Cancel" button is clicked or modal closed
 */
export interface ITagEditorModalProps {
    onOk: (oldTag: ITag, newTag: ITag) => void;

    // Props with default params
    tagColors?: {[id: string]: string};
    tagNameText?: string;
    tagColorText?: string;
    editTagText?: string;
    saveText?: string;
    cancelText?: string;

    // Optional
    show?: boolean;
    onCancel?: () => void;
}

/**
 * State for Tag Editor Modal
 * @member originalTag - Tag originally opened with
 * @member currentTag - Current tag as modified by modal
 * @member isOpen - Modal is open
 * @member formSchema - JSON form schema for modal body form
 */
export interface ITagEditorModalState {
    originalTag: ITag;
    currentTag: ITag;
    isOpen: boolean;
    formSchema: any;
}

/**
 * Simple modal for editing the name and color of project tags
 */
export class TagEditorModal extends React.Component<ITagEditorModalProps, ITagEditorModalState> {

    private tagColors: {[id: string]: string};

    constructor(props: ITagEditorModalProps) {
        super(props);

        this.tagColors = props.tagColors || defaultValues.tagColors;

        this.state = {
            originalTag: null,
            currentTag: null,
            isOpen: props.show,
            formSchema: this.createFormSchema(
                this.tagColors,
                this.props.tagNameText || defaultValues.tagNameText,
                this.props.tagColorText || defaultValues.tagColorText),
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

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
                            }}  type="submit"></button>
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
    public open(tag: ITag): void {
        this.setState({
            isOpen: true,
            originalTag: tag,
            currentTag: tag,
        });
    }

    /**
     * Close editor modal and call `onCancel` if provided
     */
    public close(): void {
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
    private handleFormChange(args) {
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
    private handleOk(e) {
        this.props.onOk(this.state.originalTag, this.state.currentTag);
    }

    private createFormSchema(colors: {[id: string]: string}, tagNameText: string, tagColorText: string) {
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
}

TagEditorModal.propTypes = {
    /** Function to call when "Ok" button is clicked */
    onOk: PropTypes.string.isRequired,

    /** Dictionary of colors indexed by color name, value is color code */
    tagColors: PropTypes.string,
    /** Allows for substitution of English word "Tag" */
    tagNameText: PropTypes.string,
    /** Allows for substitution of English word "Color" */
    tagColorText: PropTypes.string,
    /** Allows for substitution of English words "Edit Tag" */
    editTagText: PropTypes.string,
    /** Allows for substitution of English word "Save" */
    saveText: PropTypes.string,
    /** Allows for substitution of English word "Cancel" */
    cancelText: PropTypes.string,

    /** Modal is visible. Won't have tag unless `open` is called with tag */
    show: PropTypes.bool,
    /** Function to call when "Cancel" button is clicked or modal closed */
    onCancel: PropTypes.func,
}

TagEditorModal.defaultProps = {
    onOk: "none",

    tagColors: "[White, Gray, Red, Maroon" +
        ", Yellow, Olive, Lime, Green, Aqua, " +
        "Teal, Blue, Navy, Fuschia, Purple]",
    tagNameText: "Tag",
    editTagText: "Edit Tag",
    tagColorText: "Color",
    saveText: "Save",
    cancelText: "Cancel",

    show: "none",
    onCancel: "none",
}
