import React from "react";
import { ITag } from "../../models/models";
export declare const defaultValues: {
    tagColors: {
        White: string;
        Gray: string;
        Red: string;
        Maroon: string;
        Yellow: string;
        Olive: string;
        Lime: string;
        Green: string;
        Aqua: string;
        Teal: string;
        Blue: string;
        Navy: string;
        Fuschia: string;
        Purple: string;
    };
    delimiters: number[];
    placeHolder: string;
};
/**
 * Interface for model required to work with lower level
 * tags input component. Rather than name, uses 'id'.
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
 * @member tags - ITag[] or stringified ITag[]
 * @member onChange - function to call on tags change
 * @member placeHolder - Place holder for input text box.
 * Default is "Add new tag"
 * @member delimiters - Key code delimiters for creating a new tag
 * Defaults are enter (13) and comma (188)
 */
export interface ITagsInputProps {
    tags: ITag[];
    onChange: (tags: ITag[]) => void;
    placeHolder?: string;
    delimiters?: number[];
    onTagClick?: (tag: ITag) => void;
    onCtrlTagClick?: (tag: ITag) => void;
    onShiftTagClick?: (tag: ITag) => void;
    onCtrlShiftTagClick?: (tag: ITag) => void;
}
/**
 * Current state of tags input component
 * @member tags - IReactTag[] - tags used in lower level component
 * @member currentTagColorIndex - rotates initial color to apply to tags
 */
export interface ITagsInputState {
    tags: IReactTag[];
    currentTagColorIndex: number;
}
/**
 * Component for creating, modifying and using tags
 */
export default class TagsInput<T extends ITagsInputProps> extends React.Component<T, ITagsInputState> {
    private tagColors;
    private tagColorKeys;
    constructor(props: any);
    render(): JSX.Element;
    componentDidUpdate(prevProps: ITagsInputProps): void;
    /**
     * Calls the onTagClick handler if not null with clicked tag
     * @param event Click event
     */
    protected handleTagClick(event: any): void;
    /**
     * Gets the tag with the given name (id)
     * @param id string name of tag. param 'id' for lower level react component
     */
    protected getTag(id: string): IReactTag;
    /**
     * Gets tag ID (name) from a click event
     * @param event Click event
     */
    protected getTagIdFromClick(event: any): string;
    /**
     * Generate necessary HTML to render tag box appropriately
     * @param name name of tag
     * @param color color of tag
     */
    protected ReactTagHtml(name: string, color: string): JSX.Element;
    /**
     * Get span element for each tag
     */
    protected getTagSpan(name: string): JSX.Element;
    /**
     * Converts IReactTag to ITag
     * @param tag IReactTag to convert to ITag
     */
    protected toItag(tag: IReactTag): ITag;
    /**
     * Allows for click-and-drag re-ordering of tags
     * @param tag Tag being dragged
     * @param currPos Current position of tag
     * @param newPos New position of tag
     */
    private handleDrag;
    /**
     * Adds new tag to state with necessary HTML for rendering
     * Sets the color of the tag to next color, rotates through each
     * @param reactTag - IReactTag - new tag to add to state
     */
    private handleAddition;
    /**
     * Deletes tag from state
     * Explicitly prevents deletion with backspace key
     * @param i index of tag being deleted
     * @param event delete event
     */
    private handleDelete;
    /**
     * Converts ITag to IReactTag
     * @param tag ITag to convert to IReactTag
     */
    private toReactTag;
    private updateTagsHtml;
    /**
     * Adds necessary HTML for tag to render correctly
     * @param tag tag needing Html
     */
    private addHtml;
    /**
     * Convert array of ITags to IReactTags
     * @param props properties for component, contains tags in ITag format
     */
    private toReactTags;
    /**
     * Convert array of IReactTags to ITags
     * @param tags array of IReactTags to convert to ITags
     */
    private toITags;
}
