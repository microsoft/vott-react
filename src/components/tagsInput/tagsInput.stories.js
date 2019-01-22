import React from 'react';
// import ITag from '../common/ITag'

import { storiesOf } from '@storybook/react';
import { TagsInput as tagsi } from './tagsInput';
import { wInfo } from '../../../utils';
import { text, boolean } from '@storybook/addon-knobs/react';

// storiesOf('Components/TagsInput', module).addWithJSX(
//   'basic TagsInput',
//   wInfo(`

//   ### Notes

//   This is the tagsInput Component

//   ### Usage
//   ~~~js
//   <Button
//     label={'Enroll'}
//     disabled={false}
//     onClick={() => alert('hello there')}
//   />
//   ~~~`
// )(() => (
//     <TagsInput
//     displayName='TagsInput Component'
//     tags={[]}
//     onChange={(tags) => alert()}
//     />
//   ))
// );

storiesOf('Components/TagsInput', module)
  // .add('TagsInput', () => <Button onClick={action('clicked')}>Hello Button</Button>)
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