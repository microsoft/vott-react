import React from "react";
import Form from "react-jsonschema-form";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
const defaultValues = {
    tagColors: {
        White: "#FFFFFF",
        Gray: "#808080",
        Red: "#FF0000",
        Maroon: "#800000",
        Yellow: "#FFFF00",
        Olive: "#808000",
        Lime: "#00FF00",
        Green: "#008000",
        Aqua: "#00FFFF",
        Teal: "#008080",
        Blue: "#0000FF",
        Navy: "#000080",
        Fuschia: "#FF00FF",
        Purple: "#800080",
    },
    tagNameText: "Tag",
    editTagText: "Edit Tag",
    tagColorText: "Color",
    saveText: "Save",
    cancelText: "Cancel",
};
/**
 * Simple modal for editing the name and color of project tags
 */
export default class TagEditorModal extends React.Component {
    constructor(props) {
        super(props);
        this.tagColors = props.tagColors || defaultValues.tagColors;
        this.state = {
            tag: null,
            isOpen: props.show,
            formSchema: this.createFormSchema(this.tagColors, this.props.tagNameText || defaultValues.tagNameText, this.props.tagColorText || defaultValues.tagColorText),
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }
    render() {
        const closeBtn = React.createElement("button", { className: "close", onClick: this.props.onCancel }, "\u00D7");
        return (React.createElement("div", null,
            React.createElement(Modal, { isOpen: this.state.isOpen, centered: true },
                React.createElement(ModalHeader, { toggle: this.props.onCancel, close: closeBtn }, this.props.editTagText || defaultValues.editTagText),
                React.createElement(ModalBody, null,
                    React.createElement(Form, { schema: this.state.formSchema, formData: this.state.tag, onChange: this.handleFormChange })),
                React.createElement(ModalFooter, null,
                    React.createElement(Button, { color: "success", onClick: this.handleOk }, this.props.saveText || defaultValues.saveText),
                    React.createElement(Button, { color: "secondary", onClick: this.props.onCancel }, this.props.cancelText || defaultValues.cancelText)))));
    }
    open(tag) {
        this.setState({
            isOpen: true,
            tag,
        });
    }
    close() {
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
    handleFormChange(args) {
        this.setState({
            tag: {
                name: args.formData.name,
                color: args.formData.color,
            },
        });
    }
    /**
     * Called when 'Ok' is clicked
     */
    handleOk(e) {
        this.props.onOk(this.state.tag);
    }
    createFormSchema(colors, tagNameText, tagColorText) {
        const keys = Object.keys(colors);
        const values = [];
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
                    enum: keys,
                    default: values[0],
                    enumNames: values,
                },
            },
        };
    }
}
//# sourceMappingURL=tagEditorModal.js.map