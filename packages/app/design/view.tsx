import { View as ReactNativeView } from 'react-native';
import { styled } from 'nativewind';

export const View = styled(ReactNativeView);

export const Dot = styled(
  ReactNativeView,
  'w-[8px] h-[8px] bg-[#a445ed] rounded-full'
);
