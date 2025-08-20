import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const ToRightIcon = (props: SvgProps) => (
    <Svg
        width={12}
        height={24}
        viewBox="0 0 12 24"
        fill="none"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.84294 11.2889L7.49994 5.63186L8.91394 7.04586L3.96394 11.9959L8.91394 16.9459L7.49994 18.3599L1.84294 12.7029C1.65547 12.5153 1.55015 12.261 1.55015 11.9959C1.55015 11.7307 1.65547 11.4764 1.84294 11.2889Z"
            fill="#11171A"
        />
    </Svg>
);

export default ToRightIcon;
