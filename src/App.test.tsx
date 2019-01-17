import * as React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('should render without throwing an error', function () {
      expect(shallow(<App />).find('.App')).toHaveLength(1);
  });
});