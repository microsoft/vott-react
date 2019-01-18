import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { randomIntInRange } from "../../common/utils";
import { KeyCodes } from "../../common/utils";
export const defaultValues = {
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
    delimiters: [KeyCodes.comma, KeyCodes.enter],
    placeHolder: "Add new tag",
};
/**
 * Component for creating, modifying and using tags
 */
export default class TagsInput extends React.Component {
    constructor(props) {
        super(props);
        this.tagColors = props.tagColors || defaultValues.tagColors;
        this.tagColorKeys = Object.keys(this.tagColors);
        this.state = {
            tags: this.toReactTags(this.props.tags),
            currentTagColorIndex: randomIntInRange(0, this.tagColorKeys.length),
        };
        // UI Handlers
        this.handleTagClick = this.handleTagClick.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        // Tag edit handlers
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        // Helpers
        this.toReactTag = this.toReactTag.bind(this);
        this.getTag = this.getTag.bind(this);
    }
    render() {
        const { tags } = this.state;
        return (React.createElement("div", null,
            React.createElement(ReactTags, { tags: tags, placeholder: this.props.placeHolder || defaultValues.placeHolder, autofocus: false, handleDelete: this.handleDelete, handleAddition: this.handleAddition, handleDrag: this.handleDrag, delimiters: this.props.delimiters || defaultValues.delimiters })));
    }
    componentDidUpdate(prevProps) {
        if (prevProps.tags !== this.props.tags) {
            this.setState({
                tags: this.toReactTags(this.props.tags),
            });
        }
    }
    // UI Handlers
    /**
     * Calls the onTagClick handler if not null with clicked tag
     * @param event Click event
     */
    handleTagClick(event) {
        const text = this.getTagIdFromClick(event);
        const tag = this.toItag(this.getTag(text));
        if (this.props.onCtrlShiftTagClick && event.ctrlKey && event.shiftKey) {
            this.props.onCtrlShiftTagClick(tag);
        }
        else if (this.props.onCtrlTagClick && event.ctrlKey) {
            this.props.onCtrlTagClick(tag);
        }
        else if (this.props.onShiftTagClick && event.shiftKey) {
            this.props.onShiftTagClick(tag);
        }
        else if (this.props.onTagClick) {
            this.props.onTagClick(tag);
        }
    }
    // Helpers
    /**
     * Gets the tag with the given name (id)
     * @param id string name of tag. param 'id' for lower level react component
     */
    getTag(id) {
        const match = this.state.tags.find((tag) => tag.id === id);
        if (!match) {
            throw new Error(`No tag by id: ${id}`);
        }
        return match;
    }
    /**
     * Gets tag ID (name) from a click event
     * @param event Click event
     */
    getTagIdFromClick(event) {
        if (event.target.lastChild) {
            return event.target.lastChild.data;
        }
        return (event.target.innerText || event.currentTarget.innerText).trim();
    }
    /**
     * Generate necessary HTML to render tag box appropriately
     * @param name name of tag
     * @param color color of tag
     */
    ReactTagHtml(name, color) {
        return (React.createElement("div", { className: "tag inline-block", onClick: (event) => this.handleTagClick(event) },
            React.createElement("div", { className: "tag-contents" },
                React.createElement("div", { className: "tag-color-box", style: { backgroundColor: color } }),
                this.getTagSpan(name))));
    }
    /**
     * Get span element for each tag
     */
    getTagSpan(name) {
        return React.createElement("span", null, name);
    }
    /**
     * Converts IReactTag to ITag
     * @param tag IReactTag to convert to ITag
     */
    toItag(tag) {
        if (!tag) {
            return null;
        }
        return {
            name: tag.id,
            color: tag.color,
        };
    }
    /**
     * Allows for click-and-drag re-ordering of tags
     * @param tag Tag being dragged
     * @param currPos Current position of tag
     * @param newPos New position of tag
     */
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        this.updateTagsHtml(newTags);
        // Updating HTML is dependent upon state having most up to date
        // values. Setting filtered state and then setting state with
        // updated HTML in tags
        this.setState({
            tags: newTags,
        }, () => this.setState({
            tags: this.updateTagsHtml(newTags),
        }, () => this.props.onChange(this.toITags(this.state.tags))));
    }
    // Tag Operations
    /**
     * Adds new tag to state with necessary HTML for rendering
     * Sets the color of the tag to next color, rotates through each
     * @param reactTag - IReactTag - new tag to add to state
     */
    handleAddition(reactTag) {
        reactTag.color = this.tagColors[this.tagColorKeys[this.state.currentTagColorIndex]];
        this.addHtml(reactTag);
        this.setState((prevState) => {
            return {
                tags: [...this.state.tags, reactTag],
                currentTagColorIndex: (prevState.currentTagColorIndex + 1) % this.tagColorKeys.length,
            };
        }, () => this.props.onChange(this.toITags(this.state.tags)));
    }
    /**
     * Deletes tag from state
     * Explicitly prevents deletion with backspace key
     * @param i index of tag being deleted
     * @param event delete event
     */
    handleDelete(i, event) {
        if (event.keyCode === KeyCodes.backspace) {
            return;
        }
        const tags = this.state.tags.filter((tag, index) => index !== i);
        // Updating HTML is dependent upon state having most up to date
        // values. Setting filtered state and then setting state with
        // updated HTML in tags
        this.setState({
            tags,
        }, () => this.setState({
            tags: this.updateTagsHtml(tags),
        }, () => this.props.onChange(this.toITags(this.state.tags))));
    }
    /**
     * Converts ITag to IReactTag
     * @param tag ITag to convert to IReactTag
     */
    toReactTag(tag) {
        if (!tag) {
            return null;
        }
        return {
            id: tag.name,
            text: this.ReactTagHtml(tag.name, tag.color),
            color: tag.color,
        };
    }
    updateTagsHtml(tags) {
        const newTags = [];
        for (const tag of tags) {
            this.addHtml(tag);
            newTags.push(tag);
        }
        return newTags;
    }
    /**
     * Adds necessary HTML for tag to render correctly
     * @param tag tag needing Html
     */
    addHtml(tag) {
        tag.text = this.ReactTagHtml(tag.id, tag.color);
    }
    /**
     * Convert array of ITags to IReactTags
     * @param props properties for component, contains tags in ITag format
     */
    toReactTags(tags) {
        return tags ? tags.map((element) => this.toReactTag(element)) : [];
    }
    /**
     * Convert array of IReactTags to ITags
     * @param tags array of IReactTags to convert to ITags
     */
    toITags(tags) {
        return tags.map((element) => this.toItag(element));
    }
}
//# sourceMappingURL=tagsInput.js.map