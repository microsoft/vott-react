import * as React from "react";

import { storiesOf } from "@storybook/react";
import { wInfo } from "../.storybook/utils";

import { ITag } from "../src/models/models";
import { TagsInput } from "../src/components/tagsInput/tagsInput";
import { TagEditorModal } from "../src/components/tagEditorModal/tagEditorModal";
import "../src/components/tagsInput/tagsInput.scss";

const tags: ITag[] = [{ name: "Tag 1", color: "#FF0000" }];

storiesOf("VoTT React", module).add(
    "TagsInputCell",
    wInfo(`
  ### Notes

  This is the TagsInput Component`)(() => (
        <div>
            <div>
                <TagsInput
                    tags={tags}
                    onChange={() => { return; }}
                />
            </div>
        </div>
    )),
);

storiesOf("VoTT React", module).add(
    "TagEditorModal",
    wInfo(`
  ### Notes

  This is the TagEditorModal Component`)(() => (
        <div>
            <div>
                <TagEditorModal
                    onOk={() => { return; }}
                />
            </div>
        </div>
    )),
);
