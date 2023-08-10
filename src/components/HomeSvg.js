import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const HomeIcon = ({focused}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none">
    <Path
      d="M17.027 21H4.973C3.055 21 1.5 19.46 1.5 17.562V8.847a2.42 2.42 0 0 1 .962-1.904l6.551-5.258a3.18 3.18 0 0 1 3.945 0l6.58 5.248a2.44 2.44 0 0 1 .962 1.905v8.724C20.5 19.46 18.945 21 17.027 21Z"
      fill={focused ? '#FB5353' : '#B7B7B7'}
    />
  </Svg>
);
const HomeSvg = memo(HomeIcon);
export default HomeSvg;
