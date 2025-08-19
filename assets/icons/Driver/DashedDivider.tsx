import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const DashedDividerIcon = (props: SvgProps) => (
    <Svg
        width={1}
        height={30}
        viewBox="0 0 1 30"
        fill="none"
        {...props}
    >
        <Path
            d="M0.5 0V30"
            stroke="#878A8E"
            strokeDasharray="4 4"
        />
    </Svg>
);

export default DashedDividerIcon;