import React from 'react';

import { storiesOf } from '@storybook/react';
import { TagsInput } from './tagsInput';
import { wInfo } from '../../../utils';
import { text, boolean } from '@storybook/addon-knobs/react';

storiesOf('Components/TagsInput', module).addWithJSX(
  'basic TagsInput',
  wInfo(`

  ### Notes

  This is the tagsInput Component

  ### Usage
  ~~~js
  <Button
    label={'Enroll'}
    disabled={false}
    onClick={() => alert('hello there')}
  />
  ~~~`
)(() => (
    <TagsInput/>
  ))
);