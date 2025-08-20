import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const MoneyIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            d="M19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6Z"
            stroke="#0077B6"
            strokeWidth={2}
        />
        <Path
            d="M6 9H8M16 15H18"
            stroke="#0077B6"
            strokeWidth={2}
            strokeLinecap="round"
        />
        <Path
            d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
            stroke="#0077B6"
            strokeWidth={2}
        />
    </Svg>
);

export default MoneyIcon;
