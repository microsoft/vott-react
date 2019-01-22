import React from 'react';
// import ITag from '../common/ITag'

import { storiesOf } from '@storybook/react';
import { TagsInput as tagsi } from './tagsInput';
import { wInfo } from '../../../utils';
import { text, boolean } from '@storybook/addon-knobs/react';

storiesOf('Components/TagsInput', module)
  .add('TagsInput', () => (
    <tagsi
      displayName='TagsInput Component'
      tags={[]}
      onChange={(tags) => alert()}>
      <span role="img" label="label">
        Tags Input Component!
      </span>
    </tagsi>
  ));