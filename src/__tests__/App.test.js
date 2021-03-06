/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../components/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

jest.mock('react-native-image-crop-picker', () => {
  return {
      ImagePicker: jest.fn()
  };
});

jest.mock('react-native-modal', () => {
  return {
      ImagePicker: jest.fn()
  };
});

jest.mock('react-native-progress/Bar', () => {
  return {
      ImagePicker: jest.fn()
  };
});
