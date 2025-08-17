import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const PlusIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        {...props}
    >
        <Path
            d="M19.5 12L5.5 12M12.5 19L12.5 5"
            stroke="#F8F9FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default PlusIcon;