import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const PriceInputIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
        {...props}
    >
        <Path
            d="M19.3187 6H5.31873C4.21416 6 3.31873 6.89543 3.31873 8V16C3.31873 17.1046 4.21416 18 5.31873 18H19.3187C20.4233 18 21.3187 17.1046 21.3187 16V8C21.3187 6.89543 20.4233 6 19.3187 6Z"
            stroke="#CED4DA"
            strokeWidth="2"
        />
        <Path
            d="M6.31873 9H8.31873M16.3187 15H18.3187"
            stroke="#CED4DA"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <Path
            d="M12.3187 14C13.4233 14 14.3187 13.1046 14.3187 12C14.3187 10.8954 13.4233 10 12.3187 10C11.2142 10 10.3187 10.8954 10.3187 12C10.3187 13.1046 11.2142 14 12.3187 14Z"
            stroke="#CED4DA"
            strokeWidth="2"
        />
    </Svg>
);

export default PriceInputIcon;