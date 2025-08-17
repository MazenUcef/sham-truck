import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const IdentityCardIcon = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <Path
            d="M14 3.5H10C6.229 3.5 4.343 3.5 3.172 4.672C2.001 5.844 2 7.729 2 11.5V12.5C2 16.271 2 18.157 3.172 19.328C4.344 20.499 6.229 20.5 10 20.5H14C17.771 20.5 19.657 20.5 20.828 19.328C21.999 18.156 22 16.271 22 12.5V11.5C22 7.729 22 5.843 20.828 4.672C19.656 3.501 17.771 3.5 14 3.5Z"
            stroke="#CED4DA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M5 16C6.036 13.419 9.896 13.25 11 16M14 8.5H19M14 12H19M14 15.5H16.5M9.75 9.75C9.75 10.2141 9.56563 10.6592 9.23744 10.9874C8.90925 11.3156 8.46413 11.5 8 11.5C7.53587 11.5 7.09075 11.3156 6.76256 10.9874C6.43437 10.6592 6.25 10.2141 6.25 9.75C6.25 9.28587 6.43437 8.84075 6.76256 8.51256C7.09075 8.18437 7.53587 8 8 8C8.46413 8 8.90925 8.18437 9.23744 8.51256C9.56563 8.84075 9.75 9.28587 9.75 9.75Z"
            stroke="#CED4DA"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default IdentityCardIcon;