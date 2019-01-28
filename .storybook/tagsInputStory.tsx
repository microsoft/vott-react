// import React from 'react';

import * as React from 'react'; 

import { storiesOf } from '@storybook/react';
import { wInfo } from '../utils';

import TagsInput from "../src/components/tagsInput/tagsInput";
import { ITag } from "../src/models/models";

// import TagEditorModal from "../src/components/tagEditorModal/tagEditorModal"

const tags: ITag[] = [];

storiesOf('VoTT React', module).add(
  'TagsInput Component',
  wInfo(`


    ### Notes

    Hello world!:

    ### Usage
    ~~~js
    <div>This is the TagsInput Component!</div>
    ~~~

    ### To use this Storybook

    Explore the panels on the left.
  `)(() => <div>This is (not really) the TagsInput Component!</div>)
);

storiesOf('VoTT React', module).add(
  'TagsInputCell',
  wInfo(`### Notes

    Hello world!:

    ### Usage
    ~~~js
    <div>This is the TagsInput Component!</div>
    ~~~

    ### To use this Storybook

    Explore the panels on the left.`)(() => (
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
