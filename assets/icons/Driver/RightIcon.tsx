import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const RightIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            d="M21 12L3 12"
            stroke="#F5F5F5"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M15 6L21 12L15 18"
            stroke="#F5F5F5"
            strokeWidth="2.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default RightIcon;
