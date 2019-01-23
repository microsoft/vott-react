import React, { CSSProperties } from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import TagsInput from "./tagsInput";
import { ITag } from "../../models/models";

const stories = storiesOf("Components", module);
const tags: ITag[] = [];

stories.add(
  "TagsInputCell",
  withInfo({ inline: true })(() => (
    <div style={styles.container}>
      <div style={styles.firstCellContainer}>
        <TagsInput
          tags={tags}
          onChange={(tags: ITag[]) => { return; }}
        />
      </div>
      <div style={styles.cellContainer}>
        <TagsInput
          tags={tags}
          onChange={(tags: ITag[]) => { return; }}
        />
      </div>
    </div>
  )),
);

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
  },
  cellContainer: {
    width: 100,
    height: 100,
    backgroundColor: "rgb(72, 78, 104)",
  },
};
styles.firstCellContainer = { ...styles.cellContainer, marginRight: 20 };
