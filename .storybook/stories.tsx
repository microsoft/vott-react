import * as React from 'react'; 

import { storiesOf } from '@storybook/react';
import { wInfo } from '../utils';

import TagsInput from "../src/components/tagsInput/tagsInput";
import { ITag } from "../src/models/models";

import TagEditorModal from "../src/components/tagEditorModal/tagEditorModal"

const tags: ITag[] = [];

storiesOf('VoTT React', module).add(
  'Test Component',
  wInfo(`
    ### Notes

    Hello world!:

    ### Usage
    ~~~js
    <div>This is a test component!</div>
    ~~~

    ### To use this Storybook

    Explore the panels on the left.
  `)(() => <div>This is a test component!</div>)
);

storiesOf('VoTT React', module).add(
  'TagsInputCell',
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

storiesOf('VoTT React', module).add(
  'TagEditorModalCell',
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

