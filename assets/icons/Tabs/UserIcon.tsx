import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const UserIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={25}
        viewBox="0 0 25 25"
        fill="none"
        {...props}
    >
        <Path
            d="M12.5 12.5C15.2614 12.5 17.5 10.2614 17.5 7.5C17.5 4.73858 15.2614 2.5 12.5 2.5C9.73858 2.5 7.5 4.73858 7.5 7.5C7.5 10.2614 9.73858 12.5 12.5 12.5Z"
            stroke="#AEB9C4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M21.0899 22.5C21.0899 18.63 17.2399 15.5 12.4999 15.5C7.75991 15.5 3.90991 18.63 3.90991 22.5"
            stroke="#AEB9C4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default UserIcon;