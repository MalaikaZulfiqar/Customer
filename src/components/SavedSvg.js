import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const SavedIcon = ({focused}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={22} fill="none">
    <Path
      d="m8.665 17.632-5.932 3.25a.989.989 0 0 1-1.318-.395v0a1.044 1.044 0 0 1-.119-.466V5.622c0-2.746 1.877-3.844 4.577-3.844h6.343c2.618 0 4.577 1.025 4.577 3.661v14.582a.98.98 0 0 1-.98.979 1.08 1.08 0 0 1-.475-.119l-5.968-3.25a.741.741 0 0 0-.705 0Z"
      fill={focused ? '#FB5353' : '#B7B7B7'}
    />
  </Svg>
);
const SavedSvg = memo(SavedIcon);
export default SavedSvg;
