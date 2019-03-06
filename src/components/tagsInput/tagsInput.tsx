import React, { SyntheticEvent } from "react";
import PropTypes from "prop-types";

import { WithContext as ReactTags } from "react-tag-input";
import { KeyCodes, randomIntInRange } from "../../common/utils";
import { ITag } from "../../models/models";
import { tagColors } from "../common/tagColors";

export const defaultValues = {
    tagColors,
    delimiters: [KeyCodes.comma, KeyCodes.enter],
    placeHolder: "Add new tag",
};

/**
 * Interface for model required to work with lower level
 * tags input component. Rather than name, uses "id".
 * Requires text attribute, which is used to inject
 * HTML to customize the tags
 * @member id - Unique identifier for tag (name)
 * @member text - Text to display on tag (can be HTML object)
 * @member color - Hex color of box to display left of tag name
 */
export interface IReactTag {
    id: string;
    text: any;
    color: string;
}

/**
 * Properties required for TagsInput component
 */
export interface ITagsInputProps extends React.Props<TagsInput> {
    tags: ITag[];
    /** function to call on tags change */
    onChange: (tags: ITag[]) => void;

    /** Place holder for input text box.
     * @default New Tag
     */
    placeHolder?: string;
    /** Key code delimiters for creating a new tag */
    delimiters?: number[];
    /** Colors for tags */
    tagColors?: { [id: string]: string };
    /** Function to call on clicking individual tag */
    onTagClick?: (tag: ITag) => void;
    /** Function to call on clicking individual tag while holding CTRL key */
    onCtrlTagClick?: (tag: ITag) => void;
    /** Function to call on clicking individual tag while holding Shift key */
    onShiftTagClick?: (tag: ITag) => void;
    /** Function to call on clicking individual tag while holding CTRL and Shift keys */
    onCtrlShiftTagClick?: (tag: ITag) => void;
    /** Function to render span of text within each tag */
    getTagSpan?: (name: string, tagIndex?: number) => any;
}

/**
 * Current state of tags input component
 */
export interface ITagsInputState {
    /** IReactTag[] - tags used in lower level component */
    tags: ITag[];
    /** rotates initial color to apply to tags */
    currentTagColorIndex: number;
}

/**
 * Component for creating, modifying and using tags
 */
export class TagsInput extends React.Component<ITagsInputProps, ITagsInputState> {

    public state: ITagsInputState = {
        tags: this.props.tags,
        currentTagColorIndex: 0,
    };

    public render() {
        const { tags } = this.state;

        return (
            <div>
                <ReactTags tags={this.toReactTags(this.state.tags)}
                    placeholder={this.props.placeHolder || defaultValues.placeHolder}
                    autofocus={false}
                    allowAdditionFromPaste={false}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    id={"tagInputField"}
                    delimiters={this.props.delimiters || defaultValues.delimiters} />
            </div>
        );
    }

    public componentDidMount() {
        this.setState({
            currentTagColorIndex: randomIntInRange(0, this.getTagColorKeys().length),
        });
    }

    public componentDidUpdate(prevProps: ITagsInputProps) {
        if (prevProps.tags !== this.props.tags) {
            this.setState({
                tags: this.props.tags,
            });
        }
    }

    /**
     * Update an existing tag, called after clicking "OK" in modal
     * @param oldTag Tag being edited
     * @param newTag Newly edited version of tag
     */
    public updateTag = (oldTag: ITag, newTag: ITag) => {
        /**
         * If this was a name change (ids are not equal), don"t allow
         * the new tag to be named with a name that currently exists
         * in other tags. Probably should include an error message.
         * For now, just doesn"t allow the action to take place. Modal
         * won"t close and user won"t be able to set the name. This is
         * similar to how the component handles duplicate naming at the
         * creation level. If user enters name that already exists in
         * tags, the component just doesn"t do anything.
         */
        if (newTag.name !== oldTag.name && this.state.tags.some((t) => t.name === newTag.name)) {
            return;
        }
        const tags = this.state.tags.map((tag) => (tag.name === oldTag.name) ? newTag : tag);
        this.setState({tags}, () => this.props.onChange(tags));
    }

    /**
     * Get span element for each tag
     * Protected so that inheriting components can override if necessary
     * Defaults to just returning the name of the tag in the span
     * @param name Name of tag to get
     */
    private getTagSpan = (name: string) => {
        if (this.props.getTagSpan) {
            return this.props.getTagSpan(name, this.getTagIndex(name));
        }
        return <span>{name}</span>;
    }

    private getTagColorKeys = (): string[] => {
        return Object.keys(this.getTagColors());
    }

    private getTagColors = (): {[id: string]: string} => {
        return this.props.tagColors || defaultValues.tagColors;
    }

    private getTagIndex = (name: string) => {
        return this.state.tags.findIndex((tag) => tag.name === name);
    }

    // UI Handlers

    /**
     * Calls the onTagClick handler if not null with clicked tag
     * @param event Click event
     */
    private handleTagClick = (event: React.MouseEvent) => {
        const text = this.getTagIdFromClick(event);
        const tag: ITag = this.getTag(text);
        if (this.props.onCtrlShiftTagClick && event.ctrlKey && event.shiftKey) {
            this.props.onCtrlShiftTagClick(tag);
        } else if (this.props.onCtrlTagClick && event.ctrlKey) {
            this.props.onCtrlTagClick(tag);
        } else if (this.props.onShiftTagClick && event.shiftKey) {
            this.props.onShiftTagClick(tag);
        } else if (this.props.onTagClick) {
            this.props.onTagClick(tag);
        }
    }

    // Helpers

    /**
     * Gets the tag with the given name
     * @param name string name of tag.
     */
    private getTag = (name: string): ITag => {
        const match = this.state.tags.find((tag) => tag.name === name);
        if (!match) {
            throw new Error(`No tag by name: ${name}`);
        }
        return match;
    }

    /**
     * Gets tag ID (name) from a click event
     * @param event Click event
     */
    private getTagIdFromClick(event: SyntheticEvent): string {
        const attrValue = event.currentTarget.getAttribute("data-tag-name");
        return attrValue ? attrValue.trim() : null;
    }

    /**
     * Generate necessary HTML to render tag box appropriately
     * @param name name of tag
     * @param color color of tag
     */
    private ReactTagHtml = (name: string, color: string) => {
        return (
            <div className="tag inline-block" data-tag-name={name} onClick={(event) => this.handleTagClick(event)}>
                <div className="tag-contents">
                    <div className="tag-color-box" style={{ backgroundColor: color }}></div>
                    {this.getTagSpan(name)}
                </div>
            </div>
        );
    }

    /**
     * Allows for click-and-drag re-ordering of tags
     * @param tag Tag being dragged
     * @param currPos Current position of tag
     * @param newPos New position of tag
     */
    private handleDrag = (tag: IReactTag, currPos: number, newPos: number): void => {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, this.toItag(tag));

        // Updating HTML is dependent upon state having most up to date
        // values. Setting filtered state and then setting state with
        // updated HTML in tags
        this.setState({
            tags: newTags,
        }, () => this.props.onChange(this.state.tags));
    }

    // Tag Operations

    /**
     * Adds new tag to state with necessary HTML for rendering
     * Sets the color of the tag to next color, rotates through each
     * @param reactTag - IReactTag - new tag to add to state
     */
    private handleAddition = (reactTag: IReactTag): void => {
        const tag = this.toItag(reactTag);
        const tagColors = this.getTagColors();
        const tagColorKeys = Object.keys(tagColors);
        tag.color = tagColors[tagColorKeys[this.state.currentTagColorIndex]];
        const currentTags = (this.state.tags && this.state.tags.length) ? this.state.tags : [];
        this.setState((prevState) => {
            return {
                tags: [...currentTags, tag],
                currentTagColorIndex: (prevState.currentTagColorIndex + 1) % tagColorKeys.length,
            };
        }, () => this.props.onChange(this.state.tags));
    }

    /**
     * Deletes tag from state
     * Explicitly prevents deletion with backspace key
     * @param i index of tag being deleted
     * @param event delete event
     */
    private handleDelete = (i: number, event): void => {
        if (event.keyCode === KeyCodes.backspace) {
            return;
        }
        const tags = this.state.tags.filter((tag, index) => index !== i);

        // Updating HTML is dependent upon state having most up to date
        // values. Setting filtered state and then setting state with
        // updated HTML in tags
        this.setState({
            tags,
        }, () => this.props.onChange(this.state.tags));
    }

    /**
     * Converts ITag to IReactTag
     * @param tag ITag to convert to IReactTag
     */
    private toReactTag = (tag: ITag): IReactTag => {
        if (!tag) {
            return null;
        }
        return {
            id: tag.name,
            text: this.ReactTagHtml(tag.name, tag.color),
            color: tag.color,
        };
    }

    /**
     * Adds necessary HTML for tag to render correctly
     * @param tag tag needing Html
     */
    private addHtml = (tag: IReactTag): void => {
        tag.text = this.ReactTagHtml(tag.id, tag.color);
    }

    /**
     * Convert array of ITags to IReactTags
     * @param props properties for component, contains tags in ITag format
     */
    private toReactTags = (tags: ITag[]): IReactTag[] => {
        return tags ? tags.map((element: ITag) => this.toReactTag(element)) : [];
    }

    /**
     * Convert array of IReactTags to ITags
     * @param tags array of IReactTags to convert to ITags
     */
    private toITags = (tags: IReactTag[]): ITag[] => {
        return tags.map((element: IReactTag) => this.toItag(element));
    }

    /**
     * Converts IReactTag to ITag
     * @param tag IReactTag to convert to ITag
     */
    private toItag = (tag: IReactTag): ITag => {
        if (!tag) {
            return null;
        }
        return {
            name: tag.id,
            color: tag.color,
        };
    }
}
