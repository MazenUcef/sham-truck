import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SendIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            d="M19.0001 12L19.6041 17.437C19.7771 18.993 18.1751 20.136 16.7601 19.465L4.81606 13.807C3.29106 13.085 3.29106 10.915 4.81606 10.193L16.7601 4.534C18.1751 3.864 19.7771 5.006 19.6041 6.562L19.0001 12ZM19.0001 12H12.0001"
            stroke="#F8F9FA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default SendIcon;