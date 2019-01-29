import { ITag } from "../models/models";

export default class MockFactory {
    /**
     * Create array of fake ITag
     * @param count Number of tags
     */
    public static createTestTags(count: number = 5): ITag[] {
        const tags: ITag[] = [];
        for (let i = 0; i < count; i++) {
            tags.push(MockFactory.createTestTag(i.toString()));
        }
        return tags;
    }

    /**
     * Create fake ITag with random color
     * @param name Name of tag
     */
    public static createTestTag(name: string = "Test Tag"): ITag {
        return {
            name: `Tag ${name}`,
            color: MockFactory.randomColor(),
        };
    }

    /**
     * Generates a random color string
     */
    private static randomColor(): string {
        return [
            "#",
            MockFactory.randomColorSegment(),
            MockFactory.randomColorSegment(),
            MockFactory.randomColorSegment(),
        ].join("");
    }

    /**
     * Generates random color segment
     */
    private static randomColorSegment(): string {
        const num = Math.floor(Math.random() * 255);
        return num.toString(16);
    }
}
