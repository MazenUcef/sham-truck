import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SteeringIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            d="M7.5 12L10.5 9H13.5L16.5 12H16C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12H7.5Z"
            fill="#CED4DA"
            stroke="#CED4DA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M8 12H3M16 12H21M12 16V21"
            stroke="#CED4DA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3Z"
            stroke="#CED4DA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default SteeringIcon;